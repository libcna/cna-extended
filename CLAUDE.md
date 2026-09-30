# Automated contributions to cna-extended

This file records repository-specific guidance for coding agents. The project
is now in ordinary C++ maintenance. Read `README.md`, `CONTRIBUTING.md`,
`docs/architecture.md`, and `NEXT.md` before changing behavior. The completed
plans in `plan.md` and `plan3d.md` are historical records, not current phase
instructions; see `docs/history/README.md`.

- Keep public headers, implementation, and tests in matching paths under
  `include/CNA/Extended/`, `src/CNA/Extended/`, and `tests/CNA/Extended/`.
- Preserve SPDX and upstream attribution comments on ported files. Use
  `CNA::Extended` namespaces and `getXProperty()` / `setXProperty()` accessors
  where they fit the existing API.
- Build with warnings as errors. Test behavior changes, especially rendering
  changes, against the linked CNA configuration and real `GraphicsDevice`.
- Use sibling `cna` and `sharp-runtime` APIs as they actually exist at the
  verified revisions in `NEXT.md`. Do not modify sibling repositories unless
  the user authorizes that work.
- Keep MGCB tooling and XNB-only readers out of this runtime library. Document
  any proposed scope change in a focused issue or design note.
- Update the concise maintainer status in `NEXT.md` when the verified dependency
  revisions, test counts, or active constraints change. Preserve historical
  decisions in Git rather than appending a session log.
