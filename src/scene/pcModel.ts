import * as THREE from 'three';
import type { PartId } from '../data/pcData';
import {
  createCpuIhsTexture,
  createGpuBackplateTexture,
  createHddTexture,
  createMonitorScreenTexture,
  createMotherboardTexture,
  createNvmeTexture,
  createPsuStickerTexture,
  createRamTexture,
} from './textures';

export type RgbMode = 'cyan' | 'white' | 'rainbow' | 'off';

interface ExplodablePart {
  group: THREE.Group;
  basePos: THREE.Vector3;
  explodeOffset: THREE.Vector3;
}

export interface PcRigController {
  root: THREE.Group;
  partGroups: Map<PartId, THREE.Group>;
  setGlassOpen: (open: boolean) => void;
  setExplodeTarget: (value: number) => void;
  setCoolerHidden: (hidden: boolean) => void;
  setMonitorVisible: (visible: boolean) => void;
  setRgbMode: (mode: RgbMode) => void;
  setHighlightedPart: (partId: PartId | null, isSelected: boolean) => void;
  update: (dt: number, elapsed: number) => void;
}

function tagPart(obj: THREE.Object3D, partId: PartId): void {
  obj.traverse((child) => {
    child.userData.partId = partId;
  });
}

function createFanAssembly(radius: number, ringColor: number): {
  group: THREE.Group;
  blades: THREE.Group;
  ringMat: THREE.MeshStandardMaterial;
} {
  const group = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x161a22,
    roughness: 0.55,
    metalness: 0.3,
  });

  // Outer frame ring
  const frameGeo = new THREE.CylinderGeometry(radius, radius, 0.08, 28, 1, true);
  frameGeo.rotateX(Math.PI / 2);
  const frame = new THREE.Mesh(frameGeo, frameMat);
  group.add(frame);

  // Subtle ARGB halo ring
  const ringMat = new THREE.MeshStandardMaterial({
    color: ringColor,
    emissive: new THREE.Color(ringColor),
    emissiveIntensity: 1.5,
    roughness: 0.2,
    metalness: 0.1,
  });
  const ringGeo = new THREE.TorusGeometry(radius * 0.91, 0.014, 10, 32);
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.z = 0.036;
  group.add(ring);

  // Hub & blades
  const blades = new THREE.Group();
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0x1f2530,
    roughness: 0.4,
    metalness: 0.45,
  });
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.28, radius * 0.28, 0.06, 20), hubMat);
  hub.rotation.x = Math.PI / 2;
  blades.add(hub);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x262f3e,
    roughness: 0.42,
    metalness: 0.25,
  });
  const bladeCount = 7;
  for (let i = 0; i < bladeCount; i++) {
    const angle = (i / bladeCount) * Math.PI * 2;
    const pivot = new THREE.Group();
    pivot.rotation.z = angle;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(radius * 0.62, radius * 0.19, 0.012), bladeMat);
    blade.position.x = radius * 0.52;
    blade.rotation.x = 0.45;
    pivot.add(blade);
    blades.add(pivot);
  }

  group.add(blades);
  return { group, blades, ringMat };
}

