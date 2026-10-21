/* Real 3D qızılı üzüklər — three.js (WebGL). Alınmasa, səhifədəki CSS üzüklər qalır. */
import * as THREE from "three";
import { RoomEnvironment } from "./vendor/RoomEnvironment.js";

export function mountRings(box) {
  const test = document.createElement("canvas");
  if (!(test.getContext("webgl2") || test.getContext("webgl"))) return false;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = "rings-canvas";

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0.15, 6.2);
  camera.lookAt(0, 0, 0);

  const key = new THREE.DirectionalLight(0xfff3dc, 2.2); key.position.set(2.5, 3, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffe2b0, 1.2); rim.position.set(-3, -1, -2); scene.add(rim);

  // Üzük: bir az yastı kəsikli torus (rahat "comfort fit" forması)
  const ringGeo = (R, tube) => {
    const g = new THREE.TorusGeometry(R, tube, 64, 220);
    const p = g.attributes.position, v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const r = Math.hypot(v.x, v.y), k = R / r;           // halqanın mərkəz xəttinə proyeksiya
      const cx = v.x * k, cy = v.y * k;
      const dx = v.x - cx, dy = v.y - cy;                   // radial ofset
      p.setXYZ(i, cx + dx * 0.78, cy + dy * 0.78, v.z * 1.25); // içə-çölə incə, eninə enli
    }
    g.computeVertexNormals();
    return g;
  };

  const gold = new THREE.MeshPhysicalMaterial({ color: 0xE8B04A, metalness: 1, roughness: 0.16, clearcoat: 0.4, clearcoatRoughness: 0.12, envMapIntensity: 1.35 });
  const pale = new THREE.MeshPhysicalMaterial({ color: 0xF3DC9C, metalness: 1, roughness: 0.14, clearcoat: 0.5, clearcoatRoughness: 0.1, envMapIntensity: 1.4 });

  const r1 = new THREE.Group(), r2 = new THREE.Group();
  r1.add(new THREE.Mesh(ringGeo(0.78, 0.1), gold));
  r2.add(new THREE.Mesh(ringGeo(0.7, 0.085), pale));

  // Brilyant + yuva
  const diamondMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0, transmission: 1, ior: 2.4, thickness: 0.3,
    envMapIntensity: 3.2, specularIntensity: 1, clearcoat: 1, iridescence: 0.25, attenuationColor: 0xf2f6ff });
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.13, 0.06, 16), diamondMat);
  const pav = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.13, 16), diamondMat);
  pav.rotation.x = Math.PI; pav.position.y = -0.095;
  const stone = new THREE.Group(); stone.add(crown, pav);
  stone.position.set(0, 0.7 + 0.085 + 0.1, 0);
  const setting = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.05, 0.07, 16), pale);
  setting.position.set(0, 0.7 + 0.085 + 0.02, 0);
  for (let i = 0; i < 4; i++) {
    const prong = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, 0.14, 8), pale);
    const a = i * Math.PI / 2 + Math.PI / 4;
    prong.position.set(Math.cos(a) * 0.11, 0.7 + 0.085 + 0.07, Math.sin(a) * 0.11);
    r2.add(prong);
  }
  r2.add(setting, stone);

  r1.position.set(-0.55, -0.02, 0);
  r2.position.set(0.58, -0.06, 0.05);
  scene.add(r1, r2);

  box.appendChild(renderer.domElement);
  const resize = () => {
    const w = box.clientWidth || 300, h = box.clientHeight || 190;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  resize();
  new ResizeObserver(resize).observe(box);

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visible = true, t0 = performance.now();
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(box);

  function frame(now) {
    const t = still ? 2.2 : (now - t0) / 1000;
    r1.rotation.set(0.12 + Math.sin(t * 0.7) * 0.06, t * 0.55 + 0.6, -0.12);
    r2.rotation.set(-0.05 + Math.cos(t * 0.6) * 0.05, -t * 0.45 - 0.5, 0.1);
    stone.rotation.y = t * 0.8;
    renderer.render(scene, camera);
  }
  frame(performance.now());
  if (!still) renderer.setAnimationLoop(now => { if (visible) frame(now); });
  return true;
}
