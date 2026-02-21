---
layout: post
title: A mental mind map to help infering time complexity of algorithms
thumbnail-img: /assets/img/2026-02-17-mental-algorithm.jpg
cover-img: /assets/img/2026-02-17-mental-algorithm.jpg
share-img: /assets/img/2026-02-17-mental-algorithm.jpg
tags: [big-o-notation, analysis-of-algorithm, time-complexity]
author: Alice Becker Londero
mathjax: true
---
Even though [the use of AI coding tools increases in industry](https://www.technologyreview.com/2025/12/15/1128352/rise-of-ai-coding-developers-2026/), the knowledge of fundamentals of computing skills is still relevant for code reviewing, algorithm analysis and debugging, specially worst case analysis or simply Big-O notation. 

Big-O notation considering the cases that cause the maximum number of operations in a given algorithm in terms of its input size. At the beginning, developing an intuition for this type of relationships can be difficult, so having a mental  mind map can help to infer what is predominant type while understanding an algorithmic solution. 

Here's a structured way of thinking that has helped me thoughout this process. 

# 1. Is there a recursion?
If a functions calls itself, we need to consider:
- The logic of time complexity is $O(\text{Branches}^{\text{Depth}})$, so we need to evaluate what would be our values for $\text{Branches}$ and $\text{Depth}$.

- *How many recursive calls are inside the function?* This will us evaluate $\text{Branches}$. If there's only 1 call, our branch will be 1, for example. In case of a well known algorithm of Fibonacci sequence, we have 2 calls, so our branch value is 2. 

- *How many times you have to perform the function's logic to go until hitting base case?* If the function logic includes addition or summation, we consider $\text{Depth}$ to $N$. If we're dividing or multiplying, $\text{Depth}$ is $log N$.

- Lastly, we join these two observations to have the result of Big-O. Let's use the Fibonacci sequence once again, as an example. We already know that the number of recursive calls is 2. Since the result of n-th number of the Fibonacci sequence is the result of the adition of the last two terms, we know that our $\text{Depth}$ is $N$. Hence, our result is $2^N$.

# 2. Are there any hidden loops in built-in functions?
It's common to use built-in function dependending on a given programming language when you're writing an algorithm. Be mindful of them when analysing time complexity.

- Linear Ghost Loops ($O(N)$): Methods like .includes(), .indexOf(), .map(), or Object.keys(). They start at the beginning and check items one by one.

- Log-Linear Ghost Loops ($O(N \log N)$): The standard .sort() method. Sorting is always more "expensive" than just looking.

- Constant Time ($O(1)$): Accessing an array by its index (arr[5]) or looking up a value in an Object/Hash Map by its key. The computer "teleports" straight to the data.

# 3. Are there any explicit loop conditions? 
When you find explicit `for`, `while` loops, consider:
- *When will the loop stop?* Think about the conditions the algorithm needs to comply to stop and identify which variables are involved in this scenario.

- *How is this variable in the stop condition changing?*

| Type of change | Time Complexity |
|---|---|
| Adding or subtracting by a constant (e.g., `i++`, `i--`, `i += 2`) | $O(N)$ |
| Multiplying or dividing by a constant (e.g., `i *= 2`, `i /= 2`) | $O(\log N)$ |
| Incrementing by the loop variable itself (e.g., `i += i`) | $O(\log N)$ |
| Nested loops with both incrementing linearly | $O(N^2)$ |

# 4. How do we handle the conditionals?
When you find explicit `if/else` conditionals, we consider need to evaluate both codes inside each component. We should choose the one that is the most time consuming, considering only the higher terms. 

In this part, it's important to remember *Step 2*. If the chosen block contains a hidden loop in built-in functions, the value should be added to the overall complexity. 

# 5. Use the sum rule
After analysing each part separaterely, we use the *Sum Rule* to evaluate the overall time complexity. The sum rule defines that if $f(n) = O(g(n))$ and $h(n) = O(k(n))$, then $f(n) + h(n) = O(max(g(n), k(n)))$.

- The Law of Addition (Neighbors):If tasks happen one after another (they are not inside each other), you only keep the largest one.

- The Law of Multiplication (Nesting)If a task happens inside another task (like a loop inside a loop, or a ghost loop inside recursion), you multiply their complexities.