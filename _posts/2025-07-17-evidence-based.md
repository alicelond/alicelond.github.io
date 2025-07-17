---
layout: post
title: A software engineer's guide to evidence-based decisions
thumbnail-img: /assets/img/2025-07-17-evidence-based-swe.jpg
cover-img: /assets/img/2025-07-17-evidence-based-swe.jpg
share-img: /assets/img/2025-07-17-evidence-based-swe.jpg
tags: [software-engineering, evidence-based-development, decision-making]
author: Alice Becker Londero
---

Software engineering projects can feel overwhelming as it includes making several decisions that affect the overall result. To solve this, we can go with the familiar frameworks, or try to learn the current trend, and apply it. But, how can we know we're making the right choice? 

That's where the proposal of [Evidence-Based Software Engineering (EBSE)](https://ieeexplore.ieee.org/document/1317449) comes into the picture. It was proposed by Kitchnmann, Dyba and Jorgensen, in 2004, inspired by the evidence-based medicine, which became more popular in the 90's. 

This framework's goal is to combine evidence, practical experiences with human values to support decision making. It can be used as a personal toolkit for being a more effective engineer. They came up with 5-step to illustrate their topic, as you can see below.

![EBSE Framework](/assets/img/2025-07-17-ebse-cycle.png) 

By framing it as a personal skill, we can use it as a way of increasing our team impact and performance. You'll be able to know more of what's done in our field, besides having proper justification for your points and decisions. 

## Let's jump to an example

Imagine the scenario: you and your team are struggling to synchronize timestamps from multiple sensors in an IoT system. The data is becoming unreliable because you can't be sure of the correct event sequence. The first instinct is to start trying random solutions, but let's apply the EBSE framework instead.

1. Formulate an answerable question

The initial, vague question is, "How do we fix the timestamp issue?" This isn't helpful.
A much better, evidence-based question would be: "For our C++ application on a resource-constrained IoT device, will implementing a standard Network Time Protocol (NTP) client provide better timestamp accuracy (e.g., <10ms error) and lower CPU overhead compared to developing a custom clock-offset correction algorithm?"
This question is powerful because it's **specific, compares clear alternatives**, and **defines what "better" means**.

2. Find the best evidence

Instead of just searching blogs for quick fixes, you dig for real evidence. You spend a few hours looking for:
- Benchmarks in academic papers on IEEE comparing NTP performance on embedded systems.
- White papers from industrial automation companies who have solved this before.
- The maturity and known issues of existing lightweight C++ NTP libraries on GitHub.

3. Critically appraise the evidence

This is where you put on your skeptic's hat. You find a research paper that favours a custom algorithm, but quickly realise the experiment was run on powerful servers, not a low-power device like yours. The **evidence isn't applicable**.
You also find an open-source NTP library that looks perfect, but its **repository hasn't been updated** in three years. That's a huge red flag for maintenance and security, making it a high-risk choice. The most reliable evidence points toward standard, battle-tested protocols.

4. Integrate with expertise and context

Now, you combine the evidence with the human factors:
- The evidence: the data suggests that a standard, well-maintained NTP solution is the lower-risk option.
- Your team's expertise: you are all strong C++ developers, but not experts in the nuances of network time protocols. Building a custom solution from scratch is likely to introduce subtle, hard-to-find bugs.
- Project values: The project's top priority is reliability and meeting the deadline. A **"good enough" stable solution is far better than a "perfect"** but risky custom one. The decision becomes clear: use a standard, well-maintained NTP library.

5. Evaluate the outcome

The work isn't over. You implement the chosen library on a single test device and measure the results over 48 hours. Is the clock drift consistently within your 10ms target? How much CPU and memory is it using?
By doing this, **you're not just hoping it worked; you have hard data to prove the decision was correct** and can now confidently roll out the solution to all devices. You've turned a guess into a calculated, evidence-backed success.

## But there EBSE isn't a silver bullet
As pointed out by the article authors, software engineering has its own characteristics that limit this application. Let's check some of them:
- Software lifecycle, where a change in one area has knock-on effects elsewhere, making it hard to isolate impact.
- Business decisions can define what technologies to be used, which are out of the engineering scope.
- Technologies are implemented by **people**, which makes it inhrently biased.
- There is rarely a single 'right' answer, but rather a best fit for the context of each problem.

You can try this yourself! Instead of just jumping to a solution for a small problem, spend 30 minutes looking for evidence. You'll be amazed at what you learn and how much more confident your decisions become.