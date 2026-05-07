export const FRONTEND_ARCHITECT_DATA = {
  role: "Frontend Architect / Staff Engineer (Emergent)",
  company: "Emergent (AI-Native Software Creation)",
  sections: [
    {
      title: "1. Frontend Architecture & Scalability",
      questions: [
        {
          q: "Modular Architecture: Emergent builds millions of apps. How would you design a modular frontend architecture that allows internal teams to ship new AI capabilities independently without breaking the core platform?",
          rubric: {
            mention: ["Micro-frontends", "Monorepo (Turborepo/Nx)", "Shared Component Libraries", "Module Federation", "Feature Flags"],
            pitfalls: "Suggesting a monolithic structure that creates a single point of failure or slows down deployments.",
            strong: "Proposes a 'Domain-Driven' Monorepo with strict boundary enforcement using tools like Nx or custom lint rules, combined with Module Federation for runtime flexibility."
          },
          followup: "How would you handle shared state (e.g., User Auth, AI Context) across these modular boundaries?"
        },
        {
          q: "Performance at Scale: For an AI-driven platform with real-time feedback, how do you architect the frontend to maintain a 60fps interaction rate during massive data streaming?",
          rubric: {
            mention: ["Web Workers", "RequestIdleCallback", "Optimistic Updates", "Windowing/Virtualization", "Selective Hydration"],
            strong: "Suggests offloading heavy AI processing or data parsing to a Web Worker to keep the main thread free for UI interactions, using a reactive state store (Zustand/Recoil) to minimize re-renders."
          }
        }
      ]
    },
    {
      title: "2. Design Systems & Tooling",
      questions: [
        {
          q: "Building a Multi-Tenant Design System: Emergent generates apps for 6M+ users. How do you design a component library that is flexible enough to be 'themed' or 'skinned' by millions of generated apps while maintaining a single source of truth?",
          rubric: {
            mention: ["Design Tokens", "CSS Variables / Tailwind Config", "Headless UI (Radix/Aria)", "Inversion of Control"],
            strong: "Advocates for a 'Headless First' approach where the logic is centralized but the 'Visual Layer' is driven by a robust Design Token system that can be dynamically updated via CSS variables."
          }
        },
        {
          q: "Build Strategy: When dealing with thousands of internal packages, how would you optimize the build and bundle strategy to ensure fast developer cycles (HMR) and small production bundles?",
          rubric: {
            mention: ["Vite", "Esbuild", "Tree Shaking", "Code Splitting", "Persistent Caching"],
            strong: "Explains how to use Vite for development and a combination of Rollup/Turborepo for production, ensuring that only used code is bundled via aggressive tree shaking and code splitting."
          }
        }
      ]
    },
    {
      title: "3. Leadership & Technical Strategy",
      questions: [
        {
          q: "Mentorship & Culture: How do you upskill senior engineers to think like architects? Give a specific example of how you've influenced a long-term technical roadmap.",
          rubric: {
            mention: ["RFC Process", "ADRs (Architecture Decision Records)", "Pair Programming", "Technical debt management"],
            strong: "Focuses on the 'RFC (Request for Comments)' process as a primary teaching tool—using written proposals to force deep thinking about trade-offs before a single line of code is written."
          }
        }
      ]
    }
  ],
  advice: "As an Architect at Emergent, you are a 'multiplier'. Don't just show code—show systems. Focus on how you enable other engineers to move faster. Since Emergent is a high-ownership startup ($100M ARR), emphasize your ability to balance 'perfect architecture' with 'business speed'. Be prepared to discuss Web APIs and browser internals (V8, Event Loop) in detail."
};
