# Compliance Rules

This file contains the compliance and code quality rules for this repository.

## 1. All Python Source Files Must Import Future Annotations

**Objective:** Enable forward reference resolution and improve type checking performance by requiring `from __future__ import annotations` at the top of all Python files that use type hints

**Success Criteria:** Every Python file in src/ that contains type annotations includes `from __future__ import annotations` as the first import statement

**Failure Criteria:** Python files with type annotations lack the `from __future__ import annotations` import statement

---

## 2. Type-Only Imports Must Use TYPE_CHECKING Guards

**Objective:** Prevent circular import errors and reduce runtime overhead by requiring type-only imports to be placed within TYPE_CHECKING conditional blocks

**Success Criteria:** All imports used exclusively for type hints are placed within `if TYPE_CHECKING:` blocks, and the imported types are quoted in annotations

**Failure Criteria:** Type-only imports are imported at module level instead of within TYPE_CHECKING guards, or unquoted in annotations

---

## 3. Logger Instances Must Follow Standard Initialization Pattern

**Objective:** Ensure consistent logging configuration and type safety across the codebase by standardizing logger instantiation

**Success Criteria:** All logger instances are created using the pattern `logger: "logging.Logger" = get_logger("module_name")` where module_name describes the logger's scope

**Failure Criteria:** Loggers are instantiated using direct logging.getLogger() calls, or lack proper type annotations, or use inconsistent naming patterns

---

## 4. Secret Values Must Use Pydantic Secret Types

**Objective:** Prevent accidental exposure of sensitive data in logs, error messages, and API responses by requiring proper secret field typing

**Success Criteria:** All fields containing sensitive data (passwords, tokens, API keys, credentials) are typed as SecretStr, SecretBytes, or SecretDict from Pydantic

**Failure Criteria:** Sensitive credential fields are typed as plain str, bytes, or dict instead of using Pydantic's Secret types

---

## 5. FastAPI Router Endpoints Must Include Docstrings

**Objective:** Ensure API documentation is automatically generated and endpoints are self-documenting by requiring docstrings on all route handlers

**Success Criteria:** All functions decorated with @router.get, @router.post, @router.patch, @router.delete, etc. include docstrings describing the endpoint purpose and behavior

**Failure Criteria:** Route handler functions lack docstrings or have only placeholder/empty docstrings

---

## 6. Test Files Must Mirror Source Directory Structure

**Objective:** Maintain test organization and discoverability by ensuring test files follow the same directory hierarchy as the source code they test

**Success Criteria:** For every source file at src/prefect/module/file.py, a corresponding test file exists at tests/module/test_file.py with the same relative path structure

**Failure Criteria:** Test files are placed in incorrect directories that don't mirror the source structure, or use different naming conventions

---

## 7. Async Functions Must Have Sync Compatibility Wrappers Where Public

**Objective:** Provide user-friendly API that works in both async and sync contexts by ensuring public async functions offer sync compatibility

**Success Criteria:** Public async functions that are part of the user-facing API have corresponding sync wrappers using @sync_compatible or explicit sync versions

**Failure Criteria:** User-facing async functions lack sync compatibility wrappers, forcing users to always use asyncio.run() or similar

---

## 8. Pydantic Models Must Use model_validator for Cross-Field Validation

**Objective:** Ensure data integrity and proper validation sequencing by using Pydantic's model_validator decorator for validations that depend on multiple fields

**Success Criteria:** Validation logic that depends on multiple fields uses @model_validator decorator instead of individual field validators

**Failure Criteria:** Cross-field validation is implemented using individual field validators, causing order-dependent validation issues or accessing unvalidated fields

---

## 9. TypeScript Components Must Use Tab Indentation

**Objective:** Maintain consistent code formatting across the frontend codebase as enforced by Biome configuration

**Success Criteria:** All TypeScript and TSX files in ui-v2/ use tab characters for indentation as specified in biome.json

**Failure Criteria:** TypeScript files use spaces for indentation instead of tabs

---

## 10. React Component Test Files Must Be Co-Located

**Objective:** Improve test discoverability and maintenance by placing test files alongside the components they test

**Success Criteria:** For every React component file component.tsx, the test file component.test.tsx exists in the same directory

**Failure Criteria:** Test files are separated from component files in different directories, making them harder to find and maintain

---

## 11. TypeScript Must Enable Strict Type Checking

**Objective:** Catch type errors at compile time and ensure type safety throughout the frontend codebase

**Success Criteria:** TypeScript compiler is configured with strict mode enabled and no-emit flag for validation, as evidenced by validate:types script running tsc -b --noEmit

**Failure Criteria:** TypeScript strict mode is disabled or type checking is not part of the validation pipeline

---

## 12. Unused Imports Must Be Automatically Removed

**Objective:** Keep the codebase clean and reduce bundle size by eliminating unused imports via automated linting

**Success Criteria:** Biome and ESLint configurations enforce noUnusedImports as an error, and pre-commit hooks automatically remove unused imports

**Failure Criteria:** Unused imports remain in the codebase after linting, or the linter is not configured to detect them as errors

---

## 13. Pre-Commit Hooks Must Run Ruff for Python Code Quality

**Objective:** Enforce code quality standards and catch common issues before code is committed by running Ruff linter and formatter

**Success Criteria:** The .pre-commit-config.yaml includes ruff-check and ruff-format hooks that run automatically on Python files before commits

**Failure Criteria:** Pre-commit configuration lacks Ruff hooks, or they are configured to not block commits on failures

---

## 14. Database Session Management Must Use Context Managers

**Objective:** Ensure proper resource cleanup and transaction handling by requiring database sessions to be managed via async context managers

**Success Criteria:** All database operations use `async with db.session_context(begin_transaction=True) as session:` pattern for session management

**Failure Criteria:** Database sessions are created and managed manually without context managers, or transactions are not properly scoped

---

## 15. API Request Parameters Must Use Pydantic Schema Validation

**Objective:** Ensure data validation and automatic OpenAPI schema generation by using Pydantic models for all API request/response bodies

**Success Criteria:** FastAPI route handlers accept request bodies typed as Pydantic schema classes from prefect.server.schemas.actions or prefect.client.schemas

**Failure Criteria:** Route handlers accept raw dictionaries or unvalidated data structures instead of Pydantic models for request bodies

---
