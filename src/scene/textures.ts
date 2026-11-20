import * as THREE from 'three';

function createCanvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  draw(ctx, width, height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

export function createMotherboardTexture(): THREE.CanvasTexture {
  return createCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#181c22';
    ctx.fillRect(0, 0, w, h);

    // Subtle PCB trace grid
    ctx.strokeStyle = 'rgba(110, 140, 175, 0.14)';
    ctx.lineWidth = 1.5;
    for (let i = 16; i < w; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for (let i = 16; i < h; i += 24) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }

    // Diagonal routing traces
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
    ctx.lineWidth = 2;
    for (let k = 0; k < 18; k++) {
      ctx.beginPath();
      ctx.moveTo(40 + k * 14, 130);
      ctx.lineTo(90 + k * 14, 210);
      ctx.lineTo(90 + k * 14, 340);
      ctx.stroke();
    }

    // Silkscreen text
    ctx.fillStyle = 'rgba(226, 232, 240, 0.78)';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillText('GIGABYTE', 28, 468);
    ctx.fillStyle = 'rgba(148, 163, 184, 0.85)';
    ctx.font = '600 15px JetBrains Mono, monospace';
    ctx.fillText('B760M D3HP DDR4 • BIOS F7', 28, 490);
    ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText('LGA 1700 • PCIe 4.0 READY • 4x DDR4', 250, 490);
  });
}

