export type Lang = 'th' | 'en';

export type PartId =
  | 'cpu'
  | 'gpu'
  | 'motherboard'
  | 'ram'
  | 'ssd_sn5000'
  | 'ssd_sn750'
  | 'hdd'
  | 'psu'
  | 'cooler'
  | 'case'
  | 'monitor';

export interface PriceLink {
  label: string;
  url: string;
}

export interface PcPart {
  id: PartId;
  category: { th: string; en: string };
  name: string;
  shortName: string;
  verified: boolean;
  optionalBundle?: boolean;
  statusTag: { th: string; en: string };
  summary: { th: string; en: string };
  specs: { label: { th: string; en: string }; value: string }[];
  newPriceThb: string;
  usedMarketThb: string;
  estimateLow: number;
  estimateMid: number;
  estimateHigh: number;
  links: PriceLink[];
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
}

/**
 * Editable Seller Configuration
 * Update these placeholders after checking physical hardware (PSU/Case/Cooler/Warranty/Contact).
 */
export const SELLER_CONFIG = {
  inspectionDate: '20 Nov 2026',
  askingPriceTower: 23900,
  realisticLow: 21500,
  realisticHigh: 23500,
  monitorBundleAddon: 3800,
  gpuVariantPlaceholder: '[ระบุรุ่นย่อย เช่น Dual OC / Prime OC]',
  psuPlaceholder: '[ระบุยี่ห้อ / รุ่น / กี่วัตต์ / 80+ เช่น 650W 80+ Bronze]',
  coolerPlaceholder: '[ระบุ เช่น ซิงค์เดิม Intel / ซิงค์ลม ... / ชุดน้ำปิด ...]',
  casePlaceholder: '[ระบุยี่ห้อ / รุ่น / สี / จำนวนพัดลม]',
  warrantyPlaceholder:
    '[ระบุประกันศูนย์ที่เหลือของแต่ละชิ้น เช่น การ์ดจอ/CPU/บอร์ด/SN5000 เหลือประกัน ... ถึงเดือน/ปี ... หรือ หมดประกันแล้ว]',
  boxPlaceholder: '[ระบุ เช่น มีกล่องครบบางชิ้น / ไม่มีกล่อง / มีใบเสร็จ ...]',
  conditionPlaceholder: '[ระบุสภาพจริง เช่น สภาพดี มีฝุ่นเล็กน้อย / มีรอยขนแมวตามการใช้งาน ...]',
  pickupLocation: '[ระบุพื้นที่/เขต/จังหวัด เช่น กทม. / ปริมณฑล]',
  shippingNote: '[ระบุว่าสะดวกส่งแมส/ขนส่งหรือไม่ เช่น เน้นนัดรับเป็นหลัก เพื่อความปลอดภัยของเครื่อง]',
  contactInfo: '[ระบุเบอร์โทร / Line ID]',
};

