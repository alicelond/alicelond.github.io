---
title: Improving modularity by looking at connascence in code
date: 2026-05-27
author: Alice Becker Londero
tags: [modularity, software-architecture, clean-code, python]
excerpt: We always talk about the importance of 'loose coupling,' but how do we measure it objectively? In Fundamentals of Software Architecture, the authors bridge classic structural coupling with a powerful, comprehensive framework called Connascence.
---

We always talk about the importance of "loose coupling," but how do we measure it objectively?

In [Fundamentals of Software Architecture](https://www.amazon.com.br/Fundamentals-Software-Architecture-Neal-Ford/dp/1492043451), the authors bridge classic structural coupling with a powerful, comprehensive framework called **Connascence**. Two components are connascent if a change in one requires the other to be modified to maintain overall system correctness.

To build maintainable systems, we need to understand the spectrum of connascence and how to actively refactor our code to move from high runtime fragility to design-time safety.

---

🧠 The Spectrum: Dynamic vs. Static Connascence 

🔴 Dynamic Connascence (Stronger / Harder to Maintain) 

Dynamic connascence analyzes dependencies and execution behaviors at runtime. Because it depends on how code executes rather than its structural definition, it is incredibly difficult for automated linting tools and IDEs to detect.

* 
**Connascence of Execution (CoE):** This occurs when the operational order of multiple components or methods is critical. If you call Method B before Method A, the system fails or enters an invalid state.


* 
**Connascence of Position (CoP):** This occurs when multiple components must agree on the exact order of values. This is rampant when passing data using raw lists, tuples, or positional arguments where semantic meaning is bound strictly to an index.



🟢 Static Connascence (Weaker / Architecturally Preferred) 

Static connascence refers to code-level coupling that can be determined simply by reading the source code analysis. Modern development tools make it trivial to refactor and safeguard.

* 
**Connascence of Type (CoT):** Multiple components must agree on the structural format or class type of an entity. Explicitly checking or declaring types limits variables to specific structures, eliminating hidden runtime surprises.


* 
**Connascence of Name (CoN):** Multiple components simply need to agree on the literal name of an entity (like a method name or object property). This is the **weakest, most desirable form of connascence** because if a name changes, modern IDE refactoring tools can safely update it system-wide in a single click.



---

### ❌ The Fragile Way: High Coupling & Dynamic Connascence

Let's look at a practical scenario: say we want to send a financial report to a specific email destination.

In this first snippet, the architecture is brittle because the execution flow and data positioning are heavily intertwined between components.

```python
# Module A: The Report Processor (Highly coupled and fragile)
class ReportProcessor:
    def __init__(self):
        self.status = "INIT"
        self.data = "Q1 Financials Data"
        self.meta_config = []  # Implicit Connascence of Position

    def execute_pipeline(self, email_service):
        # 1. Connascence of Execution: 
        # If send() is called before build_payload(), the system fails at runtime.
        email_service.build_payload("Monthly Report", "finance@company.com", self.data)
        
        # 2. Connascence of Position & Meaning:
        # The list elements rely strictly on position: [User ID, Dept Code]
        self.meta_config = [42, "FIN-2026"]
        email_service.send(self.meta_config)


# Module B: The Email Service (Leaky abstractions and unsafe)
class EmailService:
    def __init__(self):
        self.payload = None

    def build_payload(self, title, destination, content):
        self.payload = {"title": title, "to": destination, "body": content}

    def send(self, config_list):
        # Breaks if Module A flips the list elements (Connascence of Position)
        user_id = config_list[0]
        dept = config_list[1]
        
        if self.payload:
            # Connascence of Meaning: "FIN-2026" contains hidden business logic
            print(
                f"Sending '{self.payload['title']}' to {self.payload['to']} "
                f"(User: {user_id} | Dept: {dept})"
            )
        else:
            print("Error: Payload not initialized! (Connascence of Execution Failure)")

```

#### Why this code breaks so easily:

1. 
**Content/Pathological Coupling:** `ReportProcessor` knows way too much about the internal lifecycle of `EmailService`. Instead of handing off a completed task, it actively manages the internal state of the service step-by-step.


2. 
**Connascence of Execution:** The temporal order is an invisible rule not enforced by the architecture. If a developer changes `execute_pipeline` to call `send()` first, the application crashes silently at runtime.


3. 
**Connascence of Position:** The processor packages metadata into a raw list: `[42, "FIN-2026"]`. `EmailService` blindly unpacks indices `0` and `1`. If the processor accidentally flips this array to `["FIN-2026", 42]`, the string is treated as the User ID, silently corrupting the behavior.



---

### The Evolutionary Way: Static & Loose Coupling

Great software architects constantly refactor code to move from right to left on the connascence spectrum—converting strong runtime dependencies into weaker, static agreements.

To fix the email delivery scenario, we introduce dedicated data contracts using Python's `dataclass` library, turning the operations into a single atomic request.

```python
from dataclasses import dataclass

# Fixing Position and Meaning connascence by introducing self-contained types (Connascence of Type)
@dataclass
class TargetContext:
    user_id: int
    department_code: str


@dataclass
class EmailMessage:
    title: str
    destination: str
    content: str


# Module B: Isolated Service
class EmailService:
    # Coupling is now downgraded to Data Coupling via explicit, typed arguments
    def send_report(self, message: EmailMessage, context: TargetContext) -> None:
        # We now rely strictly on property names (Connascence of Name - the weakest/safest form)
        print(
            f"Sending '{message.title}' to {message.destination} "
            f"(User: {context.user_id} | Dept: {context.department_code})"
        )


# Module A: Loose coupled Processor
class ReportProcessor:
    def __init__(self):
        self.data = "Q1 Financials Data"

    def execute_pipeline(self, email_service: EmailService):
        # Fixed Execution issue: Everything needed is packed atomically into data structures
        message = EmailMessage(
            title="Monthly Report",
            destination="finance@company.com",
            content=self.data
        )
        context = TargetContext(user_id=42, department_code="FIN-2026")
        
        # Atomic call: Impossible to mess up the internal state or execution lifecycle
        email_service.send_report(message, context)

```

#### Why we used `dataclass` and why coupling is looser now:

* **The Power of `@dataclass`:** In Python, standard dictionaries or lists don't enforce data contracts at design time. By utilizing structured objects with **named fields** and **type hints**, we clearly communicate *what* data is required, completely eliminating raw array indexing and hidden magic values.


* 
**Shifted to Data Coupling:** The components no longer interfere with each other's execution lifecycles or internal storage states. They communicate strictly by passing standalone data arguments.


* 
**Eliminated Execution Connascence:** The `send_report` method is now completely **atomic**. You cannot call it in the "wrong order" because it expects a fully constructed message and context right at the exact moment of invocation.


* 
**Downgraded to Name and Type Connascence:** By replacing the raw list with a `TargetContext` object, the code no longer cares about positional indices. `EmailService` accesses properties explicitly by their names (`context.user_id`).



---

### 🚀 How This Protects Your Codebase Long-Term

1. 
**Architectural Safety:** If a developer needs to add a third metadata parameter (e.g., `company_id`), they can append it anywhere in the dataclass structure without breaking existing index arrangements or parameter positions.


2. 
**Tooling and IDE Support:** Because the connascence is now static (Name and Type), your IDE can instantly alert you if you pass a string where an integer is expected, or safely rename fields across the entire repository in one sweep.


3. 
**True Maintainability:** This code successfully demonstrates Jim Weirich's legendary **Rule of Degree**: it converted a strong, brittle runtime trap into a weak, manageable design-time contract.



Next time you look at a code review, don't just look at whether it works. Ask yourself: *What level of connascence am I introducing into this architecture?*