export function createPcRig(): PcRigController {
  const root = new THREE.Group();
  const partGroups = new Map<PartId, THREE.Group>();
  const explodables: ExplodablePart[] = [];
  const spinningFans: { group: THREE.Group; speed: number }[] = [];
  const rgbMaterials: THREE.MeshStandardMaterial[] = [];
  const partMeshes = new Map<PartId, THREE.Mesh[]>();

  let glassOpen = true;
  let glassProgress = 1;
  let explodeTarget = 0;
  let explodeCurrent = 0;
  let coolerHidden = false;
  let rgbMode: RgbMode = 'cyan';
  let activeHighlightPart: PartId | null = null;
  let activeSelectedPart: PartId | null = 'gpu';

  const registerPart = (id: PartId, group: THREE.Group, explodeOffset?: THREE.Vector3) => {
    tagPart(group, id);
    partGroups.set(id, group);
    const meshes: THREE.Mesh[] = [];
    group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        meshes.push(mesh);
      }
    });
    partMeshes.set(id, meshes);

    if (explodeOffset) {
      explodables.push({
        group,
        basePos: group.position.clone(),
        explodeOffset,
      });
    }
    root.add(group);
  };

  // Shared PBR Materials
  const matteSteel = new THREE.MeshStandardMaterial({
    color: 0x151921,
    roughness: 0.55,
    metalness: 0.62,
  });
  const darkChassis = new THREE.MeshStandardMaterial({
    color: 0x0e1218,
    roughness: 0.65,
    metalness: 0.45,
  });
  const brushedAluminum = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.32,
    metalness: 0.85,
  });
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    roughness: 0.3,
    metalness: 0.88,
  });

  // =========================================================================
  // 1. PC CASE CHASSIS (Representative Mid-Tower)
  // =========================================================================
  const caseGroup = new THREE.Group();

  // Floor & Ceiling plates
  const bottomPlate = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.06, 1.12), matteSteel);
  bottomPlate.position.set(0, -1.26, 0);
  caseGroup.add(bottomPlate);

  const topPlate = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.06, 1.12), matteSteel);
  topPlate.position.set(0, 1.18, 0);
  caseGroup.add(topPlate);

  // Top magnetic mesh filter
  const topMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.36, 0.018, 0.72),
    new THREE.MeshStandardMaterial({ color: 0x1f2530, roughness: 0.8, metalness: 0.3 })
  );
  topMesh.position.set(0.05, 1.215, 0);
  caseGroup.add(topMesh);

  // Top front I/O panel (power button + USB ports)
  const ioStrip = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 0.62), darkChassis);
  ioStrip.position.set(0.84, 1.215, 0.05);
  caseGroup.add(ioStrip);

  const powerLedMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 2.0,
  });
  rgbMaterials.push(powerLedMat);
  const powerBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.022, 16), powerLedMat);
  powerBtn.position.set(0.84, 1.225, 0.24);
  caseGroup.add(powerBtn);

  // Back right steel side wall (-Z)
  const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(1.94, 2.44, 0.04), matteSteel);
  rightPanel.position.set(0, -0.04, -0.54);
  caseGroup.add(rightPanel);

  // Internal motherboard tray
  const mbTray = new THREE.Mesh(new THREE.BoxGeometry(1.82, 1.72, 0.03), darkChassis);
  mbTray.position.set(-0.02, 0.26, -0.4);
  caseGroup.add(mbTray);

  // Rear panel (-X) with I/O & PCIe bracket frames
  const rearWall = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.44, 1.08), matteSteel);
  rearWall.position.set(-0.95, -0.04, 0);
  caseGroup.add(rearWall);

  // Front perforated mesh bezel (+X)
  const frontTopBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 1.1), matteSteel);
  frontTopBar.position.set(0.95, 1.11, 0);
  caseGroup.add(frontTopBar);
  const frontBotBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 1.1), matteSteel);
  frontBotBar.position.set(0.95, -1.19, 0);
  caseGroup.add(frontBotBar);

  const frontLeftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.42, 0.1), matteSteel);
  frontLeftPillar.position.set(0.95, -0.04, 0.51);
  caseGroup.add(frontLeftPillar);
  const frontRightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.42, 0.1), matteSteel);
  frontRightPillar.position.set(0.95, -0.04, -0.51);
  caseGroup.add(frontRightPillar);

  const frontMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.025, 2.18, 0.92),
    new THREE.MeshStandardMaterial({
      color: 0x1a202c,
      roughness: 0.72,
      metalness: 0.4,
      transparent: true,
      opacity: 0.65,
    })
  );
  frontMesh.position.set(0.96, -0.04, 0);
  caseGroup.add(frontMesh);

  // PSU Shroud basement divider (semi-cutaway front so HDD/PSU are inspectable)
  const shroudTop = new THREE.Mesh(new THREE.BoxGeometry(1.84, 0.035, 0.98), darkChassis);
  shroudTop.position.set(-0.02, -0.68, -0.03);
  caseGroup.add(shroudTop);

  // Case Feet (4 rubber-padded aluminum feet)
  const footOffsets: [number, number][] = [
    [-0.76, -0.4],
    [-0.76, 0.4],
    [0.76, -0.4],
    [0.76, 0.4],
  ];
  for (const [fx, fz] of footOffsets) {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.09, 18), brushedAluminum);
    foot.position.set(fx, -1.33, fz);
    caseGroup.add(foot);
  }

  // 3 Front Intake ARGB Fans
  const frontFanYs = [0.68, 0.02, -0.64];
  for (const fy of frontFanYs) {
    const fan = createFanAssembly(0.28, 0x38bdf8);
    fan.group.rotation.y = Math.PI / 2;
    fan.group.position.set(0.86, fy, 0.02);
    caseGroup.add(fan.group);
    spinningFans.push({ group: fan.blades, speed: 3.4 });
    rgbMaterials.push(fan.ringMat);
  }

  // 1 Rear Exhaust Fan
  const rearFan = createFanAssembly(0.25, 0x38bdf8);
  rearFan.group.rotation.y = -Math.PI / 2;
  rearFan.group.position.set(-0.88, 0.64, 0.02);
  caseGroup.add(rearFan.group);
  spinningFans.push({ group: rearFan.blades, speed: 3.8 });
  rgbMaterials.push(rearFan.ringMat);

  // Tempered Glass Side Panel (pivots/slides smoothly open)
  const glassGroup = new THREE.Group();
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x8ecae6,
    transparent: true,
    opacity: 0.2,
    roughness: 0.08,
    metalness: 0.1,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    depthWrite: false,
  });
  const glassPane = new THREE.Mesh(new THREE.BoxGeometry(1.88, 2.38, 0.025), glassMat);
  glassGroup.add(glassPane);

  // Dark ceramic border frame on glass
  const borderMat = new THREE.MeshStandardMaterial({ color: 0x0b0e14, roughness: 0.35, metalness: 0.5 });
  const topBorder = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.07, 0.03), borderMat);
  topBorder.position.y = 1.155;
  const botBorder = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.07, 0.03), borderMat);
  botBorder.position.y = -1.155;
  glassGroup.add(topBorder, botBorder);

  // 4 Thumbscrews
  const screwCoords: [number, number][] = [
    [-0.86, 1.08],
    [0.86, 1.08],
    [-0.86, -1.08],
    [0.86, -1.08],
  ];
  for (const [sx, sy] of screwCoords) {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.045, 14), brushedAluminum);
    screw.rotation.x = Math.PI / 2;
    screw.position.set(sx, sy, 0.015);
    glassGroup.add(screw);
  }
  glassGroup.position.set(0, -0.04, 0.56);
  caseGroup.add(glassGroup);

  registerPart('case', caseGroup);

  // =========================================================================
  // 2. MOTHERBOARD — Gigabyte B760M D3HP DDR4 (Micro-ATX)
  // =========================================================================
  const mbGroup = new THREE.Group();
  mbGroup.position.set(-0.1, 0.24, -0.35);

  const pcbTex = createMotherboardTexture();
  const pcbMat = new THREE.MeshStandardMaterial({
    map: pcbTex,
    roughness: 0.52,
    metalness: 0.18,
  });
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(1.24, 1.24, 0.035), pcbMat);
  mbGroup.add(pcb);

  // VRM Heatsinks (top and left of CPU)
  const vrmLeft = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.52, 0.12), brushedAluminum);
  vrmLeft.position.set(-0.42, 0.26, 0.07);
  const vrmTop = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.11, 0.11), brushedAluminum);
  vrmTop.position.set(-0.08, 0.54, 0.065);
  mbGroup.add(vrmLeft, vrmTop);

  // Rear I/O Aluminum Shroud
  const rearIo = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.64, 0.18), darkChassis);
  rearIo.position.set(-0.56, 0.24, 0.1);
  mbGroup.add(rearIo);

  // B760 Chipset Heatsink (bottom-right)
  const chipsetHs = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.075), brushedAluminum);
  chipsetHs.position.set(0.35, -0.34, 0.05);
  mbGroup.add(chipsetHs);

  // LGA 1700 Socket Frame
  const socketFrame = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.38, 0.04), brushedAluminum);
  socketFrame.position.set(-0.04, 0.26, 0.03);
  mbGroup.add(socketFrame);

  // 4 DDR4 DIMM Slot rails
  const slotMat = new THREE.MeshStandardMaterial({ color: 0x0b0e14, roughness: 0.6 });
  for (let i = 0; i < 4; i++) {
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.56, 0.045), slotMat);
    slot.position.set(0.28 + i * 0.075, 0.25, 0.035);
    mbGroup.add(slot);
  }

  // Steel-reinforced PCIe x16 Slot
  const pcieSlot = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.055, 0.065), brushedAluminum);
  pcieSlot.position.set(-0.18, -0.22, 0.045);
  mbGroup.add(pcieSlot);

  // CMOS CR2032 Battery
  const cmos = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.025, 20), brushedAluminum);
  cmos.rotation.x = Math.PI / 2;
  cmos.position.set(-0.28, -0.42, 0.03);
  mbGroup.add(cmos);

  // 24-pin ATX Connector
  const atx24 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.3, 0.07), darkChassis);
  atx24.position.set(0.57, 0.14, 0.05);
  mbGroup.add(atx24);

  registerPart('motherboard', mbGroup, new THREE.Vector3(0, 0, 0.06));

  // =========================================================================
  // 3. CPU — Intel Core i5-14400F
  // =========================================================================
  const cpuGroup = new THREE.Group();
  cpuGroup.position.set(-0.14, 0.5, -0.295);

  const cpuSubstrate = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, 0.31, 0.018),
    new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.45, metalness: 0.2 })
  );
  cpuGroup.add(cpuSubstrate);

  const ihsTex = createCpuIhsTexture();
  const cpuIhs = new THREE.Mesh(
    new THREE.BoxGeometry(0.21, 0.25, 0.024),
    new THREE.MeshStandardMaterial({ map: ihsTex, roughness: 0.28, metalness: 0.8 })
  );
  cpuIhs.position.z = 0.018;
  cpuGroup.add(cpuIhs);

  registerPart('cpu', cpuGroup, new THREE.Vector3(0, 0.05, 0.35));

  // =========================================================================
  // 4. CPU COOLER (Representative Tower Air Cooler — Unverified)
  // =========================================================================
  const coolerGroup = new THREE.Group();
  coolerGroup.position.set(-0.14, 0.5, -0.02);

  // Aluminum Fin Stack
  const finStackMat = new THREE.MeshStandardMaterial({ color: 0x8b98a9, roughness: 0.35, metalness: 0.82 });
  for (let i = 0; i < 12; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.46, 0.012), finStackMat);
    fin.position.z = -0.18 + i * 0.032;
    coolerGroup.add(fin);
  }
  // Black Top Cover Plate
  const coolerCap = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.47, 0.025), darkChassis);
  coolerCap.position.z = 0.19;
  coolerGroup.add(coolerCap);

  // 4 Copper Heatpipes
  for (const hy of [-0.14, -0.05, 0.05, 0.14]) {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.44, 10), copperMat);
    pipe.rotation.x = Math.PI / 2;
    pipe.position.set(0, hy, -0.02);
    coolerGroup.add(pipe);
  }

  // Cooler PWM Fan (mounted on +X side pushing toward rear)
  const coolerFan = createFanAssembly(0.2, 0x38bdf8);
  coolerFan.group.rotation.y = Math.PI / 2;
  coolerFan.group.position.set(0.17, 0, 0.0);
  coolerGroup.add(coolerFan.group);
  spinningFans.push({ group: coolerFan.blades, speed: 4.2 });
  rgbMaterials.push(coolerFan.ringMat);

  registerPart('cooler', coolerGroup, new THREE.Vector3(0, 0.18, 1.05));

  // =========================================================================
  // 5. RAM — 4 × 8GB Kingston HyperX Fury DDR4-2666
  // =========================================================================
  const ramGroup = new THREE.Group();
  ramGroup.position.set(0.29, 0.49, -0.22);

  const ramTex = createRamTexture();
  const ramStickMat = new THREE.MeshStandardMaterial({
    map: ramTex,
    roughness: 0.38,
    metalness: 0.55,
  });
  const ramEdgeMat = new THREE.MeshStandardMaterial({ color: 0x11141a, roughness: 0.4, metalness: 0.6 });

  for (let i = 0; i < 4; i++) {
    const stick = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.54, 0.16), [
      ramEdgeMat,
      ramEdgeMat,
      ramEdgeMat,
      ramEdgeMat,
      ramStickMat,
      ramStickMat,
    ]);
    stick.position.x = -0.11 + i * 0.075;
    ramGroup.add(stick);
  }

  registerPart('ram', ramGroup, new THREE.Vector3(0.22, 0.08, 0.65));

  // =========================================================================
  // 6. GPU — ASUS GeForce RTX 5060 8GB GDDR7 (Dual-Fan Shroud)
  // =========================================================================
  const gpuGroup = new THREE.Group();
  gpuGroup.position.set(-0.08, -0.05, 0.06);

  // Main Shroud Body
  const gpuShroudMat = new THREE.MeshStandardMaterial({
    color: 0x1c212b,
    roughness: 0.42,
    metalness: 0.68,
  });
  const gpuBody = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.21, 0.54), gpuShroudMat);
  gpuGroup.add(gpuBody);

  // Top Backplate with ASUS RTX 5060 Graphics
  const backplateTex = createGpuBackplateTexture();
  const backplate = new THREE.Mesh(
    new THREE.BoxGeometry(1.22, 0.018, 0.54),
    new THREE.MeshStandardMaterial({ map: backplateTex, roughness: 0.35, metalness: 0.72 })
  );
  backplate.position.y = 0.112;
  gpuGroup.add(backplate);

  // Visible Aluminum Heatsink Fins along the side (+Z)
  const finStrip = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.11, 0.03), brushedAluminum);
  finStrip.position.set(0.02, -0.01, 0.265);
  gpuGroup.add(finStrip);

  // Glowing GeForce RTX Side Accent Strip
  const gpuLedMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 1.9,
    roughness: 0.2,
  });
  rgbMaterials.push(gpuLedMat);
  const gpuLedBar = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.022, 0.02), gpuLedMat);
  gpuLedBar.position.set(-0.22, 0.065, 0.275);
  gpuGroup.add(gpuLedBar);

  // 8-pin PCIe Power Connector on top-front edge
  const pcie8pin = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.075, 0.07), darkChassis);
  pcie8pin.position.set(0.32, 0.04, 0.285);
  gpuGroup.add(pcie8pin);

  // Rear Metal I/O Bracket (-X)
  const gpuBracket = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.26, 0.52), brushedAluminum);
  gpuBracket.position.set(-0.62, -0.01, 0);
  gpuGroup.add(gpuBracket);

  // Dual Underside Axial Fans
  for (const fx of [-0.28, 0.28]) {
    const gFan = createFanAssembly(0.21, 0x1e293b);
    gFan.group.rotation.x = Math.PI / 2;
    gFan.group.position.set(fx, -0.108, 0);
    gpuGroup.add(gFan.group);
    spinningFans.push({ group: gFan.blades, speed: 2.2 });
  }

  registerPart('gpu', gpuGroup, new THREE.Vector3(0.04, -0.12, 0.96));

  // =========================================================================
  // 7. SSD #2 (OS Drive) — WD_BLACK SN750 250GB M.2 NVMe (Slot 1 above GPU)
  // =========================================================================
  const sn750Group = new THREE.Group();
  sn750Group.position.set(-0.12, 0.16, -0.315);

  const sn750Tex = createNvmeTexture('sn750');
  const sn750Mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.11, 0.018),
    new THREE.MeshStandardMaterial({ map: sn750Tex, roughness: 0.45, metalness: 0.2 })
  );
  sn750Group.add(sn750Mesh);

  registerPart('ssd_sn750', sn750Group, new THREE.Vector3(-0.08, 0.06, 0.62));

  // =========================================================================
  // 8. SSD #1 (Secondary) — WD Blue SN5000 1TB M.2 NVMe (Slot 2 below GPU)
  // =========================================================================
  const sn5000Group = new THREE.Group();
  sn5000Group.position.set(-0.12, -0.32, -0.315);

  const sn5000Tex = createNvmeTexture('sn5000');
  const sn5000Mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.11, 0.018),
    new THREE.MeshStandardMaterial({ map: sn5000Tex, roughness: 0.42, metalness: 0.2 })
  );
  sn5000Group.add(sn5000Mesh);

  registerPart('ssd_sn5000', sn5000Group, new THREE.Vector3(-0.08, -0.1, 0.68));

  // =========================================================================
  // 9. HDD — Seagate BarraCuda 1TB 3.5" SATA (Lower Drive Bay)
  // =========================================================================
  const hddGroup = new THREE.Group();
  hddGroup.position.set(0.42, -1.0, 0.0);

  const hddTex = createHddTexture();
  const hddMetalMat = new THREE.MeshStandardMaterial({ color: 0x262b33, roughness: 0.48, metalness: 0.72 });
  const hddTopMat = new THREE.MeshStandardMaterial({ map: hddTex, roughness: 0.4, metalness: 0.35 });
  const hddMesh = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.13, 0.42), [
    hddMetalMat,
    hddMetalMat,
    hddTopMat,
    hddMetalMat,
    hddMetalMat,
    hddMetalMat,
  ]);
  hddGroup.add(hddMesh);

  // Drive cage rails
  const cageMat = new THREE.MeshStandardMaterial({ color: 0x161b23, roughness: 0.6, metalness: 0.5 });
  const cageRailL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.025), cageMat);
  cageRailL.position.z = 0.23;
  const cageRailR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.18, 0.025), cageMat);
  cageRailR.position.z = -0.23;
  hddGroup.add(cageRailL, cageRailR);

  registerPart('hdd', hddGroup, new THREE.Vector3(0.28, -0.05, 0.85));

  // =========================================================================
  // 10. PSU — Power Supply (Unverified Placeholder)
  // =========================================================================
  const psuGroup = new THREE.Group();
  psuGroup.position.set(-0.5, -0.98, 0.0);

  const psuStickerTex = createPsuStickerTexture();
  const psuSideMat = new THREE.MeshStandardMaterial({ map: psuStickerTex, roughness: 0.5, metalness: 0.35 });
  const psuBody = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.42, 0.62), [
    darkChassis,
    darkChassis,
    darkChassis,
    darkChassis,
    psuSideMat,
    darkChassis,
  ]);
  psuGroup.add(psuBody);

  // Braided Power Cable Arc (PSU to GPU area)
  const cableCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.25, 0.18, 0.12),
    new THREE.Vector3(0.45, 0.42, 0.24),
    new THREE.Vector3(0.56, 0.65, 0.28),
    new THREE.Vector3(0.72, 0.92, 0.31),
  ]);
  const cableGeo = new THREE.TubeGeometry(cableCurve, 20, 0.028, 8, false);
  const cableMesh = new THREE.Mesh(
    cableGeo,
    new THREE.MeshStandardMaterial({ color: 0x0d1016, roughness: 0.85, metalness: 0.1 })
  );
  psuGroup.add(cableMesh);

  registerPart('psu', psuGroup, new THREE.Vector3(-0.34, -0.06, 0.82));

  // =========================================================================
  // 11. OPTIONAL MONITOR — Dahua LM30-E330CA (30" Curved Ultrawide 200Hz)
  // =========================================================================
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(-2.35, -0.08, -0.05);
  monitorGroup.rotation.y = 0.22;
  monitorGroup.visible = false;

  // Curved Ultrawide Screen (Cylinder segment)
  const screenTex = createMonitorScreenTexture();
  const curveRadius = 4.6;
  const arcAngle = 0.62;
  const screenGeo = new THREE.CylinderGeometry(
    curveRadius,
    curveRadius,
    1.18,
    40,
    1,
    true,
    Math.PI - arcAngle / 2,
    arcAngle
  );
  // Flip normals inward so screen faces +Z
  screenGeo.scale(-1, 1, 1);
  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    emissiveMap: screenTex,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.72,
    roughness: 0.22,
    metalness: 0.1,
    side: THREE.FrontSide,
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.set(0, 0.24, curveRadius - 0.18);
  monitorGroup.add(screenMesh);

  // Curved Back Housing
  const backGeo = new THREE.CylinderGeometry(
    curveRadius + 0.045,
    curveRadius + 0.045,
    1.25,
    40,
    1,
    true,
    Math.PI - (arcAngle + 0.025) / 2,
    arcAngle + 0.025
  );
  const backMesh = new THREE.Mesh(
    backGeo,
    new THREE.MeshStandardMaterial({ color: 0x151922, roughness: 0.5, metalness: 0.45, side: THREE.DoubleSide })
  );
  backMesh.position.set(0, 0.24, curveRadius - 0.18);
  monitorGroup.add(backMesh);

  // Stand neck & V-shaped metallic base
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.15, 0.12), matteSteel);
  neck.position.set(0, -0.58, -0.22);
  monitorGroup.add(neck);

  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.04, 0.11), brushedAluminum);
  legL.position.set(-0.34, -1.24, 0.04);
  legL.rotation.y = 0.42;
  const legR = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.04, 0.11), brushedAluminum);
  legR.position.set(0.34, -1.24, 0.04);
  legR.rotation.y = -0.42;
  monitorGroup.add(legL, legR);

  registerPart('monitor', monitorGroup);

  // =========================================================================
  // HIGHLIGHTING & ANIMATION HELPERS
  // =========================================================================
  const refreshHighlights = () => {
    partMeshes.forEach((meshes, partId) => {
      const isHovered = partId === activeHighlightPart;
      const isSelected = partId === activeSelectedPart;
      for (const mesh of meshes) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) {
          const std = m as THREE.MeshStandardMaterial;
          if (!std.emissive || rgbMaterials.includes(std) || std === screenMat) continue;
          if (isHovered) {
            std.emissive.setHex(0x38bdf8);
            std.emissiveIntensity = 0.28;
          } else if (isSelected && partId !== 'case') {
            std.emissive.setHex(0x0ea5e9);
            std.emissiveIntensity = 0.16;
          } else {
            std.emissive.setHex(0x000000);
            std.emissiveIntensity = 0;
          }
        }
      }
    });
  };

  refreshHighlights();

  return {
    root,
    partGroups,
    setGlassOpen(open: boolean) {
      glassOpen = open;
    },
    setExplodeTarget(value: number) {
      explodeTarget = THREE.MathUtils.clamp(value, 0, 1);
    },
    setCoolerHidden(hidden: boolean) {
      coolerHidden = hidden;
      coolerGroup.visible = !hidden;
    },
    setMonitorVisible(visible: boolean) {
      monitorGroup.visible = visible;
    },
    setRgbMode(mode: RgbMode) {
      rgbMode = mode;
    },
    setHighlightedPart(partId: PartId | null, isSelected: boolean) {
      if (isSelected) {
        activeSelectedPart = partId;
      } else {
        activeHighlightPart = partId;
      }
      refreshHighlights();
    },
    update(dt: number, elapsed: number) {
      // Smooth explode interpolation
      explodeCurrent = THREE.MathUtils.lerp(explodeCurrent, explodeTarget, Math.min(1, dt * 7.5));
      for (const item of explodables) {
        item.group.position.copy(item.basePos).addScaledVector(item.explodeOffset, explodeCurrent);
      }

      // Smooth Tempered Glass open/slide + explode integration
      const desiredGlass = glassOpen || explodeCurrent > 0.08 ? 1 : 0;
      glassProgress = THREE.MathUtils.lerp(glassProgress, desiredGlass, Math.min(1, dt * 6.5));
      glassGroup.position.z = 0.56 + glassProgress * 0.72 + explodeCurrent * 0.55;
      glassGroup.position.x = -glassProgress * 0.45;
      glassGroup.rotation.y = -glassProgress * 0.28;
      glassMat.opacity = THREE.MathUtils.lerp(0.24, 0.07, glassProgress);

      // Spin fans smoothly
      for (const fan of spinningFans) {
        fan.group.rotation.z -= fan.speed * dt;
      }

      // Cooler visibility sync
      coolerGroup.visible = !coolerHidden;

      // RGB Color Animation
      for (const mat of rgbMaterials) {
        if (rgbMode === 'off') {
          mat.emissiveIntensity = 0.0;
          mat.color.setHex(0x1f2937);
        } else if (rgbMode === 'cyan') {
          mat.color.setHex(0x38bdf8);
          mat.emissive.setHex(0x38bdf8);
          mat.emissiveIntensity = 1.65;
        } else if (rgbMode === 'white') {
          mat.color.setHex(0xf8fafc);
          mat.emissive.setHex(0xe2e8f0);
          mat.emissiveIntensity = 1.45;
        } else if (rgbMode === 'rainbow') {
          const hue = (elapsed * 0.14) % 1;
          mat.color.setHSL(hue, 0.9, 0.58);
          mat.emissive.setHSL(hue, 0.9, 0.55);
          mat.emissiveIntensity = 1.75;
        }
      }
    },
  };
}
