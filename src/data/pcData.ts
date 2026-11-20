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

export interface PcPart {
  id: PartId;
  category: { th: string; en: string };
  name: string;
  shortName: string;
  highlightTag: string;
  verified: boolean;
  optionalBundle?: boolean;
  image?: string;
  imageCaption?: { th: string; en: string };
  statusTag: { th: string; en: string };
  summary: { th: string; en: string };
  specs: { label: { th: string; en: string }; value: string }[];
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
}

/**
 * Editable Seller Info (No prices shown to buyers here — manage pricing in your Marketplace post/chat).
 * To replace reference images with your real PC photos, drop files into public/images/parts/
 * (e.g., case.jpg, psu.jpg, cooler.jpg) and set image: './images/parts/case.jpg' below.
 */
export const SELLER_INFO = {
  inspectionDate: '20 Nov 2026',
  gpuVariantNote: 'ASUS RTX 5060 8GB (PCI SubSys 1043:8A15)',
  psuNote: { th: 'สอบถามยี่ห้อ/วัตต์จริงจากผู้ขาย', en: 'Ask seller for exact PSU model & wattage' },
  coolerNote: { th: 'สอบถามรุ่นซิงค์จริงจากผู้ขาย', en: 'Ask seller for exact CPU cooler model' },
  caseNote: { th: 'ขอดูรูปเคสจริงและสภาพภายนอกได้ทางแชท', en: 'Ask seller for actual case photos via chat' },
};

