export const INTERVIEW_DATA = [
  {
    category: "🚀 Takkada (Backend Engineer)",
    questions: [
      {
        q: "Walk me through the design of the event-driven backend sync system.",
        a: "The system used an event-driven architecture with a message queue (Redis/BullMQ) to decouple business processes. When a business event occurred (e.g., voucher creation), it was published to a queue. Isolated workers processed these jobs asynchronously, ensuring that if one task failed (like a 3rd party API call), it didn't block the rest of the application. We enforced idempotency using unique GUIDs for every transaction."
      },
      {
        q: "How did you implement GUID-first entity resolution?",
        a: "By generating UUIDs on the client or API gateway before any database insertion, we ensured that every entity had a unique identity that persisted across distributed services. This prevented duplicate entries in high-concurrency scenarios and simplified reconciliation between the sync system and the primary DB."
      }
    ]
  },
  {
    category: "💻 HCLTech (AI & Backend)",
    questions: [
      {
        q: "How did you achieve a 35% reduction in inference latency?",
        a: "We implemented model quantization (converting from FP32 to INT8) and optimized the serving infrastructure on Azure ML. Additionally, we used prompt caching for repetitive system messages and implemented a selective RAG pipeline that only retrieved context when the confidence score of the base LLM was below a certain threshold."
      },
      {
        q: "Describe your CI/CD setup with Azure DevOps and Jenkins.",
        a: "I architected a multi-stage pipeline where code was linted and unit-tested in Jenkins before being packaged into Docker containers. Azure DevOps handled the release management, deploying these containers across 5+ environments (Dev, Staging, UAT, Prod) with automated smoke tests and rollback capabilities."
      }
    ]
  },
  {
    category: "🌐 Adaapt.ai (Full Stack)",
    questions: [
      {
        q: "How did the RAG pipeline achieve 85% match accuracy?",
        a: "The key was in the chunking strategy and metadata filtering. We used overlapping recursive character splitting to preserve context and stored embeddings in pgvector. At retrieval time, we used a hybrid search approach (combining semantic vector search with keyword-based BM25) to ensure specific product names were matched accurately."
      },
      {
        q: "How did you optimize concurrent REST API endpoints for 3x throughput?",
        a: "I implemented thread-safe PostgreSQL transactions and connection pooling with PGBouncer. By moving expensive logic into Supabase Edge Functions (Deno) and leveraging Redis for caching frequent lookups, we reduced the load on the primary database, significantly lowering latency."
      }
    ]
  }
];