export const PC_PARTS: PcPart[] = [
  {
    id: 'gpu',
    category: { th: 'การ์ดจอ (GPU)', en: 'Graphics Card (GPU)' },
    name: 'ASUS NVIDIA GeForce RTX 5060 8GB GDDR7',
    shortName: 'ASUS RTX 5060 8GB',
    verified: true,
    statusTag: { th: 'ตรวจพบ ASUS (SubSys 1043:8A15)', en: 'Verified ASUS (1043:8A15)' },
    summary: {
      th: 'การ์ดจอสถาปัตยกรรม Blackwell 8GB GDDR7 ตรวจพบผู้ผลิต ASUS จาก PCI Subsystem ID และ VBIOS 98.06.40.40.95 อุณหภูมิ Idle 45–50°C พัดลม 0dB ทำงานปกติ (รุ่นย่อยซิงค์เช่น Dual OC/Prime กรุณาดูที่ตัวการ์ดจริง)',
      en: 'Blackwell architecture 8GB GDDR7 GPU. Verified ASUS board via PCI SubSystem ID 1043:8A15 and VBIOS 98.06.40.40.95. Healthy 45–50°C idle with 0dB fan stop. Visually verify exact shroud edition (Dual OC / Prime / EVO OC).',
    },
    specs: [
      { label: { th: 'ชิปกราฟิก / VRAM', en: 'Chip / VRAM' }, value: 'RTX 5060 (Blackwell) • 8GB GDDR7 (8151 MiB)' },
      { label: { th: 'รหัสผู้ผลิต / VBIOS', en: 'PCI SubSys / VBIOS' }, value: 'ASUS (1043:8A15) • VBIOS 98.06.40.40.95' },
      { label: { th: 'การเชื่อมต่อ / กำลังไฟ', en: 'Bus / Power Limit' }, value: 'PCIe Gen 4 x8 • 145W Default (160W Max)' },
      { label: { th: 'ผลตรวจ Idle', en: 'Idle Telemetry' }, value: '45–50°C • ~20W • 0% Fan (0dB Stop OK)' },
      { label: { th: 'ไดรเวอร์ล่าสุด', en: 'Driver' }, value: 'NVIDIA 621.14 (2026-10-27) • WDDM 3.2' },
    ],
    newPriceThb: '฿17,100 – ฿19,900 (OCZ ซีลใหม่ ~฿14,000–14,200)',
    usedMarketThb: '฿10,500 – ฿13,500',
    estimateLow: 11000,
    estimateMid: 11800,
    estimateHigh: 12500,
    links: [
      {
        label: 'Advice (Dual OC)',
        url: 'https://www.advice.co.th/product/graphic-card-vga-/nvidia-5000-series/vga-asus-geforce-rtx-5060-dual-o8g-oc-8gb-gddr7',
      },
      {
        label: 'JIB (Dual OC)',
        url: 'https://www.jib.co.th/web/product/readProduct/76790/51/VGA--%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B9%81%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%9C%E0%B8%A5--ASUS-DUAL-GEFORCE-RTX-5060-8GB-GDDR7-OC-EDITION',
      },
      {
        label: 'OCZ มือสอง',
        url: 'https://forum.overclockzone.com/forums/forum/marketplace/it-market/display-card/18737900-rtx-5060-8g-2-%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B8%9A',
      },
      {
        label: 'OCZ ASUS มือ 1',
        url: 'https://forum.overclockzone.com/forums/forum/marketplace/it-market/display-card/18738170-%E0%B8%82%E0%B8%B2%E0%B8%A2-asus-dual-rtx-5060-8g-%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88-%E0%B8%A1%E0%B8%B7%E0%B8%AD-1',
      },
    ],
    cameraPos: [2.2, 0.2, 2.3],
    cameraTarget: [0.05, -0.15, 0.05],
  },
  {
    id: 'cpu',
    category: { th: 'ซีพียู (CPU)', en: 'Processor (CPU)' },
    name: 'Intel Core i5-14400F',
    shortName: 'Intel i5-14400F',
    verified: true,
    statusTag: { th: 'ตรวจพบจริง • 10C/16T', en: 'Verified • 10C / 16T' },
    summary: {
      th: 'ซีพียู Intel Gen 14 แบบ 10 คอร์ (6P+4E) 16 เธรด ซ็อกเก็ต LGA 1700 ทำงานเสถียร ไม่มีปัญหาจอฟ้า (กดซ่อนซิงค์ CPU หรือแยกชิ้นส่วนเพื่อดูตัวชิปได้)',
      en: '14th Gen Intel Core 10-Core (6P+4E) / 16-Thread LGA 1700 processor. Stable with zero BSODs. Toggle "Hide CPU Cooler" or Exploded View to inspect the CPU IHS directly.',
    },
    specs: [
      { label: { th: 'คอร์ / เธรด', en: 'Cores / Threads' }, value: '10 Cores / 16 Threads' },
      { label: { th: 'ความเร็ว / แคช', en: 'Clock / L3 Cache' }, value: '2.5 GHz Base (up to 4.7 GHz Boost) • 20 MB L3' },
      { label: { th: 'ซ็อกเก็ต', en: 'Socket' }, value: 'LGA 1700 (U3E1) • No iGPU (F-series)' },
      { label: { th: 'ผลตรวจระบบ', en: 'Diagnostics' }, value: 'Passed CPU compute sanity check • 0 BSODs' },
    ],
    newPriceThb: '฿4,740 – ฿5,490',
    usedMarketThb: '฿3,500 – ฿4,500',
    estimateLow: 3700,
    estimateMid: 4000,
    estimateHigh: 4300,
    links: [
      { label: 'Advice', url: 'https://www.advice.co.th/product/cpu/intel-1700/cpu-intel-core-i5-14400f-lga-1700' },
      {
        label: 'JIB (Tray)',
        url: 'https://www.jib.co.th/web/product/readProduct/83307/CPU--%E0%B8%8B%E0%B8%B5%E0%B8%9E%E0%B8%B5%E0%B8%A2%E0%B8%B9--INTEL-CORE-I5-14400F---10C-16T-1-8-4-7GHz-20MB-INTEL-SOCKET-1700-TRAY-%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%83%E0%B8%99%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2',
      },
      {
        label: 'OCZ มือสอง (฿3,500)',
        url: 'https://forum.overclockzone.com/forums/forum/marketplace/it-market/cpu/18596694-%E0%B8%82%E0%B8%B2%E0%B8%A2-i5-14400f-%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%AA%E0%B8%AD%E0%B8%87-3500-%E0%B8%9A%E0%B8%B2%E0%B8%97',
      },
    ],
    cameraPos: [1.85, 0.72, 1.5],
    cameraTarget: [-0.08, 0.52, -0.25],
  },
  {
    id: 'motherboard',
    category: { th: 'เมนบอร์ด (Motherboard)', en: 'Motherboard' },
    name: 'Gigabyte B760M D3HP DDR4',
    shortName: 'Gigabyte B760M D3HP',
    verified: true,
    statusTag: { th: 'ตรวจพบจริง • BIOS F7', en: 'Verified • BIOS F7' },
    summary: {
      th: 'เมนบอร์ด Micro-ATX ชิปเซ็ต B760 รองรับแรม 4 สล็อต, M.2 NVMe 2 ช่อง, LAN 1Gbps (ไม่มี Wi-Fi/BT ในตัว) อัปเดต BIOS เวอร์ชัน F7 (ก.ย. 2025) แล้ว',
      en: 'Micro-ATX B760 board with 4 DDR4 DIMM slots, 2 M.2 NVMe slots, and Realtek 1Gbps Ethernet (no built-in Wi-Fi/BT). Updated to BIOS F7 (Sept 2025).',
    },
    specs: [
      { label: { th: 'ฟอร์มแฟกเตอร์ / ซ็อกเก็ต', en: 'Form Factor / Socket' }, value: 'Micro-ATX • LGA 1700 • DDR4 (4 Slots)' },
      { label: { th: 'เวอร์ชัน BIOS', en: 'BIOS Version' }, value: 'F7 (2025-09-19, UEFI)' },
      { label: { th: 'เครือข่าย / เสียง', en: 'Network / Audio' }, value: 'Realtek 1Gbps LAN (No Wi-Fi/BT) • Realtek HD Audio' },
      { label: { th: 'สล็อตจัดเก็บข้อมูล', en: 'Storage Slots' }, value: '2× M.2 NVMe (ทั้ง 2 ช่องใช้งานอยู่) + SATA' },
    ],
    newPriceThb: '฿2,570 – ฿2,790',
    usedMarketThb: '฿1,700 – ฿2,100',
    estimateLow: 1700,
    estimateMid: 1850,
    estimateHigh: 2000,
    links: [
      {
        label: 'Advice',
        url: 'https://www.advice.co.th/product/mainboard/intel-1700-b660-b760-/mainboard-1700-gigabyte-b760m-d3hp-ddr4-rev-1-0-',
      },
      {
        label: 'JIB',
        url: 'https://www.jib.co.th/web/product/readProduct/68861/2363/MAINBOARD--%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%94--GIGABYTE-B760M-D3HP-DDR4---INTEL-SOCKET-1700-DDR4-MICRO-ATX',
      },
      {
        label: 'iHAVECPU',
        url: 'https://ihavecpu.com/product/20139/mainboard-(%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%9A%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%94)(1700)-gigabyte-b760m-d3hp-ddr4-(rev.1.0)-(3y)',
      },
    ],
    cameraPos: [2.4, 0.55, 2.2],
    cameraTarget: [-0.05, 0.22, -0.3],
  },
  {
    id: 'ram',
    category: { th: 'แรม (RAM)', en: 'Memory (RAM)' },
    name: '32GB (4 × 8GB) Kingston HyperX Fury DDR4-2666',
    shortName: '32GB HyperX Fury DDR4',
    verified: true,
    statusTag: { th: 'ตรวจพบจริง • เต็ม 4 แถว', en: 'Verified • 4 × 8GB Kit' },
    summary: {
      th: 'แรมครบทั้ง 4 สล็อต รหัสตรงกันทุกแถว KHX2666C16/8G (สเปกโรงงาน 2666 MHz ปัจจุบันตั้งวิ่งที่ 2933 MHz @ 1.35V อย่างเสถียร)',
      en: 'All 4 DIMM slots populated with matching Kingston KHX2666C16/8G modules. Rated DDR4-2666 CL16, currently configured stably at 2933 MHz @ 1.35V in BIOS.',
    },
    specs: [
      { label: { th: 'ความจุรวม', en: 'Total Capacity' }, value: '32 GB (8GB × 4 sticks, Dual Channel)' },
      { label: { th: 'รหัสรุ่น', en: 'Part Number' }, value: 'Kingston KHX2666C16/8G (4× matching)' },
      { label: { th: 'ความเร็ว', en: 'Speed / Voltage' }, value: '2666 MHz Rated • Running 2933 MHz @ 1.35V' },
    ],
    newPriceThb: 'เลิกผลิต (DDR4 8GB มือ 1 รุ่นอื่น ~฿1,300–2,500/แถว)',
    usedMarketThb: '฿400 – ฿650/แถว (฿1,600 – ฿2,400 ชุด 4 แถว)',
    estimateLow: 1600,
    estimateMid: 1900,
    estimateHigh: 2200,
    links: [
      {
        label: 'JIB (Spec Ref)',
        url: 'https://www.jib.co.th/web/product/readProduct/26949/8GB---8GBx1---DDR4-2666-RAM-PC-KINGSTON-HyperX-FURY-BLACK---HX426C16FB2-8--',
      },
    ],
    cameraPos: [1.75, 0.72, 1.55],
    cameraTarget: [0.34, 0.5, -0.25],
  },
  {
    id: 'ssd_sn5000',
    category: { th: 'SSD #1 (NVMe Gen4)', en: 'SSD #1 (NVMe Gen4)' },
    name: 'WD Blue SN5000 1TB M.2 NVMe PCIe Gen4',
    shortName: 'WD Blue SN5000 1TB',
    verified: true,
    statusTag: { th: 'Healthy • 0 Errors', en: 'Healthy • 0 Errors' },
    summary: {
      th: 'SSD รุ่นใหม่ PCIe 4.0 ความจุ 1TB (ไดรฟ์ A:) สถานะ Windows Healthy ไม่มี Disk/NTFS Error (แนะนำตรวจ % สุขภาพด้วย CrystalDiskInfo แบบ Admin เพิ่มเติม)',
      en: 'Modern PCIe Gen4 1TB NVMe SSD (Drive A:). Windows Health reports Healthy with 0 errors. Recommend running CrystalDiskInfo as Admin to capture exact Wear % screenshot.',
    },
    specs: [
      { label: { th: 'รหัสรุ่น / Firmware', en: 'Model / Firmware' }, value: 'WD Blue SN5000 1TB (WDS100T4B0E) • FW 291000WD' },
      { label: { th: 'อินเทอร์เฟซ', en: 'Interface' }, value: 'M.2 2280 NVMe PCIe Gen4 x4' },
      { label: { th: 'สถานะสุขภาพ', en: 'Health Status' }, value: 'Healthy / OK (0 Event Errors • รอเช็ก % SMART Admin)' },
    ],
    newPriceThb: '฿3,990 – ฿5,990',
    usedMarketThb: '฿2,100 – ฿2,500',
    estimateLow: 2000,
    estimateMid: 2200,
    estimateHigh: 2400,
    links: [
      {
        label: 'JIB',
        url: 'https://www.jib.co.th/web/product/readProduct/72814/60/1-TB-SSD--%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B8%94%E0%B8%B5--WD-BLUE-SN5000---PCIe-4x4-NVMe-M-2-2280--WDS100T4B0E-',
      },
      {
        label: 'Advice',
        url: 'https://www.advice.co.th/product/ssd-solid-state-drive-/ssd-m-2-pcie-nvme-1-tb/1-tb-ssd-m-2-pcie-4-0-wd-sn5000-blue-wds100t4b0e-nvme',
      },
    ],
    cameraPos: [1.85, -0.32, 1.8],
    cameraTarget: [-0.02, -0.38, -0.25],
  },
  {
    id: 'ssd_sn750',
    category: { th: 'SSD #2 (ไดรฟ์ OS)', en: 'SSD #2 (OS Drive)' },
    name: 'WD_BLACK SN750 250GB M.2 NVMe PCIe Gen3',
    shortName: 'WD_BLACK SN750 250GB',
    verified: true,
    statusTag: { th: 'Healthy • OS Boot', en: 'Healthy • OS Boot' },
    summary: {
      th: 'SSD ระดับ Performance ซีรีส์ WD_BLACK สำหรับลง Windows 11 (ไดรฟ์ C:) สถานะ Healthy ปกติ ไม่มี Error',
      en: 'WD_BLACK NVMe SSD serving as the Windows 11 Pro OS boot drive (Drive C:). Windows status is Healthy with 0 errors.',
    },
    specs: [
      { label: { th: 'รหัสรุ่น / Firmware', en: 'Model / Firmware' }, value: 'WDS250G3X0C-00SJG0 • FW 111130WD' },
      { label: { th: 'อินเทอร์เฟซ', en: 'Interface' }, value: 'M.2 2280 NVMe PCIe Gen3 x4 (Boot / System)' },
      { label: { th: 'สถานะสุขภาพ', en: 'Health Status' }, value: 'Healthy / OK (0 Event Errors • รอเช็ก % SMART Admin)' },
    ],
    newPriceThb: 'เลิกผลิต (รุ่น Gen3 250GB)',
    usedMarketThb: '฿400 – ฿700',
    estimateLow: 400,
    estimateMid: 500,
    estimateHigh: 600,
    links: [],
    cameraPos: [1.75, 0.25, 1.65],
    cameraTarget: [-0.05, 0.14, -0.25],
  },
  {
    id: 'hdd',
    category: { th: 'ฮาร์ดดิสก์ (HDD)', en: 'Hard Drive (HDD)' },
    name: 'Seagate BarraCuda 1TB 3.5" SATA (7200 RPM)',
    shortName: 'Seagate BarraCuda 1TB',
    verified: true,
    statusTag: { th: 'Healthy • SATA 1TB', en: 'Healthy • SATA 1TB' },
    summary: {
      th: 'ฮาร์ดดิสก์จานหมุน 1TB แบ่งพาร์ทิชัน D: และ E: (พื้นที่ว่างเกือบเต็ม) สถานะ Healthy ปกติ แนะนำตรวจ Bad Sector / CrystalDiskInfo ก่อนส่งมอบ',
      en: '3.5" 7200 RPM 1TB SATA HDD split into Drives D: and E: (nearly empty). Windows status is Healthy; confirm Reallocated Sectors via CrystalDiskInfo before handoff.',
    },
    specs: [
      { label: { th: 'รหัสรุ่น / Firmware', en: 'Model / Firmware' }, value: 'ST1000DM010-2EP102 • FW CC43' },
      { label: { th: 'อินเทอร์เฟซ', en: 'Interface' }, value: 'SATA 6Gb/s • 3.5-inch • 7200 RPM' },
      { label: { th: 'สถานะสุขภาพ', en: 'Health Status' }, value: 'Healthy / OK (0 Event Errors • รอเช็ก Bad Sector)' },
    ],
    newPriceThb: 'รุ่นใหม่เทียบเคียง ST1000DM014 ~฿1,300–1,790',
    usedMarketThb: '฿350 – ฿550',
    estimateLow: 350,
    estimateMid: 400,
    estimateHigh: 500,
    links: [
      {
        label: 'JIB (Spec Ref)',
        url: 'https://www.jib.co.th/web/product/readProduct/57378/1-TB-3-5-INCH-HDD--%E0%B8%AE%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B8%94%E0%B8%B4%E0%B8%AA%E0%B8%81%E0%B9%8C-3-5-%E0%B8%99%E0%B8%B4%E0%B9%89%E0%B8%A7--SEAGATE-BARRACUDA---7200RPM-SATA3--ST1000DM010-',
      },
      {
        label: 'NextStep มือสอง',
        url: 'https://www.nextstepreborn.co.th/product/%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%AA%E0%B8%AD%E0%B8%87-hdd-1tb-sata-seagate-barracuda/',
      },
    ],
    cameraPos: [2.1, -0.95, 2.0],
    cameraTarget: [0.45, -1.02, 0.0],
  },
  {
    id: 'psu',
    category: { th: 'พาวเวอร์ซัพพลาย (PSU)', en: 'Power Supply (PSU)' },
    name: 'Power Supply (รอตรวจรุ่นจริงด้วยตาเปล่า)',
    shortName: 'PSU (Unverified)',
    verified: false,
    statusTag: { th: '⚠ ซอฟต์แวร์อ่านไม่ได้', en: '⚠ Unverified by Software' },
    summary: {
      th: 'ไม่สามารถอ่านยี่ห้อ/วัตต์/มาตรฐาน 80+ ผ่าน Windows ได้ กรุณาเปิดฝาเคสดูฉลากจริงก่อนโพสต์ขาย (ถ้าเป็นแบรนด์ดี 650W+ 80+ Bronze/Gold จะช่วยดันราคาขายได้ดี)',
      en: 'PSU brand, wattage, and 80+ efficiency rating cannot be detected via software. Inspect the physical PSU sticker before listing—a reputable 650W+ Bronze/Gold unit protects resale value.',
    },
    specs: [
      { label: { th: 'สถานะการตรวจ', en: 'Verification' }, value: 'Unverified — Check physical label' },
      { label: { th: 'ค่าประมาณรวมกับเคส/ซิงค์', en: 'Est. Bundle Value' }, value: '฿1,000 – ฿2,500 (PSU + Case + Cooler รวมกัน)' },
    ],
    newPriceThb: 'ขึ้นอยู่กับรุ่นและวัตต์จริง',
    usedMarketThb: 'รวมเคส+ซิงค์ ~฿1,000 – ฿2,500',
    estimateLow: 500,
    estimateMid: 900,
    estimateHigh: 1400,
    links: [],
    cameraPos: [-1.8, -0.9, 2.3],
    cameraTarget: [-0.45, -1.02, 0.0],
  },
  {
    id: 'cooler',
    category: { th: 'ชุดระบายความร้อน CPU', en: 'CPU Cooler' },
    name: 'CPU Cooler (รอตรวจรุ่นจริงด้วยตาเปล่า)',
    shortName: 'CPU Cooler (Unverified)',
    verified: false,
    statusTag: { th: '⚠ โมเดลจำลอง (รอตรวจจริง)', en: '⚠ Placeholder Model' },
    summary: {
      th: 'โมเดล 3 มิติแสดงเป็นซิงค์ลมแบบจำลอง กรุณาตรวจเช็กเครื่องจริงว่าเป็นซิงค์เดิม Intel, ซิงค์ลมแต่ง หรือชุดน้ำปิด (AIO)',
      en: '3D model displays a representative tower air cooler. Check physically whether the PC uses the Intel stock cooler, an aftermarket air tower, or an AIO liquid cooler.',
    },
    specs: [
      { label: { th: 'สถานะการตรวจ', en: 'Verification' }, value: 'Unverified — Check physically' },
      { label: { th: 'ผลกระทบต่อราคา', en: 'Price Impact' }, value: 'ซิงค์แต่ง/ชุดน้ำปิดช่วยเพิ่มมูลค่า +฿500–฿1,500' },
    ],
    newPriceThb: 'ขึ้นอยู่กับรุ่นจริง',
    usedMarketThb: '฿0 (ซิงค์เดิม) – ฿1,200+ (AIO)',
    estimateLow: 0,
    estimateMid: 350,
    estimateHigh: 800,
    links: [],
    cameraPos: [1.85, 0.78, 1.9],
    cameraTarget: [-0.08, 0.52, 0.0],
  },
  {
    id: 'case',
    category: { th: 'เคสคอมพิวเตอร์ (Case)', en: 'PC Case' },
    name: 'Mid-Tower Case (รอตรวจรุ่นจริงด้วยตาเปล่า)',
    shortName: 'PC Case (Unverified)',
    verified: false,
    statusTag: { th: '⚠ โมเดลจำลอง (รอตรวจจริง)', en: '⚠ Representative Model' },
    summary: {
      th: 'โมเดล 3 มิติแสดงเคสกระจกข้างแบบจำลองเพื่อให้ผู้ซื้อสำรวจตำแหน่งชิ้นส่วนภายในได้ง่าย กรุณาถ่ายรูปเคสจริงแนบในประกาศขายด้วย',
      en: 'Representative tempered-glass mid-tower shown so buyers can inspect internal layout clearly. Attach real photos of your actual PC case, dust state, and fans in your listing.',
    },
    specs: [
      { label: { th: 'สถานะการตรวจ', en: 'Verification' }, value: 'Unverified — Attach real case photos' },
      { label: { th: 'จุดที่ควรตรวจ', en: 'Check Before Sale' }, value: 'รอยขีดข่วน, กระจกข้าง, จำนวน/เสียงพัดลม, พอร์ตหน้าเคส' },
    ],
    newPriceThb: 'ขึ้นอยู่กับรุ่นจริง',
    usedMarketThb: '฿400 – ฿1,200',
    estimateLow: 400,
    estimateMid: 650,
    estimateHigh: 1000,
    links: [],
    cameraPos: [3.2, 0.9, 3.6],
    cameraTarget: [0, 0, 0],
  },
  {
    id: 'monitor',
    category: { th: 'จอแยก (ออปชันขายพ่วง)', en: 'External Monitor (Optional)' },
    name: 'Dahua LM30-E330CA (30" Curved 200Hz)',
    shortName: 'Dahua 30" 200Hz (Optional)',
    verified: true,
    optionalBundle: true,
    statusTag: { th: 'ตรวจพบ EDID • ปี 2023', en: 'Detected via EDID • 2023' },
    summary: {
      th: 'จอมอนิเตอร์เกมมิ่งโค้ง Ultrawide 30 นิ้ว ความละเอียด 2560×1080 (21:9) รีเฟรชเรต 200Hz พาเนล VA *ไม่ได้รวมอยู่ในราคาตั้งขายตัวเครื่อง ฿23,900 แต่สามารถเลือกขายพ่วงเพิ่ม +฿3,800 ได้*',
      en: '30-inch 21:9 Curved VA Ultrawide monitor (2560×1080 @ 200Hz, manufactured 2023). Excluded from the ฿23,900 tower-only price; optional bundle add-on +฿3,800.',
    },
    specs: [
      { label: { th: 'รุ่น / ปีผลิต', en: 'Model / Year' }, value: 'Dahua LM30-E330CA (DHI) • 2023' },
      { label: { th: 'ความละเอียด / รีเฟรชเรต', en: 'Resolution / Refresh' }, value: '2560 × 1080 (WFHD 21:9) @ 200 Hz' },
      { label: { th: 'การเชื่อมต่อปัจจุบัน', en: 'Active Output' }, value: 'DisplayPort (จาก RTX 5060)' },
    ],
    newPriceThb: '฿5,610 – ฿6,500',
    usedMarketThb: '฿3,500 – ฿4,500',
    estimateLow: 3500,
    estimateMid: 3800,
    estimateHigh: 4500,
    links: [
      {
        label: 'Advice',
        url: 'https://www.advice.co.th/product/curved-monitor/curved-monitor/monitor-30-dahua-lm30-e330ca-va-hdmi-dp-curved-2k-200hz',
      },
    ],
    cameraPos: [-3.2, 0.85, 3.9],
    cameraTarget: [-2.15, 0.12, -0.15],
  },
];

