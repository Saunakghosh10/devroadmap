export const NEXTJS_DATA = {
  roadmap: [
    { phase: "Phase 1 — App Router Core", topics: ["File-based Routing", "Server Components by Default", "Layouts & Templates", "Loading & Error States", "Streaming with Suspense"] },
    { phase: "Phase 2 — Data Fetching", topics: ["Server Actions", "Caching (Tag-based, Path-based)", "Revalidation (ISR)", "Static vs Dynamic Rendering", "Parallel Routes & Intercepting Routes"] },
    { phase: "Phase 3 — Optimization", topics: ["Next/Image (LCP optimization)", "Next/Font (Zero CLS)", "Next/Script", "Middleware", "SEO (Metadata API)"] },
    { phase: "Phase 4 — Deployment & Auth", topics: ["Middleware Auth", "Clerk / NextAuth integration", "Vercel Edge Functions", "Environmental Parity", "Security Headers"] },
  ],
  patterns: [
    { 
      name: "⚡ Server Actions", 
      what: "Async functions that run on the server but are called directly from the client.", 
      why: "Eliminates the need for manual API routes for form submissions.", 
      code: "'use server';\nexport async function submit(formData) {\n  const data = formData.get('item');\n  await db.insert(data);\n  revalidatePath('/dashboard');\n}", 
      interview: "Server actions are CSRF protected by default and work with Progressive Enhancement (HTML forms)." 
    },
    { 
      name: "🧊 Parallel Routes", 
      what: "Rendering multiple pages in the same layout simultaneously.", 
      why: "Great for dashboards with independent loading states.", 
      code: "// layout.jsx\nexport default function Layout({ children, analytics, team }) {\n  return (\n    <main>\n      {children}\n      {analytics}\n      {team}\n    </main>\n  );\n}", 
      interview: "Allows for independent error handling and loading states for different sections of a complex dashboard." 
    }
  ],
  questions: [
    { q: "Server Components vs Client Components?", a: "Server Components (RSCs) render only on the server, sending zero JS to the client. Client Components ('use client') add interactivity but increase bundle size. Use RSCs as much as possible." },
    { q: "What is ISR (Incremental Static Regeneration)?", a: "A way to update static pages after you've built your site. It allows you to use static generation on a per-page basis, without needing to rebuild the entire site." },
    { q: "How does Middleware work in Next.js?", a: "It runs before a request is completed. You can modify the response by rewriting, redirecting, or modifying headers. Great for Auth and Geo-routing." },
    { q: "What is the App Router vs Pages Router?", a: "App Router (Next.js 13+) uses React Server Components and supports nested layouts. Pages Router is the legacy system based on pages/ directory." },
    { q: "Explain the Metadata API.", a: "A way to define SEO metadata (titles, descriptions, open graph) for each page using exported metadata objects or generateMetadata functions." },
    { q: "What is the 'use client' directive?", a: "A directive placed at the top of a file to mark it as a Client Component, allowing it to use hooks and event listeners." },
    { q: "Explain Data Fetching in Next.js 15.", a: "Fetch requests are no longer cached by default ('no-store'). You must explicitly use 'force-cache' or revalidation tags to cache data." },
    { q: "What are Server Actions?", a: "Asynchronous functions that run on the server and can be invoked from both Client and Server Components." },
    { q: "Explain Streaming and Suspense in Next.js.", a: "Streaming allows you to break down the page's HTML into smaller chunks and progressively send those chunks from the server to the client." },
    { q: "What is the difference between Link component and <a> tag?", a: "The Link component enables client-side navigation with prefetching, avoiding a full page reload." },
    { q: "Explain Image Optimization in Next.js.", a: "The next/image component automatically resizes images, serves them in modern formats (like WebP), and lazy loads them." },
    { q: "What are Route Handlers?", a: "Custom request handlers for a given route using the Web Request and Response APIs (replacement for API Routes in App Router)." },
    { q: "Explain Revalidation.", a: "The process of clearing the Data Cache and re-fetching data. Can be time-based (e.g., every 60s) or on-demand (using tags)." },
    { q: "What is the 'use server' directive?", a: "Marks a function or file as a Server Action, ensuring it only executes on the server." },
    { q: "Explain Dynamic Routing in Next.js.", a: "Using brackets in file names (e.g., [id]/page.js) to create routes that match multiple paths based on parameters." },
    { q: "What is the role of the layout.js file?", a: "Defines a UI that is shared between multiple pages. Layouts preserve state and remain interactive on navigation." },
    { q: "Explain the difference between Static and Dynamic rendering.", a: "Static rendering happens at build time or in the background. Dynamic rendering happens at the time of the request." },
    { q: "What is the 'next.config.js' file used for?", a: "Customizing the Next.js configuration, including environment variables, headers, and rewrites." },
    { q: "Explain Parallel Routes.", a: "Allows you to render multiple pages in the same layout simultaneously, each with its own loading and error states." },
    { q: "What are Intercepting Routes?", a: "Allows you to load a route from another part of your application within the current layout (e.g., opening a photo in a modal)." }
  ]
};
