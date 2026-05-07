export const BACKEND_SENIOR_DATA = {
  role: "Senior Backend Engineer (Emergent)",
  company: "Emergent (AI-Native Infra)",
  sections: [
    {
      title: "1. Distributed Systems & Concurrency",
      questions: [
        {
          q: "Go Concurrency: In Go, when would you use a Mutex over a Channel? Explain the memory model implications.",
          rubric: {
            mention: ["Memory Access vs Communication", "Critical Sections", "Deadlocks", "Atomic operations", "Performance overhead"],
            strong: "The interviewer should not be able to follow up if you mention that Mutexes are for 'Shared State' (protecting a struct) while Channels are for 'Orchestrating Flow' (passing ownership). A senior engineer must also mention that Channels are internally implemented with Mutexes, so for high-frequency low-level synchronization, Mutexes are often more efficient."
          },
          a: "Use a Mutex when you need to protect a shared resource (like a map or a counter) from concurrent access where the 'state' is the focus. Use a Channel when you need to communicate between goroutines or pass ownership of data. Channels are safer as they prevent race conditions by design ('Do not communicate by sharing memory; share memory by communicating'). However, Channels add overhead; for high-contention, fine-grained locks, 'sync/atomic' or 'sync.Mutex' is significantly faster. Memory-wise, Channels provide a 'happens-before' guarantee which is critical for the Go memory model.",
          followup: "How do you detect a goroutine leak in a production system?"
        },
        {
          q: "Python GIL: How do you handle CPU-bound tasks in Python despite the Global Interpreter Lock (GIL)?",
          rubric: {
            mention: ["Multiprocessing", "Subprocesses", "C-extensions", "AsyncIO (I/O only)", "Free-threading (Python 3.13)"],
            strong: "Explains that GIL only allows one thread to execute bytecode at a time. For CPU-bound tasks, we must use 'multiprocessing' to bypass GIL or write C/Rust extensions (like NumPy) that release the GIL during heavy computation."
          },
          a: "The GIL prevents multi-core parallelism for pure Python bytecode. For CPU-bound tasks, I use the 'multiprocessing' module to spawn separate OS processes, each with its own interpreter and memory space. Alternatively, I offload heavy logic to C/C++/Rust extensions (using PyO3 or C-API) which can release the GIL during execution. For I/O-bound tasks, 'asyncio' is sufficient as it releases control during waiting periods. It's also worth noting the experimental 'free-threading' (PEP 703) in Python 3.13 which aims to remove the GIL entirely."
        }
      ]
    },
    {
      title: "2. System Design at Scale",
      questions: [
        {
          q: "Distributed Transactions: How do you maintain data consistency across multiple microservices without using 2PC (Two-Phase Commit)?",
          rubric: {
            mention: ["Saga Pattern (Choreography vs Orchestration)", "Outbox Pattern", "Eventual Consistency", "Idempotency"],
            strong: "Explains that 2PC is a 'blocking' protocol that doesn't scale well. Sagas are the industry standard—either through events (Choreography) or a central controller (Orchestration)."
          },
          a: "I avoid 2PC because it's a synchronous, blocking protocol that introduces high latency and single points of failure. Instead, I implement the **Saga Pattern**. I use **Choreography** (event-based) for simpler flows, where each service emits an event that triggers the next. For complex flows, I use **Orchestration** with a central state machine. To ensure reliability, I use the **Transactional Outbox Pattern**—writing the event to the same DB as the business logic in one transaction, then a separate relay service pushes it to the message queue. Every consumer MUST be idempotent to handle 'at-least-once' delivery."
        }
      ]
    },
    {
      title: "3. Infrastructure & Performance",
      questions: [
        {
          q: "Database Performance: How do you optimize a PostgreSQL database that is handling 50k+ writes per second?",
          rubric: {
            mention: ["Indexing (avoiding over-indexing)", "Partitioning", "Connection Pooling (PGBouncer)", "WAL tuning", "Vertical vs Horizontal Scaling"],
            strong: "Mentions specific Postgres internals like VACUUM, bloat, and the cost of maintaining indexes during high-write loads."
          },
          a: "For 50k+ writes/sec, I first implement **Connection Pooling** (e.g., PGBouncer) to manage the overhead of process-per-connection. I use **Declarative Partitioning** (by time or ID) to keep table sizes manageable and reduce index depth. I tune the **Write Ahead Log (WAL)**—increasing `max_wal_size` to reduce checkpoints. I also evaluate 'Batch Inserts' to reduce commit overhead. If vertical scaling hits a wall, I move to **Horizontal Sharding** (using Citus or application-level sharding) and potentially offload some high-velocity logs to a time-series DB like ClickHouse or TimescaleDB."
        }
      ]
    }
  ],
  advice: "For a Senior Backend role at Emergent, you need to show 'Operational Empathy'. Don't just talk about code—talk about observability, failure modes, and deployment safety. Since they use Go and Python, be ready to discuss Go's scheduler (G-M-P model) and Python's memory management. Mentioning the 'Outbox Pattern' and 'Idempotency' is a massive green flag for systems that build millions of apps."
};
