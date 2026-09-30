# Contributing to cna-extended

This is a C++23 library maintained alongside `cna` and `sharp-runtime`. Start
with the [README](README.md), [architecture](docs/architecture.md), and
[current status](NEXT.md). The completed port plans in `plan.md` and `plan3d.md`
are historical design records, not a task queue.

## Local setup

Use sibling checkouts named `cna-extended/`, `cna/`, and `sharp-runtime/`.
You need CMake 3.20+, a C++23 compiler, and the GoogleTest submodule. Run
`git submodule update --init vendor/googletest` after cloning if needed.

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug -DCNA_ENABLE_SDL=OFF -DCNA_ENABLE_VIDEO=OFF
cmake --build build --parallel 2
ctest --test-dir build -j2 --output-on-failure
```

The linked configuration above runs render tests without a window or SDL.
To change the CNA renderer, platform, or audio backend, configure a separate
build using the corresponding `CNA_EXTENDED_CNA_*` variables described in the
[README](README.md). The `CNA_EXTENDED_LINK_CNA=OFF` mode only compile-checks
the library and cannot validate rendering behavior.

## Making a change

1. Find the public header in `include/CNA/Extended/` and its matching source
   under `src/CNA/Extended/`. Keep the namespace and path aligned.
2. For a behavior change, update a focused test under `tests/CNA/Extended/`.
   Rendering code needs a real `GraphicsDevice` test when pixels or GPU resource
   state matter. Use a depth-enabled render target for multi-object 3D scenes.
3. Build with warnings as errors and run the relevant CTest filter, then the
   full suite. If a test is skipped, document why; do not count skips as passes.
4. Update the public documentation when usage, ownership, build options, or
   limitations change. Keep `NEXT.md` short and factual.

Existing code follows `getXProperty()` / `setXProperty()` for ported C#
properties. Externally owned CNA graphics objects are commonly held through
non-owning pointers; inspect the owning type before changing their lifetime.
Source files carry SPDX and upstream attribution comments. Preserve those
comments when editing ported code.

Use `cna` and `sharp-runtime` headers and implementations as the source of truth
for their APIs. Report a dependency defect with a small reproducer and its
revision; do not hide it with an undocumented workaround in this library.
Avoid adding MGCB or XNB-only reader classes: direct Tiled, LDtk, Ogmo,
TexturePacker, and BMFont formats cover the intended runtime use cases.

## Dependency updates

CI checks out the revisions listed in [NEXT.md](NEXT.md). To update them,
verify a linked build and the complete test suite against both candidate
revisions, update `.github/workflows/ci.yml` and `NEXT.md` together, and state
any changed behavior. The repository itself does not own or modify the sibling
checkouts.

## Documentation website

Edit the source pages in `web/`, not `web/reference/`. From `web/`, run
`doxygen Doxyfile.reference` to generate the reference locally, then serve the
directory with `python3 -m http.server 8000`. The generated tree is ignored by
Git. The Pages workflow generates and publishes it from `develop`.
The repository's GitHub Pages source must be set to **GitHub Actions** for the
deployment job to succeed.