export const WHOLE_PC_BENCHMARKS = [
  {
    title: { th: 'เครื่องมือหนึ่ง JIB MARU-2507052 (สเปกสูงกว่าเป็น DDR5)', en: 'Brand-New JIB MARU-2507052 (DDR5 Set)' },
    detail: {
      th: 'i5-14400F / B760M DDR5 / 32GB DDR5-5600 / RTX 5060 8GB / M.2 1TB (ประกัน 3 ปี ผ่อน 0%)',
      en: 'i5-14400F / B760M DDR5 / 32GB DDR5-5600 / RTX 5060 8GB / 1TB NVMe (3Y Warranty)',
    },
    price: '฿29,490',
    tag: { th: 'มือหนึ่ง', en: 'NEW' },
    url: 'https://www.jib.co.th/web/product/readProduct/78151/COMPUTER-SET-JIB-MARU-2507052-I5-14400F---RTX-5060-8GB---B760M---32GB-DDR5---M-2-1TB',
  },
  {
    title: { th: 'คอมประกอบมือสอง Shopee (สเปกใกล้เคียงแต่ RAM 16GB)', en: 'Comparable Used PC on Shopee (16GB RAM)' },
    detail: {
      th: 'i5-14400F / B760M DDR4 / 16GB DDR4-3200 / 256GB+500GB NVMe / RTX 5060 8GB / 650W 80+ Bronze',
      en: 'i5-14400F / B760M DDR4 / 16GB DDR4-3200 / 256+500GB NVMe / RTX 5060 8GB / 650W Bronze',
    },
    price: '฿20,000 – ฿24,000',
    tag: { th: 'มือสอง', en: 'USED' },
    url: 'https://shopee.co.th/%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%95-%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%AA%E0%B8%AD%E0%B8%87-Spec-I5-14400f-RTX-5060-8gb-B760M-DDR4-Ram-16gb(8*2)-bus-3200-M.2-256-500gb-650w-80-bronze-i.167048533.56113818472',
  },
];

