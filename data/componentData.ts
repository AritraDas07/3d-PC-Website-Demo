export interface ComponentSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  align: 'center' | 'left' | 'right' | 'bottom';
  specs?: { label: string; value: string }[];
}

export const componentData: ComponentSection[] = [
  {
    id: 'hero',
    title: 'PC DEMO',
    subtitle: 'Explore the Architecture',
    description: 'Scroll down to initiate the disassembly sequence.',
    align: 'center',
  },
  {
    id: 'cooling',
    title: 'Thermal Dynamics',
    subtitle: '360mm AIO Liquid Cooler',
    description:
      'Featuring triple high-static-pressure RGB fans. Keeps CPU temps locked down under maximum load.',
    align: 'left',
    specs: [
      { label: 'Radiator', value: '360mm Aluminum' },
      { label: 'Fan Speed', value: '500–2000 RPM' },
      { label: 'Noise Level', value: '< 30 dBA' },
      { label: 'TDP Rating', value: '350W' },
    ],
  },
  {
    id: 'core',
    title: 'Motherboard & RAM',
    subtitle: 'High-End ATX & 64GB DDR5',
    description:
      'Massive VRM heatsinks paired with incredibly fast, low-latency memory for absolute stability.',
    align: 'right',
    specs: [
      { label: 'Chipset', value: 'Z790 / X670E' },
      { label: 'Memory', value: '64GB DDR5-6400' },
      { label: 'Latency', value: 'CL30' },
      { label: 'Slots', value: '4x DIMM' },
    ],
  },
  {
    id: 'gpu',
    title: 'Graphics Architecture',
    subtitle: 'GeForce RTX Flagship',
    description:
      'A massive custom white shroud, triple-fan cooling, and immense ray-tracing capabilities.',
    align: 'bottom',
    specs: [
      { label: 'CUDA Cores', value: '16,384' },
      { label: 'VRAM', value: '24GB GDDR6X' },
      { label: 'Boost Clock', value: '2.6 GHz' },
      { label: 'TGP', value: '450W' },
    ],
  },
];

export const specSheetData = [
  { category: 'PROCESSOR', spec: 'Intel Core i9-14900KS / AMD Ryzen 9 7950X3D' },
  { category: 'GRAPHICS', spec: 'NVIDIA GeForce RTX 4090 — Custom White Edition' },
  { category: 'MEMORY', spec: '64GB DDR5-6400 CL30 — White Heatspreader' },
  { category: 'STORAGE', spec: '2TB Gen4 NVMe + 4TB Gen4 NVMe' },
  { category: 'COOLING', spec: '360mm AIO Liquid Cooler — White Radiator' },
  { category: 'MOTHERBOARD', spec: 'Z790 / X670E ATX — White I/O Shroud' },
  { category: 'POWER', spec: '1200W 80+ Platinum — Fully Modular' },
  { category: 'CASE', spec: 'Full Tower ATX — Tempered Glass, Arctic White' },
];
