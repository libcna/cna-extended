# Current maintainer status

Updated 2026-09-30. This is the short handoff for ongoing C++ maintenance.
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

- Local `cna`: `8dc7a7b9945693b7f83a89e8f5e868caac5f9125`
- CI `cna`: `c40d00823fbb39bad4e8a5d998715b492904793f` (published).
  The local revision is not yet available on GitHub; its only production
  change since the CI revision is `Game::Tick` exit handling. The full linked
  build and 2371-case suite also passed against `c40d00823` before this
  maintainer handoff.
- `sharp-runtime`: `88f6b11fbb8b9d1db1b9451e86f8835e1c9cafaa`
- Linked build: C++23, CNA `SOFTWARE` renderer, `HEADLESS` platform, `NULL`
  audio, `CNA_ENABLE_SDL=OFF`, `CNA_ENABLE_VIDEO=OFF`; zero compiler warnings.
- CTest: 2371 registered; 2369 passed, 2 deliberately skipped, 0 failed.
- `cna_extended_tiled_demo` and `cna_extended_world3d_demo`: both completed
  headlessly and saved nonempty PNG frames. The tiled demo's source images are
  PNG because CNA's public `Texture2D::FromStream` rejects BMP by design.
- Website: Doxygen generated `web/reference/html/index.html` from the public
  headers, and all source-page local links resolved.

CI pins the published revisions above. Update this section and the CI refs
together after testing newer revisions. The two skips and other current
constraints are documented in [docs/known-issues.md](docs/known-issues.md).

## Reproduce locally

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug -DCNA_ENABLE_SDL=OFF -DCNA_ENABLE_VIDEO=OFF
cmake --build build --parallel 2
ctest --test-dir build -j2 --output-on-failure
```

The linked build also produces `cna_extended_minimal`,
`cna_extended_tiled_demo`, `cna_extended_world3d_demo`, and
`CnaExtendedTests`. The public library target is `CNA::Extended`.
