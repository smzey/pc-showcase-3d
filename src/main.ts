import './styles.css';
import {
  DIAGNOSTIC_METRICS,
  I18N,
  PC_PARTS,
  SELLER_CONFIG,
  WHOLE_PC_BENCHMARKS,
  buildShortSpecs,
  buildThaiListing,
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
const rgbModes: RgbMode[] = ['cyan', 'white', 'rainbow', 'off'];
let rgbIdx = 0;

// DOM Elements
const canvas = document.getElementById('pc-canvas') as HTMLCanvasElement;
const hoverTooltip = document.getElementById('hover-tooltip') as HTMLDivElement;
const tooltipTitle = document.getElementById('tooltip-title') as HTMLElement;
const tooltipSub = document.getElementById('tooltip-sub') as HTMLElement;

const headerSub = document.getElementById('header-sub') as HTMLElement;
const priceLabel = document.getElementById('price-label') as HTMLElement;
const priceAmount = document.getElementById('price-amount') as HTMLElement;
const langToggle = document.getElementById('lang-toggle') as HTMLButtonElement;
const langLabel = document.getElementById('lang-label') as HTMLElement;
const drawer = document.getElementById('inspector-drawer') as HTMLElement;
const drawerToggle = document.getElementById('drawer-toggle') as HTMLButtonElement;
const drawerToggleLabel = document.getElementById('drawer-toggle-label') as HTMLElement;
const hintText = document.getElementById('hint-text') as HTMLElement;

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
const pricingMainAsk = document.getElementById('pricing-main-ask') as HTMLElement;
const pricingCloseNote = document.getElementById('pricing-close-note') as HTMLElement;
const monitorBundleCheck = document.getElementById('monitor-bundle-check') as HTMLInputElement;
const benchmarkBox = document.getElementById('benchmark-box') as HTMLDivElement;
const pricingTableWrap = document.getElementById('pricing-table-wrap') as HTMLDivElement;
const healthContent = document.getElementById('health-content') as HTMLDivElement;
const listingPreview = document.getElementById('listing-preview') as HTMLPreElement;
const btnCopyListing = document.getElementById('btn-copy-listing') as HTMLButtonElement;
const btnCopySpecs = document.getElementById('btn-copy-specs') as HTMLButtonElement;
const copyToast = document.getElementById('copy-toast') as HTMLDivElement;

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
    tooltipSub.textContent = `${part.statusTag[lang]} • ฿${part.estimateLow.toLocaleString()}–${part.estimateHigh.toLocaleString()}`;
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

function formatThb(n: number): string {
  return `฿${n.toLocaleString('en-US')}`;
}

function updatePriceHeader(): void {
  const totalAsk = monitorVisible
    ? SELLER_CONFIG.askingPriceTower + SELLER_CONFIG.monitorBundleAddon
    : SELLER_CONFIG.askingPriceTower;
  priceAmount.textContent = formatThb(totalAsk);
  pricingMainAsk.textContent = formatThb(totalAsk);

  const low = monitorVisible
    ? SELLER_CONFIG.realisticLow + 3500
    : SELLER_CONFIG.realisticLow;
  const high = monitorVisible
    ? SELLER_CONFIG.realisticHigh + 4200
    : SELLER_CONFIG.realisticHigh;

  pricingCloseNote.innerHTML =
    lang === 'th'
      ? `ราคาปิดการขายจริงที่เหมาะสม: <strong>${formatThb(low)} – ${formatThb(high)}</strong> (ตั้งเผื่อต่อรอง ~1,000–2,000 บาท ต่ำกว่าเครื่องมือหนึ่ง ฿27,000–฿29,490)`
      : `Realistic closing range: <strong>${formatThb(low)} – ${formatThb(high)}</strong> (includes ฿1k–2k negotiation room, well below ฿27,000–฿29,490 brand-new retail).`;
}

function renderSpotlight(): void {
  const t = I18N[lang];
  const part = getPart(selectedPartId);
  const badgeClass = part.verified ? 'verified' : 'unverified';
  const badgeText = part.verified ? `✓ ${part.statusTag[lang]}` : part.statusTag[lang];

  const specsHtml = part.specs
    .map(
      (s) => `
      <div class="spec-row">
        <span>${s.label[lang]}</span>
        <span>${s.value}</span>
      </div>`
    )
    .join('');

  const linksHtml =
    part.links.length > 0
      ? `<div class="link-row">${part.links
          .map(
            (l) =>
              `<a class="source-link" href="${l.url}" target="_blank" rel="noopener noreferrer">↗ ${l.label}</a>`
          )
          .join('')}</div>`
      : '';

  selectedCardEl.innerHTML = `
    <div class="spotlight-head">
      <div>
        <div class="spotlight-cat">${part.category[lang]}</div>
        <div class="spotlight-title">${part.name}</div>
      </div>
      <span class="badge ${badgeClass}">${badgeText}</span>
    </div>
    <p class="spotlight-summary">${part.summary[lang]}</p>
    <div class="spec-grid">${specsHtml}</div>
    <div class="price-strip">
      <div class="price-cell">
        <span>${t.newRetail}</span>
        <strong>${part.newPriceThb}</strong>
      </div>
      <div class="price-cell highlight">
        <span>${t.partOutEst}</span>
        <strong>${formatThb(part.estimateLow)} – ${formatThb(part.estimateHigh)}</strong>
      </div>
    </div>
    ${linksHtml}
  `;
}

function renderPartList(): void {
  partListEl.innerHTML = PC_PARTS.map((p) => {
    const active = p.id === selectedPartId ? 'active' : '';
    const dotClass = p.verified ? '' : 'unverified';
    return `
      <button class="part-item ${active}" data-part="${p.id}" type="button">
        <div class="part-item-left">
          <span class="part-item-cat">${p.category[lang]}</span>
          <span class="part-item-name">${p.shortName}</span>
        </div>
        <div class="part-item-right">
          <span class="part-item-price">${formatThb(p.estimateMid)}</span>
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

function renderPricingTab(): void {
  const t = I18N[lang];
  benchmarkBox.innerHTML = `
    <div class="section-heading">${t.benchmarksTitle}</div>
    ${WHOLE_PC_BENCHMARKS.map(
      (b) => `
      <div class="bench-item">
        <div class="bench-top">
          <strong>[${b.tag[lang]}] ${b.title[lang]}</strong>
          <span class="bench-price">${b.price}</span>
        </div>
        <div class="pricing-sub">${b.detail[lang]}</div>
        <div class="link-row">
          <a class="source-link" href="${b.url}" target="_blank" rel="noopener noreferrer">↗ ${
        lang === 'th' ? 'ดูลิงก์อ้างอิง' : 'Reference Link'
      }</a>
        </div>
      </div>`
    ).join('')}
  `;

  const verifiedParts = PC_PARTS.filter((p) => p.verified && !p.optionalBundle);
  const verifiedLow = verifiedParts.reduce((s, p) => s + p.estimateLow, 0);
  const verifiedHigh = verifiedParts.reduce((s, p) => s + p.estimateHigh, 0);

  const rowsHtml = PC_PARTS.filter((p) => !p.optionalBundle || monitorVisible)
    .map(
      (p) => `
      <div class="pricing-row-card">
        <div class="pricing-row-top">
          <strong>${p.shortName} ${p.verified ? '' : '⚠️'}</strong>
          <span class="est">${formatThb(p.estimateLow)} – ${formatThb(p.estimateHigh)}</span>
        </div>
        <div class="pricing-sub">${t.newRetail}: ${p.newPriceThb}</div>
        ${
          p.links.length
            ? `<div class="link-row">${p.links
                .map(
                  (l) =>
                    `<a class="source-link" href="${l.url}" target="_blank" rel="noopener noreferrer">↗ ${l.label}</a>`
                )
                .join('')}</div>`
            : ''
        }
      </div>`
    )
    .join('');

  pricingTableWrap.innerHTML = `
    <div class="section-heading">${t.verifiedPartOutTitle}</div>
    <div class="subtotal-card">
      <span>${lang === 'th' ? 'รวมชิ้นส่วนที่ตรวจพบแล้ว (ไม่รวม PSU/เคส/ซิงค์)' : 'Verified Core Parts Subtotal'}</span>
      <strong>${formatThb(verifiedLow)} – ${formatThb(verifiedHigh)}</strong>
    </div>
    ${rowsHtml}
  `;
}

function renderHealthTab(): void {
  healthContent.innerHTML = DIAGNOSTIC_METRICS.map(
    (m) => `
    <div class="health-card ${m.status}">
      <div class="health-top">
        <strong>${m.title[lang]}</strong>
        <span class="health-val">${m.value[lang]}</span>
      </div>
      <p class="health-note">${m.note[lang]}</p>
    </div>`
  ).join('');
}

function renderListingTab(): void {
  listingPreview.textContent = buildThaiListing(monitorVisible);
}

function updateDrawerToggleLabel(): void {
  const t = I18N[lang];
  drawerToggleLabel.textContent = drawer.classList.contains('open') ? t.drawerClose : t.drawerOpen;
}

function applyTranslations(): void {
  const t = I18N[lang];
  headerSub.textContent = t.headerSub;
  priceLabel.textContent = t.priceLabel;
  hintText.textContent = t.hintText;
  langLabel.textContent = lang === 'th' ? 'EN' : 'ไทย';

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as keyof typeof t;
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Dynamic button labels
  const glassTextEl = btnGlass.querySelector<HTMLElement>('[data-i18n="glassBtn"]');
  if (glassTextEl) glassTextEl.textContent = glassOpen ? t.glassBtnClosed : t.glassBtn;

  const coolerTextEl = btnCooler.querySelector<HTMLElement>('[data-i18n="coolerBtn"]');
  if (coolerTextEl) coolerTextEl.textContent = coolerHidden ? t.coolerBtnShow : t.coolerBtn;

  updateDrawerToggleLabel();
  updatePriceHeader();
  renderSpotlight();
  renderPartList();
  renderPricingTab();
  renderHealthTab();
  renderListingTab();
}

function selectPart(partId: PartId, flyCamera: boolean): void {
  selectedPartId = partId;
  const part = getPart(partId);

  if (partId === 'monitor' && !monitorVisible) {
    setMonitorState(true);
  }
  if (partId === 'cpu' && !coolerHidden && explodeValue < 0.3) {
    // Automatically hide cooler slightly or explode so buyer actually sees the i5-14400F!
    coolerHidden = true;
    stage.rig.setCoolerHidden(true);
    btnCooler.classList.add('active');
    applyTranslations();
  }

  stage.rig.setHighlightedPart(partId, true);
  if (flyCamera) {
    stage.flyTo(part.cameraPos, part.cameraTarget);
  }

  // Switch to inspect tab so buyer immediately sees details
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
  monitorBundleCheck.checked = visible;
  updatePriceHeader();
  renderPricingTab();
  renderListingTab();
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

monitorBundleCheck.addEventListener('change', () => {
  setMonitorState(monitorBundleCheck.checked);
  stage.resetCamera(monitorVisible);
});

btnRgb.addEventListener('click', () => {
  rgbIdx = (rgbIdx + 1) % rgbModes.length;
  const mode = rgbModes[rgbIdx];
  stage.rig.setRgbMode(mode);
  const labelMap: Record<RgbMode, string> = {
    cyan: 'RGB: Cyan',
    white: 'RGB: White',
    rainbow: 'RGB: Cycle',
    off: 'RGB: Off',
  };
  rgbLabel.textContent = labelMap[mode];
});

btnReset.addEventListener('click', () => {
  setExplode(0);
  stage.resetCamera(monitorVisible);
});

btnCopyListing.addEventListener('click', () => {
  void copyText(buildThaiListing(monitorVisible));
});

btnCopySpecs.addEventListener('click', () => {
  void copyText(buildShortSpecs(monitorVisible));
});

// Initial Render
stage.rig.setGlassOpen(true);
applyTranslations();
