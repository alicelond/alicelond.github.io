#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the posts directory
const postsDir = path.join(__dirname, 'posts');

// Read all markdown files in the posts directory
const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .sort()
    .reverse(); // Reverse to get newest first (they're named by date)

// Write posts.json
const postsJsonPath = path.join(postsDir, 'posts.json');
fs.writeFileSync(postsJsonPath, JSON.stringify(files, null, 2));

console.log(`✓ Generated posts.json with ${files.length} posts`);
