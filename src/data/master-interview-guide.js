export const MASTER_GUIDE = {
  role: "Senior Full Stack & AI Engineer",
  sections: [
    {
      title: "1. Highly Relevant Interview Questions",
      questions: [
        {
          q: "Architectural Decision: You built an event-driven sync system at Takkada. Why choose a queue-based system over direct API calls for ledger synchronization?",
          rubric: {
            mention: ["Decoupling", "Resilience/Fault Tolerance", "Retries", "Backpressure Management", "Idempotency"],
            pitfalls: "Ignoring the overhead of message persistence or failing to explain how to handle 'poison pill' messages.",
            strong: "Explains how a direct API call failure would block the ERP transaction, whereas a queue allows the system to recover gracefully without user impact."
          },
          followup: "How did you ensure that a message wasn't processed twice (Idempotency) if the worker crashed halfway through?"
        },
        {
          q: "Tech Deep-Dive: Compare PostgreSQL and MongoDB for a multi-tenant SaaS. Which one is better for Adaapt.ai's lead generation platform?",
          rubric: {
            mention: ["Relational Integrity", "JSONB flexibility", "ACID compliance", "Schema-less vs Schema-full", "Horizontal Scaling"],
            pitfalls: "Saying 'Mongo is faster' without qualifying that Postgres is often faster for complex joins.",
            strong: "Correctly identifies that for lead generation (which requires complex relationships between leads, campaigns, and interactions), Postgres with JSONB offers the best of both worlds."
          },
          followup: "If we had to scale to 100 million leads, how would your Postgres indexing strategy change?"
        },
        {
          q: "AI/ML Depth: Describe the trade-offs when fine-tuning TinyLlama on Azure ML vs using a larger model like GPT-4 via RAG.",
          rubric: {
            mention: ["Latency", "Cost", "Privacy", "Domain Specificity", "Context Window limits"],
            pitfalls: "Forgetting to mention that fine-tuning is static knowledge while RAG is dynamic.",
            strong: "Highlights that fine-tuning is better for specific style/format requirements and reducing inference cost, while RAG is essential for factual accuracy on non-static data."
          },
          followup: "How did you measure the 85% accuracy on proprietary datasets? What was your evaluation metric?"
        },
        {
          q: "System Design: Design a real-time collaborative whiteboard similar to your 'Interactive Ideas' project. How do you handle 50 concurrent users editing the same node?",
          rubric: {
            mention: ["WebSockets / Server-Sent Events", "CRDTs or Operational Transformation", "Optimistic UI", "Last-Write-Wins vs Branching"],
            pitfalls: "Proposing a simple 'lock' mechanism which ruins the user experience.",
            strong: "Explains how Convex or a similar reactive DB handles the sync loop and how optimistic updates hide the network latency."
          }
        }
      ]
    },
    {
      title: "2. Coding Challenge: Deterministic State Machine",
      challenge: {
        statement: "Implement a simplified version of your 'Takkada Onboarding State Machine'. Write a function that takes a 'Current State', an 'Event', and a 'Context', and returns the 'Next State'. Ensure it is pure and handles 'Heartbeat' liveness.",
        language: "TypeScript",
        solution: `type State = 'START' | 'KYC' | 'ACCOUNTING' | 'LIVE';
type Event = 'SUBMIT_DOCS' | 'VERIFY' | 'ERROR' | 'HEARTBEAT';

function transition(current: State, event: Event): State {
  const transitions: Record<State, Partial<Record<Event, State>>> = {
    START: { SUBMIT_DOCS: 'KYC' },
    KYC: { VERIFY: 'ACCOUNTING', ERROR: 'START' },
    ACCOUNTING: { VERIFY: 'LIVE' },
    LIVE: {}
  };
  return transitions[current][event] || current;
}`
      }
    },
    {
      title: "3. Behavioral & Leadership",
      questions: [
        {
          q: "As Web Dev Lead for Advitya Fest, you handled 3,000+ concurrent users. Tell me about a time you had to make a critical technical decision under extreme pressure.",
          rubric: {
            mention: ["Prioritization", "Delegation", "Monitoring", "Load Balancing", "Post-mortem thinking"],
            strong: "Describes a specific incident (e.g., DB spike) and how they used logs to identify the bottleneck and deployed a hotfix or scaled resources."
          }
        }
      ]
    }
  ],
  advice: "Your resume is extremely strong in 'Proven Scale'. Focus on the 'Why' behind Takkada's event-driven architecture and the 'How' of HCLTech's latency reduction. For Senior roles, they want to see you weigh trade-offs (e.g., Why Deno for Edge Functions? Why Convex for real-time?). Practice explaining your RAG pipeline as a data engineering problem, not just an API call."
};
