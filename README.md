# cna-extended

`cna-extended` is a C++23 static library that ports the runtime parts of
[MonoGame.Extended](https://github.com/craftworkgames/MonoGame.Extended) to
[`cna`](../cna) and [`sharp-runtime`](../sharp-runtime). It includes 2D math,
collision, input, tweening, screens, sprites, bitmap fonts, tilemaps, particles,
and ECS. `World3DEXT` adds a separate 3D scene layer. MGCB tooling and XNB-only
readers are outside the library's scope.

The original port plans are complete. This repository is now maintained as a C++
library; new work is driven by concrete issues and consumers, not by the old
phase checklists. See [current status](NEXT.md), [known limitations](docs/known-issues.md),
and the [historical plans](docs/history/README.md).

## Build and test

Check out `cna-extended`, `cna`, and `sharp-runtime` as siblings. The verified
standalone configuration uses CNA's software renderer, headless platform, and
null audio backend:

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug -DCNA_ENABLE_SDL=OFF -DCNA_ENABLE_VIDEO=OFF
cmake --build build --parallel 2
ctest --test-dir build -j2 --output-on-failure
```

The linked build produces the `CNA::Extended` library alias, examples, and the
`CnaExtendedTests` GoogleTest binary. Applications may select a different CNA
renderer, platform, and audio backend through
`CNA_EXTENDED_CNA_RENDERER`, `CNA_EXTENDED_CNA_PLATFORM`, and
`CNA_EXTENDED_CNA_AUDIO_PLATFORM`. `CNA_EXTENDED_CNA_DIR` and
`CNA_EXTENDED_SHARP_RUNTIME_DIR` override the sibling checkout paths.

### Installed package

A top-level build also installs the library, its headers and a CMake package
(`CNA_EXTENDED_INSTALL`, on by default when cna-extended is the top-level
project):

```sh
cmake --install build --prefix /path/to/prefix
```

A consumer then calls `find_package(CnaExtended 0.2 CONFIG REQUIRED)` and links
`CNA::Extended`. CNA and Sharp Runtime install no package yet, so the consumer
first adds CNA's source tree (`add_subdirectory`), selecting at least the Sharp
Runtime components listed in `CnaExtended_SHARP_RUNTIME_COMPONENTS`; the package
attaches its CNA and Sharp Runtime dependencies to those targets and names any
that are missing. The version file accepts the same minor version only (0.x).
`tools/check_package.sh <build> <cna> <sharp-runtime>` installs a linked build
into `build-consumer/install` and builds and runs such a consumer
(`tools/package_check/`).

The local and published dependency revisions and test results are recorded in
[NEXT.md](NEXT.md). CI pins the published revisions so changes in either
dependency do not silently change the result.

## Where to start

- [Contributing](CONTRIBUTING.md): setup, tests, conventions, and review checklist.
- [Architecture](docs/architecture.md): module map, dependencies, ownership, and render testing.
- [Known limitations](docs/known-issues.md): active constraints and the two skipped tests.
- [Examples](examples/): minimal link, 2D tilemap, and 3D scene integrations.
- [API catalogue](web/api.html): curated entry points to the public headers.

Public headers live under `include/CNA/Extended/`; implementation and tests mirror
that layout in `src/` and `tests/`. Prefer a module header over the umbrella
`<CNA/Extended.hpp>` in application code.

## API reference

The website's full reference is generated from public headers; generated HTML is
not versioned. To preview the complete site locally:

```sh
cd web
doxygen Doxyfile.reference
python3 -m http.server 8000
```

Open `http://localhost:8000/`. CI builds the same output and publishes it to
GitHub Pages on pushes to `develop`. The standalone Doxygen configuration in
the repository root writes to ignored `docs/generated/`.

## License

MIT. See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md) for upstream attribution.
