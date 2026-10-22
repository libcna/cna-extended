# Current maintainer status

Updated 2026-10-22. This is the short handoff for ongoing C++ maintenance.
The previous detailed session record is archived in
[docs/history/NEXT-2026-09-30.md](docs/history/NEXT-2026-09-30.md).

## Project state

The MonoGame.Extended runtime port and the additional `World3DEXT` phases are
complete. New work should come from a concrete bug, consumer need, or reviewed
feature proposal. Start with [README.md](README.md),
[CONTRIBUTING.md](CONTRIBUTING.md), and
[docs/architecture.md](docs/architecture.md). Historical scope decisions remain
in `plan.md`, `plan3d.md`, and `3d.md`.

## Verified dependencies and result

- `cna`: `900d0db3b52d76d3115ebda0a0e04a25fefad1a5` (published; the
  revision cna-engine pins). It contains CNA `5ab1c7729`, which made
  `BoundingFrustum::Contains(Vector3)` match XNA for points on a plane, so the
  two orthographic-camera containment tests run again.
- `sharp-runtime`: `f2aecfefeac171b331787e5cdc4849507363ef0e` (published).
- Linked build: C++23, CNA `SOFTWARE` renderer, `HEADLESS` platform, `NULL`
  audio, `CNA_ENABLE_SDL=OFF`, `CNA_ENABLE_VIDEO=OFF`; zero compiler warnings.
- CTest: 2371 registered, 2371 passed, none skipped (also through ccache with
  a base directory: the bitmap-font fixtures no longer depend on `__FILE__`).
- `cna_extended_minimal`, `cna_extended_tiled_demo` (run from the build
  directory: its asset path is relative to it) and
  `cna_extended_world3d_demo`: all completed headlessly; the demos saved
  nonempty PNG frames.
- Website: Doxygen generated `web/reference/html/index.html` from the public
  headers, and all source-page local links resolved (2026-09-30).

CI pins the published revisions above. Update this section and the CI refs
together after testing newer revisions. Current constraints are documented in
[docs/known-issues.md](docs/known-issues.md).

## Reproduce locally

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug -DCNA_ENABLE_SDL=OFF -DCNA_ENABLE_VIDEO=OFF
cmake --build build --parallel 2
ctest --test-dir build -j2 --output-on-failure
```

The linked build also produces `cna_extended_minimal`,
`cna_extended_tiled_demo`, `cna_extended_world3d_demo`, and
`CnaExtendedTests`. The public library target is `CNA::Extended`.
