---
layout: post
title: How prompt injection exploits LLMs 
thumbnail-img: /assets/img/2025-10-07-how-prompt-injection.png
cover-img: /assets/img/2025-10-07-how-prompt-injection.png
share-img: /assets/img/2025-10-07-how-prompt-injection.png
tags: [software-engineering, cibersecurity-software, software-security,prompt-injection]
author: Alice Becker Londero
---

In software engineering, we work hard to maintain a strict separation between executable instructions and the data they process. What happens when we use systems, like LLMs, that are designed to interpret data as potential instructions? This question points to one of the most significant security challenges in AI systems.

The challenge is known as prompt injection. It is a vulnerability where crafted text manipulates an LLM into performing unintended actions. In a direct injection, a user might trick a chatbot into bypassing its own safety rules. 

More concerning is indirect prompt injection. This occurs when a malicious prompt is hidden within a document, email, or webpage that the AI is asked to process, turning harmless data into a harmful command without the user's knowledge.

The effectiveness of these attacks is shocking. A [study from researchers at the universities of Melbourne, Singapore, and Wuhan](https://arxiv.org/html/2509.22040v1) found prompt injection attacks had an 84% success rate. The researchers noted these attacks are effective for a wide range of objectives, from initial system access to credential theft and data exfiltration. 

We have seen this in practice with vulnerabilities like one found in a GitHub integration, where a malicious issue ticket could trick an AI assistant into leaking private code. A similar issue allowed users to coax a [Microsoft-affiliated model](https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks) into revealing valid Windows product keys simply by framing the request as a guessing game.

The attack surface is no longer limited to specific code vulnerabilities. It now includes any external text data that an LLM might interact with. As we integrate these models more deeply into automated workflows, we must develop new methods to sanitise inputs and constrain model behaviour, ensuring that data remains just data