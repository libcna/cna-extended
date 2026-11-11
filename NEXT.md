# Current maintainer status

Updated 2026-11-11. This is the short handoff for ongoing C++ maintenance.
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

- `cna`: `4ef67873b252bb07bcb270011ae7bc5a55aac105` (published `next`, C ABI
  0.60.0). Its stock effects latch their parameters at `EffectPass.Apply`, as
  XNA's do; every renderer here assigns the effect's properties before
  `Apply`, so nothing needed to change.
- `sharp-runtime`: `f8ea4b1f781fffab887d55966949395ae6e1b5ab` (published
  `next`).
- Linked build: C++23, CNA `SOFTWARE` renderer, `HEADLESS` platform, `NULL`
  audio, `CNA_ENABLE_SDL=OFF`, `CNA_ENABLE_VIDEO=OFF`; zero compiler warnings.
  CNA runs its SDL-coupling audit only as the top-level project (since
  `1c75052a5`); at `cf5e0c1ae` a budget overrun in it stopped every consumer
  configure, so do not pin that revision.
- CTest: 2372 registered, 2372 passed, none skipped (also through ccache with
  a base directory).
- `cna_extended_minimal`, `cna_extended_tiled_demo` and
  `cna_extended_world3d_demo`: all completed headlessly; the demos saved
  nonempty PNG frames. The tiled demo finds its assets through an absolute
  path, so it runs from any working directory.
- Version 0.2.0: an installed CMake package (`find_package(CnaExtended 0.2)`,
  README "Installed package"); `tools/check_package.sh` built and ran a
  consumer of it against the revisions above.
- Website: Doxygen generated `web/reference/html/index.html` from the public
  headers.

CI pins the `cna` and `sharp-runtime` revisions above. Update the baseline and
CI refs together when promoting newer revisions. Current constraints are
documented in [docs/known-issues.md](docs/known-issues.md).

## Reproduce locally

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug -DCNA_ENABLE_SDL=OFF -DCNA_ENABLE_VIDEO=OFF
cmake --build build --parallel 2
ctest --test-dir build -j2 --output-on-failure
```

The linked build also produces `cna_extended_minimal`,
`cna_extended_tiled_demo`, `cna_extended_world3d_demo`, and
`CnaExtendedTests`. The public library target is `CNA::Extended`.
