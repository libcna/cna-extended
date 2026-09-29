const documentationPages = [
  { label: "Start here", items: [
    ["01", "Overview", "index.html"],
    ["02", "Getting started", "getting-started.html"],
    ["03", "Architecture & conventions", "architecture.html"],
    ["04", "Screens & transitions", "screens.html"]
  ]},
  { label: "2D toolkit", items: [
    ["05", "Foundation, input & collision", "foundation.html"],
    ["06", "Graphics & animation", "graphics.html"],
    ["07", "Tilemaps", "tilemaps.html"],
    ["08", "Particles", "particles.html"],
    ["09", "Entity component system", "ecs.html"]
  ]},
  { label: "3D & reference", items: [
    ["10", "World3DEXT", "world3d.html", "world"],
    ["11", "Assets & serialization", "assets.html"],
    ["12", "Build & testing", "build.html"],
    ["13", "API catalogue", "api.html"],
    ["API", "Full generated reference ↗", "reference/html/index.html"]
  ]}
];

function currentFile() {
  const filename = window.location.pathname.split("/").pop();
  return filename || "index.html";
}

function renderChrome() {
  const header = document.querySelector("#site-header");
  const sidebar = document.querySelector("#site-sidebar");
  if (!header || !sidebar) return;
  const current = currentFile();
  header.innerHTML = `
    <a class="skip-link" href="#content">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="index.html" aria-label="cna-extended documentation home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span><strong>cna</strong><em>extended</em></span>
      </a>
      <div class="header-meta"><i></i><b>C++23 developer documentation</b></div>
      <button class="menu-button" type="button" aria-label="Open documentation navigation" aria-expanded="false"><span></span><span></span><span></span></button>
    </header>`;
  sidebar.innerHTML = documentationPages.map(section => `
    <p class="nav-label">${section.label}</p>
    ${section.items.map(([number, label, href, extra = ""]) => `<a class="nav-link ${current === href ? "active" : ""} ${extra}" href="${href}"><span>${number}</span>${label}</a>`).join("")}
  `).join("") + `<div class="sidebar-status"><strong>Source-backed guide</strong><p>Based on the public headers, examples, CMake configuration and handoff documents in <code>../cna-extended</code>.</p></div>`;
  const menuButton = header.querySelector(".menu-button");
  menuButton.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  sidebar.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}

function renderFooter() {
  const footer = document.querySelector("#site-footer");
  if (!footer) return;
  footer.innerHTML = `<footer class="page-footer"><span>cna-extended · C++23 game-development toolkit</span><span><a href="api.html">API catalogue</a> · <a href="build.html">Build & testing</a> · MIT</span></footer>`;
}

function setupCopyButtons() {
  document.querySelectorAll(".copy-button").forEach(button => button.addEventListener("click", async () => {
    const pre = button.closest(".code-card, .terminal")?.querySelector("pre");
    if (!pre) return;
    try {
      await navigator.clipboard.writeText(pre.innerText);
      button.textContent = "Copied";
      button.classList.add("copied");
      window.setTimeout(() => { button.textContent = "Copy"; button.classList.remove("copied"); }, 1500);
    } catch {
      button.textContent = "Select manually";
    }
  }));
}

