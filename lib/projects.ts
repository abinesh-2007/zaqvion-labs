export type ProjectImage = {
  tone: "water" | "earth" | "signal" | "care" | "energy" | "city" | "screen";
  alt: string;
  label: string;
  src: string;
  source: "Customer-supplied illustrative reference";
};
export type Project = {
  id: string;
  slug: string;
  title: string;
  category: "Hardware" | "Software";
  domain: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  applications: string[];
  limitations: string[];
  image: ProjectImage;
};

const raw = [
  [
    "H1",
    "Smart Drip Irrigation and Water-Saving Controller",
    "Hardware",
    "IoT & sustainability",
    "water",
    "Illustrative view of irrigation monitoring and a soil sensor",
  ],
  [
    "H2",
    "Low-Cost Water Quality Screening Station",
    "Hardware",
    "Environmental monitoring",
    "water",
    "Illustrative water screening sensor station",
  ],
  [
    "H3",
    "Smart Waste Bin Fill Monitor and Colour-Sort Demonstrator",
    "Hardware",
    "Automation",
    "earth",
    "Illustrative sensor-guided waste sorting system",
  ],
  [
    "H4",
    "Assistive Obstacle-Alert Cane Attachment",
    "Hardware",
    "Assistive technology",
    "care",
    "Illustrative electronic obstacle-alert cane attachment",
  ],
  [
    "H5",
    "Wearable Fall-Event Detection and SOS Prototype",
    "Hardware",
    "Health & safety",
    "care",
    "Illustrative wearable safety sensor",
  ],
  [
    "H6",
    "Scheduled Medicine Reminder and Compartment Demonstrator",
    "Hardware",
    "Health & accessibility",
    "care",
    "Illustrative medicine reminder compartment",
  ],
  [
    "H7",
    "Overhead Water Tank Level and Overflow Alert",
    "Hardware",
    "Home automation",
    "water",
    "Illustrative water tank level monitor",
  ],
  [
    "H8",
    "Road Roughness and Pothole Mapping Logger",
    "Hardware",
    "Civic technology",
    "city",
    "Illustrative road-condition data logger",
  ],
  [
    "H9",
    "Low-Voltage DC Energy Use Monitor",
    "Hardware",
    "Energy systems",
    "energy",
    "Illustrative low-voltage energy monitor",
  ],
  [
    "H10",
    "Indoor Air-Condition Trend Indicator",
    "Hardware",
    "Environmental monitoring",
    "signal",
    "Illustrative indoor environment sensor",
  ],
  [
    "S1",
    "Food Rescue and Surplus Meal Coordination Platform",
    "Software",
    "Community impact",
    "earth",
    "Illustrative food coordination application interface",
  ],
  [
    "S2",
    "Ward-Level Civic Issue Reporting and Resolution Tracker",
    "Software",
    "Civic technology",
    "city",
    "Illustrative civic reporting interface",
  ],
  [
    "S3",
    "Farmer Market Price and Crop Decision Dashboard",
    "Software",
    "Agriculture",
    "earth",
    "Illustrative agricultural data dashboard",
  ],
  [
    "S4",
    "Government Scheme Eligibility and Document Checklist Navigator",
    "Software",
    "Public services",
    "screen",
    "Illustrative public-service checklist interface",
  ],
  [
    "S5",
    "Small Clinic Queue and Medicine Stock Manager",
    "Software",
    "Healthcare operations",
    "care",
    "Illustrative clinic operations dashboard",
  ],
  [
    "S6",
    "Offline-First Disaster Information and Volunteer Coordination App",
    "Software",
    "Resilience",
    "signal",
    "Illustrative disaster coordination interface",
  ],
  [
    "S7",
    "E-Waste Collection and Responsible Recycler Locator",
    "Software",
    "Sustainability",
    "earth",
    "Illustrative e-waste collection locator",
  ],
  [
    "S8",
    "Low-Bandwidth School Attendance and Parent Update Tool",
    "Software",
    "Education",
    "screen",
    "Illustrative attendance management interface",
  ],
  [
    "S9",
    "Student Skills, Project Portfolio and Apprenticeship Matcher",
    "Software",
    "Education",
    "screen",
    "Illustrative student portfolio interface",
  ],
  [
    "S10",
    "Micro-Shop Inventory, Sales and Expense Ledger",
    "Software",
    "Small business",
    "energy",
    "Illustrative small-business ledger interface",
  ],
] as const;
const projectImagePaths: Record<string, string> = {
  H1: "/images/hardware/smart-irrigation.jpg",
  H2: "/images/hardware/water-quality.jpg",
  H3: "/images/hardware/smart-waste.jpg",
  H4: "/images/hardware/assistive-cane.jpg",
  H5: "/images/hardware/fall-detection.jpg",
  H6: "/images/hardware/medicine-reminder.jpg",
  H7: "/images/hardware/water-tank.jpg",
  H8: "/images/hardware/road-monitoring.jpg",
  H9: "/images/hardware/energy-monitor.jpg",
  H10: "/images/hardware/air-monitor.jpg",
  S1: "/images/software/food-rescue.jpg",
  S2: "/images/software/civic-tracker.jpg",
  S3: "/images/software/farmer-dashboard.jpg",
  S4: "/images/software/scheme-navigator.jpg",
  S5: "/images/software/clinic-manager.jpg",
  S6: "/images/software/disaster-app.jpg",
  S7: "/images/software/ewaste-app.jpg",
  S8: "/images/software/school-attendance.jpg",
  S9: "/images/software/student-portfolio.jpg",
  S10: "/images/software/shop-ledger.jpg",
};
export const projects: Project[] = raw.map(
  ([id, title, category, domain, tone, alt]) => ({
    id,
    title,
    category,
    domain,
    slug: `${id.toLowerCase()}-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, "")}`,
    summary: `An illustrative ${domain.toLowerCase()} project direction for requirements-led discussion and development.`,
    problem: `This concept explores a practical challenge in ${domain.toLowerCase()} through a focused engineering workflow.`,
    solution:
      "The final system is shaped after a requirements discussion so its scope, interfaces and validation needs are clear.",
    technologies:
      category === "Hardware"
        ? ["Embedded systems", "Sensors", "Microcontroller"]
        : ["Web application", "Data management", "Responsive UI"],
    features: [
      "Requirements-led scope",
      "Customisable workflow",
      "Documentation discussion",
    ],
    applications: [
      "Academic project exploration",
      "Prototype planning",
      "Custom engineering enquiry",
    ],
    limitations: [
      "Components, integrations, outcomes and delivery are confirmed only after requirements discussion.",
    ],
    image: {
      tone: tone as ProjectImage["tone"],
      alt: `${alt}. Customer-supplied illustrative reference image, not a claim of a completed ZAQVION prototype.`,
      label: `${category.toUpperCase()} / ILLUSTRATIVE`,
      src: projectImagePaths[id],
      source: "Customer-supplied illustrative reference",
    },
  }),
);
export const bySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
