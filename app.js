// ============================================
// Markdown Blog Application
// ============================================

// State management
const app = {
    posts: [],
    filteredPosts: [],
    currentPage: 1,
    postsPerPage: 10,
    searchQuery: '',
    selectedTag: null,
    currentPostSlug: null
};

// DOM elements
const elements = {
    navToggle: document.getElementById('nav-toggle'),
    navList: document.querySelector('.nav-list'),
    searchBtn: document.getElementById('search-btn'),
    searchModal: document.getElementById('search-modal'),
    searchInput: document.getElementById('search-input'),
    searchClose: document.getElementById('search-close'),
    searchOverlay: document.querySelector('.search-overlay'),
    searchResults: document.getElementById('search-results'),
    backBtn: document.getElementById('back-btn'),
    feedView: document.getElementById('feed-view'),
    postView: document.getElementById('post-view'),
    aboutView: document.getElementById('about-view'),
    projectsView: document.getElementById('projects-view'),
    postsContainer: document.getElementById('posts-container'),
    pagination: document.getElementById('pagination'),
    postContent: document.getElementById('post-content'),
    activeFilters: document.getElementById('active-filters')
};

// ============================================
// Utility Functions
// ============================================

/**
 * Extract frontmatter and content from markdown
 */
function parseFrontmatter(markdown) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
        return { frontmatter: {}, content: markdown };
    }

    const [, frontmatterStr, content] = match;
    const frontmatter = {};

    frontmatterStr.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();

        if (value.startsWith('[') && value.endsWith(']')) {
            // Parse array
            frontmatter[key.trim()] = value
                .slice(1, -1)
                .split(',')
                .map(v => v.trim().replace(/^['"]|['"]$/g, ''));
        } else {
            frontmatter[key.trim()] = value.replace(/^['"]|['"]$/g, '');
        }
    });

    return { frontmatter, content };
}

/**
 * Convert markdown to HTML
 */
function markdownToHtml(markdown) {
    let html = markdown;

    // Code blocks (triple backticks) - must be before inline code
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
        const escapedCode = code
            .trim()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return `<pre><code class="language-${language || 'plain'}">${escapedCode}</code></pre>`;
    });

    // Headers (process from highest number to lowest to avoid conflicts)
    html = html.replace(/^###### (.*?)$/gm, '<h6>$1</h6>');
    html = html.replace(/^##### (.*?)$/gm, '<h5>$1</h5>');
    html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Horizontal rules
    html = html.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '<hr>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Images (must be before links to avoid conflict)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;">');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Tables (Markdown table format)
    html = html.replace(/^\|(.+)\n\|[\s\-:|]+\n((?:\|.+\n?)*)/gm, (match, headerLine, bodyLines) => {
        // Parse header
        const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
        const headerRow = headers.map(h => `<th>${h}</th>`).join('');
        
        // Parse body rows
        const rows = bodyLines.trim().split('\n').filter(line => line.trim());
        const bodyRows = rows.map(row => {
            const cells = row.split('|').map(c => c.trim()).filter(c => c);
            return cells.map(c => `<td>${c}</td>`).join('');
        }).map(row => `<tr>${row}</tr>`).join('');
        
        return `<table><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table>`;
    });

    // Line breaks to paragraphs
    html = html
        .split('\n\n')
        .map(para => {
            if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<ol') || para.startsWith('<pre') || para.startsWith('<hr') || para.startsWith('<blockquote') || para.startsWith('<table')) {
                return para;
            }
            return `<p>${para}</p>`;
        })
        .join('\n');

    // Unordered lists (handle both * and -)
    html = html.replace(/^[\*\-] (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

    return html;
}

/**
 * Estimate reading time in minutes
 */
function estimateReadTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

/**
 * Format date
 */
function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00Z');
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Create slug from title
 */
function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

/**
 * Switch between views
 */
function switchView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    // Show selected view
    const viewId = viewName === 'home' ? 'feed-view' : `${viewName}-view`;
    const view = document.getElementById(viewId);
    if (view) {
        view.classList.add('active');
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`a[href="#/${viewName === 'home' ? '' : viewName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Close mobile menu
    if (elements.navList.classList.contains('open')) {
        elements.navToggle.click();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// ============================================
// Post Loading & Parsing
// ============================================

/**
 * Load posts from /posts directory
 * Fetches the posts.json index file that lists all post files
 * Falls back to hardcoded list for local file:// development
 */
async function loadPosts() {
    let postFiles = [];
    
    // Fetch the posts index
    try {
        const response = await fetch('./posts/posts.json');
        if (response.ok) {
            postFiles = await response.json();
        } else {
            // Fallback to hardcoded list for local development with file://
            postFiles = [
                '2025-07-11-common-mistakes.md',
                '2025-07-17-evidence-based.md',
                '2025-08-05-common-security-vulnerabilities.md',
                '2025-08-15-hand-utensils.md',
                '2025-08-26-dinosaurs.md',
                '2025-09-02-formal-dsp.md',
                '2025-09-09-airpods2.md',
                '2025-09-16-earthquake.md',
                '2025-09-23-ai-vulnerability.md',
                '2025-09-30-swot-code.md',
                '2025-10-07-how-prompt-injection.md',
                '2026-02-17-mental-algorithm.md',
                '2026-05-27-improving-modularity.md'
            ];
        }
    } catch (err) {
        // Fallback to hardcoded list if fetch fails (e.g., file:// protocol)
        console.warn('Could not fetch posts.json, using fallback:', err);
        postFiles = [
            '2025-07-11-common-mistakes.md',
            '2025-07-17-evidence-based.md',
            '2025-08-05-common-security-vulnerabilities.md',
            '2025-08-15-hand-utensils.md',
            '2025-08-26-dinosaurs.md',
            '2025-09-02-formal-dsp.md',
            '2025-09-09-airpods2.md',
            '2025-09-16-earthquake.md',
            '2025-09-23-ai-vulnerability.md',
            '2025-09-30-swot-code.md',
            '2025-10-07-how-prompt-injection.md',
            '2026-02-17-mental-algorithm.md',
            '2026-05-27-improving-modularity.md'
        ];
    }

    try {
        for (const file of postFiles) {
            try {
                const response = await fetch(`./posts/${file}`);
                if (response.ok) {
                    const markdown = await response.text();
                    const { frontmatter, content } = parseFrontmatter(markdown);

                    const post = {
                        slug: createSlug(frontmatter.title || file),
                        title: frontmatter.title || file,
                        date: frontmatter.date || '',
                        author: frontmatter.author || 'Alice Becker Londero',
                        tags: frontmatter.tags || [],
                        excerpt: frontmatter.excerpt || '',
                        content: content,
                        readTime: estimateReadTime(content),
                        filename: file
                    };

                    app.posts.push(post);
                }
            } catch (err) {
                console.error(`Error loading post ${file}:`, err);
            }
        }

        // Sort posts by date (newest first)
        app.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Initialize filtered posts
        applyFilters();
        renderBlog();
    } catch (err) {
        console.error('Error loading posts:', err);
        elements.postsContainer.innerHTML =
            '<div class="no-posts"><div class="no-posts-title">No posts found</div></div>';
    }
}

/**
 * Load about page content from aboutme.md
 */
async function loadAndRenderAbout() {
    try {
        const response = await fetch('./aboutme.md');
        if (response.ok) {
            const markdown = await response.text();
            const { content } = parseFrontmatter(markdown);
            const html = markdownToHtml(content);
            const aboutContent = document.getElementById('about-content');
            if (aboutContent) {
                aboutContent.innerHTML = html;
            }
        } else {
            throw new Error('Failed to load aboutme.md');
        }
    } catch (err) {
        console.error('Error loading about page:', err);
        const aboutContent = document.getElementById('about-content');
        if (aboutContent) {
            aboutContent.innerHTML = '<p>Error loading about page content.</p>';
        }
    }
}

/**
 * Load projects page content from projects.md
 */
async function loadAndRenderProjects() {
    try {
        const response = await fetch('./projects.md');
        if (response.ok) {
            const markdown = await response.text();
            const { content } = parseFrontmatter(markdown);
            const html = markdownToHtml(content);
            const projectsContent = document.getElementById('projects-content');
            if (projectsContent) {
                projectsContent.innerHTML = html;
            }
        } else {
            throw new Error('Failed to load projects.md');
        }
    } catch (err) {
        console.error('Error loading projects page:', err);
        const projectsContent = document.getElementById('projects-content');
        if (projectsContent) {
            projectsContent.innerHTML = '<p>Error loading projects content.</p>';
        }
    }
}

// ============================================
// Filtering & Pagination
// ============================================

/**
 * Apply search and tag filters
 */
function applyFilters() {
    app.filteredPosts = app.posts.filter(post => {
        // Search filter
        const searchLower = app.searchQuery.toLowerCase();
        const matchesSearch =
            !app.searchQuery ||
            post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchLower));

        // Tag filter
        const matchesTag = !app.selectedTag || post.tags.includes(app.selectedTag);

        return matchesSearch && matchesTag;
    });

    app.currentPage = 1;
    updateActiveFilters();
}

/**
 * Update active filters display
 */
function updateActiveFilters() {
    elements.activeFilters.innerHTML = '';

    if (app.selectedTag) {
        const filterEl = document.createElement('div');
        filterEl.className = 'filter-tag';
        filterEl.innerHTML = `
            <span>#${app.selectedTag}</span>
            <button onclick="clearTagFilter()" title="Clear filter">×</button>
        `;
        elements.activeFilters.appendChild(filterEl);
    }
}

/**
 * Clear tag filter
 */
function clearTagFilter() {
    app.selectedTag = null;
    applyFilters();
    renderBlog();
}

/**
 * Get paginated posts
 */
function getPaginatedPosts() {
    const start = (app.currentPage - 1) * app.postsPerPage;
    const end = start + app.postsPerPage;
    return app.filteredPosts.slice(start, end);
}

/**
 * Get total pages
 */
function getTotalPages() {
    return Math.ceil(app.filteredPosts.length / app.postsPerPage);
}

// ============================================
// Rendering Functions
// ============================================

/**
 * Render blog feed
 */
function renderBlog() {
    const paginatedPosts = getPaginatedPosts();

    if (paginatedPosts.length === 0) {
        elements.postsContainer.innerHTML =
            '<div class="no-posts"><div class="no-posts-title">No posts found</div></div>';
        elements.pagination.innerHTML = '';
        return;
    }

    elements.postsContainer.innerHTML = paginatedPosts
        .map(post => createPostCard(post))
        .join('');

    renderPagination();

    // Add click handlers
    document.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', () => {
            const slug = card.dataset.slug;
            window.location.hash = `#/post/${slug}`;
        });
    });

    // Add tag click handlers
    document.querySelectorAll('.post-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            const tagName = tag.textContent.replace('#', '');
            app.selectedTag = tagName;
            applyFilters();
            renderBlog();
        });
    });
}