const apiEntries = [
  ["Foundation", "Math, geometry & transforms", "CNA/Extended/{Angle,RectangleF,CircleF,EllipseF,Line2D,Ray2,Transform,MathExtended}.hpp", "Vectors, colours, intervals, sizes, segments, rays, matrix helpers and Transform2/Transform3."],
  ["Foundation", "Bounding volumes", "CNA/Extended/{BoundingBox2D,BoundingCircle2D,BoundingCapsule2D,BoundingPolygon2D,OrientedBoundingBox2D}.hpp", "2D volumes used for overlap tests, containment and collision queries."],
  ["Foundation", "Shapes, triangulation & collections", "CNA/Extended/{Shapes,Triangulation,Collections}/*", "Polygon/polyline primitives, ear-clipping helpers, Bag, Deque, observable collections and object pools."],
  ["Foundation", "Useful game helpers", "CNA/Extended/{FastRandom,FramesPerSecondCounter,GameTimeExtensions,ColorHelper}.hpp", "Random values, FPS tracking, colour and framework helper types."],
  ["Collision & input", "Collision2D", "CNA/Extended/Collision2D.hpp", "Direct shape-vs-shape intersection, containment and minimum translation-vector results."],
  ["Collision & input", "CollisionWorld2D", "CNA/Extended/Collisions/CollisionWorld2D.hpp", "Layered actor world that coordinates broadphase candidates, narrowphase tests and pair queries."],
  ["Collision & input", "QuadTree & SpatialHash", "CNA/Extended/Collisions/{QuadTree,SpatialHash,Layer}.hpp", "Pluggable 2D broadphase structures and named collision layers."],
  ["Collision & input", "Input listeners", "CNA/Extended/Input/InputListeners/*", "Keyboard, mouse, gamepad and touch listener components, event args and settings."],
  ["Collision & input", "Extended input state", "CNA/Extended/Input/{KeyboardStateExtended,MouseStateExtended,KeyboardExtended,MouseExtended}.hpp", "Current/previous snapshots and pressed/released edge detection."],
  ["Collision & input", "Timers & tweening", "CNA/Extended/{Timers,Tweening}/*", "Countdown/continuous clocks and pointer-to-member tweens with easing functions."],
  ["Screens", "Screen stack", "CNA/Extended/Screens/{Screen,GameScreen,ScreenManager}.hpp", "Screen lifecycle and a stack manager for game flows."],
  ["Screens", "Transitions", "CNA/Extended/Screens/Transitions/*", "Fade, expand and base transition APIs."],
  ["Graphics 2D", "Atlas and regions", "CNA/Extended/Graphics/{Texture2DAtlas,Texture2DRegion,Texture2DRegionExtensions}.hpp", "Named regions of a texture for sprites, UI and packed assets."],
  ["Graphics 2D", "Sprites & animation", "CNA/Extended/Graphics/{Sprite,AnimatedSprite,SpriteSheet,*Animation*}.hpp", "Static and animated sprites, animation builders, flip flags and controllers."],
  ["Graphics 2D", "Drawing helpers & effects", "CNA/Extended/Graphics/{NinePatch,SpriteBatchExtensions,GraphicsDeviceExtensions,Effects/*}.hpp", "Nine-patch UI, SpriteBatch overloads and cna-compatible custom effects."],
  ["Graphics 2D", "Fonts & viewport adapters", "CNA/Extended/{BitmapFonts,ViewportAdapters,VectorDraw}/*", "AngelCode bitmap fonts, virtual resolution adapters and batched debug primitives."],
  ["Tilemaps", "Shared tilemap model", "CNA/Extended/Tilemaps/Tilemap*.hpp", "Maps, layers, object layers, tilesets, tiles, properties, map objects and world maps."],
  ["Tilemaps", "Tiled", "CNA/Extended/Tilemaps/Tiled/*", "TMX/Tiled parser, document representations, colour parser and data conversion."],
  ["Tilemaps", "LDtk & Ogmo", "CNA/Extended/Tilemaps/{LDtk,Ogmo}/*", "JSON parsers and converters for both map editors."],
  ["Tilemaps", "Renderers", "CNA/Extended/Tilemaps/Rendering/*", "SpriteBatch renderers and direct VertexBuffer/BasicEffect paths for maps and map worlds."],
  ["Particles 2D", "Effects and emitters", "CNA/Extended/Particles/{ParticleEffect,ParticleEmitter,ParticleBuffer,ParticleEffectSerializer}.hpp", "Runtime effect ownership, emitters, buffers, XML serialization and triggering."],
  ["Particles 2D", "Profiles, modifiers & interpolators", "CNA/Extended/Particles/{Profiles,Modifiers}/*", "Point/line/circle/ring/spray/box emission plus motion, fade, colour and container behaviour."],
  ["ECS", "World, entities & components", "CNA/Extended/ECS/{World,WorldBuilder,Entity,EntityManager,ComponentManager,ComponentMapper}.hpp", "Artemis-style ECS ownership, lightweight entity handles and component storage."],
  ["ECS", "Aspects and systems", "CNA/Extended/ECS/{Aspect,AspectBuilder,EntitySubscription,Systems/*}.hpp", "Filtering and base classes for update, draw and entity-processing systems."],
  ["Content", "Direct-format loaders", "CNA/Extended/Content/{TexturePacker,BitmapFonts,ContentManagerExtensions,ExternalResourceResolvers}/*", "TexturePacker JSON, BMFont files and external-resource resolution without XNB."],
  ["Content", "Serialization", "CNA/Extended/Serialization/{Json,Xml}/*", "JSON converters/loaders and XML reader, writer and node helpers."],
  ["World3DEXT", "World screen and camera", "CNA/Extended/World3DEXT/{World3DScreenEXT,Camera3DEXT}.hpp", "A 3D Screen owning its ECS World and perspective camera."],
  ["World3DEXT", "Transforms, models & skinning", "CNA/Extended/World3DEXT/{Transform3ComponentEXT,TransformHierarchySystemEXT,ModelComponentEXT,SkinnedModelComponentEXT,RenderSystem3DEXT,AnimationSystem3DEXT}.hpp", "ECS hierarchy bridge, frustum-culling model rendering and skinned animation."],
  ["World3DEXT", "3D visual helpers", "CNA/Extended/World3DEXT/{CubeMesh*,Billboard*,Text3DEXT,DebugDraw*}.hpp", "Cube meshes, billboard and animated-billboard systems, world text and debug lines."],
  ["World3DEXT", "3D collision", "CNA/Extended/World3DEXT/{CollisionWorld3DEXT,CollisionShape3DEXT,Layer3DEXT,SpatialHash3DEXT,Octree3DEXT}.hpp", "Layered 3D collision world with spatial hash default and optional recursive octree."],
  ["World3DEXT", "3D particles", "CNA/Extended/World3DEXT/{ParticleEffect3DEXT,ParticleEmitter3DEXT,Profile3DEXT,Modifier3DEXT,*Interpolator3DEXT}.hpp", "Plugin-based 3D particles with profiles, modifiers, interpolators and billboard drawing."],
  ["World3DEXT", "Voxel tilemaps", "CNA/Extended/World3DEXT/{Tilemap3DEXT,Tilemap3DFactoryEXT,TilemapRenderer3DEXT,TilemapChunkRenderer3DEXT}.hpp", "Sparse voxel grid, JSON/array factory, tile collision registration and chunk batching." ]
].map(([group, name, path, description]) => ({ group, name, path, description }));

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character]);
}