export function createCpuIhsTexture(): THREE.CanvasTexture {
  return createCanvasTexture(256, 256, (ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#c8d1dc');
    grad.addColorStop(0.5, '#e2e8f0');
    grad.addColorStop(1, '#9aa5b4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(30,41,59,0.22)';
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.font = '600 22px Inter, sans-serif';
    ctx.fillText('intel', w / 2, 74);
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText('CORE i5', w / 2, 114);
    ctx.font = 'bold 26px JetBrains Mono, monospace';
    ctx.fillText('14400F', w / 2, 152);
    ctx.fillStyle = '#475569';
    ctx.font = '14px JetBrains Mono, monospace';
    ctx.fillText('10C / 16T • LGA1700', w / 2, 194);
    ctx.fillText('SRN47 • VERIFIED', w / 2, 218);
  });
}

export function createGpuBackplateTexture(): THREE.CanvasTexture {
  return createCanvasTexture(512, 256, (ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#1d222b');
    grad.addColorStop(0.5, '#272e3a');
    grad.addColorStop(1, '#14181f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Brushed lines
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    for (let y = 0; y < h; y += 3) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Geometric ASUS accent slash
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(28, 34);
    ctx.lineTo(140, 34);
    ctx.lineTo(168, 62);
    ctx.stroke();

    // Flow-through vent graphic on right
    ctx.fillStyle = '#0d1016';
    for (let r = 0; r < 5; r++) {
      ctx.fillRect(340, 42 + r * 34, 134, 20);
    }

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 26px Inter, sans-serif';
    ctx.fillText('ASUS', 30, 108);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillText('GEFORCE RTX 5060', 30, 144);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '600 15px JetBrains Mono, monospace';
    ctx.fillText('8GB GDDR7 • SUBSYS 1043:8A15', 30, 178);
    ctx.fillStyle = '#64748b';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.fillText('VBIOS 98.06.40.40.95 • 145W', 30, 206);
  });
}

export function createRamTexture(): THREE.CanvasTexture {
  return createCanvasTexture(256, 64, (ctx, w, h) => {
    ctx.fillStyle = '#14171d';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#262c36';
    ctx.fillRect(0, 0, w, 12);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillText('HYPERX', 16, 40);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText('FURY', 112, 40);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillText('8GB DDR4-2666', 164, 38);
  });
}

export function createNvmeTexture(variant: 'sn5000' | 'sn750'): THREE.CanvasTexture {
  return createCanvasTexture(512, 128, (ctx, w, h) => {
    if (variant === 'sn5000') {
      ctx.fillStyle = '#0f2847';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(0, 0, 148, h);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px Inter, sans-serif';
      ctx.fillText('WD Blue', 16, 62);
      ctx.font = '600 18px JetBrains Mono, monospace';
      ctx.fillText('SN5000', 16, 94);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 26px Inter, sans-serif';
      ctx.fillText('1TB NVMe PCIe 4.0', 172, 58);
      ctx.fillStyle = '#93c5fd';
      ctx.font = '16px JetBrains Mono, monospace';
      ctx.fillText('WDS100T4B0E • HEALTHY', 172, 92);
    } else {
      ctx.fillStyle = '#111317';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(0, 0, 18, h);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px Inter, sans-serif';
      ctx.fillText('WD_BLACK', 36, 56);
      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 22px JetBrains Mono, monospace';
      ctx.fillText('SN750', 210, 56);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px JetBrains Mono, monospace';
      ctx.fillText('250GB NVMe • OS BOOT (C:)', 36, 94);
    }
  });
}

export function createHddTexture(): THREE.CanvasTexture {
  return createCanvasTexture(512, 320, (ctx, w, h) => {
    ctx.fillStyle = '#c8cfd8';
    ctx.fillRect(0, 0, w, h);

    // White label sticker
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(28, 28, w - 56, h - 56);

    // BarraCuda iconic green banner
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(28, 28, w - 56, 72);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px Inter, sans-serif';
    ctx.fillText('SEAGATE  BARRACUDA', 48, 76);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 42px Inter, sans-serif';
    ctx.fillText('1TB', 48, 166);
    ctx.font = '600 22px JetBrains Mono, monospace';
    ctx.fillText('ST1000DM010-2EP102', 48, 206);
    ctx.fillStyle = '#475569';
    ctx.font = '18px JetBrains Mono, monospace';
    ctx.fillText('7200 RPM • SATA 6Gb/s • FW CC43', 48, 242);
    ctx.fillStyle = '#15803d';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('STATUS: HEALTHY / OK', 48, 274);
  });
}

export function createPsuStickerTexture(): THREE.CanvasTexture {
  return createCanvasTexture(512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#161920';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.strokeRect(18, 18, w - 36, h - 36);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText('PSU • VERIFY PHYSICALLY', 42, 82);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 22px Inter, sans-serif';
    ctx.fillText('Check Brand / Wattage / 80+ Label', 42, 134);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px JetBrains Mono, monospace';
    ctx.fillText('Software cannot read PSU specs', 42, 178);
    ctx.fillText('Open side cover to inspect sticker', 42, 208);
  });
}

export function createMonitorScreenTexture(): THREE.CanvasTexture {
  return createCanvasTexture(1024, 432, (ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#071326');
    grad.addColorStop(0.55, '#0c1f3a');
    grad.addColorStop(1, '#09111f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle glowing orb
    const rad = ctx.createRadialGradient(w * 0.72, h * 0.35, 20, w * 0.72, h * 0.35, 320);
    rad.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
    rad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, w, h);

    // Header
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 20px JetBrains Mono, monospace';
    ctx.fillText('DAHUA LM30-E330CA • 30" CURVED WFHD • 2560 × 1080 @ 200Hz', 44, 58);

    // Title
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 44px Inter, sans-serif';
    ctx.fillText('SYSTEM HEALTHY • READY TO PLAY', 44, 132);

    // Cards
    const cards = [
      { k: 'CPU', v: 'i5-14400F', s: '10C / 16T • 0 BSODs', c: '#38bdf8' },
      { k: 'GPU', v: 'RTX 5060 8GB', s: 'ASUS • 45°C Idle', c: '#22c55e' },
      { k: 'MEMORY', v: '32GB DDR4', s: '4×8GB HyperX Fury', c: '#a855f7' },
      { k: 'STORAGE', v: '2.25 TB', s: '2× NVMe + 1TB HDD', c: '#f59e0b' },
    ];
    cards.forEach((card, idx) => {
      const x = 44 + idx * 238;
      const y = 186;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
      ctx.fillRect(x, y, 218, 170);
      ctx.strokeStyle = card.c;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, 218, 170);

      ctx.fillStyle = card.c;
      ctx.font = 'bold 16px JetBrains Mono, monospace';
      ctx.fillText(card.k, x + 18, y + 36);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 26px Inter, sans-serif';
      ctx.fillText(card.v, x + 18, y + 92);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '15px Inter, sans-serif';
      ctx.fillText(card.s, x + 18, y + 136);
    });

    // Bottom taskbar
    ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
    ctx.fillRect(0, h - 38, w, 38);
    ctx.fillStyle = '#64748b';
    ctx.font = '14px JetBrains Mono, monospace';
    ctx.fillText('Windows 11 Pro • DirectX 12_2 • Uptime 7.7 Days • Optional 30" Curved 200Hz Monitor', 44, h - 14);
  });
}
