---
trigger: always_on
---

# AI Coding Agent Rules & Guidelines

This document defines how an AI coding agent should operate within this multi-vendor marketplace repository (comprising `Backend` and `Frontend`).

## Core Principle
- Prefer targeted investigation over broad repository analysis.
- Read only what is necessary for the current task.

## Repository Exploration
- Do not scan the entire repository by default.
- Start with the user's mentioned file, feature, function, component, route, or keyword.
- Use search to locate relevant code before opening files.
- Follow imports, references, callers, and dependencies only when required.
- Do not inspect unrelated folders or modules (e.g., do not inspect `Frontend` when working on `Backend` routes unless explicitly requested).

## Task Execution
- First identify the smallest relevant scope.
- Understand the existing implementation before changing it.
- Modify only files necessary for the requested task.
- Avoid unrelated refactoring, formatting, renaming, or cleanup.
- Do not rewrite working code without a reason.

## Context Management
- Reuse information already established during the current task.
- Do not repeatedly reread the same files unless they changed.
- Prefer specific functions, classes, or sections instead of entire files when possible.
- Do not load large documentation or configuration files unless directly relevant.

## Change Validation
- After making a change, validate the affected area first.
- Run the smallest relevant test, typecheck, lint, or build command (e.g., `node --check` or specific targeted tests).
- Do not perform a full-project validation unless the change actually requires it.
- If validation fails, investigate the error's relevant dependency chain rather than rescanning the project.

## When Broader Analysis Is Allowed
Broader repository analysis is allowed only when:
- The requested change genuinely crosses multiple modules.
- The architecture or dependency relationship is unclear.
- A bug cannot be understood from the local scope.
- A build or test error requires broader investigation.
- The user explicitly asks for a full-project analysis.

## Implementation Documentation
- Maintain implementation knowledge separately from these rules.
- If an `Implementation.md` exists in `Docs/`, use it as a high-level implementation map before exploring the repository.
- Do not treat `Implementation.md` as a reason to read unrelated source files.
- Update implementation documentation only when architecture, feature flow, important file relationships, or implementation status changes.

## Decision Making
- Before reading a file, ask: *"Is this file necessary to complete the current task?"* If not, do not read it.
- When uncertain, search for references/usages first.

## Communication
- Keep analysis focused on the requested task.
- Do not provide unnecessary explanations of unrelated code.
- If additional investigation is required, explain briefly why it is required.

## Priority Order
1. Correctness
2. User's requested scope
3. Minimal necessary context
4. Minimal necessary changes
5. Targeted validation
6. Speed
