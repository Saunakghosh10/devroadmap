export const BACKEND_DATA = {
  roadmap: [
    { phase: "Phase 1 — Core Architectures", topics: ["RESTful API Principles", "GraphQL (Schemas, Resolvers)", "gRPC & Protocol Buffers", "WebSockets & SSE", "Monoliths vs Microservices"] },
    { phase: "Phase 2 — Databases & Storage", topics: ["SQL (PostgreSQL, MySQL)", "NoSQL (MongoDB, Cassandra)", "Indexing & Query Optimization", "ACID vs BASE", "Database Sharding & Replication"] },
    { phase: "Phase 3 — Systems & Infra", topics: ["Caching (Redis, Memcached)", "Message Queues (Kafka, RabbitMQ)", "Docker & Kubernetes", "Load Balancing (Nginx, HAProxy)", "Serverless (AWS Lambda)"] },
    { phase: "Phase 4 — Security & Auth", topics: ["OAuth 2.0 & OIDC", "JWT & Session Auth", "CORS & CSRF", "HTTPS & TLS", "Rate Limiting & DDoS Protection"] },
    { phase: "Phase 5 — Testing & DevOps", topics: ["Unit/Integration/E2E Testing", "CI/CD Pipelines", "Monitoring (Prometheus, Grafana)", "Logging (ELK Stack)", "Distributed Tracing"] },
  ],
  patterns: [
    { 
      name: "📬 Saga Pattern", 
      what: "A sequence of local transactions where each updates the DB and publishes an event to trigger the next.", 
      why: "Ensures data consistency across distributed microservices without distributed transactions.", 
      code: "// Choreography: Service A -> Event -> Service B\n// Orchestration: Manager -> Command -> Service A", 
      interview: "MAANG: How do you handle a failure in the middle of a Saga (Compensating Transactions)?" 
    },
    { 
      name: "⚡ Rate Limiting", 
      what: "Restricting the number of requests a user can make to an API in a given time.", 
      why: "Prevents abuse and ensures service availability.", 
      code: "Bucket = TokenBucket(rate=10, burst=5);", 
      interview: "FAANG: Compare Token Bucket vs Leaky Bucket vs Sliding Window algorithms." 
    }
  ],
  questions: [
    { q: "What is a RESTful API?", a: "An architectural style for designing networked applications based on stateless, client-server communication using HTTP methods (GET, POST, PUT, DELETE)." },
    { q: "Explain GraphQL vs REST.", a: "REST has multiple endpoints for different resources. GraphQL has one endpoint where clients specify exactly what data they need, avoiding over-fetching and under-fetching." },
    { q: "What is horizontal vs vertical scaling?", a: "Vertical scaling means adding more power (CPU/RAM) to an existing server. Horizontal scaling means adding more servers to the pool." },
    { q: "Explain ACID properties.", a: "Atomicity (all or nothing), Consistency (valid state), Isolation (independent transactions), Durability (persisted results)." },
    { q: "What is Database Sharding?", a: "Dividing a large database into smaller, faster, more manageable pieces called shards, distributed across multiple servers." },
    { q: "What is a Load Balancer?", a: "A device or software that distributes network traffic across multiple servers to ensure no single server becomes overwhelmed." },
    { q: "Explain JWT (JSON Web Token).", a: "A compact, URL-safe means of representing claims to be transferred between two parties. It consists of a Header, Payload, and Signature." },
    { q: "What is the N+1 problem?", a: "A performance issue in ORMs where the code executes one query to get a list of items, and then N additional queries to get related data for each item. Fixed with 'Eager Loading'." },
    { q: "Explain CORS (Cross-Origin Resource Sharing).", a: "A security feature that allows servers to specify which origins are permitted to access their resources via a browser." },
    { q: "What is a Message Queue?", a: "A form of asynchronous service-to-service communication used in serverless and microservices architectures (e.g., RabbitMQ, Kafka)." },
    { q: "What is the difference between SQL and NoSQL?", a: "SQL databases are relational, have fixed schemas, and excel at complex joins. NoSQL databases are non-relational, have dynamic schemas, and excel at scaling for unstructured data." },
    { q: "Explain CAP Theorem.", a: "In a distributed system, you can only provide two out of three guarantees: Consistency, Availability, and Partition Tolerance." },
    { q: "What is a Reverse Proxy?", a: "A server (like Nginx) that sits in front of backend servers and forwards client requests to them, often providing security, caching, and load balancing." },
    { q: "What is the difference between gRPC and REST?", a: "gRPC uses Protocol Buffers (binary) and HTTP/2 for faster communication. REST uses JSON (text) and usually HTTP/1.1." },
    { q: "Explain Docker containerization.", a: "Packaging an application and its dependencies into a single 'container' that runs consistently on any environment." },
    { q: "What is a Deadlock?", a: "A situation where two or more transactions are waiting for each other to release locks, causing both to be stuck indefinitely." },
    { q: "Explain Serverless Computing.", a: "A model where the cloud provider manages the infrastructure and automatically scales the resources, and you only pay for actual execution time." },
    { q: "What is an Index in a database?", a: "A data structure that improves the speed of data retrieval operations at the cost of slower writes and additional storage space." },
    { q: "Explain Microservices architecture.", a: "Designing an application as a collection of small, independent services that communicate over a network." },
    { q: "What is the difference between Authentication and Authorization?", a: "Authentication is verifying who a user is. Authorization is verifying what a user is allowed to do." }
  ]
};
