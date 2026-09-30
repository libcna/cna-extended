# Architecture for maintainers

`cna-extended` is a static C++23 library with the public target
`CNA::Extended`. `CMakeLists.txt` discovers sources and tests recursively.
Public API paths under `include/CNA/Extended/` mirror namespaces and the
implementation tree under `src/CNA/Extended/`. Tests mirror the same module
names under `tests/CNA/Extended/`.

## Dependency layers

| Layer | Main directories | Role |
| --- | --- | --- |
| Foundation | `Math`, `Collections`, shape headers in `include/CNA/Extended/` | Values, geometry, transforms, and helper containers |
| Gameplay | `Collisions`, `Input`, `Timers`, `Tweening`, `ECS`, `Screens` | Frame updates, entities, spatial queries, and screen flow |
| Assets and 2D rendering | `Content`, `Serialization`, `Graphics`, `BitmapFonts`, `Tilemaps`, `Particles`, `VectorDraw` | Direct-format loading, SpriteBatch or vertex-buffer rendering |
| 3D extension | `World3DEXT` | Camera, hierarchy, models, billboards, collisions, particles, and voxel maps |

The lower runtime is `cna` (XNA-style graphics, input, and content types) plus
`sharp-runtime` (the required `System::*` types). The CMake target links only
the CNA and Sharp Runtime modules listed in `CMakeLists.txt`. A standalone
build adds the sibling checkouts; a parent build may provide CNA targets first.
`World3DEXT` is an addition to the port and has no direct MonoGame.Extended
counterpart.

## Ownership and lifetime

- A raw pointer to `GraphicsDevice` or `Texture2D` usually means the caller owns
  that resource. Check the specific header before storing or moving it.
- `Texture2DRegion` is shared because atlases, sprites, and font glyphs may all
  refer to one region. `BitmapFont` owns loaded page textures while glyph
  regions refer to them.
- ECS systems are owned by `ECS::World`; attached components can be non-owning.
  A component passed to `Entity::Attach` must outlive its attachment.
- `ScreenManager` controls screen transitions. `World3DScreenEXT` adds a world
  and camera to that existing screen lifecycle.

## Rendering and tests

Tilemaps have two rendering paths: `TilemapSpriteBatchRenderer` uses a
`SpriteBatch`; `TilemapRenderer` uses vertex buffers and `BasicEffect`. Choose
one per use case and compare behavior through the integration tests under
`tests/CNA/Extended/Tilemaps/Rendering/`.

Offscreen rendering uses a `RenderTarget2D`: bind, draw, unbind to resolve,
then read its own pixels with `RenderTarget2D::GetData`. CNA's
`GraphicsDevice::GetBackBufferData` reads the backbuffer only and rejects a
read while a render target is active. Select the HiDef graphics profile for
pixel readback tests. A 3D scene with overlapping objects also needs a depth
format and a depth clear; a color-only target tests submission order instead
of depth behavior.

## Source landmarks

- `examples/tiled_demo/` composes map loading, animation, input, camera, and rendering.
- `examples/world3d_demo/` composes the 3D systems and exercises depth handling.
- `tests/CNA/Extended/Tilemaps/Rendering/TilemapIntegrationTests.cpp` is the
  reference for 2D pixel assertions.
- `plan.md`, `plan3d.md`, `3d.md`, and `audit.md` preserve design and audit
  history; [history index](history/README.md) explains their status.