export const DIAGNOSTIC_METRICS = [
  {
    status: 'ok' as const,
    title: { th: 'DirectX Diagnostics (dxdiag)', en: 'DirectX Diagnostics (dxdiag)' },
    value: { th: 'ผ่านทั้งหมด (No problems found)', en: 'Passed (No problems found)' },
    note: {
      th: 'ตรวจ Display, Sound 5 ช่องทาง และ Input ไม่พบข้อผิดพลาด รองรับ DirectX 12_2 / WDDM 3.2',
      en: 'Display, 5 Sound devices, and Input all reported zero problems. DirectX 12_2 / WDDM 3.2 active.',
    },
  },
  {
    status: 'ok' as const,
    title: { th: 'เสถียรภาพและประวัติจอฟ้า (90 วัน)', en: 'Crash & BSOD History (90 Days)' },
    value: { th: '0 จอฟ้า • Uptime 7.7 วันต่อเนื่อง', en: '0 BSODs • 7.7 Days Uptime' },
    note: {
      th: 'ไม่พบ BugCheck, ไม่พบ Kernel-Power 41 (เครื่องดับเอง), ไม่มีไฟล์ Minidump และ 0 Device Manager Errors',
      en: 'Zero BugChecks, zero Kernel-Power 41 unexpected shutdowns, no minidumps, zero Device Manager errors.',
    },
  },
  {
    status: 'ok' as const,
    title: { th: 'การ์ดจอ ASUS RTX 5060 Telemetry', en: 'ASUS RTX 5060 Telemetry' },
    value: { th: 'Idle 45–50°C • ~20W • 0dB Fan', en: '45–50°C Idle • ~20W • 0dB Fan' },
    note: {
      th: 'ระบบหยุดพัดลมอัตโนมัติเมื่อไม่โหลดหนักทำงานปกติ ลิงก์ PCIe Gen4 x8 เต็มสเปก',
      en: 'Zero-RPM fan stop active at idle, PCIe Gen4 x8 link negotiated cleanly, 8151 MiB VRAM healthy.',
    },
  },
  {
    status: 'ok' as const,
    title: { th: 'สถานะไดรฟ์จัดเก็บข้อมูล (3 ลูก)', en: 'Storage Drives Status (3 Drives)' },
    value: { th: 'Healthy / OK ทั้ง 3 ลูก • 0 Disk Errors', en: 'All 3 Healthy / OK • 0 Disk Errors' },
    note: {
      th: 'WD Blue SN5000 1TB, WD_BLACK SN750 250GB และ Seagate 1TB ไม่มี Disk/NVMe/NTFS Error ใน System Log',
      en: 'WD Blue SN5000 1TB, WD_BLACK SN750 250GB, and Seagate 1TB show zero Disk/NVMe/NTFS errors.',
    },
  },
  {
    status: 'warn' as const,
    title: { th: 'SMART เชิงลึก (Wear % / ชั่วโมงใช้งาน)', en: 'Deep SMART (Wear % / Power-On Hours)' },
    value: { th: 'ต้องรัน CrystalDiskInfo แบบ Admin', en: 'Requires Admin CrystalDiskInfo' },
    note: {
      th: 'การตรวจครั้งนี้รันแบบ Non-Admin เพื่อความปลอดภัย จึงยังอ่านค่า % สึกหรอไม่ได้ แนะนำแคปหน้าจอ CrystalDiskInfo แนบก่อนโพสต์ขาย',
      en: 'This inspection ran safely without Admin elevation, so raw SMART wear % and power-on hours were blocked by Windows. Run CrystalDiskInfo as Admin for buyer screenshots.',
    },
  },
  {
    status: 'info' as const,
    title: { th: 'บันทึกเพิ่มเติม (โปร่งใส)', en: 'Transparent Notes' },
    value: { th: '5 WHEA-17 (แก้ไขเองได้) • Win11 MAK', en: '5 Corrected WHEA-17 • Win11 MAK' },
    note: {
      th: 'พบ WHEA-Logger ID 17 (PCIe AER ระดับ Warning ที่ระบบแก้ไขอัตโนมัติ ไม่กระทบการใช้งาน) 5 ครั้งล่าสุดเมื่อ 3 พ.ย. 2026 และ Windows 11 Pro เป็นคีย์แบบ VOLUME_MAK (ไม่ควรโฆษณาว่าแถมคีย์แท้กล่อง) แรม DDR4-2666 ตั้งวิ่งอยู่ที่ 2933 MHz @ 1.35V',
      en: '5 non-fatal corrected PCIe AER warnings on PEG10 (last seen Nov 3, 17 days ago). Windows 11 Pro is activated via VOLUME_MAK (do not advertise as transferable retail key). DDR4-2666 RAM is configured at 2933 MHz @ 1.35V.',
    },
  },
];

