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

- `cna`: `08c1387eca7f9707d6180ff57d07f0360e059672` (published `next`, the
  revision cna-engine pins since 2026-10-22). Since CNA `5ab1c7729`
  `BoundingFrustum::Contains(Vector3)` matches XNA for points on a plane, so
  the two orthographic-camera containment tests run.
- `sharp-runtime`: `1dc8785b35284b5cf50f3aec361703bfaf090b72` (published
  `next`; CNA's video module needs its Uri members since CNA `abbd8a4ea`).
- Linked build: C++23, CNA `SOFTWARE` renderer, `HEADLESS` platform, `NULL`
  audio, `CNA_ENABLE_SDL=OFF`, `CNA_ENABLE_VIDEO=OFF`; zero compiler warnings.
- CTest: 2372 registered, 2372 passed, none skipped (also through ccache with
  a base directory: the bitmap-font fixtures no longer depend on `__FILE__`);
  also against CNA `900d0db3b` with Sharp Runtime `f2aecfef`.
- `cna_extended_minimal`, `cna_extended_tiled_demo` (run from the build
  directory: its asset path is relative to it) and
  `cna_extended_world3d_demo`: all completed headlessly; the demos saved
  nonempty PNG frames.
- Version 0.2.0: an installed CMake package (`find_package(CnaExtended 0.2)`,
  README "Installed package"); `tools/check_package.sh` built and ran a
  consumer of it against the revisions above.
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
