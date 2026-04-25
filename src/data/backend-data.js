export const BACKEND_DATA = {
  roadmap: [
    { phase: "Phase 1 — Node.js Core", topics: ["Node event loop (libuv)", "Modules: CommonJS vs ESM", "File system (fs), Streams, Buffers", "Environment: process, dotenv"] },
    { phase: "Phase 2 — Express/Fastify", topics: ["Routing: GET, POST, PUT, DELETE", "Middleware: parsing, CORS, logging", "Error handling middleware (4 params)", "Fastify: schema validation, plugins"] },
    { phase: "Phase 3 — Databases", topics: ["PostgreSQL with Prisma ORM", "MongoDB with Mongoose", "Redis: caching, sessions, queues", "Transactions & ACID properties"] },
    { phase: "Phase 4 — Auth & Security", topics: ["JWT: access + refresh tokens", "OAuth 2.0 / OpenID Connect", "Rate limiting, CORS, Helmet", "Input validation: zod/joi"] },
    { phase: "Phase 5 — Production", topics: ["Docker: containerization", "CI/CD with GitHub Actions", "Logging: Winston/Pino", "Health checks & monitoring"] },
  ],
  patterns: [
    { name: "🔐 JWT Auth Flow", what: "Stateless auth using signed tokens.", why: "Most common API auth pattern", code: `app.post('/login', async (req, res) => {
  const user = await verify(req.body);
  const token = jwt.sign(
    { userId: user.id }, SECRET, { expiresIn: '15m' }
  );
  res.json({ token });
});

const auth = (req, res, next) => {
  const t = req.headers.authorization?.split(' ')[1];
  try { req.user = jwt.verify(t, SECRET); next(); }
  catch { res.status(401).json({ error: 'Unauthorized' }); }
};`, interview: "Short-lived access token + long-lived refresh token in httpOnly cookie. Never store in localStorage." },
    { name: "🗄 Prisma ORM", what: "Type-safe database queries from schema.", why: "Most popular Node.js + TS ORM", code: `// schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  posts Post[]
}

// Type-safe, auto-generated:
const user = await prisma.user.findUnique({
  where: { email: 'hi@test.com' },
  include: { posts: true }, // JOIN
});`, interview: "Prisma generates TS types from schema — DB queries are type-safe at compile time." },
    { name: "🧱 Middleware Chain", what: "Middleware processes request sequentially, call next() to continue.", why: "Core Express architecture", code: `app.use(express.json());
app.use(cors());
app.use(rateLimit({ max: 100 }));

app.get('/safe', authMiddleware, handler);

// Error handler — MUST be last, MUST have 4 params:
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});`, interview: "Middleware runs in order. Error handlers are identified by 4 params and must be registered last." },
  ],
  questions: [
    { q: "What are the main HTTP status codes?", a: "200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Rate Limited, 500 Server Error." },
    { q: "What is the N+1 query problem?", a: "Fetching N records then querying related data for each = N+1 queries. Solve with eager loading/JOIN. In Prisma: include: { posts: true }." },
    { q: "CORS — what is it and how do you fix it?", a: "Browser blocks cross-origin requests. Fix: add Access-Control-Allow-Origin header on the server. Use cors() middleware in Express." },
    { q: "What is ACID?", a: "Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), Durability (committed = persisted). Guarantees DB reliability." },
    { q: "How do you secure a Node.js API?", a: "Helmet, CORS config, rate limiting, input validation (zod), parameterized queries, httpOnly cookies, env vars for secrets, HTTPS." },
  ]
};