function setupApiCatalogue() {
  const search = document.querySelector("#api-search");
  const results = document.querySelector("#api-results");
  const info = document.querySelector("#results-info");
  const filterRow = document.querySelector("#api-filters");
  if (!search || !results || !info || !filterRow) return;
  const state = { query: "", group: "All" };
  const groups = ["All", ...new Set(apiEntries.map(entry => entry.group))];
  const renderFilters = () => {
    filterRow.innerHTML = groups.map(group => `<button class="filter-button ${state.group === group ? "active" : ""}" type="button" data-group="${group}">${group}</button>`).join("");
    filterRow.querySelectorAll("button").forEach(button => button.addEventListener("click", () => { state.group = button.dataset.group; renderFilters(); renderResults(); }));
  };
  const renderResults = () => {
    const needle = state.query.trim().toLowerCase();
    const entries = apiEntries.filter(entry => (state.group === "All" || entry.group === state.group) && (!needle || `${entry.group} ${entry.name} ${entry.path} ${entry.description}`.toLowerCase().includes(needle)));
    info.textContent = `${entries.length} ${entries.length === 1 ? "result" : "results"} · ${state.group === "All" ? "all modules" : state.group}`;
    results.innerHTML = entries.length ? entries.map(entry => `<article class="api-entry"><div class="api-entry-top"><h3>${escapeHtml(entry.name)}</h3><span class="api-tag">${escapeHtml(entry.group)}</span></div><p>${escapeHtml(entry.description)}</p><div class="api-entry-path">include/${escapeHtml(entry.path)}</div></article>`).join("") : `<div class="empty-results">No matching API group. Try a shorter feature or type name.</div>`;
  };
  search.addEventListener("input", event => { state.query = event.target.value; renderResults(); });
  document.querySelector("#clear-search")?.addEventListener("click", () => { search.value = ""; state.query = ""; search.focus(); renderResults(); });
  renderFilters(); renderResults();
}

renderChrome();
renderFooter();
setupCopyButtons();
setupApiCatalogue();