export function buildThaiListing(includeMonitor: boolean): string {
  const totalAsk = includeMonitor
    ? SELLER_CONFIG.askingPriceTower + SELLER_CONFIG.monitorBundleAddon
    : SELLER_CONFIG.askingPriceTower;

  const title = includeMonitor
    ? `คอมเกมมิ่งมือสอง + จอโค้ง 30" 200Hz | i5-14400F / ASUS RTX 5060 8GB / RAM 32GB / SSD 1.25TB + HDD 1TB`
    : `คอมเกมมิ่งมือสอง i5-14400F / ASUS RTX 5060 8GB / RAM 32GB / SSD M.2 1.25TB + HDD 1TB พร้อมใช้งาน`;

  const monitorLine = includeMonitor
    ? `\n• จอมอนิเตอร์ (รวมในชุด): Dahua LM30-E330CA 30" โค้ง VA 2560x1080 200Hz (Ultrawide 21:9)`
    : '';

  const scopeLine = includeMonitor
    ? `(รวมตัวเครื่อง + จอ Dahua 30" 200Hz ไม่รวมเมาส์/คีย์บอร์ด)`
    : `(เฉพาะตัวเครื่อง ไม่รวมจอ/เมาส์/คีย์บอร์ด *หากรับพร้อมจอ Dahua 30" โค้ง 200Hz เพิ่ม ${SELLER_CONFIG.monitorBundleAddon.toLocaleString()} บาท*)`;

  return `${title}

ราคา: ${totalAsk.toLocaleString()} บาท (ต่อรองได้เล็กน้อยสำหรับท่านที่พร้อมนัดรับ)

ขายคอมพิวเตอร์ประกอบมือสอง สเปกแรง เล่นเกม Full HD / 2K ลื่นๆ ทำงานตัดต่อได้สบาย ${scopeLine}

📌 สเปกเครื่อง:
• CPU: Intel Core i5-14400F (10 Core / 16 Thread, LGA 1700)
• การ์ดจอ (GPU): ASUS NVIDIA GeForce RTX 5060 8GB GDDR7 ${SELLER_CONFIG.gpuVariantPlaceholder}
• เมนบอร์ด (MB): Gigabyte B760M D3HP DDR4 (BIOS เวอร์ชัน F7)
• แรม (RAM): 32GB (8GB x 4) Kingston HyperX Fury DDR4 Bus 2666 MHz
• SSD #1: WD Blue SN5000 1TB M.2 NVMe PCIe Gen4
• SSD #2 (ลงวินโดวส์): WD_BLACK SN750 250GB M.2 NVMe
• HDD: Seagate BarraCuda 1TB 7200RPM (SATA)${monitorLine}
• พาวเวอร์ซัพพลาย (PSU): ${SELLER_CONFIG.psuPlaceholder}
• ชุดระบายความร้อน CPU: ${SELLER_CONFIG.coolerPlaceholder}
• เคส (Case): ${SELLER_CONFIG.casePlaceholder}
• การเชื่อมต่อ: LAN 1Gbps (ไม่มี Wi-Fi / Bluetooth ในตัว)
• ระบบปฏิบัติการ: ลง Windows 11 Pro พร้อมใช้งาน (ล้างข้อมูลสะอาดก่อนส่งมอบ)

✅ ผลการตรวจเช็กเครื่องเบื้องต้น:
• ใช้งานปกติ เสถียร ไม่มีจอฟ้า ไม่มีปัญหา Device Error
• การ์ดจออุณหภูมิปกติ (Idle ~45-50°C ระบบพัดลมหยุดหมุนเมื่อไม่ทำงานหนัก)
• ไดรฟ์จัดเก็บข้อมูลทั้ง 3 ลูกสถานะ Healthy ปกติ [แนบภาพผลเทส CrystalDiskInfo]
• อุปกรณ์/กล่อง: ${SELLER_CONFIG.boxPlaceholder}
• ประกันศูนย์: ${SELLER_CONFIG.warrantyPlaceholder}
• สภาพภายนอก: ${SELLER_CONFIG.conditionPlaceholder}

📍 การนัดรับ / จัดส่ง:
• นัดรับและเทสเครื่องก่อนจ่ายเงินได้ที่ ${SELLER_CONFIG.pickupLocation}
• ยินดีให้เปิดเทสเกม / เช็กสเปก / ตรวจ CrystalDiskInfo หน้าเครื่องจนพอใจ
• ${SELLER_CONFIG.shippingNote}

📞 สนใจทักแชทสอบถามเพิ่มเติม หรือขอรูป/วิดีโอเทสเครื่องได้ครับ
ติดต่อ: ${SELLER_CONFIG.contactInfo}`;
}

