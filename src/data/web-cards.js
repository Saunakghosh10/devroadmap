export const WEB_CARDS = [
  {
    category: "🔗 Communication",
    cards: [
      { term: "HTTP / HTTPS", oneliner: "The language browsers and servers speak", color: "#FF8C42",
        how: "Client sends a REQUEST → Server sends RESPONSE.\nHTTP = plain text. HTTPS = HTTP + TLS encryption.\nEvery tab you open, every image you load = an HTTP request.",
        flow: ["Browser","→ DNS lookup →","IP Address","→ TCP Handshake →","Server","→ TLS (HTTPS) →","Encrypted Request/Response"],
        details: ["Methods: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)","Headers carry metadata: Content-Type, Authorization, Cache-Control","HTTP/1.1: one request at a time. HTTP/2: multiplexing (many parallel). HTTP/3: over UDP — even faster","Status codes: 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error"],
        code: `fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Dev' })
});
// Browser auto-adds: Host, Accept, Cookie headers`,
        interview: "HTTPS = HTTP + TLS. The TLS handshake happens after TCP — client and server exchange encryption keys before any data is sent. This is why HTTPS is secure even on public Wi-Fi."
      },
      { term: "REST API", oneliner: "Rules for building predictable HTTP APIs using resources + verbs", color: "#FF8C42",
        how: "Resources as URLs + HTTP verbs = CRUD operations.\nStateless: each request carries ALL info needed — server stores nothing between requests.",
        flow: ["Client","→ GET /users/1 →","Server","→ 200 { id:1, name:'Dev' } →","Client"],
        details: ["6 REST constraints: Stateless, Client-Server, Cacheable, Uniform Interface, Layered, Code-on-Demand","Status codes matter: 200 OK, 201 Created, 400 Bad Request, 401 Unauth, 404 Not Found, 429 Rate Limited","Always version: /api/v1/users — never break existing clients when you change the API","JSON is standard format for request/response body"],
        code: `GET    /posts       → list all posts
GET    /posts/1     → get post with id 1
POST   /posts       → create new post  (body: { title })
PUT    /posts/1     → replace post 1 entirely
PATCH  /posts/1     → update specific fields only
DELETE /posts/1     → delete post 1`,
        interview: "REST is stateless — server never stores session state between requests. Every request must be self-contained (send the auth token every time). Contrast with stateful where server tracks sessions."
      },
      { term: "GraphQL", oneliner: "Ask for exactly what you need — one endpoint, custom shape", color: "#FF8C42",
        how: "One endpoint (/graphql). Client defines the exact shape of data it wants. Server returns exactly that — no more, no less. Solves REST's over-fetching and under-fetching.",
        flow: ["Client sends Query","→ POST /graphql →","Resolver functions run","→ Returns exact shape →","No wasted data"],
        details: ["Query = read data. Mutation = write data. Subscription = real-time stream","Solves over-fetching (REST returns too many fields) and under-fetching (need multiple round trips)","Schema is a typed contract — self-documenting, enables tools like GraphiQL playground","N+1 problem: naive resolvers can cause N+1 DB queries — solve with DataLoader (batching)"],
        code: `// REST: GET /users/1 returns ALL 20 user fields
// GraphQL: ask for ONLY what you need
query {
  user(id: "1") {
    name        // only these two fields
    email
  }
}
// Response: { data: { user: { name, email } } }`,
        interview: "GraphQL shines when the client controls data shape — mobile apps need minimal payload. REST is simpler for public APIs. Main downside of GraphQL: caching is harder (all POST to one URL)."
      },
      { term: "Webhooks", oneliner: "Server calls YOU when something happens — event-driven push", color: "#FF8C42",
        how: "PUSH model (opposite of polling). You register a URL with a service. When an event fires (payment success, git push), they POST to your URL immediately.",
        flow: ["Register your URL","→ Event fires (payment) →","Their server","→ POST to your URL →","Your server handles it async"],
        details: ["You must expose a public HTTPS endpoint to receive webhooks","Always verify the webhook signature — anyone can POST to your URL without verification","Respond with 200 immediately, then process async. Long processing = timeout = retries = duplicate events","Use idempotency keys to handle duplicate webhook deliveries safely"],
        code: `// Stripe webhook example
app.post('/webhook/stripe', express.raw({type:'*/*'}),(req, res) => {
  // 1. ALWAYS verify signature
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.body, sig, process.env.STRIPE_SECRET
  );
  res.status(200).send('OK'); // 2. Respond 200 FAST
  // 3. Handle async after response
  if (event.type === 'payment_intent.succeeded')
    fulfillOrder(event.data.object);
});`,
        interview: "Webhook = reverse API. Instead of polling 'did payment succeed?', Stripe calls your URL the moment it does. Always verify signatures (HMAC), always respond 200 fast, process async."
      },
      { term: "WebSockets", oneliner: "Persistent two-way connection — server can push anytime", color: "#FF8C42",
        how: "Start with HTTP Upgrade request → server agrees → TCP connection stays open. Both sides can send messages at any time without a new request.",
        flow: ["HTTP Upgrade Request","→ 101 Switching Protocols →","WS Connection Open","↔ Messages both ways ↔","Connection stays until closed"],
        details: ["Full-duplex: server pushes to client without client asking first","Use for: chat apps, live scores, trading dashboards, collaborative editing, multiplayer games","Socket.io: popular library adding rooms, reconnection, fallback to polling if WS blocked","Each open connection uses server memory — 10k concurrent users = 10k open connections"],
        code: `// Client
const ws = new WebSocket('wss://api.example.com/chat');
ws.onopen    = () => ws.send(JSON.stringify({ msg: 'Hello' }));
ws.onmessage = (e) => console.log(JSON.parse(e.data));
ws.onclose   = () => console.log('disconnected');

// Server (Node 'ws' library)
wss.on('connection', (socket) => {
  socket.on('message', (data) => {
    wss.clients.forEach(c => c.send(data)); // broadcast
  });
});`,
        interview: "HTTP: request → response → connection closed. WebSocket: one handshake → persistent connection. Server pushes messages anytime. Perfect for chat/games. Downside: proxies sometimes block WS."
      },
      { term: "SSE — Server-Sent Events", oneliner: "Server streams updates to client — one direction, over HTTP", color: "#FF8C42",
        how: "Regular HTTP connection kept open. Server streams text/event-stream chunks. Client uses EventSource API. Unlike WebSockets — only server → client.",
        flow: ["Client opens EventSource","→ GET /stream (keeps open) →","Server streams chunks","→ data: {...} every update →","Client receives events live"],
        details: ["One-directional: server → client only (WS = both ways)","Works over HTTP/2, auto-reconnects on drop, built into all modern browsers","Perfect for: AI token streaming (ChatGPT uses SSE!), live dashboards, notifications","Simpler than WebSockets — works behind most proxies, no special server config needed"],
        code: `// Server
app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  const interval = setInterval(() => {
    res.write('data: ' + JSON.stringify({time: Date.now()}) + '\\n\\n');
  }, 1000);
  req.on('close', () => clearInterval(interval)); // cleanup!
});

// Client
const es = new EventSource('/stream');
es.onmessage = (e) => console.log(JSON.parse(e.data));`,
        interview: "SSE is what AI chatbots use to stream tokens. Simpler than WebSocket for server-to-client only. The double newline (\\n\\n) is the message separator — that's the SSE protocol."
      },
      { term: "gRPC", oneliner: "High-performance RPC over HTTP/2 using binary Protocol Buffers", color: "#FF8C42",
        how: "Define service in .proto file → generate typed client/server code in any language → binary communication over HTTP/2. 5-10x faster than REST+JSON.",
        flow: ["Write .proto schema","→ Generate typed code →","Client calls method like a function","→ Binary over HTTP/2 →","Server executes and returns"],
        details: ["Protocol Buffers (protobuf) = binary format — much smaller and faster than JSON","Strongly typed by default — .proto file is the contract between services","4 call types: Unary, Server streaming, Client streaming, Bidirectional streaming","Common in microservices and internal service communication — not browser-friendly without gRPC-Web"],
        code: `// users.proto
service UserService {
  rpc GetUser (UserRequest) returns (User);
}
message UserRequest { string id = 1; }
message User { string id = 1; string name = 2; }

// Generated TypeScript client:
const user = await userClient.getUser({ id: '123' });
// Type-safe! No fetch, no JSON.parse — just call fn`,
        interview: "gRPC = internal API language. REST for public APIs, gRPC for internal microservice calls. Binary + strongly typed + streaming = faster. The .proto file is a language-agnostic contract."
      },
    ]
  },
  {
    category: "🔐 Auth & Security",
    cards: [
      { term: "JWT — JSON Web Token", oneliner: "Signed token that proves who you are — stateless auth", color: "#A78BFA",
        how: "3 base64 parts: Header.Payload.Signature. Server signs with a secret. Client sends on every request in Authorization header. Server verifies signature — no DB lookup needed.",
        flow: ["Login →","Server signs JWT →","Client stores token →","Every request sends Bearer token →","Server verifies signature (no DB!) →","Access granted"],
        details: ["Header: algorithm (HS256). Payload: claims (userId, exp). Signature: HMAC of header+payload","Anyone can DECODE the payload — never put passwords/sensitive data in it","Access token: short-lived (15min). Refresh token: long-lived (7d), stored in httpOnly cookie","Cannot revoke a JWT before expiry — this is the main downside vs sessions"],
        code: `// Payload (base64 decoded — NOT encrypted!)
{ "userId": "abc", "role": "admin", "exp": 1720000900 }

// Signature = HMAC_SHA256(
//   base64(header) + '.' + base64(payload),
//   SECRET_KEY
// )
// Tamper with payload → signature fails → rejected!

// Sending in request:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...`,
        interview: "JWT is stateless — server doesn't need DB to validate. Just verify the signature. Downside: can't revoke. Solution: short access token (15min) + refresh token rotation in httpOnly cookie."
      },
      { term: "OAuth 2.0 + OpenID Connect", oneliner: "'Login with Google' — delegate auth to a trusted provider", color: "#A78BFA",
        how: "You don't store passwords. User logs in at Google. Google redirects back with a code. You exchange code for tokens. OIDC adds identity (who) on top of OAuth (what they can access).",
        flow: ["Click 'Login with Google'","→ Redirect to Google →","User logs in at Google","→ Redirect back ?code=XYZ →","Exchange code for tokens","→ Get user profile"],
        details: ["OAuth 2.0 = authorization ('can this app read your calendar?')","OpenID Connect = authentication ('who are you?') built on top of OAuth","Flows: Auth Code + PKCE (web/mobile), Client Credentials (machine-to-machine)","Never build your own auth — use Clerk, Auth.js/NextAuth, or Supabase Auth"],
        code: `// Step 1: Redirect user to Google
https://accounts.google.com/o/oauth2/auth
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://app.com/callback
  &scope=openid email profile
  &response_type=code
  &state=csrf_token

// Step 2: Receive code, exchange for tokens
POST https://oauth2.googleapis.com/token
  { code, client_id, client_secret, redirect_uri }
// Returns: { access_token, id_token (JWT with user info) }`,
        interview: "OAuth = authorization (access someone's resources). OIDC = authentication (prove identity). The id_token is a JWT containing the user's identity. Your app verifies it with Google's public key."
      },
      { term: "Sessions vs JWT", oneliner: "Stateful server-side session vs stateless self-contained token", color: "#A78BFA",
        how: "Sessions: server creates and stores session in DB/Redis, sends opaque session_id in cookie. JWT: server creates signed token with all data inside, client stores and sends it.",
        flow: ["Session: Cookie(session_id) → DB lookup → User data (stateful)","JWT: Token → Verify signature → Decode payload → User data (NO DB!)"],
        details: ["Sessions: easy to revoke (delete from DB), but requires DB/Redis on every request","JWT: no DB lookup = faster, horizontally scalable, but can't revoke until expiry","httpOnly cookie: JS cannot read it — blocks XSS stealing your auth token","Secure flag: cookie only sent over HTTPS. SameSite=Strict: blocks CSRF attacks"],
        code: `// Sessions
req.session.userId = user.id;  // stored server-side
// Cookie sent: session_id=abc (opaque, no data)

// JWT
const token = jwt.sign({ userId: user.id }, SECRET);
// Cookie sent: token=eyJ... (data encoded inside)

// Best practice for both:
res.cookie('token', value, {
  httpOnly: true,   // JS cannot access
  secure: true,     // HTTPS only
  sameSite: 'strict' // CSRF protection
});`,
        interview: "Use sessions when you need instant revocation (banking, high security). Use JWT for stateless APIs and microservices. Never store auth tokens in localStorage — XSS can steal them."
      },
      { term: "CORS", oneliner: "Browser blocks cross-origin requests unless server explicitly allows them", color: "#A78BFA",
        how: "Browser enforces same-origin policy. Cross-origin request → browser sends OPTIONS preflight → server responds with allowed origins in headers → browser allows or blocks the real request.",
        flow: ["app.com → fetch('api.other.com')","→ Browser sends OPTIONS preflight →","Server: Access-Control-Allow-Origin: app.com","→ Browser: allowed → Sends real request"],
        details: ["Only browsers enforce CORS — Postman/curl/server-to-server bypass it completely","Simple requests (GET, basic POST) skip preflight. Complex (PUT, DELETE, custom headers) trigger it","Credentials (cookies) require specific origin (not *) + credentials: true on both sides","CORS errors are ALWAYS fixed server-side — add the headers on the server, not the client"],
        code: `// npm install cors
// const cors = require('cors');

// Development
app.use(cors({ origin: '*' }));

// Production (specific origins)
app.use(cors({
  origin: ['https://yourapp.com'],
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // allow cookies
}));`,
        interview: "CORS is a browser security feature, not a server feature. It prevents malicious websites from silently making API calls using your logged-in cookies. The fix is always on the server — add the correct headers."
      },
      { term: "XSS & CSRF Attacks", oneliner: "Two most common web security attacks — and how to prevent them", color: "#A78BFA",
        how: "XSS: attacker injects malicious JS into your page — steals tokens, hijacks sessions. CSRF: tricks your browser into making authenticated requests to another site using your cookies.",
        flow: ["XSS: Inject script → Runs in victim browser → Steals localStorage/cookies","CSRF: Evil site → Triggers request to bank.com → Bank sees your cookie → Transfer!"],
        details: ["XSS prevention: escape all user input, use Content-Security-Policy header, httpOnly cookies (JS can't steal)","CSRF prevention: SameSite=Strict cookies, CSRF tokens in forms, check Origin/Referer headers","Stored XSS: malicious script saved in DB, runs for all visitors — most dangerous","Never use innerHTML with user data — use textContent or a sanitizer like DOMPurify"],
        code: `// XSS prevention
div.textContent = userInput; // safe
div.innerHTML = userInput;   // DANGEROUS — executes scripts!

// CSP header blocks inline scripts
Content-Security-Policy: default-src 'self'

// CSRF prevention in Express
// Use 'csurf' package — generates token per session
// app.use(csrfProtection());
// Token must be in form/header — attacker can't read it

// SameSite cookie = best CSRF defense
res.cookie('session', val, { sameSite: 'strict' });`,
        interview: "XSS = inject JS. CSRF = trick browser. httpOnly cookies solve XSS stealing tokens. SameSite=Strict solves CSRF. Both are in the OWASP Top 10 — every web dev must know these."
      },
    ]
  },
  {
    category: "💾 Storage & Caching",
    cards: [
      { term: "Browser Storage", oneliner: "Cookies, localStorage, sessionStorage — different uses, different rules", color: "#34D399",
        how: "Cookies: sent automatically with every HTTP request, server can set them, have expiry, httpOnly flag. localStorage: persists forever, JS only, ~5MB. sessionStorage: same but clears on tab close.",
        flow: ["Cookies → Sent to server on every request (server-readable)","localStorage → Browser only, persists across sessions (JS-only)","sessionStorage → Browser only, gone on tab close (JS-only)"],
        details: ["Cookies: max 4KB. httpOnly blocks JS access (XSS safe). Secure = HTTPS only. SameSite = CSRF protection","localStorage: max ~5MB per origin. Synchronous. Persists until user clears browser data","sessionStorage: same as localStorage but tab-isolated — a new tab = new sessionStorage","IndexedDB: full async DB in browser — store large structured data (offline-first apps)"],
        code: `// Cookies (set by server — most secure for auth)
Set-Cookie: token=abc; HttpOnly; Secure; SameSite=Strict

// localStorage (persists across sessions)
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme'); // 'dark'

// sessionStorage (tab-scoped)
sessionStorage.setItem('step', '2');

// ❌ NEVER store auth tokens in localStorage!
localStorage.setItem('jwt', token); // XSS steals it!`,
        interview: "httpOnly cookies for auth (JS can't steal them). localStorage for non-sensitive preferences. Session data in cookies or server sessions. If you store JWT in localStorage, XSS attack = game over."
      },
      { term: "Caching Layers", oneliner: "Store results of expensive work temporarily — the key to fast apps", color: "#34D399",
        how: "Multiple cache layers between user and database. Each layer is faster than the one below. Cache hit = fast. Cache miss = go to next layer.",
        flow: ["Browser Cache","→ CDN Cache →","Reverse Proxy Cache","→ Redis (in-memory) →","PostgreSQL/MongoDB (source of truth)"],
        details: ["Browser: Cache-Control header controls freshness. max-age=3600 caches for 1 hour","CDN: caches at edge servers globally — serves static assets near the user","Redis: in-memory, sub-millisecond response. Cache DB query results, sessions, rate limit counters","Cache invalidation: hardest problem in CS. Either TTL-based or event-driven (purge on write)"],
        code: `// HTTP caching headers
Cache-Control: max-age=3600           // cache 1 hour
Cache-Control: no-store               // never cache
Cache-Control: stale-while-revalidate // serve stale + refresh

// Redis cache-aside pattern
async function getUser(id) {
  const hit = await redis.get('user:' + id);
  if (hit) return JSON.parse(hit); // HIT — fast!
  const user = await db.findById(id); // MISS — slow
  await redis.setex('user:'+id, 3600, JSON.stringify(user));
  return user;
}`,
        interview: "Cache invalidation is the hardest part — when to clear the cache? Two strategies: TTL (expire after N seconds, possibly stale) or event-driven (clear immediately when data changes)."
      },
      { term: "CDN", oneliner: "Copy static assets to servers worldwide — serve from closest one", color: "#34D399",
        how: "User requests asset → CDN routes to nearest edge server → if cached: serve instantly. If not cached: fetch from origin, cache for next user. All future users in that region get it fast.",
        flow: ["User in Mumbai","→ Request logo.png →","CDN routes to Mumbai edge","→ Cache hit: 5ms →","vs 200ms to US origin"],
        details: ["Assets: images, JS, CSS, fonts, videos — static content","Some CDNs (Cloudflare) can cache API responses and run serverless functions at the edge","Cache busting: add content hash to filename (app.a3f9.js) — forces fresh download on deploy","Popular: Cloudflare, AWS CloudFront, Fastly, Vercel Edge Network"],
        code: `// Without CDN: User (India) → Origin (US) → ~200ms
// With CDN: User (India) → Edge (India) → ~5ms

// Static assets — cache forever (hash = cache busting)
Cache-Control: public, max-age=31536000, immutable
// filename: main.a3f9b2.js (hash changes on new deploy)

// HTML — no cache (always fresh)
Cache-Control: no-cache

// Next.js on Vercel: CDN automatic for all static files`,
        interview: "CDN = geographically distributed cache. Key insight: physics limits speed — reduce distance between server and user. A CDN in Mumbai serves Indian users 40x faster than a US origin server."
      },
      { term: "DNS", oneliner: "Internet's phonebook — converts domain names to IP addresses", color: "#34D399",
        how: "Browser checks cache → asks OS → asks Recursive Resolver (ISP) → asks Root Nameserver → asks .com TLD server → asks domain's Authoritative Nameserver → gets IP → connects.",
        flow: ["Type google.com","→ Browser cache? →","Recursive Resolver (ISP)","→ Root NS → .com NS →","google.com Nameserver","→ Returns IP"],
        details: ["A record: domain → IPv4 (93.184.x.x). AAAA: → IPv6. CNAME: alias to another domain. MX: email server","TTL: how long each answer is cached. Low TTL = faster propagation when you change DNS","DNS propagation: changing DNS takes 24-48hrs because old TTL caches expire gradually","DNSSEC: signs DNS records cryptographically to prevent DNS spoofing/poisoning attacks"],
        code: `// DNS record types
A      example.com     → 93.184.216.34    (IPv4)
AAAA   example.com     → 2606:2800::...   (IPv6)
CNAME  www.example.com → example.com      (alias)
MX     example.com     → mail.example.com (email)
TXT    example.com     → "v=spf1..."      (verification)

// Check DNS:
nslookup example.com
dig example.com A
dig example.com MX`,
        interview: "DNS is hierarchical and heavily cached. Full resolution is ~50ms but almost always served from cache after first lookup. When you deploy, update A record to new server IP."
      },
    ]
  },
  {
    category: "⚙️ Infrastructure",
    cards: [
      { term: "Load Balancing", oneliner: "Distribute traffic across multiple servers — horizontal scaling", color: "#60A5FA",
        how: "Load balancer sits in front of your server fleet. Incoming requests distributed using an algorithm. If one server dies, load balancer routes around it automatically.",
        flow: ["10,000 req/sec arrive","→ Load Balancer →","Server 1 (3333)","Server 2 (3333)","Server 3 (3334)"],
        details: ["Round Robin: rotate equally. Least Connections: send to server with fewest active requests","IP Hash: same user always goes to same server (needed for stateful session-based apps)","Health checks: load balancer removes dead servers from rotation automatically","AWS ALB, Nginx, HAProxy, Cloudflare are common load balancers"],
        code: `# Nginx upstream (load balancer)
upstream backend {
  least_conn;  # strategy: fewest active connections
  server app1.example.com weight=3;
  server app2.example.com weight=1;
  server app3.example.com backup; # failover only
}
server {
  listen 80;
  location / { proxy_pass http://backend; }
}`,
        interview: "Load balancing enables horizontal scaling — many small servers instead of one big one. Stateless apps scale perfectly. Session-based apps need sticky sessions or shared Redis for session storage."
      },
      { term: "Message Queues", oneliner: "Decouple services — producer sends work, consumer processes when ready", color: "#60A5FA",
        how: "Producer puts message in queue and immediately continues. Queue persists the message durably. Consumer picks it up and processes at its own pace. They never communicate directly — fully decoupled.",
        flow: ["User pays","→ Producer: queue.add('send_email') →","Queue persists message","→ Consumer picks up →","Sends email (async, retryable)"],
        details: ["Patterns: Work Queue (distribute tasks), Pub/Sub (fan-out to multiple consumers), Dead Letter Queue (failed messages)","Tools: Redis + BullMQ (simple), RabbitMQ (flexible routing), Kafka (high-throughput event streaming, millions/sec)","Use when: long-running tasks (video encoding), spike traffic absorption, cross-service communication","Messages can be retried on failure — unlike direct HTTP calls which fail permanently"],
        code: `// BullMQ + Redis example
// Producer (payment service):
await emailQueue.add('receipt', {
  to: user.email, orderId: order.id
});
// Returns immediately! Payment flow not blocked.

// Consumer (email service — separate process):
const worker = new Worker('emails', async (job) => {
  if (job.name === 'receipt')
    await sendEmail(job.data);
}, { connection: redis });`,
        interview: "Queues give resilience and decoupling. If email service is down, payments still work — emails queue up and drain when it recovers. The queue acts as a buffer between services."
      },
      { term: "Docker & Containers", oneliner: "Package app + environment together — runs identically everywhere", color: "#60A5FA",
        how: "Docker image = layered snapshot of your app + OS + dependencies. Container = running instance of that image. 'Works on my machine' problem eliminated.",
        flow: ["Write Dockerfile","→ docker build → Image (portable)","→ docker run → Container (running)","→ Same on dev/staging/prod →","No environment differences"],
        details: ["Image: read-only blueprint. Container: running instance (like class vs object in OOP)","Docker Compose: define and run multi-container apps (app + postgres + redis) with one command","Each container is isolated — its own filesystem, network, process space","Kubernetes (K8s): orchestrate containers at scale — auto-scaling, self-healing, rolling deployments"],
        code: `# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]

# docker-compose.yml
services:
  app:
    build: .
    ports: ["3000:3000"]
    depends_on: [db]
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: myapp`,
        interview: "Container = isolated process with its own filesystem. Much lighter than VM (no guest OS). Docker standardizes 'the environment' — dev, CI, and prod all run identical images."
      },
      { term: "CI/CD Pipeline", oneliner: "Automatically test and deploy code on every git push", color: "#60A5FA",
        how: "CI: every push triggers automated tests. CD: if all tests pass, automatically deploy to staging or production. Catch bugs before users do, ship faster with confidence.",
        flow: ["git push","→ GitHub Actions triggers →","Install → Lint → Test → Build","→ All green? →","Deploy to Staging → Production"],
        details: ["CI = Continuous Integration: merge often, test automatically, surface conflicts early","CD = Continuous Delivery (auto-deploy to staging) or Deployment (auto-deploy to prod)","Tools: GitHub Actions (most popular), GitLab CI, CircleCI, Jenkins","Branch protection: require CI to pass before merging to main — prevents broken deploys"],
        code: `# .github/workflows/deploy.yml
name: CI/CD
on: [push]
jobs:
  pipeline:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: vercel --prod --token=$\{{ secrets.VERCEL_TOKEN }}`,
        interview: "CI/CD removes fear of shipping. Every commit is tested automatically. If tests fail, deployment stops. You get fast feedback loops and can deploy many times per day safely."
      },
      { term: "Rate Limiting", oneliner: "Limit requests per user per time window — block abuse and DDoS", color: "#60A5FA",
        how: "Track how many requests each user (by IP or userId) makes per time window. If they exceed the limit, return 429. Counts stored in Redis so all server instances share state.",
        flow: ["100 requests from one IP","→ Redis counter increments →","Under limit: pass through","Over limit: 429 Too Many Requests + Retry-After header"],
        details: ["Algorithms: Fixed Window (simple), Sliding Window (smoother), Token Bucket (allows bursts)","Store counters in Redis — shared across all server instances for distributed systems","Apply at: API Gateway level, Nginx, or Express middleware","Differentiate: strict limit for login attempts (brute force), loose limit for general API"],
        code: `// npm install express-rate-limit
// const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window
  message: { error: 'Too many requests' },
  standardHeaders: true,     // send RateLimit-* headers
  keyGenerator: (req) => req.user?.id || req.ip,
});

// Strict login limiting (prevent brute force)
const loginLimiter = rateLimit({ windowMs: 60000, max: 5 });
app.post('/login', loginLimiter, loginHandler);`,
        interview: "Rate limiting protects against DDoS, brute force, and scrapers. Use Redis for distributed counter storage. Return 429 with Retry-After header so well-behaved clients know when to retry."
      },
      { term: "Microservices vs Monolith", oneliner: "One big deployable vs many specialized services — when to use which", color: "#60A5FA",
        how: "Monolith: all code in one deployable unit, one DB. Simple to start. Microservices: separate services per business domain, each with own DB, deployed independently.",
        flow: ["Monolith: User+Order+Payment code → one deploy → one DB","Microservices: User Service ↔ Order Service ↔ Payment Service (own DB, own deploy)"],
        details: ["Monolith pros: simple dev, easy debugging, one deploy, fast iteration. Cons: scales as one unit","Microservices pros: scale independently, different tech stacks per service. Cons: network latency, distributed tracing, eventual consistency","Service mesh (Istio, Linkerd): handles service-to-service communication, observability","Start monolith. Extract services when a specific domain needs independent scaling."],
        code: `// Monolith — everything in one Express app:
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);    // same process
app.use('/payments', paymentsRouter); // same DB

// Microservices — separate apps:
// User Service:    user-svc:3001
// Order Service:   order-svc:3002 → calls user-svc
// Payment Service: pay-svc:3003
// API Gateway:     gateway:3000 → routes to all
// Each: own Dockerfile, own DB, own CI/CD pipeline`,
        interview: "Most startups should start with a modular monolith. Microservices = distributed systems complexity. Netflix/Amazon moved to microservices at massive scale — not at 10 engineers."
      },
    ]
  },
  {
    category: "🚀 Performance & Patterns",
    cards: [
      { term: "Polling vs WebSocket vs SSE", oneliner: "4 patterns for real-time updates — right tool for the job", color: "#F472B6",
        how: "Short polling: ask every N seconds (wasteful). Long polling: ask, server holds until update. SSE: persistent one-way stream. WebSocket: persistent two-way.",
        flow: ["Short Poll: GET every 5s (99% empty responses)","Long Poll: GET → server waits up to 30s → respond when data ready","SSE: GET → open stream → server pushes one-way","WebSocket: upgrade → open socket → both push"],
        details: ["Short polling: simple but wastes bandwidth and server resources","Long polling: simulates push. Works behind all proxies. Still one response per connection","SSE: unidirectional server→client, HTTP/2 compatible, auto-reconnect. Great for feeds/AI","WebSocket: bidirectional, lowest latency. Some proxies/firewalls block WS — SSE is safer fallback"],
        code: `// Short Polling (simplest, most wasteful)
setInterval(() => fetch('/api/messages'), 5000);

// Long Polling (better)
async function poll() {
  const res = await fetch('/api/messages?since=' + lastId);
  handle(await res.json());
  poll(); // immediately request next
}

// SSE (best for server→client feeds)
const es = new EventSource('/api/stream');
es.onmessage = e => render(e.data);

// WebSocket (best for bidirectional)
const ws = new WebSocket('wss://api.example.com');
ws.onmessage = e => render(e.data);
ws.send('hello server!');`,
        interview: "Rule of thumb: SSE for server-to-client only (AI streaming, live feeds, notifications). WebSocket for bidirectional real-time (chat, games, collaborative editing). Long polling as universal fallback."
      },
      { term: "API Gateway", oneliner: "Single entry point for all client requests — centralized cross-cutting concerns", color: "#F472B6",
        how: "Instead of clients calling 10 services directly, they call the API Gateway. Gateway handles routing, auth, rate limiting, logging, SSL termination once — not in every service.",
        flow: ["Client (one URL)","→ API Gateway →","Auth check → Rate limit → Route","→ User Svc / Order Svc / Payment Svc"],
        details: ["Handles cross-cutting concerns once: auth, logging, CORS, rate limiting, SSL","BFF Pattern (Backend for Frontend): different gateway shapes response for mobile vs web clients","Tools: AWS API Gateway, Kong, Nginx, Traefik, custom Express gateway","Adds latency (one extra hop) — keep gateway logic thin, push business logic to services"],
        code: `// Custom Express API Gateway
app.use(authMiddleware);   // auth for ALL services
app.use(rateLimiter);      // rate limit everything
app.use(requestLogger);    // log all requests

// Route to microservices
app.use('/users',   createProxyMiddleware({ target: 'http://user-svc:3001' }));
app.use('/orders',  createProxyMiddleware({ target: 'http://order-svc:3002' }));
app.use('/payment', createProxyMiddleware({ target: 'http://pay-svc:3003' }));`,
        interview: "API Gateway = front door for microservices. Clients don't know or care about service locations. You handle auth once at the gateway instead of reimplementing in every service."
      },
      { term: "SSL/TLS & HTTPS", oneliner: "Encrypts all data between browser and server — prevents eavesdropping", color: "#F472B6",
        how: "TLS Handshake: client hello → server sends certificate → client verifies cert with CA → both derive session key using Diffie-Hellman → all subsequent data encrypted with symmetric key.",
        flow: ["Client Hello (cipher suites)","→ Server Hello + Certificate →","Client verifies cert with CA","→ Key exchange (Diffie-Hellman) →","Symmetric session key agreed","↔ Encrypted from here on"],
        details: ["Certificate: issued by trusted CA (Let's Encrypt, DigiCert) — proves server identity","Let's Encrypt: free, auto-renewing SSL certificates — no excuse for HTTP-only sites","TLS 1.3 (current): 1-RTT handshake (vs 2-RTT in 1.2), forward secrecy by default","HSTS: HTTP header that tells browser to always use HTTPS — even if user types http://"],
        code: `# Free SSL with Certbot (Let's Encrypt)
certbot --nginx -d example.com -d www.example.com

# Nginx HTTPS config
server {
  listen 443 ssl http2;
  ssl_certificate /etc/letsencrypt/.../fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/.../privkey.pem;
  ssl_protocols TLSv1.3;
  # HSTS: always use HTTPS for 1 year
  add_header Strict-Transport-Security "max-age=31536000" always;
}`,
        interview: "TLS provides: confidentiality (encryption), integrity (data not tampered), authentication (server identity via certificate). HTTPS = HTTP over TLS. Let's Encrypt makes this free and automatic."
      },
      { term: "Service Workers & PWA", oneliner: "Background JS thread — enables offline apps, push notifications, install prompt", color: "#F472B6",
        how: "Service Worker runs in background thread, separate from page. Intercepts all network requests from your app. Can serve from cache when offline. Receives push notifications even when app is closed.",
        flow: ["App makes fetch()","→ Service Worker intercepts →","Cached? → Serve immediately","Not cached? → Fetch from network → Cache for next time"],
        details: ["Lifecycle: install (cache assets) → activate (clean old caches) → fetch (intercept requests)","PWA criteria: served over HTTPS + has Service Worker + has Web App Manifest (for installability)","Cache strategies: Cache First (fast, possibly stale), Network First (fresh, offline fallback), Stale-While-Revalidate","Background Sync API: queue failed requests and retry when connection restores"],
        code: `// service-worker.js
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('v1').then(c =>
      c.addAll(['/', '/index.html', '/app.js'])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(cached => cached || fetch(e.request))
  );
});`,
        interview: "Service Workers power PWAs — web apps that work offline and can be installed. Used by Twitter Lite, Starbucks, Pinterest. The SW intercepts fetch calls and serves from cache — invisible to the app."
      },
    ]
  },
];
