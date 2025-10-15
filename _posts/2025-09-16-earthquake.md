---
layout: post
title: The engineering of Android's earthquake alert system
thumbnail-img: /assets/img/2025-09-16-earthquake.png
cover-img: /assets/img/2025-09-16-earthquake.png
share-img: /assets/img/2025-09-16-earthquake.png
tags: [accelerometer, android]
author: Alice Becker Londero
---

What if every phone in a city could act as a single, massive, real-time seismograph?

That's what Google has achieved with its [Android Earthquake Alerts system](https://www.youtube.com/watch?v=zFin2wZ56tM&t=40s). By leveraging the accelerometers already built into millions of phones, they've created a surprisingly effective, crowdsourced earthquake detection network.

As an engineer fascinated by transforming physical vibrations into digital insights, the signal processing challenge here is incredible. How do you distinguish the wave of an earthquake from the millions of other vibrations a phone experiences daily—being dropped, riding in a car, or just buzzing on a table?

The process begins when an individual's phone accelerometer detects a jolt consistent with seismic activity and sends a trigger to a central server. The server then cross-references this single event against a stream of data from other phones in the same geographic area. 

An alert is only issued when a statistically significant number of these triggers coincide within a narrow time window, confirming a widespread event rather than an isolated jolt.

The results of this approach, published in the journal Science, validate its effectiveness on a global scale, over three years of operation across 98 countries. According to user feedback, 85% of people who received an alert confirmed they felt the shaking, validating the system's accuracy. Notably, as many as 36% of respondents reported receiving the alert, underscoring its value as a genuine early warning system.

This is an example of how we can repurpose the billions of sensors we carry every day to create public safety infrastructure, especially in regions without traditional seismic stations. 