export const PC_PARTS: PcPart[] = [
  {
    id: 'gpu',
    category: { th: 'การ์ดจอ (GPU)', en: 'Graphics Card (GPU)' },
    name: 'ASUS NVIDIA GeForce RTX 5060 8GB GDDR7',
    shortName: 'ASUS RTX 5060 8GB',
    highlightTag: '8GB GDDR7',
    verified: true,
    image: './images/parts/gpu.jpg',
    imageCaption: {
      th: 'ภาพสินค้าอ้างอิง ASUS Dual RTX 5060 8GB • ตรวจพบ ASUS จาก PCI ID 1043:8A15',
      en: 'Reference photo: ASUS Dual RTX 5060 8GB • Verified ASUS via PCI ID 1043:8A15',
    },
    statusTag: { th: 'ตรวจพบ ASUS (1043:8A15)', en: 'Verified ASUS (1043:8A15)' },
    summary: {
      th: 'การ์ดจอสถาปัตยกรรม Blackwell หน่วยความจำ 8GB GDDR7 ตรวจพบผู้ผลิต ASUS จาก PCI Subsystem ID และ VBIOS 98.06.40.40.95 อุณหภูมิ Idle 45–50°C ระบบพัดลมหยุดหมุนอัตโนมัติ (0dB) ทำงานปกติ',
      en: 'Blackwell architecture 8GB GDDR7 graphics card. Verified ASUS board via PCI SubSystem ID 1043:8A15 and VBIOS 98.06.40.40.95. Runs cool at 45–50°C idle with 0dB zero-RPM fan mode active.',
    },
    specs: [
      { label: { th: 'ชิปกราฟิก / VRAM', en: 'Chip / VRAM' }, value: 'RTX 5060 (Blackwell) • 8GB GDDR7 (8151 MiB)' },
      { label: { th: 'รหัสผู้ผลิต / VBIOS', en: 'PCI SubSys / VBIOS' }, value: 'ASUS (1043:8A15) • VBIOS 98.06.40.40.95' },
      { label: { th: 'การเชื่อมต่อ / กำลังไฟ', en: 'Bus / Power Limit' }, value: 'PCIe Gen 4 x8 • 145W Default (160W Max)' },
      { label: { th: 'อุณหภูมิ / พัดลม Idle', en: 'Idle Telemetry' }, value: '45–50°C • ~20W • 0% Fan (0dB Stop OK)' },
      { label: { th: 'ไดรเวอร์ปัจจุบัน', en: 'Driver' }, value: 'NVIDIA 621.14 (2026-10-27) • WDDM 3.2' },
    ],
    cameraPos: [2.2, 0.2, 2.3],
    cameraTarget: [0.05, -0.15, 0.05],
  },
  {
    id: 'cpu',
    category: { th: 'ซีพียู (CPU)', en: 'Processor (CPU)' },
    name: 'Intel Core i5-14400F',
    shortName: 'Intel i5-14400F',
    highlightTag: '10C / 16T',
    verified: true,
    image: './images/parts/cpu.jpg',
    imageCaption: {
      th: 'ภาพสินค้าอ้างอิง Intel Core i5-14400F (LGA 1700)',
      en: 'Reference photo: Intel Core i5-14400F (LGA 1700)',
    },
    statusTag: { th: 'ตรวจพบจริง • 10C/16T', en: 'Verified • 10C / 16T' },
    summary: {
      th: 'ซีพียู Intel Gen 14 แบบ 10 คอร์ (6P + 4E) 16 เธรด ซ็อกเก็ต LGA 1700 เล่นเกมและทำงานตัดต่อลื่นไหล เสถียร 0 จอฟ้า (ซ่อนซิงค์ CPU หรือแยกชิ้นส่วนเพื่อดูตัวชิป 3 มิติได้)',
      en: '14th Gen Intel Core 10-Core (6P+4E) / 16-Thread LGA 1700 processor. Smooth for gaming and multitasking with zero BSODs. Hide CPU cooler or use Exploded View to inspect the CPU directly.',
    },
    specs: [
      { label: { th: 'คอร์ / เธรด', en: 'Cores / Threads' }, value: '10 Cores / 16 Threads' },
      { label: { th: 'ความเร็ว / แคช', en: 'Clock / L3 Cache' }, value: '2.5 GHz Base (up to 4.7 GHz Boost) • 20 MB L3' },
      { label: { th: 'ซ็อกเก็ต', en: 'Socket' }, value: 'LGA 1700 (U3E1) • F-Series' },
      { label: { th: 'เสถียรภาพ', en: 'Stability' }, value: 'Passed check • 0 BSODs / 7.7d uptime' },
    ],
    cameraPos: [1.85, 0.72, 1.5],
    cameraTarget: [-0.08, 0.52, -0.25],
  },
  {
    id: 'motherboard',
    category: { th: 'เมนบอร์ด (Motherboard)', en: 'Motherboard' },
    name: 'Gigabyte B760M D3HP DDR4',
    shortName: 'Gigabyte B760M D3HP',
    highlightTag: 'BIOS F7',
    verified: true,
    image: './images/parts/motherboard.jpg',
    imageCaption: {
      th: 'ภาพสินค้าอ้างอิง Gigabyte B760M D3HP DDR4 (Micro-ATX)',
      en: 'Reference photo: Gigabyte B760M D3HP DDR4 (Micro-ATX)',
    },
    statusTag: { th: 'ตรวจพบจริง • BIOS F7', en: 'Verified • BIOS F7' },
    summary: {
      th: 'เมนบอร์ด Micro-ATX ชิปเซ็ต B760 แรม 4 สล็อต, M.2 NVMe 2 ช่อง, LAN 1Gbps (เชื่อมต่อสาย LAN ไม่มี Wi-Fi/BT ในตัว) อัปเดต BIOS เวอร์ชัน F7 แล้ว',
      en: 'Micro-ATX B760 motherboard with 4 DDR4 slots, 2 M.2 NVMe slots, and Realtek 1Gbps Ethernet (wired LAN; no built-in Wi-Fi/BT). Updated to BIOS F7 (Sept 2025).',
    },
    specs: [
      { label: { th: 'ฟอร์มแฟกเตอร์ / ซ็อกเก็ต', en: 'Form Factor / Socket' }, value: 'Micro-ATX • LGA 1700 • DDR4 (4 Slots)' },
      { label: { th: 'เวอร์ชัน BIOS', en: 'BIOS Version' }, value: 'F7 (2025-09-19, UEFI)' },
      { label: { th: 'เครือข่าย / เสียง', en: 'Network / Audio' }, value: 'Realtek 1Gbps LAN (No Wi-Fi/BT) • Realtek HD Audio' },
      { label: { th: 'สล็อตจัดเก็บข้อมูล', en: 'Storage Slots' }, value: '2× M.2 NVMe (ทั้ง 2 ช่องใช้งานอยู่) + SATA' },
    ],
    cameraPos: [2.4, 0.55, 2.2],
    cameraTarget: [-0.05, 0.22, -0.3],
  },
  {
    id: 'ram',
    category: { th: 'แรม (RAM)', en: 'Memory (RAM)' },
    name: '32GB (4 × 8GB) Kingston HyperX Fury DDR4-2666',
    shortName: '32GB HyperX Fury',
    highlightTag: '4 × 8GB',
    verified: true,
    image: './images/parts/ram.jpg',
    imageCaption: {
      th: 'ภาพสินค้าอ้างอิง Kingston HyperX Fury DDR4 (ติดตั้งครบ 4 แถว รวม 32GB)',
      en: 'Reference photo: Kingston HyperX Fury DDR4 (4 matching 8GB sticks = 32GB)',
    },
    statusTag: { th: 'ตรวจพบจริง • เต็ม 4 แถว', en: 'Verified • 4 × 8GB Kit' },
    summary: {
      th: 'แรมความจุรวม 32GB เต็มทั้ง 4 สล็อต รหัสตรงกันทุกแถว KHX2666C16/8G (สเปกเดิม 2666 MHz ปัจจุบันตั้งวิ่งที่ 2933 MHz @ 1.35V อย่างเสถียร)',
      en: 'Full 32GB memory across all 4 DIMM slots with matching Kingston KHX2666C16/8G modules. Rated DDR4-2666 CL16, running stably at 2933 MHz @ 1.35V.',
    },
    specs: [
      { label: { th: 'ความจุรวม', en: 'Total Capacity' }, value: '32 GB (8GB × 4 sticks, Dual Channel)' },
      { label: { th: 'รหัสรุ่น', en: 'Part Number' }, value: 'Kingston KHX2666C16/8G (4× matching)' },
      { label: { th: 'ความเร็ว / ไฟเลี้ยง', en: 'Speed / Voltage' }, value: '2666 MHz Rated • Active 2933 MHz @ 1.35V' },
    ],
    cameraPos: [1.75, 0.72, 1.55],
    cameraTarget: [0.34, 0.5, -0.25],
  },
  {
    id: 'ssd_sn5000',
    category: { th: 'SSD #1 (NVMe Gen4)', en: 'SSD #1 (NVMe Gen4)' },
    name: 'WD Blue SN5000 1TB M.2 NVMe PCIe Gen4',
    shortName: 'WD Blue SN5000 1TB',
    highlightTag: '1TB Gen4',
    verified: true,
    image: './images/parts/ssd_sn5000.jpg',
    imageCaption: {
      th: 'ภาพสินค้าอ้างอิง WD Blue SN5000 1TB M.2 NVMe PCIe 4.0',
      en: 'Reference photo: WD Blue SN5000 1TB M.2 NVMe PCIe 4.0',
    },
    statusTag: { th: 'Healthy • 0 Errors', en: 'Healthy • 0 Errors' },
    summary: {
      th: 'SSD M.2 NVMe PCIe Gen4 ความจุ 1TB (ไดรฟ์ A:) สำหรับลงเกมและงานขนาดใหญ่ สถานะ Windows Healthy ไม่มี Disk/NTFS Error',
      en: 'Fast PCIe Gen4 1TB M.2 NVMe SSD (Drive A:) for games and large files. Windows Health reports Healthy with zero Disk/NTFS errors.',
    },
    specs: [
      { label: { th: 'รหัสรุ่น / Firmware', en: 'Model / Firmware' }, value: 'WD Blue SN5000 1TB (WDS100T4B0E) • FW 291000WD' },
      { label: { th: 'อินเทอร์เฟซ', en: 'Interface' }, value: 'M.2 2280 NVMe PCIe Gen4 x4' },
      { label: { th: 'สถานะสุขภาพ', en: 'Health Status' }, value: 'Healthy / OK (0 Event Log Errors)' },
    ],
    cameraPos: [1.85, -0.32, 1.8],
    cameraTarget: [-0.02, -0.38, -0.25],
  },
  {
    id: 'ssd_sn750',
    category: { th: 'SSD #2 (ไดรฟ์ OS)', en: 'SSD #2 (OS Drive)' },
    name: 'WD_BLACK SN750 250GB M.2 NVMe PCIe Gen3',
    shortName: 'WD_BLACK SN750 250GB',
    highlightTag: '250GB OS',
    verified: true,
    image: './images/parts/ssd_sn750.jpg',
    imageCaption: {
      th: 'ภาพสินค้าอ้างอิง WD_BLACK SN750 250GB M.2 NVMe (WDS250G3X0C)',
      en: 'Reference photo: WD_BLACK SN750 250GB M.2 NVMe (WDS250G3X0C)',
    },
    statusTag: { th: 'Healthy • OS Boot', en: 'Healthy • OS Boot' },
    summary: {
      th: 'SSD ซีรีส์ WD_BLACK แยกสำหรับลง Windows 11 Pro (ไดรฟ์ C:) โดยเฉพาะ ทำให้บูตเครื่องไวและแยกข้อมูลออกจากไดรฟ์เกม สถานะ Healthy ปกติ',
      en: 'Dedicated WD_BLACK NVMe SSD for Windows 11 Pro OS boot (Drive C:), keeping system files cleanly separated from games. Reports Healthy with 0 errors.',
    },
    specs: [
      { label: { th: 'รหัสรุ่น / Firmware', en: 'Model / Firmware' }, value: 'WDS250G3X0C-00SJG0 • FW 111130WD' },
      { label: { th: 'อินเทอร์เฟซ', en: 'Interface' }, value: 'M.2 2280 NVMe PCIe Gen3 x4 (Boot / System)' },
      { label: { th: 'สถานะสุขภาพ', en: 'Health Status' }, value: 'Healthy / OK (0 Event Log Errors)' },
    ],
    cameraPos: [1.75, 0.25, 1.65],
    cameraTarget: [-0.05, 0.14, -0.25],
  },
  {
    id: 'hdd',
    category: { th: 'ฮาร์ดดิสก์ (HDD)', en: 'Hard Drive (HDD)' },
    name: 'Seagate BarraCuda 1TB 3.5" SATA (7200 RPM)',
    shortName: 'Seagate BarraCuda 1TB',
    highlightTag: '1TB SATA',
    verified: true,
    image: './images/parts/hdd.jpg',
    imageCaption: {
      th: 'ภาพสินค้าอ้างอิง Seagate BarraCuda 1TB (ST1000DM010)',
      en: 'Reference photo: Seagate BarraCuda 1TB (ST1000DM010)',
    },
    statusTag: { th: 'Healthy • SATA 1TB', en: 'Healthy • SATA 1TB' },
    summary: {
      th: 'ฮาร์ดดิสก์จานหมุน 1TB สำหรับเก็บไฟล์สำรอง/รูปภาพ/วิดีโอ แบ่งพาร์ทิชัน D: และ E: สถานะ Healthy ปกติ ไม่มี Disk Error',
      en: '3.5" 7200 RPM 1TB SATA HDD for archive storage (Drives D: and E:). Reports Healthy with zero disk errors in Windows logs.',
    },
    specs: [
      { label: { th: 'รหัสรุ่น / Firmware', en: 'Model / Firmware' }, value: 'ST1000DM010-2EP102 • FW CC43' },
      { label: { th: 'อินเทอร์เฟซ', en: 'Interface' }, value: 'SATA 6Gb/s • 3.5-inch • 7200 RPM' },
      { label: { th: 'สถานะสุขภาพ', en: 'Health Status' }, value: 'Healthy / OK (0 Event Log Errors)' },
    ],
    cameraPos: [2.1, -0.95, 2.0],
    cameraTarget: [0.45, -1.02, 0.0],
  },
  {
    id: 'psu',
    category: { th: 'พาวเวอร์ซัพพลาย (PSU)', en: 'Power Supply (PSU)' },
    name: 'Power Supply (สอบถามรุ่นจริงจากผู้ขาย)',
    shortName: 'PSU (Verify Model)',
    highlightTag: 'Verify',
    verified: false,
    statusTag: { th: '⚠ ขอดูรูปฉลากจริงได้ทางแชท', en: '⚠ Ask Seller for Photo' },
    summary: {
      th: 'ซอฟต์แวร์ไม่สามารถอ่านรุ่น/วัตต์ของ PSU ได้ สามารถทักแชทสอบถามยี่ห้อ วัตต์ มาตรฐาน 80+ และขอดูรูปฉลาก PSU จริงจากผู้ขายได้เลยครับ',
      en: 'PSU brand, wattage, and 80+ rating cannot be read by software. Ask the seller via chat for the exact PSU model and physical label photo.',
    },
    specs: [
      { label: { th: 'สถานะการตรวจ', en: 'Verification' }, value: SELLER_INFO.psuNote.en },
      { label: { th: 'เสถียรภาพไฟเลี้ยง', en: 'Power Stability' }, value: '0 Kernel-Power 41 unexpected shutdowns (90d)' },
    ],
    cameraPos: [-1.8, -0.9, 2.3],
    cameraTarget: [-0.45, -1.02, 0.0],
  },
  {
    id: 'cooler',
    category: { th: 'ชุดระบายความร้อน CPU', en: 'CPU Cooler' },
    name: 'CPU Cooler (สอบถามรุ่นจริงจากผู้ขาย)',
    shortName: 'CPU Cooler (Verify)',
    highlightTag: 'Verify',
    verified: false,
    statusTag: { th: '⚠ โมเดล 3 มิติจำลอง', en: '⚠ 3D Placeholder' },
    summary: {
      th: 'โมเดล 3 มิติแสดงเป็นซิงค์ลมแบบจำลอง สามารถขอดูรูปชุดระบายความร้อน CPU จริงภายในเครื่องจากผู้ขายทางแชทได้ครับ',
      en: 'The 3D scene shows a representative tower air cooler. Ask the seller for actual photos of the installed CPU cooler.',
    },
    specs: [
      { label: { th: 'สถานะการตรวจ', en: 'Verification' }, value: SELLER_INFO.coolerNote.en },
    ],
    cameraPos: [1.85, 0.78, 1.9],
    cameraTarget: [-0.08, 0.52, 0.0],
  },
  {
    id: 'case',
    category: { th: 'เคสคอมพิวเตอร์ (Case)', en: 'PC Case' },
    name: 'PC Case (ขอดูรูปเครื่องจริงจากผู้ขาย)',
    shortName: 'PC Case (3D Model)',
    highlightTag: '3D Model',
    verified: false,
    statusTag: { th: '⚠ โมเดล 3 มิติจำลอง', en: '⚠ Representative 3D Case' },
    summary: {
      th: 'เคสในหน้านี้เป็นโมเดล 3 มิติจำลองเพื่อให้ผู้ซื้อสำรวจตำแหน่งชิ้นส่วนภายในได้สะดวก สามารถขอดูรูปถ่ายตัวเครื่องจริงและสภาพภายนอกทุกมุมจากผู้ขายได้ครับ',
      en: 'Representative 3D glass case shown for interactive inspection of internal parts. Ask the seller for real photos of the physical chassis and cosmetic condition.',
    },
    specs: [
      { label: { th: 'หมายเหตุ', en: 'Note' }, value: SELLER_INFO.caseNote.en },
    ],
    cameraPos: [3.2, 0.9, 3.6],
    cameraTarget: [0, 0, 0],
  },
  {
    id: 'monitor',
    category: { th: 'จอแยก (ออปชันเสริม)', en: 'External Monitor (Optional)' },
    name: 'Dahua LM30-E330CA (30" Curved 200Hz)',
    shortName: 'Dahua 30" 200Hz',
    highlightTag: '30" 200Hz',
    verified: true,
    optionalBundle: true,
    image: './images/parts/monitor.jpg',
    imageCaption: {
      th: 'ภาพสินค้าอ้างอิง Dahua LM30-E330CA 30" Curved Ultrawide 200Hz',
      en: 'Reference photo: Dahua LM30-E330CA 30" Curved Ultrawide 200Hz',
    },
    statusTag: { th: 'ตรวจพบ EDID • ปี 2023', en: 'Detected via EDID • 2023' },
    summary: {
      th: 'จอมอนิเตอร์เกมมิ่งโค้ง Ultrawide 30 นิ้ว ความละเอียด 2560×1080 (21:9) รีเฟรชเรต 200Hz พาเนล VA (ออปชันแยก — สอบถามผู้ขายเพิ่มเติมหากสนใจรับคู่ตัวเครื่อง)',
      en: '30-inch 21:9 Curved VA Ultrawide gaming monitor (2560×1080 @ 200Hz, manufactured 2023). Separate optional display — ask seller if bundling with the PC.',
    },
    specs: [
      { label: { th: 'รุ่น / ปีผลิต', en: 'Model / Year' }, value: 'Dahua LM30-E330CA (DHI) • 2023' },
      { label: { th: 'ความละเอียด / รีเฟรชเรต', en: 'Resolution / Refresh' }, value: '2560 × 1080 (WFHD 21:9) @ 200 Hz' },
      { label: { th: 'การเชื่อมต่อ', en: 'Connection' }, value: 'DisplayPort (จาก RTX 5060)' },
    ],
    cameraPos: [-3.2, 0.85, 3.9],
    cameraTarget: [-2.15, 0.12, -0.15],
  },
];