export function buildShortSpecs(includeMonitor: boolean): string {
  const lines = [
    'CPU: Intel Core i5-14400F (10C/16T)',
    `GPU: ASUS GeForce RTX 5060 8GB GDDR7 ${SELLER_CONFIG.gpuVariantPlaceholder}`,
    'MB: Gigabyte B760M D3HP DDR4 (BIOS F7)',
    'RAM: 32GB (8GBx4) Kingston HyperX Fury DDR4-2666',
    'SSD 1: WD Blue SN5000 1TB NVMe Gen4',
    'SSD 2: WD_BLACK SN750 250GB NVMe',
    'HDD: Seagate BarraCuda 1TB SATA 7200RPM',
    `PSU / Case / Cooler: ${SELLER_CONFIG.psuPlaceholder}`,
  ];
  if (includeMonitor) {
    lines.push('Monitor: Dahua LM30-E330CA 30" Curved 2560x1080 200Hz');
  }
  return lines.join('\n');
}

export const I18N = {
  th: {
    headerSub: 'RAM 32GB • NVMe 1.25TB + HDD 1TB • ตรวจเช็กได้ทุกชิ้น',
    priceLabel: 'ราคาตั้งขายแนะนำ',
    hintText: 'ลากเพื่อหมุน • ซูมเข้าออก • คลิกชิ้นส่วนในเครื่องเพื่อดูสเปกและราคา',
    glassBtn: 'เปิดฝาข้าง',
    glassBtnClosed: 'ปิดฝาข้าง',
    explodeBtn: 'แยกชิ้นส่วน',
    coolerBtn: 'ซ่อนซิงค์ CPU',
    coolerBtnShow: 'แสดงซิงค์ CPU',
    monitorBtn: 'ดูพร้อมจอ 30"',
    resetBtn: 'รีเซ็ตมุมมอง',
    explodeSlider: 'ระยะแยกชิ้นส่วน (Exploded View)',
    tabInspect: 'ชิ้นส่วน',
    tabPricing: 'เทียบราคาไทย',
    tabHealth: 'ผลเทส',
    tabListing: 'ประกาศขาย',
    badgeVerified: '✓ ตรวจจากระบบแล้ว',
    badgeUnverified: '⚠ รอตรวจด้วยตาเปล่า',
    askingLabel: 'ราคาตั้งขายแนะนำ (Facebook Marketplace)',
    bundleMonitorLabel: 'บวกจอ Dahua LM30-E330CA 30" โค้ง 200Hz (+฿3,800)',
    copyListingBtn: '📋 คัดลอกประกาศภาษาไทย',
    copySpecsBtn: 'คัดลอกเฉพาะสเปก',
    sellerConfigTitle: 'หมายเหตุสำหรับผู้ขาย (แก้ไขได้ใน src/data/pcData.ts)',
    sellerConfigDesc:
      'ข้อมูลในวงเล็บ [ระบุ...] คือส่วนที่ซอฟต์แวร์ตรวจไม่ได้ (PSU, เคส, ซิงค์, ประกัน, ช่องทางติดต่อ) กรุณาตรวจด้วยตาเปล่าและเติมก่อนโพสต์จริง',
    newRetail: 'ราคามือหนึ่งไทย',
    usedMarket: 'ตลาดมือสองไทย',
    partOutEst: 'ประเมินขายแยก',
    verifiedPartOutTitle: 'ประเมินราคาขายแยกชิ้น vs ขายยกเครื่อง',
    benchmarksTitle: 'เทียบราคาตลาดไทย (เครื่องทั้งชุด)',
    copiedMsg: 'คัดลอกข้อความเรียบร้อยแล้ว!',
    focusBtn: 'ซูมดูชิ้นนี้',
    drawerOpen: 'ข้อมูล/ราคา',
    drawerClose: 'ปิดแผง',
  },
  en: {
    headerSub: '32GB RAM • 1.25TB NVMe + 1TB HDD • Interactive Buyer Inspection',
    priceLabel: 'Suggested Ask',
    hintText: 'Drag to orbit • Scroll to zoom • Click any component inside to inspect specs & Thai pricing',
    glassBtn: 'Open Glass',
    glassBtnClosed: 'Close Glass',
    explodeBtn: 'Exploded View',
    coolerBtn: 'Hide Cooler',
    coolerBtnShow: 'Show Cooler',
    monitorBtn: '+30" Monitor',
    resetBtn: 'Reset View',
    explodeSlider: 'Exploded View Distance',
    tabInspect: 'Parts',
    tabPricing: 'Thai Prices',
    tabHealth: 'Diagnostics',
    tabListing: 'Listing',
    badgeVerified: '✓ Software Verified',
    badgeUnverified: '⚠ Verify Physically',
    askingLabel: 'Suggested Asking Price (Thai FB Marketplace)',
    bundleMonitorLabel: 'Bundle Dahua LM30-E330CA 30" 200Hz Monitor (+฿3,800)',
    copyListingBtn: '📋 Copy Thai Listing',
    copySpecsBtn: 'Copy Specs Only',
    sellerConfigTitle: 'Seller Note (Editable in src/data/pcData.ts)',
    sellerConfigDesc:
      'Bracketed [ระบุ...] fields cannot be read via software (PSU, case, cooler, warranty, contact). Verify physically and fill them in before posting.',
    newRetail: 'Thai New Retail',
    usedMarket: 'Thai Used Market',
    partOutEst: 'Part-Out Est.',
    verifiedPartOutTitle: 'Part-Out Breakdown (THB)',
    benchmarksTitle: 'Comparable Whole-PC Benchmarks (Thailand)',
    copiedMsg: 'Copied to clipboard!',
    focusBtn: 'Focus 3D',
    drawerOpen: 'Inspect',
    drawerClose: 'Close',
  },
};
