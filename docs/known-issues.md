# Known limitations

This page lists current constraints that affect maintenance. The last verified
dependency revisions and test counts are in [NEXT.md](../NEXT.md).

- Two `OrthographicCameraTests` are deliberately skipped. CNA's
  `BoundingFrustum::Contains` classifies a point exactly on a clipping plane
  as `Intersects`; those tests expect the upstream `Contains` result. See the
  skip comments in `tests/CNA/Extended/OrthographicCameraTests.cpp`.
- `World3DEXT` is a separate extension and does not replace every `easy-3d`
  feature. In particular, it lacks a general CPU-side static batching API
  for arbitrary cube and billboard scenes. The historical comparison is in
  [issues.md](../issues.md). Its chunked voxel tilemap renderer addresses a
  narrower case.
- `System::Xml::XmlNode::SelectSingleNode` in `sharp-runtime` returns a node
  owned by the document despite an ownership comment that says otherwise.
  `BitmapFontFileReader` treats the returned pointer as non-owning. Check the
  current dependency implementation before changing that code.
- CNA's classic `Texture2D::FromStream` accepts PNG, JPEG, and GIF. It rejects
  BMP even though its internal image decoder can parse BMP. Tilemap assets
  loaded through this public API should use one of the accepted formats; the
  tiled demo uses losslessly converted PNG assets.

The old [MISSING.md](../MISSING.md) account of render-target readback was
corrected for current CNA. The current readback contract is documented in
[architecture.md](architecture.md).