export const DIAGNOSTIC_METRICS = [
  {
    status: 'ok' as const,
    title: { th: 'DirectX Diagnostics (dxdiag)', en: 'DirectX Diagnostics (dxdiag)' },
    value: { th: 'ผ่านทั้งหมด (No problems)', en: 'Passed (No problems)' },
    note: {
      th: 'ตรวจ Display, Sound 5 ช่องทาง และ Input ไม่พบข้อผิดพลาด รองรับ DirectX 12_2 / WDDM 3.2 เต็มรูปแบบ',
      en: 'Display, 5 Sound devices, and Input all reported zero problems. DirectX 12_2 / WDDM 3.2 active.',
    },
  },
  {
    status: 'ok' as const,
    title: { th: 'เสถียรภาพและประวัติจอฟ้า (90 วัน)', en: 'Crash & BSOD History (90 Days)' },
    value: { th: '0 จอฟ้า • Uptime 7.7 วัน', en: '0 BSODs • 7.7d Uptime' },
    note: {
      th: 'ไม่พบ BugCheck (จอฟ้า), ไม่พบ Kernel-Power 41 (เครื่องดับเอง), ไม่มีไฟล์ Minidump และ 0 Device Manager Errors',
      en: 'Zero BugChecks, zero Kernel-Power 41 unexpected shutdowns, no minidumps, zero Device Manager errors.',
    },
  },
  {
    status: 'ok' as const,
    title: { th: 'การ์ดจอ ASUS RTX 5060 Telemetry', en: 'ASUS RTX 5060 Telemetry' },
    value: { th: 'Idle 45–50°C • 0dB Fan', en: '45–50°C Idle • 0dB Fan' },
    note: {
      th: 'อุณหภูมิปกติ กินไฟ Idle ~20W พัดลมหยุดหมุนอัตโนมัติเมื่อไม่โหลดหนัก ลิงก์ PCIe Gen4 x8 เต็มสเปก',
      en: 'Cool idle thermals (~20W), zero-RPM fan stop working cleanly, PCIe Gen4 x8 link negotiated properly.',
    },
  },
  {
    status: 'ok' as const,
    title: { th: 'สถานะไดรฟ์จัดเก็บข้อมูล (3 ลูก)', en: 'Storage Health (3 Drives)' },
    value: { th: 'Healthy ทั้ง 3 ลูก • 0 Errors', en: 'All 3 Healthy • 0 Errors' },
    note: {
      th: 'WD Blue SN5000 1TB, WD_BLACK SN750 250GB และ Seagate 1TB สถานะ Healthy และไม่มี Disk/NVMe/NTFS Error',
      en: 'WD Blue SN5000 1TB, WD_BLACK SN750 250GB, and Seagate 1TB all report Healthy with zero Disk/NVMe/NTFS errors.',
    },
  },
  {
    status: 'warn' as const,
    title: { th: 'ผล SMART เชิงลึก (CrystalDiskInfo)', en: 'Deep SMART (CrystalDiskInfo)' },
    value: { th: 'ขอดูรูป / เทสหน้าเครื่องได้', en: 'Available on Request' },
    note: {
      th: 'ยินดีเปิด CrystalDiskInfo เช็ก % สุขภาพและชั่วโมงใช้งานให้ดูทางแชทหรือเทสสดตอนนัดรับเครื่องได้เลยครับ',
      en: 'Detailed SMART Wear % and Power-On Hours screenshots via CrystalDiskInfo (Admin) can be requested or tested live at pickup.',
    },
  },
  {
    status: 'info' as const,
    title: { th: 'ข้อมูลโปร่งใสเพิ่มเติม', en: 'Transparent Hardware Notes' },
    value: { th: 'LAN 1Gbps • Windows 11 Pro', en: '1Gbps LAN • Win 11 Pro' },
    note: {
      th: 'เชื่อมต่ออินเทอร์เน็ตผ่านสาย LAN 1Gbps (ไม่มี Wi-Fi/Bluetooth ในตัว) • แรม DDR4-2666 ตั้งวิ่ง 2933 MHz @ 1.35V เสถียร • ลง Windows 11 Pro พร้อมใช้งาน (ล้างข้อมูลสะอาดก่อนส่งมอบ)',
      en: 'Wired 1Gbps Ethernet (no built-in Wi-Fi/Bluetooth). DDR4-2666 RAM configured stably at 2933 MHz @ 1.35V. Windows 11 Pro installed and ready to test (clean wipe before handoff).',
    },
  },
];

