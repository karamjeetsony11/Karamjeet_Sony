export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  description: string;
  longDescription: string;
  color: string;
  accentColor: string;
  liveUrl?: string;
  gradient: string;
  svgPattern: string;
  videoUrl?: string;
  posterUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "orbit",
    title: "Orbit",
    subtitle: "High-concurrency event commerce platform",
    year: "2026",
    tags: ["Go", "Gin", "Redis", "MongoDB", "Lua"],
    description:
      "A high-concurrency event commerce platform built to keep inventory reservations safe and fast during intense buyer traffic.",
    longDescription:
      "Orbit closes race conditions that can let multiple buyers reserve the same limited-stock item. Its reservation engine uses Redis and Lua scripts to enforce idempotency, then asynchronously persists confirmed bookings to MongoDB. The system was load-tested with 5,000 concurrent buyers, holding 8,000+ requests per second at p99 under 604ms. A 223-test integration suite covers the purchase flow and its persistence boundaries.",
    color: "#C4A882",
    accentColor: "#7A5C3E",
    gradient: "from-[#C8EEFF] to-[#8DD3F5]",
    svgPattern: "M10 30 Q30 10 50 30 Q70 50 90 30",
    videoUrl: "/videos/project1.mp4",
    posterUrl: "/images/nazara_poster.png",
  },
  {
    slug: "bosex",
    title: "BOSE X",
    subtitle: "OpenAPI-powered mock API platform",
    year: "2026",
    tags: ["Go", "Next.js", "OpenAPI 3.0", "YAML", "kin-openapi"],
    description:
      "A platform that turns static OpenAPI contracts into working mock APIs so frontend teams can build before the backend exists.",
    longDescription:
      "BOSE X lets teams upload an OpenAPI 3.0 document and work against a live mock server without waiting on backend implementation. A spec-processing pipeline parses OpenAPI documents into a unified intermediate representation, resolving nested references and schema composition. The HTTP runtime then serves configurable mock responses, including controlled failure cases and endpoint-level behavior for realistic frontend testing.",
    color: "#8BA8C4",
    accentColor: "#2D4A6B",
    gradient: "from-[#BCEBFC] to-[#9CC7E4]",
    svgPattern: "M10 70 Q30 20 50 60 Q70 90 90 40",
    videoUrl: "/videos/project2.mp4",
    posterUrl: "/images/bartr_poster.png",
  },
  {
    slug: "gyanam",
    title: "Gyanam",
    subtitle: "AI communication platform for SMS and voice",
    year: "2025",
    tags: ["Express.js", "Twilio", "Gemini", "MongoDB"],
    description:
      "An AI communication platform that brings conversational assistance to users through regular SMS and voice calls.",
    longDescription:
      "Gyanam connects an LLM to SMS and voice calls through Twilio, making AI assistance accessible from a regular phone. The platform maintains multi-turn conversation state while streaming Gemini API responses, keeping context consistent across SMS and voice interactions even on high-latency connections.",
    color: "#A8B8A0",
    accentColor: "#3A4A32",
    gradient: "from-[#C7EDFF] to-[#8BC3E4]",
    svgPattern: "M10 50 L30 20 L50 60 L10 50 L30 20 L50 60 L70 15 L90 50",
    videoUrl: "/videos/project3.mp4",
    posterUrl: "/images/fuzzr_poster.png",
  }
];
