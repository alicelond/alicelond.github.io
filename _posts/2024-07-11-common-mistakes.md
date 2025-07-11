---
layout: post
title: 7 common mistakes on computer performance evaluation
gh-repo: daattali/beautiful-jekyll
gh-badge: [star, fork, follow]
tags: [performance, benchmark, computer-systems]
comments: true
mathjax: true
author: Alice Becker Londero
---

A commonplace task in engineering software is to evaluate performance of components, providing appropriate data and arguments in the appropriate timeframe, while adding value to the product. However, as constraints present themselves, we might fall into some common mistakes which can compromise our final delivery. In the [book by Raj Jain](https://www.amazon.com/Art-Computer-Systems-Performance-Analysis/dp/0471503363), we're presented to the 7 most common mistakes in computer systems performance analysis. Let's dive into them:

## 1. Not having speficied goals.
The task's lack of clarity can comprimise the visualisation of the overall problem. If this get cloudy, the definition of appropriate metrics, workload, and methodology can be flaky, which will later compromise the ending results. 

## 2. Having biased goals. 
As engineers, we're accostumed to the idea of being agnostic to specific technologies because we are aware that each one has its own advantages and disadvantages. When we're performing benchmark, we should avoid as much as possible leaking our own hypothesis or personal preferences into the goal, because it can compromise the outcome. 

If you can get the right angle into the problem, numbers and statistics can be used to convince of any given point. A book suggestion that covers this topic is [How to Lie with Statistics](https://www.amazon.com/How-Lie-Statistics-Darrell-Huff/dp/0393310728), by Darrell Huff.  

## 3. Using an arbitrary approach.
If we choose the metrics, parameters, workloads or parameters as we might as well please, we'll be making our own life way harder because repeteability will be compromised. By choosing a systematic approach, the results can be easily achieved by other people and ourselves.

## 4. Not understanding the real problem.
