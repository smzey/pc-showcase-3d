import './styles.css';
import {
  DIAGNOSTIC_METRICS,
  I18N,
  PC_PARTS,
  buildShortSpecs,
  type Lang,
  type PartId,
  type PcPart,
} from './data/pcData';
import type { RgbMode } from './scene/pcModel';
import { createPcStage } from './scene/stage';

// Application State
let lang: Lang = 'th';
let selectedPartId: PartId = 'gpu';
let glassOpen = true;
let coolerHidden = false;
let monitorVisible = false;
let explodeValue = 0;
const rgbModes: RgbMode[] = ['white', 'off', 'cyan', 'rainbow'];
let rgbIdx = 0;

// DOM Elements
const canvas = document.getElementById('pc-canvas') as HTMLCanvasElement;
const hoverTooltip = document.getElementById('hover-tooltip') as HTMLDivElement;
const tooltipTitle = document.getElementById('tooltip-title') as HTMLElement;
const tooltipSub = document.getElementById('tooltip-sub') as HTMLElement;

const headerSub = document.getElementById('header-sub') as HTMLElement;
const statusPillText = document.getElementById('status-pill-text') as HTMLElement;
const langToggle = document.getElementById('lang-toggle') as HTMLButtonElement;
const langLabel = document.getElementById('lang-label') as HTMLElement;
const drawer = document.getElementById('inspector-drawer') as HTMLElement;
const drawerToggle = document.getElementById('drawer-toggle') as HTMLButtonElement;
const drawerToggleLabel = document.getElementById('drawer-toggle-label') as HTMLElement;

const btnGlass = document.getElementById('btn-glass') as HTMLButtonElement;
const btnExplode = document.getElementById('btn-explode') as HTMLButtonElement;
const btnCooler = document.getElementById('btn-cooler') as HTMLButtonElement;
const btnMonitor = document.getElementById('btn-monitor') as HTMLButtonElement;
const btnRgb = document.getElementById('btn-rgb') as HTMLButtonElement;
const rgbLabel = document.getElementById('rgb-label') as HTMLElement;
const btnReset = document.getElementById('btn-reset') as HTMLButtonElement;
const explodeRange = document.getElementById('explode-range') as HTMLInputElement;
const explodePct = document.getElementById('explode-pct') as HTMLElement;

const selectedCardEl = document.getElementById('selected-card') as HTMLDivElement;
const partListEl = document.getElementById('part-list') as HTMLDivElement;
const healthContent = document.getElementById('health-content') as HTMLDivElement;
const fullSpecsContent = document.getElementById('full-specs-content') as HTMLDivElement;
const btnCopySpecs = document.getElementById('btn-copy-specs') as HTMLButtonElement;
const copyToast = document.getElementById('copy-toast') as HTMLDivElement;

// Lightbox Modal Elements
const lightbox = document.getElementById('image-lightbox') as HTMLDivElement;
const lightboxBackdrop = document.getElementById('lightbox-backdrop') as HTMLDivElement;
const lightboxClose = document.getElementById('lightbox-close') as HTMLButtonElement;
const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
const lightboxTitle = document.getElementById('lightbox-title') as HTMLElement;
const lightboxNote = document.getElementById('lightbox-note') as HTMLElement;

const getPart = (id: PartId): PcPart => PC_PARTS.find((p) => p.id === id) ?? PC_PARTS[0];

// Mount 3D Stage
const stage = createPcStage(canvas, {
  onHoverPart(partId, clientX, clientY) {
    if (!partId) {
      hoverTooltip.classList.add('hidden');
      return;
    }
    const part = getPart(partId);
    tooltipTitle.textContent = part.shortName;
    tooltipSub.textContent = `${part.category[lang]} • ${part.statusTag[lang]}`;
    hoverTooltip.classList.toggle('unverified', !part.verified);
    hoverTooltip.style.left = `${clientX}px`;
    hoverTooltip.style.top = `${clientY}px`;
    hoverTooltip.classList.remove('hidden');
  },
  onSelectPart(partId) {
    selectPart(partId, true);
    if (window.innerWidth <= 960) {
      drawer.classList.add('open');
      updateDrawerToggleLabel();
    }
  },
});

function openLightbox(part: PcPart): void {
  if (!part.image) return;
  lightboxImg.src = part.image;
  lightboxImg.alt = part.name;
  lightboxTitle.textContent = part.name;
  lightboxNote.textContent = part.imageCaption ? part.imageCaption[lang] : '';
  lightbox.classList.remove('hidden');
}

function closeLightbox(): void {
  lightbox.classList.add('hidden');
}