/**
 * Create post card HTML
 */
function createPostCard(post) {
    const tagsHtml = post.tags
        .map(tag => `<span class="post-tag">#${tag}</span>`)
        .join('');

    return `
        <div class="post-card" data-slug="${post.slug}">
            <div class="post-card-header">
                <div class="post-card-date">${formatDate(post.date)}</div>
                <div class="post-card-title">${post.title}</div>
            </div>
            ${post.excerpt ? `<div class="post-card-excerpt">${post.excerpt}</div>` : ''}
            <div class="post-card-footer">
                <div class="post-card-tags">${tagsHtml}</div>
                <div class="post-read-time">${post.readTime} min read</div>
            </div>
        </div>
    `;
}

/**
 * Render pagination
 */
function renderPagination() {
    const totalPages = getTotalPages();
    elements.pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = app.currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (app.currentPage > 1) {
            app.currentPage--;
            renderBlog();
            window.scrollTo(0, 0);
        }
    });
    elements.pagination.appendChild(prevBtn);

    // Page info
    const info = document.createElement('div');
    info.className = 'pagination-info';
    info.textContent = `Page ${app.currentPage} of ${totalPages}`;
    elements.pagination.appendChild(info);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = 'Next';
    nextBtn.disabled = app.currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (app.currentPage < totalPages) {
            app.currentPage++;
            renderBlog();
            window.scrollTo(0, 0);
        }
    });
    elements.pagination.appendChild(nextBtn);
}

