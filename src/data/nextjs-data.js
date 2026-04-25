export const NEXTJS_DATA = {
  roadmap: [
    { phase: "Phase 1 — App Router", topics: ["File-based routing: page.tsx, layout.tsx, loading.tsx", "Server vs Client Components", "Link component & navigation", "Image, Font optimization"] },
    { phase: "Phase 2 — Data Fetching", topics: ["Server Component fetch (no useEffect!)", "Route Handlers (API routes)", "Server Actions: mutations", "Streaming with Suspense", "Caching and revalidation"] },
    { phase: "Phase 3 — Advanced", topics: ["Middleware for auth/redirects", "Dynamic routes [id] + catch-all [...slug]", "Metadata API for SEO", "Parallel and intercepting routes"] },
    { phase: "Phase 4 — Production", topics: ["ISR: Incremental Static Regeneration", "Edge Runtime vs Node Runtime", "next/image CDN optimization", "Deployment: Vercel/self-hosted"] },
  ],
  patterns: [
    { name: "🖥 Server vs Client Components", what: "Server runs on server (zero JS sent). Client ('use client') runs in browser.", why: "Server = smaller bundle, direct DB access", code: `// Server Component (default)
async function Page({ id }) {
  const data = await db.find(id); // direct DB!
  return <div>{data.name}</div>;
}

// Client Component
'use client';
export function Button() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n+1)}>{n}</button>;
}`, interview: "Default is Server. Add 'use client' only for hooks/events. Push 'use client' boundary as far down the tree as possible." },
    { name: "⚡ Server Actions", what: "Async functions marked 'use server' — run on server, callable from client.", why: "Replaces simple API routes for mutations", code: `'use server';
export async function createPost(fd) {
  const title = fd.get('title');
  await db.posts.create({ title });
  // revalidatePath clears this route's cache
}

// In Server Component:
<form action={createPost}>
  <input name="title" />
  <button>Create</button>
</form>`, interview: "Server Actions handle mutations server-side. No API route needed. The form action is the function itself." },
    { name: "🗃 Caching", what: "4 cache layers. Next.js 15: fetch no longer cached by default.", why: "Most confusing Next.js concept", code: `fetch(url, { cache: 'no-store' }); // always fresh
fetch(url, { next: { revalidate: 60 } }); // ISR-like

// After mutation — purge route cache:
// revalidatePath('/posts') from next/cache module`, interview: "Next.js 15 changed defaults — fetch is no longer cached. Be explicit. revalidatePath purges the cache for a specific route." },
  ],
  questions: [
    { q: "App Router vs Pages Router?", a: "App Router: layouts, Server Components, Server Actions, streaming. Pages Router: older, getServerSideProps/getStaticProps. App Router is the future." },
    { q: "When NOT to use Server Components?", a: "When you need: useState, useEffect, onClick, browser APIs, third-party libs using window. Add 'use client' for those." },
    { q: "What is ISR?", a: "Incremental Static Regeneration: statically generated pages revalidated in background after a set time. Fast static + fresh data." },
    { q: "What is Next.js Middleware?", a: "Runs on Edge before request. Used for: auth redirects, A/B testing, locale detection, rate limiting. Export from middleware.ts at root." },
  ]
};