const CAM_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
const ZOOM_SVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>`;

function renderSpotlight(): void {
  const t = I18N[lang];
  const part = getPart(selectedPartId);
  const badgeClass = part.verified ? 'verified' : 'unverified';
  const badgeText = part.statusTag[lang].replace(/^⚠\s*/, '');

  const photoHtml = part.image
    ? `
      <div class="product-photo-box" id="spotlight-photo" title="${t.zoomHint}">
        <img src="${part.image}" alt="${part.name}" loading="eager" />
        <span class="zoom-pill">${ZOOM_SVG} ${t.zoomHint}</span>
      </div>
      ${part.imageCaption ? `<div class="photo-caption">${part.imageCaption[lang]}</div>` : ''}
    `
    : `
      <div class="no-photo-box">
        ${CAM_SVG}
        <strong>${t.noPhotoTitle}</strong>
        <span>${t.noPhotoSub}</span>
      </div>
    `;

  const specsHtml = part.specs
    .map(
      (s) => `
      <div class="spec-row">
        <span>${s.label[lang]}</span>
        <span>${s.value}</span>
      </div>`
    )
    .join('');

  const w = part.warranty;
  const warrantyClass =
    w.status === 'active' || w.status === 'lifetime'
      ? 'verified'
      : w.status === 'expired'
      ? 'expired'
      : 'unverified';

  selectedCardEl.innerHTML = `
    ${photoHtml}
    <div class="spotlight-head">
      <div>
        <div class="spotlight-cat">${part.category[lang]}</div>
        <div class="spotlight-title">${part.name}</div>
      </div>
      <span class="badge ${badgeClass}">${badgeText}</span>
    </div>
    <p class="spotlight-summary">${part.summary[lang]}</p>
    <div class="spec-grid">${specsHtml}</div>
    <div class="warranty-inline">
      <div class="warranty-inline-left">
        <span class="warranty-k">${t.warrantyLabel}</span>
        <span class="warranty-dist">${w.distributor}</span>
      </div>
      <span class="badge ${warrantyClass}">${w.until[lang]}</span>
    </div>
  `;

  const photoBox = document.getElementById('spotlight-photo');
  if (photoBox) {
    photoBox.addEventListener('click', () => openLightbox(part));
  }
}

function renderPartList(): void {
  partListEl.innerHTML = PC_PARTS.map((p) => {
    const active = p.id === selectedPartId ? 'active' : '';
    const dotClass = p.verified ? '' : 'unverified';
    const thumbHtml = p.image
      ? `<div class="part-thumb"><img src="${p.image}" alt="${p.shortName}" loading="lazy" /></div>`
      : `<div class="part-thumb placeholder">${CAM_SVG}</div>`;

    return `
      <button class="part-item ${active}" data-part="${p.id}" type="button">
        <div class="part-item-main">
          ${thumbHtml}
          <div class="part-item-left">
            <span class="part-item-cat">${p.category[lang]}</span>
            <span class="part-item-name">${p.shortName}</span>
          </div>
        </div>
        <div class="part-item-right">
          <span class="part-chip">${p.highlightTag}</span>
          <span class="status-dot ${dotClass}"></span>
        </div>
      </button>
    `;
  }).join('');

  partListEl.querySelectorAll<HTMLButtonElement>('.part-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.part as PartId;
      selectPart(id, true);
    });
  });
}

function renderHealthTab(): void {
  const t = I18N[lang];

  const warrantyRows = PC_PARTS.map((p) => {
    const w = p.warranty;
    const badgeClass =
      w.status === 'active' || w.status === 'lifetime'
        ? 'verified'
        : w.status === 'expired'
        ? 'expired'
        : 'unverified';

    return `
      <button class="warranty-row" data-part="${p.id}" type="button">
        <div class="warranty-row-left">
          <strong>${p.shortName}</strong>
          <span>${w.distributor}</span>
        </div>
        <span class="badge ${badgeClass}">${w.until[lang]}</span>
      </button>
    `;
  }).join('');

  const healthCards = DIAGNOSTIC_METRICS.map(
    (m) => `
    <div class="health-card ${m.status}">
      <div class="health-top">
        <strong>${m.title[lang]}</strong>
        <span class="health-val">${m.value[lang]}</span>
      </div>
      <p class="health-note">${m.note[lang]}</p>
    </div>`
  ).join('');

  healthContent.innerHTML = `
    <div class="section-heading">${t.warrantySectionTitle}</div>
    <div class="warranty-table">${warrantyRows}</div>
    <div class="section-heading" style="margin-top: 14px;">${t.healthSectionTitle}</div>
    ${healthCards}
  `;

  healthContent.querySelectorAll<HTMLButtonElement>('.warranty-row').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.part as PartId;
      selectPart(id, true);
    });
  });
}

function renderFullSpecsTab(): void {
  fullSpecsContent.innerHTML = PC_PARTS.map((p) => {
    const thumbHtml = p.image
      ? `<div class="full-spec-thumb"><img src="${p.image}" alt="${p.shortName}" loading="lazy" /></div>`
      : `<div class="full-spec-thumb placeholder">${CAM_SVG}</div>`;

    return `
      <div class="full-spec-card" data-part="${p.id}">
        ${thumbHtml}
        <div class="full-spec-body">
          <span class="full-spec-cat">${p.category[lang]}</span>
          <strong class="full-spec-name">${p.name}</strong>
          <span class="full-spec-meta">${p.statusTag[lang].replace(/^⚠\s*/, '')}</span>
        </div>
      </div>
    `;
  }).join('');

  fullSpecsContent.querySelectorAll<HTMLElement>('.full-spec-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.part as PartId;
      selectPart(id, true);
    });
  });
}

function updateDrawerToggleLabel(): void {
  const t = I18N[lang];
  drawerToggleLabel.textContent = drawer.classList.contains('open') ? t.drawerClose : t.drawerOpen;
}

function updateRgbLabel(): void {
  const mode = rgbModes[rgbIdx];
  const labelMap: Record<RgbMode, { th: string; en: string }> = {
    white: { th: 'ไฟ: ขาว', en: 'LED: White' },
    off: { th: 'ไฟ: ปิด', en: 'LED: Off' },
    cyan: { th: 'ไฟ: ฟ้า', en: 'LED: Cyan' },
    rainbow: { th: 'ไฟ: RGB', en: 'LED: RGB' },
  };
  rgbLabel.textContent = labelMap[mode][lang];
}

function applyTranslations(): void {
  const t = I18N[lang];
  headerSub.textContent = t.headerSub;
  statusPillText.textContent = t.statusPill;
  langLabel.textContent = lang === 'th' ? 'EN' : 'ไทย';

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as keyof typeof t;
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  const glassTextEl = btnGlass.querySelector<HTMLElement>('[data-i18n="glassBtn"]');
  if (glassTextEl) glassTextEl.textContent = glassOpen ? t.glassBtnClosed : t.glassBtn;

  const coolerTextEl = btnCooler.querySelector<HTMLElement>('[data-i18n="coolerBtn"]');
  if (coolerTextEl) coolerTextEl.textContent = coolerHidden ? t.coolerBtnShow : t.coolerBtn;

  updateRgbLabel();
  updateDrawerToggleLabel();
  renderSpotlight();
  renderPartList();
  renderHealthTab();
  renderFullSpecsTab();
}

function selectPart(partId: PartId, flyCamera: boolean): void {
  selectedPartId = partId;
  const part = getPart(partId);

  if (partId === 'monitor' && !monitorVisible) {
    setMonitorState(true);
  }
  if (partId === 'cpu' && !coolerHidden && explodeValue < 0.3) {
    coolerHidden = true;
    stage.rig.setCoolerHidden(true);
    btnCooler.classList.add('active');
    applyTranslations();
  }

  stage.rig.setHighlightedPart(partId, true);
  if (flyCamera) {
    stage.flyTo(part.cameraPos, part.cameraTarget);
  }

  activateTab('inspect');
  renderSpotlight();
  renderPartList();
}

function setExplode(val01: number): void {
  explodeValue = val01;
  stage.rig.setExplodeTarget(val01);
  explodeRange.value = String(Math.round(val01 * 100));
  explodePct.textContent = `${Math.round(val01 * 100)}%`;
  btnExplode.classList.toggle('active', val01 > 0.05);
}

function setMonitorState(visible: boolean): void {
  monitorVisible = visible;
  stage.rig.setMonitorVisible(visible);
  btnMonitor.classList.toggle('active', visible);
}

function activateTab(tabName: string): void {
  document.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
  document.querySelectorAll<HTMLElement>('.tab-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `tab-${tabName}`);
  });
}

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  copyToast.textContent = `✓ ${I18N[lang].copiedMsg}`;
  copyToast.classList.remove('hidden');
  window.setTimeout(() => copyToast.classList.add('hidden'), 2400);
}

// =========================================================================
// EVENT LISTENERS
// =========================================================================
document.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.dataset.tab) activateTab(btn.dataset.tab);
  });
});

langToggle.addEventListener('click', () => {
  lang = lang === 'th' ? 'en' : 'th';
  applyTranslations();
});

drawerToggle.addEventListener('click', () => {
  drawer.classList.toggle('open');
  updateDrawerToggleLabel();
});

btnGlass.addEventListener('click', () => {
  glassOpen = !glassOpen;
  stage.rig.setGlassOpen(glassOpen);
  btnGlass.classList.toggle('active', glassOpen);
  applyTranslations();
});

btnExplode.addEventListener('click', () => {
  setExplode(explodeValue > 0.1 ? 0 : 1);
});

explodeRange.addEventListener('input', () => {
  setExplode(Number(explodeRange.value) / 100);
});

btnCooler.addEventListener('click', () => {
  coolerHidden = !coolerHidden;
  stage.rig.setCoolerHidden(coolerHidden);
  btnCooler.classList.toggle('active', coolerHidden);
  applyTranslations();
});

btnMonitor.addEventListener('click', () => {
  setMonitorState(!monitorVisible);
  stage.resetCamera(monitorVisible);
});

btnRgb.addEventListener('click', () => {
  rgbIdx = (rgbIdx + 1) % rgbModes.length;
  stage.rig.setRgbMode(rgbModes[rgbIdx]);
  updateRgbLabel();
});

btnReset.addEventListener('click', () => {
  setExplode(0);
  stage.resetCamera(monitorVisible);
});

btnCopySpecs.addEventListener('click', () => {
  void copyText(buildShortSpecs(monitorVisible));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Initial Render
stage.rig.setGlassOpen(true);
applyTranslations();
