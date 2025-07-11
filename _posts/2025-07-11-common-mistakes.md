---
layout: post
title: 7 common mistakes on computer performance evaluation
thumbnail-img: /assets/img/2025-07-11-performance.jpg
cover-img: /assets/img/2025-07-11-performance.jpg
share-img: /assets/img/2025-07-11-performance.jpg
tags: [performance, benchmark, computer-systems]
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
"Look before you leap." Before diving into the problem, it's vital to be sure it is well-described. We can use questions such as: "Is there any missing information from the project?", "Do we know what do we need to measure?", "Do we know the typical behaviour of the system?" to help us track any misunderstanding or missing data.

## 5. Selecting the wrong metrics.
Choosing a metric without analysing correctly the problem or the data can lead us to wrong results. If we're looking at a problem with outliers, it's important that our metric can deal with it. Otherwise, we can be fooled by a too-good-to-be-true outcome. For example, on a ML problem I was working on, my data had outliers which led me to use RMSE (Root Mean Squared Error) not MAE  (Mean Absolute Error) to evaluate the model's regression outcome. If chosen otherwise, I might consider the model better than it actually was. 

## 6. Choosing an unrepresentative workload.
This is related to the third discussed topic. We should be able to simulate and experiment with representative scenarios to actually mock what will happen to our system. If not, we can wrongfully come to the conclusion that the system will sustain a certain workload that it won't. 

## 7. Choosing the wrong evaluation technique.
As stated by Rah Jain, there are three techniques to evaluate performance in computer systems: measurement, simulation and analytical modelling. Each problem is most likely to require from us a different (or a combination) of techniques to be properly evaluated. So, it also relates to the second topic, as engineers should be able to analyse a problem from any of these techniques, without choosing arbitrarily which one they are more proficient in. 