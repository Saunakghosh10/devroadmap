export const DB_DATA = {
  supabase: {
    title: "Supabase (The Postgres BaaS)",
    concepts: ["Real-time Subscriptions", "Row Level Security (RLS)", "Edge Functions (Deno)", "Auth & Storage Integration", "PostgREST API"],
    pros: "Instant REST/GraphQL API from schema, powerful Auth, built on standard Postgres.",
    cons: "Proprietary locking to their ecosystem for some features, Postgres scaling limits."
  },
  mongodb: {
    title: "MongoDB (NoSQL Document Store)",
    concepts: ["Dynamic Schema", "BSON Format", "Aggregation Framework", "Sharding & Replication", "WiredTiger Engine"],
    pros: "Horizontal scalability, flexible schema for rapidly evolving data, great for hierarchical data.",
    cons: "No multi-document ACID transactions (pre-4.0), potential for data inconsistency if not careful."
  },
  convex: {
    title: "Convex (Reactive Backend)",
    concepts: ["Deterministic Functions", "Automatic Caching", "Real-time by Default", "TypeScript Native", "Optimistic Updates"],
    pros: "Zero-config real-time sync, eliminates cache invalidation bugs, extreme dev speed.",
    cons: "Proprietary cloud, limited complex join support compared to SQL."
  },
  postgres: {
    title: "PostgreSQL (The Gold Standard)",
    concepts: ["ACID Compliance", "Foreign Keys & Joins", "JSONB Support", "Extensions (pgvector, PostGIS)", "MVCC"],
    pros: "Rock-solid reliability, rich ecosystem, supports both SQL and NoSQL (JSONB).",
    cons: "Harder to scale horizontally compared to NoSQL, complex configuration."
  }
};

export const DB_COMPARISONS = [
  {
    topic: "SQL (Postgres) vs NoSQL (MongoDB)",
    q: "When would you choose MongoDB over PostgreSQL?",
    a: "Choose MongoDB when the data schema is highly dynamic or unstructured, or when you need horizontal scaling (sharding) out of the box for massive datasets. Choose Postgres when data integrity, complex relations (joins), and ACID compliance are non-negotiable. Note: Postgres JSONB now handles many NoSQL use cases effectively.",
    winner: "Postgres for 90% of apps; Mongo for high-velocity unstructured data."
  },
  {
    topic: "Supabase vs Convex",
    q: "What's the main architectural difference between Supabase and Convex?",
    a: "Supabase is 'Postgres-as-a-Service'—it gives you a real DB and tools around it. Convex is a 'Reactive Database'—every query is a subscription by default. In Supabase, you manually manage state sync; in Convex, the DB pushes changes to the UI automatically.",
    winner: "Supabase for standard apps; Convex for highly collaborative real-time apps."
  }
];
