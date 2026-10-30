export type ManagedImage = {
  src: string;
  alt: string;
};

export const serviceImages: ManagedImage[] = [
  { src: "/images/services/service-1.svg", alt: "Illustrative hardware and electronics systems visual" },
  { src: "/images/services/service-2.svg", alt: "Illustrative embedded systems visual" },
  { src: "/images/services/service-3.svg", alt: "Illustrative IoT and automation visual" },
  { src: "/images/services/service-4.svg", alt: "Illustrative software development visual" },
  { src: "/images/services/service-5.svg", alt: "Illustrative AI and intelligent applications visual" },
  { src: "/images/services/service-6.svg", alt: "Illustrative custom engineering visual" },
];

export type CategoryImage = {
  expectedPath: string;
  alt: string;
  label: string;
  available: boolean;
};

// These local category assets are intentionally separate from project imagery.
export const categoryImages: Record<"hardware" | "software", CategoryImage> = {
  hardware: {
    expectedPath: "/images/categories/hardware-engineering.jpg",
    alt: "Agricultural electronics engineering workspace",
    label: "Hardware engineering visual",
    available: true,
  },
  software: {
    expectedPath: "/images/categories/software-systems.jpg",
    alt: "Software systems dashboard workspace",
    label: "Software systems visual",
    available: true,
  },
};
