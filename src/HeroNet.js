// The woven net — ported from Homepage-html/Main.dc.html (initNet / pointerToPlane / destroyNet).
import * as THREE from 'three';

const VS = `
attribute float aSeed; uniform float uTime; uniform vec2 uMouse; uniform float uStrength; uniform vec3 uRipple; uniform float uPx;
varying float vGlow; varying float vFade;
void main(){
  vec3 p = position; float t = uTime;
  float w = sin(p.x*0.32 + t*0.55)*0.32 + sin(p.y*0.48 - t*0.42 + p.x*0.14)*0.26 + sin((p.x+p.y)*0.9 + t*0.8 + aSeed*6.2831)*0.045;
  vec2 d = p.xy - uMouse; float dist = length(d);
  float g = exp(-dist*dist/3.4) * uStrength;
  p.xy -= d * g * 0.22;
  float rt = t - uRipple.z; float rd = length(position.xy - uRipple.xy);
  float ring = rt > 0.0 ? exp(-pow(rd - rt*7.0, 2.0)*0.9) * exp(-rt*1.1) : 0.0;
  p.z += w + g*1.7 + ring*1.1;
  vGlow = clamp(g*1.25 + ring*0.9, 0.0, 1.0);
  float nx = (position.x + 15.0)/30.0; float ny = (position.y + 6.5)/13.0;
  vFade = mix(0.28, 1.0, smoothstep(0.18, 0.62, nx)) * smoothstep(0.0, 0.18, ny) * (1.0 - smoothstep(0.82, 1.0, ny)) * (1.0 - smoothstep(0.92, 1.0, nx)*0.7);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.4 + vGlow*4.0) * uPx * (14.0 / -mv.z);
}`;
const LINE_FS = 'uniform vec3 uColor; uniform vec3 uBase; varying float vGlow; varying float vFade; void main(){ gl_FragColor = vec4(mix(uBase, uColor, vGlow), (0.16 + vGlow*0.7) * vFade); }';
const PT_FS = 'uniform vec3 uColor; uniform vec3 uBase; varying float vGlow; varying float vFade; void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); if (d > 0.5) discard; float a = smoothstep(0.5, 0.35, d); gl_FragColor = vec4(mix(uBase, uColor, vGlow), a * (0.25 + vGlow*0.75) * vFade); }';

// Returns null when WebGL is unavailable (caller shows the SVG fallback).
export function createNet(canvas, heroEl, { accent = '#1B4DFF', reduce = false } = {}) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' }); }
  catch { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0xffffff, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, -4.2, 15);
  camera.lookAt(0, 0.4, 0);

  const cols = 104, rows = 44, W = 30, H = 13, n = cols * rows;
  const pos = new Float32Array(n * 3), seed = new Float32Array(n);
  const dx = W / (cols - 1), dy = H / (rows - 1);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c;
    pos[i * 3] = -W / 2 + (c + (r % 2) * 0.5) * dx;
    pos[i * 3 + 1] = -H / 2 + r * dy;
    seed[i] = Math.random();
  }
  const idx = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c;
    if (c < cols - 1) idx.push(i, i + 1);
    if (r < rows - 1) {
      if (r % 2 === 0) { if (c > 0) idx.push(i, i + cols - 1); idx.push(i, i + cols); }
      else { idx.push(i, i + cols); if (c < cols - 1) idx.push(i, i + cols + 1); }
    }
  }
  const pAttr = new THREE.BufferAttribute(pos, 3), sAttr = new THREE.BufferAttribute(seed, 1);
  const lg = new THREE.BufferGeometry(); lg.setAttribute('position', pAttr); lg.setAttribute('aSeed', sAttr); lg.setIndex(idx);
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', pAttr); pg.setAttribute('aSeed', sAttr);

  const u = {
    uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(99, 99) }, uStrength: { value: 0 },
    uRipple: { value: new THREE.Vector3(0, 0, -100) },
    uColor: { value: new THREE.Color(accent) }, uBase: { value: new THREE.Color('#A9B3C8') },
    uPx: { value: renderer.getPixelRatio() }
  };
  const lm = new THREE.ShaderMaterial({ uniforms: u, vertexShader: VS, fragmentShader: LINE_FS, transparent: true, depthWrite: false });
  const pm = new THREE.ShaderMaterial({ uniforms: u, vertexShader: VS, fragmentShader: PT_FS, transparent: true, depthWrite: false });
  const group = new THREE.Group();
  group.add(new THREE.LineSegments(lg, lm), new THREE.Points(pg, pm));
  group.rotation.z = -0.08;
  scene.add(group);

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0 };
  const render = () => renderer.render(scene, camera);

  const ro = new ResizeObserver(() => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    if (reduce) render();
  });
  ro.observe(canvas);

  let visible = true, loopId = 0;
  const vio = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
  vio.observe(heroEl);

  const timer = new THREE.Timer();
  if (reduce) { u.uTime.value = 4.0; render(); }
  else {
    const loop = (ts) => {
      loopId = requestAnimationFrame(loop);
      timer.update(ts);
      if (!visible || document.hidden) return;
      const dt = Math.min(timer.getDelta(), 0.05);
      u.uTime.value += dt;
      const k = 1 - Math.pow(0.001, dt);
      mouse.x += (mouse.tx - mouse.x) * k; mouse.y += (mouse.ty - mouse.y) * k; mouse.s += (mouse.ts - mouse.s) * (1 - Math.pow(0.02, dt));
      u.uMouse.value.set(mouse.x, mouse.y); u.uStrength.value = mouse.s;
      render();
    };
    loopId = requestAnimationFrame(loop);
  }

  const toPlane = (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    if (!ray.ray.intersectPlane(plane, hit)) return null;
    const a = -group.rotation.z, c = Math.cos(a), s = Math.sin(a);
    return { x: hit.x * c - hit.y * s, y: hit.x * s + hit.y * c };
  };

  return {
    move(e) { const p = toPlane(e); if (p) { mouse.tx = p.x; mouse.ty = p.y; mouse.ts = 1; } },
    leave() { mouse.ts = 0; },
    down(e) {
      if (e.target.closest && e.target.closest('a,button')) return;
      const p = toPlane(e); if (p) u.uRipple.value.set(p.x, p.y, u.uTime.value);
    },
    destroy() {
      cancelAnimationFrame(loopId); ro.disconnect(); vio.disconnect();
      [lg, pg, lm, pm].forEach((d) => d.dispose());
      renderer.dispose();
    }
  };
}