export function buildShortSpecs(includeMonitor: boolean): string {
  const lines = [
    '📌 สเปกเครื่องคอมพิวเตอร์ (PC Specifications)',
    '• CPU: Intel Core i5-14400F (10C / 16T, LGA 1700)',
    '• GPU: ASUS NVIDIA GeForce RTX 5060 8GB GDDR7',
    '• MB: Gigabyte B760M D3HP DDR4 (BIOS F7)',
    '• RAM: 32GB (8GB × 4) Kingston HyperX Fury DDR4-2666',
    '• SSD #1: WD Blue SN5000 1TB M.2 NVMe PCIe Gen4',
    '• SSD #2 (OS): WD_BLACK SN750 250GB M.2 NVMe',
    '• HDD: Seagate BarraCuda 1TB 7200RPM SATA',
    '• Network: Realtek 1Gbps LAN (No Wi-Fi/BT)',
    '• OS: Windows 11 Pro 64-bit',
  ];
  if (includeMonitor) {
    lines.push('• Monitor (Optional): Dahua LM30-E330CA 30" Curved 2560×1080 200Hz');
  }
  return lines.join('\n');
}

export const I18N = {
  th: {
    headerSub: 'RAM 32GB · ความจุรวม 2.25TB · คลิกชิ้นส่วนในเครื่องเพื่อดูรายละเอียด',
    statusPill: 'พร้อมนัดรับและเทสเครื่อง',
    hintText: 'ลากเพื่อหมุน · ซูมเข้าออก · คลิกชิ้นส่วนเพื่อดูรูปและสเปก',
    glassBtn: 'เปิดฝาข้าง',
    glassBtnClosed: 'ปิดฝาข้าง',
    explodeBtn: 'แยกชิ้นส่วน',
    coolerBtn: 'ซ่อนพัดลม CPU',
    coolerBtnShow: 'แสดงพัดลม CPU',
    monitorBtn: 'จอ 30"',
    resetBtn: 'รีเซ็ต',
    explodeSlider: 'แยกชิ้นส่วน',
    tabInspect: 'ชิ้นส่วน',
    tabHealth: 'สภาพเครื่อง',
    tabSpecs: 'สเปกรวม',
    badgeVerified: 'ยืนยันจากเครื่องจริง',
    badgeUnverified: 'สอบถามรูปจริงจากผู้ขาย',
    copySpecsBtn: 'คัดลอกสเปกทั้งหมด',
    copiedMsg: 'คัดลอกสเปกเรียบร้อยแล้ว',
    zoomHint: 'ขยายรูป',
    noPhotoTitle: 'ชิ้นส่วนนี้ต้องดูจากตัวเครื่องจริง',
    noPhotoSub: 'ทักแชทขอดูรูปถ่ายจริงจากผู้ขายได้ครับ (ซอฟต์แวร์ไม่สามารถอ่านรุ่นของชิ้นส่วนนี้ได้)',
    drawerOpen: 'รายละเอียด',
    drawerClose: 'ปิด',
  },
  en: {
    headerSub: '32GB RAM · 2.25TB Storage · Click any component to inspect details',
    statusPill: 'Available for Live Test',
    hintText: 'Drag to orbit · Scroll to zoom · Click any part for photos and specs',
    glassBtn: 'Open Glass',
    glassBtnClosed: 'Close Glass',
    explodeBtn: 'Exploded View',
    coolerBtn: 'Hide Cooler',
    coolerBtnShow: 'Show Cooler',
    monitorBtn: '30" Display',
    resetBtn: 'Reset',
    explodeSlider: 'Exploded View',
    tabInspect: 'Components',
    tabHealth: 'Condition',
    tabSpecs: 'Full Specs',
    badgeVerified: 'Hardware Verified',
    badgeUnverified: 'Ask Seller for Photo',
    copySpecsBtn: 'Copy Full Specs',
    copiedMsg: 'Specifications copied',
    zoomHint: 'Zoom',
    noPhotoTitle: 'Physical Verification Component',
    noPhotoSub: 'Ask the seller for actual photos of this part via chat (not readable by software).',
    drawerOpen: 'Details',
    drawerClose: 'Close',
  },
};