/**
 * Render single post
 */
function renderPost(slug) {
    const post = app.posts.find(p => p.slug === slug);

    if (!post) {
        elements.postContent.innerHTML = '<p>Post not found</p>';
        return;
    }

    const htmlContent = markdownToHtml(post.content);
    const tagsHtml = post.tags
        .map(tag => `<a href="#/blog" class="post-tag" onclick="window.filterByTag('${tag}'); return false;">#${tag}</a>`)
        .join('');

    elements.postContent.innerHTML = `
        <h1 class="post-title">${post.title}</h1>
        <div class="post-meta">
            <div class="post-meta-item">
                <span class="post-meta-label">Published:</span>
                <span>${formatDate(post.date)}</span>
            </div>
            <div class="post-meta-item">
                <span class="post-meta-label">Author:</span>
                <span>${post.author}</span>
            </div>
            <div class="post-meta-item">
                <span class="post-meta-label">Reading time:</span>
                <span>${post.readTime} minutes</span>
            </div>
            ${post.tags.length > 0 ? `
            <div class="post-tags-list">
                ${tagsHtml}
            </div>
            ` : ''}
        </div>
        <div class="post-body">
            ${htmlContent}
        </div>
    `;

    app.currentPostSlug = slug;

    // Trigger MathJax to render math expressions
    if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
        MathJax.typesetPromise().catch(err => console.log('MathJax rendering error:', err));
    }
}

