# CNA API differences encountered by cna-extended

This file formerly described `RenderTarget2D::GetData` as unable to read rendered
pixels and suggested calling `GraphicsDevice::GetBackBufferData` while the target
was bound. That description is obsolete for the current modular `cna`.

At the verified CNA revision in [NEXT.md](NEXT.md), `Texture2D::GetData` asks the
renderer for render-target color data. For an offscreen target, unbind it to
resolve the rendering, then call `renderTarget.GetData(...)`. CNA's
`GraphicsDevice::GetBackBufferData` reads the actual backbuffer and throws if a
render target is active. The current pattern is demonstrated by
`TilemapIntegrationTests.cpp` and the tiled demo. See
[docs/architecture.md](docs/architecture.md) for the render-test contract.

The two remaining skipped frustum tests and other active constraints are in
[docs/known-issues.md](docs/known-issues.md). The former detailed account is
preserved in Git history and the archived
[long handoff](docs/history/NEXT-2026-09-30.md) for provenance; do not use its
old readback recipe with current CNA.
