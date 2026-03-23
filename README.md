# 🖥️ PC DEMO — 3D Scroll-Driven PC Showcase

A high-end, interactive PC showcase website featuring a **scroll-driven 3D disassembly animation** powered by a 240-frame image sequence. Built to demonstrate the architecture of a custom all-white gaming PC with cinematic precision.

🔗 **Live Demo:** [3d-pc-website-demo.vercel.app](https://3d-pc-website-demo.vercel.app)

---

## ✨ Features

- **Scroll-Driven 3D Animation** — A 240-frame image sequence synced to the scroll position creates a fluid, cinematic disassembly of the PC as the user scrolls.
- **Component Sections** — Four dedicated sections (Overview, Cooling, Core, Graphics) each reveal a different component with technical specs: AIO cooler, motherboard & RAM, and RTX 4090.
- **Animated Stat Counters** — Key numbers (CUDA cores, DDR5 memory, PSU wattage, radiator size) count up on scroll into view.
- **Spec Ticker Marquee** — A continuously scrolling hardware marquee displays the full component list.
- **Full Specification Sheet** — An expandable, numbered spec list covering processor, GPU, memory, storage, cooling, motherboard, PSU, and case.
- **Smooth Framer Motion Transitions** — Entrance animations and staggered reveals on all content blocks.
- **Responsive Layout** — Adapts cleanly across desktop and mobile viewports.

---

## 🛠️ Tech Stack

| Technology | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.1 | React framework & routing |
| [React](https://react.dev/) | 19.2.4 | UI rendering |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | ^12 | Animations & transitions |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | latest | Conditional class composition |

---

## 📁 Project Structure

```
3d-PC-Website-Demo/
├── app/                  # Next.js App Router pages & layout
├── components/           # Reusable UI components
├── data/                 # Static data (specs, component info)
├── public/               # Static assets (240-frame image sequence)
├── next.config.ts
├── tailwind.config.*
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm / bun

### Installation

```bash
git clone https://github.com/AritraDas07/3d-PC-Website-Demo.git
cd 3d-PC-Website-Demo
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 🎬 How the Animation Works

The core visual effect is a **scroll-jacked image sequence**. 240 pre-rendered JPEG frames of the PC model are stored in `/public`. As the user scrolls through the hero section, the current frame index is calculated from the scroll progress and the corresponding image is painted to a `<canvas>` element — creating the illusion of real-time 3D rotation and disassembly with zero WebGL overhead.

```
scroll position → normalized progress (0–1) → frame index (0–239) → canvas draw
```

---

## 🖱️ Page Sections

| # | Section | Content |
|---|---|---|
| 01 | **Overview** | Hero canvas animation + intro copy |
| 02 | **Cooling** | 360mm AIO cooler specs & details |
| 03 | **Core** | Z790/X670E motherboard + 64GB DDR5 |
| 04 | **Graphics** | RTX 4090 custom white edition |
| — | **Stats** | Animated counters: CUDA cores, memory, PSU, radiator |
| — | **Full Specs** | Complete hardware specification list |
| — | **Footer** | Navigation links + copyright |

---

## 📦 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push the repository to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Vercel will auto-detect Next.js — hit **Deploy**.

No environment variables are required.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

---

## 📄 License

This project is open source. See the repository for details.

---

<div align="center">
  <sub>Designed & Engineered with Precision &nbsp;·&nbsp; Built by <a href="https://github.com/AritraDas07">AritraDas07</a></sub>
</div>