// ============================================
// Search Functionality
// ============================================

/**
 * Show search results
 */
function showSearchResults() {
    const query = elements.searchInput.value.toLowerCase();

    if (query.length === 0) {
        elements.searchResults.innerHTML = '';
        return;
    }

    const results = app.posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
    );

    if (results.length === 0) {
        elements.searchResults.innerHTML = '<div class="no-posts"><p>No results found</p></div>';
        return;
    }

    elements.searchResults.innerHTML = results
        .map(post => `
            <div class="search-result" onclick="selectSearchResult('${post.slug}')">
                <div class="search-result-title">${post.title}</div>
                <div class="search-result-date">${formatDate(post.date)}</div>
            </div>
        `)
        .join('');
}

/**
 * Select search result
 */
function selectSearchResult(slug) {
    closeSearchModal();
    window.location.hash = `#/post/${slug}`;
}

/**
 * Open search modal
 */
function openSearchModal() {
    elements.searchModal.classList.remove('hidden');
    elements.searchInput.focus();
}

/**
 * Close search modal
 */
function closeSearchModal() {
    elements.searchModal.classList.add('hidden');
    elements.searchInput.value = '';
    elements.searchResults.innerHTML = '';
}

// ============================================
// URL Routing
// ============================================

/**
 * Handle hash changes (routing)
 */
function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [, view, param] = hash.match(/^\/([^/]*)(?:\/(.*))?$/) || [];

    if (view === 'post' && param) {
        switchView('post');
        renderPost(param);
    } else if (view === 'about') {
        switchView('about');
        loadAndRenderAbout();
    } else if (view === 'projects') {
        switchView('projects');
        loadAndRenderProjects();
    } else if (view === 'blog') {
        switchView('home');
        renderBlog();
    } else {
        switchView('home');
        renderBlog();
    }
}

/**
 * Filter by tag from post view
 */
function filterByTag(tag) {
    app.selectedTag = tag;
    applyFilters();
    window.location.hash = '#/blog';
    renderBlog();
}

// ============================================
// Event Listeners
// ============================================

// Navigation toggle (mobile)
elements.navToggle.addEventListener('click', () => {
    elements.navList.parentElement.classList.toggle('open');
});

// Search button
elements.searchBtn.addEventListener('click', openSearchModal);

// Search modal close
elements.searchClose.addEventListener('click', closeSearchModal);
elements.searchOverlay.addEventListener('click', closeSearchModal);

// Search input
elements.searchInput.addEventListener('input', showSearchResults);

// Back button
elements.backBtn.addEventListener('click', () => {
    window.location.hash = '#/blog';
});

// Close search on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSearchModal();
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
});

// Hash change listener
window.addEventListener('hashchange', handleRoute);

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadPosts().then(() => {
        handleRoute();
    });
});
