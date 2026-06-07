# AGENTS.md

## Project Instructions

- Work from the repository root.
- Read the existing project structure before making changes.
- Keep edits focused on the user request and avoid unrelated refactors.
- Do not overwrite user changes. If the worktree is dirty, preserve unrelated changes.
- Prefer existing project conventions over introducing new patterns.

## Development Workflow

- Use `rg` or `rg --files` for searching when available.
- Check the project manifest files before choosing commands.
- Run the narrowest relevant validation after changes, such as tests, type checks, linting, or a local build.
- If a command requires dependencies or network access, ask before installing or fetching anything.

## Code Style

- Keep code readable and idiomatic for the language already used in the file.
- Add comments only when they clarify non-obvious logic.
- Avoid broad abstractions unless they remove real duplication or match an existing local pattern.
- Keep generated or formatted output consistent with the repository’s tooling.

## Frontend Notes

- Match the existing UI style and component patterns.
- Make controls responsive and verify that text does not overflow on small screens.
- Prefer built-in or existing icon/component libraries when the project already uses them.

## Handoff

- Summarize changed files and the validation performed.
- Mention any validation that could not be run and why.
