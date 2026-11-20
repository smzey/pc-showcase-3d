import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { PartId } from '../data/pcData';
import { createPcRig, type PcRigController } from './pcModel';

export interface StageCallbacks {
  onHoverPart: (partId: PartId | null, clientX: number, clientY: number) => void;
  onSelectPart: (partId: PartId) => void;
}

export interface StageController {
  rig: PcRigController;
  flyTo: (pos: [number, number, number], target: [number, number, number]) => void;
  resetCamera: (withMonitor: boolean) => void;
  dispose: () => void;
}

export function createPcStage(canvas: HTMLCanvasElement, callbacks: StageCallbacks): StageController {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();

  // Studio PBR Environment reflections
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.7;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
  camera.position.set(2.9, 0.72, 3.35);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.minDistance = 1.3;
  controls.maxDistance = 9.5;
  controls.maxPolarAngle = Math.PI * 0.54;
  controls.target.set(0, -0.05, 0);

  // Three-point Studio Lighting
  const keyLight = new THREE.DirectionalLight(0xeef6ff, 1.9);
  keyLight.position.set(4.5, 6.2, 5.2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 18;
  keyLight.shadow.camera.left = -4.5;
  keyLight.shadow.camera.right = 4.5;
  keyLight.shadow.camera.top = 4.5;
  keyLight.shadow.camera.bottom = -4.5;
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.05);
  rimLight.position.set(-4.5, 2.5, -3.5);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0x60a5fa, 0.85, 8);
  fillLight.position.set(0.6, 0.2, 1.6);
  scene.add(fillLight);

  // Subtle Dark Showroom Floor + Circular Pedestal Grid
  const floorGeo = new THREE.CircleGeometry(7.5, 64);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x090e19,
    roughness: 0.78,
    metalness: 0.25,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.38;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(10, 24, 0x1e3a5f, 0x111c2f);
  grid.position.y = -1.375;
  scene.add(grid);

  // Build 3D PC Rig
  const rig = createPcRig();
  scene.add(rig.root);

  // Smooth Camera Tweening
  let tweenActive = false;
  const desiredCamPos = new THREE.Vector3();
  const desiredTarget = new THREE.Vector3();

  controls.addEventListener('start', () => {
    tweenActive = false;
  });

  const flyTo = (pos: [number, number, number], target: [number, number, number]) => {
    desiredCamPos.set(pos[0], pos[1], pos[2]);
    desiredTarget.set(target[0], target[1], target[2]);
    tweenActive = true;
  };

  const resetCamera = (withMonitor: boolean) => {
    if (withMonitor) {
      flyTo([0.4, 0.9, 5.2], [-1.05, -0.05, 0]);
    } else {
      flyTo([2.9, 0.72, 3.35], [0, -0.05, 0]);
    }
  };

  // Raycasting for Hover & Click Inspection
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let downX = 0;
  let downY = 0;
  let lastHovered: PartId | null = null;

  const pickPartAt = (clientX: number, clientY: number): PartId | null => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObjects(rig.root.children, true);
    for (const hit of hits) {
      // Skip hidden parts (e.g. hidden monitor or cooler)
      let visible = true;
      let p: THREE.Object3D | null = hit.object;
      while (p) {
        if (!p.visible) {
          visible = false;
          break;
        }
        p = p.parent;
      }
      if (!visible) continue;

      const partId = hit.object.userData.partId as PartId | undefined;
      if (partId) {
        // Prefer internal parts over the outer case when ray passes near glass
        if (partId === 'case') {
          const internalHit = hits.find((h) => {
            const id = h.object.userData.partId as PartId | undefined;
            return id && id !== 'case' && h.object.visible;
          });
          if (internalHit) {
            return internalHit.object.userData.partId as PartId;
          }
        }
        return partId;
      }
    }
    return null;
  };

  const onPointerMove = (e: PointerEvent) => {
    const hovered = pickPartAt(e.clientX, e.clientY);
    if (hovered !== lastHovered) {
      lastHovered = hovered;
      rig.setHighlightedPart(hovered, false);
      canvas.style.cursor = hovered ? 'pointer' : 'grab';
    }
    callbacks.onHoverPart(hovered, e.clientX, e.clientY);
  };

  const onPointerLeave = () => {
    lastHovered = null;
    rig.setHighlightedPart(null, false);
    callbacks.onHoverPart(null, 0, 0);
  };

  const onPointerDown = (e: PointerEvent) => {
    downX = e.clientX;
    downY = e.clientY;
  };

  const onPointerUp = (e: PointerEvent) => {
    const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
    if (dist > 6) return; // Was an orbit drag, not a click
    const clicked = pickPartAt(e.clientX, e.clientY);
    if (clicked) {
      callbacks.onSelectPart(clicked);
    }
  };

  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointerup', onPointerUp);

  // Resize Handling
  const handleResize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  const ro = new ResizeObserver(handleResize);
  if (canvas.parentElement) ro.observe(canvas.parentElement);
  handleResize();

  // Render Loop
  const clock = new THREE.Clock();
  let rafId = 0;

  const animate = () => {
    rafId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    if (tweenActive) {
      const k = Math.min(1, dt * 5.2);
      camera.position.lerp(desiredCamPos, k);
      controls.target.lerp(desiredTarget, k);
      if (
        camera.position.distanceTo(desiredCamPos) < 0.02 &&
        controls.target.distanceTo(desiredTarget) < 0.02
      ) {
        tweenActive = false;
      }
    }

    rig.update(dt, elapsed);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  return {
    rig,
    flyTo,
    resetCamera,
    dispose() {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      controls.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
