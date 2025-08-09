---
layout: post
title: 5 most common software security vulnerabilities 
thumbnail-img: /assets/img/2025-08-05-security.jpg
cover-img: /assets/img/2025-08-05-security.jpg
share-img: /assets/img/2025-08-05-security.jpg
tags: [software-engineering, cibersecurity-software, software-security,cwe]
author: Alice Becker Londero
---

The [Common Weakness Enumeration](https://cwe.mitre.org/about/index.html) is a list of vulnerabilities of software, firmware and hardware developed by the community. These weaknesses are conditions in a given component which can under certain cirscumstances introduce vulnerabilities. They partner with academia, industry, and government wishing to eliminate these weaknesses before deployment, where they are cheaper to solve in the product lifecycle.

Being aware of these aspects can offer insight into common root causes, diminish errors to manage post-development, and increase security efforts in trendy vulnerabilities. The [5 most common vulnerabilities](https://cwe.mitre.org/top25/archive/2024/2024_cwe_top25.html) in software programs in 2024 was the following. 

## [Cross-site scripting](https://cwe.mitre.org/data/definitions/79.html)
This vulnerability can occur when the input from an user is placed as an output used in a web page, used to other servers. It's also known as HTML injection. A malicious user can access private information which can be stored in user cookies and perform an action on behalf of the victim. 

Moreover, it can also be used to execute unauthorised code, affecting the system's integraty, and availabiliy. It can also inlcude the disclosure of  end user files, installation of malicious program, or redirecting user to another site. 

## [Out-of-bounds write](https://cwe.mitre.org/data/definitions/787.html)
It refers to a writing operation on a buffer outuside of its bounds, which can be past the end or before the beginning of an intended buffer. This vulnerability can cause memory corruption or even execute malicious code. Another possible impact is the program crashing, exiting or restarting because of the attempt to access invalid memory.

## [SQL injection](https://cwe.mitre.org/data/definitions/89.html)
This can happen when the user can modify an SQL command, allowing the execution of unauthorised code. A malicious user can use this to peak into database and even modify or delete information with a SQL injection attack. Since databases have sensitive data, this vulnerability affects confidentiality of systems.

## [Cross-site request forgery](https://cwe.mitre.org/data/definitions/352.html)
It refers to when a malicious user can pretends to be an authorised user and is able to access user information. This vulnerability refers to assuming a given identity, directly affecting the systems confidentiality and integrity.

## [Improper limitation of a pathname to a restricted directory](https://cwe.mitre.org/data/definitions/22.html)
This vulnerability occurs when an application uses external input to build a pathname without properly neutralising special elements. An attacker can exploit this by using path traversal sequences, such as `../`, to navigate outside of the intended, restricted directory.

This weakness allows attackers to access, modify, or create files anywhere on the file system that the application has permissions for. For instance, instead of accessing an intended file like images/profile.jpg, a malicious user might craft a path like `../../etc/passwd` to read sensitive system files. This directly affects confidentiality.

Furthermore, this vulnerability can severely impact system integrity, as an attacker could overwrite critical files, upload a web shell to execute unauthorized code, or even add new user accounts. In some scenarios, deleting or corrupting essential application or system files could lead to a Denial of Service (DoS), affecting availability.