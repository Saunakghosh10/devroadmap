import { useState } from "react";

const TRACKS = [
  { id: "js",      label: "JavaScript",     icon: "⚡", color: "#F7DF1E" },
  { id: "ts",      label: "TypeScript",     icon: "🔷", color: "#3178C6" },
  { id: "react",   label: "React",          icon: "⚛️", color: "#61DAFB" },
  { id: "nextjs",  label: "Next.js",        icon: "▲",  color: "#FFFFFF" },
  { id: "backend", label: "Backend",        icon: "🖥️", color: "#68D391" },
  { id: "web",     label: "Web Essentials", icon: "🌐", color: "#FF8C42" },
];

const WEB_CARDS = [
  {
    category: "🔗 Communication",
    cards: [
      { term: "HTTP / HTTPS", oneliner: "The language browsers and servers speak", color: "#FF8C42",
        how: "Client sends a REQUEST → Server sends RESPONSE.\nHTTP = plain text. HTTPS = HTTP + TLS encryption.\nEvery tab you open, every image you load = an HTTP request.",
        flow: ["Browser","→ DNS lookup →","IP Address","→ TCP Handshake →","Server","→ TLS (HTTPS) →","Encrypted Request/Response"],
        details: ["Methods: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)","Headers carry metadata: Content-Type, Authorization, Cache-Control","HTTP/1.1: one request at a time. HTTP/2: multiplexing (many parallel). HTTP/3: over UDP — even faster","Status codes: 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error"],
        code: `fetch('https://api.example.com/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Dev' })\n});\n// Browser auto-adds: Host, Accept, Cookie headers`,
        interview: "HTTPS = HTTP + TLS. The TLS handshake happens after TCP — client and server exchange encryption keys before any data is sent. This is why HTTPS is secure even on public Wi-Fi."
      },
      { term: "REST API", oneliner: "Rules for building predictable HTTP APIs using resources + verbs", color: "#FF8C42",
        how: "Resources as URLs + HTTP verbs = CRUD operations.\nStateless: each request carries ALL info needed — server stores nothing between requests.",
        flow: ["Client","→ GET /users/1 →","Server","→ 200 { id:1, name:'Dev' } →","Client"],
        details: ["6 REST constraints: Stateless, Client-Server, Cacheable, Uniform Interface, Layered, Code-on-Demand","Status codes matter: 200 OK, 201 Created, 400 Bad Request, 401 Unauth, 404 Not Found, 429 Rate Limited","Always version: /api/v1/users — never break existing clients when you change the API","JSON is standard format for request/response body"],
        code: `GET    /posts       → list all posts\nGET    /posts/1     → get post with id 1\nPOST   /posts       → create new post  (body: { title })\nPUT    /posts/1     → replace post 1 entirely\nPATCH  /posts/1     → update specific fields only\nDELETE /posts/1     → delete post 1`,
        interview: "REST is stateless — server never stores session state between requests. Every request must be self-contained (send the auth token every time). Contrast with stateful where server tracks sessions."
      },
      { term: "GraphQL", oneliner: "Ask for exactly what you need — one endpoint, custom shape", color: "#FF8C42",
        how: "One endpoint (/graphql). Client defines the exact shape of data it wants. Server returns exactly that — no more, no less. Solves REST's over-fetching and under-fetching.",
        flow: ["Client sends Query","→ POST /graphql →","Resolver functions run","→ Returns exact shape →","No wasted data"],
        details: ["Query = read data. Mutation = write data. Subscription = real-time stream","Solves over-fetching (REST returns too many fields) and under-fetching (need multiple round trips)","Schema is a typed contract — self-documenting, enables tools like GraphiQL playground","N+1 problem: naive resolvers can cause N+1 DB queries — solve with DataLoader (batching)"],
        code: `// REST: GET /users/1 returns ALL 20 user fields\n// GraphQL: ask for ONLY what you need\nquery {\n  user(id: "1") {\n    name        // only these two fields\n    email\n  }\n}\n// Response: { data: { user: { name, email } } }`,
        interview: "GraphQL shines when the client controls data shape — mobile apps need minimal payload. REST is simpler for public APIs. Main downside of GraphQL: caching is harder (all POST to one URL)."
      },
      { term: "Webhooks", oneliner: "Server calls YOU when something happens — event-driven push", color: "#FF8C42",
        how: "PUSH model (opposite of polling). You register a URL with a service. When an event fires (payment success, git push), they POST to your URL immediately.",
        flow: ["Register your URL","→ Event fires (payment) →","Their server","→ POST to your URL →","Your server handles it async"],
        details: ["You must expose a public HTTPS endpoint to receive webhooks","Always verify the webhook signature — anyone can POST to your URL without verification","Respond with 200 immediately, then process async. Long processing = timeout = retries = duplicate events","Use idempotency keys to handle duplicate webhook deliveries safely"],
        code: `// Stripe webhook example\napp.post('/webhook/stripe', express.raw({type:'*/*'}),(req, res) => {\n  // 1. ALWAYS verify signature\n  const sig = req.headers['stripe-signature'];\n  const event = stripe.webhooks.constructEvent(\n    req.body, sig, process.env.STRIPE_SECRET\n  );\n  res.status(200).send('OK'); // 2. Respond 200 FAST\n  // 3. Handle async after response\n  if (event.type === 'payment_intent.succeeded')\n    fulfillOrder(event.data.object);\n});`,
        interview: "Webhook = reverse API. Instead of polling 'did payment succeed?', Stripe calls your URL the moment it does. Always verify signatures (HMAC), always respond 200 fast, process async."
      },
      { term: "WebSockets", oneliner: "Persistent two-way connection — server can push anytime", color: "#FF8C42",
        how: "Start with HTTP Upgrade request → server agrees → TCP connection stays open. Both sides can send messages at any time without a new request.",
        flow: ["HTTP Upgrade Request","→ 101 Switching Protocols →","WS Connection Open","↔ Messages both ways ↔","Connection stays until closed"],
        details: ["Full-duplex: server pushes to client without client asking first","Use for: chat apps, live scores, trading dashboards, collaborative editing, multiplayer games","Socket.io: popular library adding rooms, reconnection, fallback to polling if WS blocked","Each open connection uses server memory — 10k concurrent users = 10k open connections"],
        code: `// Client\nconst ws = new WebSocket('wss://api.example.com/chat');\nws.onopen    = () => ws.send(JSON.stringify({ msg: 'Hello' }));\nws.onmessage = (e) => console.log(JSON.parse(e.data));\nws.onclose   = () => console.log('disconnected');\n\n// Server (Node 'ws' library)\nwss.on('connection', (socket) => {\n  socket.on('message', (data) => {\n    wss.clients.forEach(c => c.send(data)); // broadcast\n  });\n});`,
        interview: "HTTP: request → response → connection closed. WebSocket: one handshake → persistent connection. Server pushes messages anytime. Perfect for chat/games. Downside: proxies sometimes block WS."
      },
      { term: "SSE — Server-Sent Events", oneliner: "Server streams updates to client — one direction, over HTTP", color: "#FF8C42",
        how: "Regular HTTP connection kept open. Server streams text/event-stream chunks. Client uses EventSource API. Unlike WebSockets — only server → client.",
        flow: ["Client opens EventSource","→ GET /stream (keeps open) →","Server streams chunks","→ data: {...} every update →","Client receives events live"],
        details: ["One-directional: server → client only (WS = both ways)","Works over HTTP/2, auto-reconnects on drop, built into all modern browsers","Perfect for: AI token streaming (ChatGPT uses SSE!), live dashboards, notifications","Simpler than WebSockets — works behind most proxies, no special server config needed"],
        code: `// Server\napp.get('/stream', (req, res) => {\n  res.setHeader('Content-Type', 'text/event-stream');\n  res.setHeader('Cache-Control', 'no-cache');\n  const interval = setInterval(() => {\n    res.write('data: ' + JSON.stringify({time: Date.now()}) + '\\n\\n');\n  }, 1000);\n  req.on('close', () => clearInterval(interval)); // cleanup!\n});\n\n// Client\nconst es = new EventSource('/stream');\nes.onmessage = (e) => console.log(JSON.parse(e.data));`,
        interview: "SSE is what AI chatbots use to stream tokens. Simpler than WebSocket for server-to-client only. The double newline (\\n\\n) is the message separator — that's the SSE protocol."
      },
      { term: "gRPC", oneliner: "High-performance RPC over HTTP/2 using binary Protocol Buffers", color: "#FF8C42",
        how: "Define service in .proto file → generate typed client/server code in any language → binary communication over HTTP/2. 5-10x faster than REST+JSON.",
        flow: ["Write .proto schema","→ Generate typed code →","Client calls method like a function","→ Binary over HTTP/2 →","Server executes and returns"],
        details: ["Protocol Buffers (protobuf) = binary format — much smaller and faster than JSON","Strongly typed by default — .proto file is the contract between services","4 call types: Unary, Server streaming, Client streaming, Bidirectional streaming","Common in microservices and internal service communication — not browser-friendly without gRPC-Web"],
        code: `// users.proto\nservice UserService {\n  rpc GetUser (UserRequest) returns (User);\n}\nmessage UserRequest { string id = 1; }\nmessage User { string id = 1; string name = 2; }\n\n// Generated TypeScript client:\nconst user = await userClient.getUser({ id: '123' });\n// Type-safe! No fetch, no JSON.parse — just call fn`,
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
        code: `// Payload (base64 decoded — NOT encrypted!)\n{ "userId": "abc", "role": "admin", "exp": 1720000900 }\n\n// Signature = HMAC_SHA256(\n//   base64(header) + '.' + base64(payload),\n//   SECRET_KEY\n// )\n// Tamper with payload → signature fails → rejected!\n\n// Sending in request:\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...`,
        interview: "JWT is stateless — server doesn't need DB to validate. Just verify the signature. Downside: can't revoke. Solution: short access token (15min) + refresh token rotation in httpOnly cookie."
      },
      { term: "OAuth 2.0 + OpenID Connect", oneliner: "'Login with Google' — delegate auth to a trusted provider", color: "#A78BFA",
        how: "You don't store passwords. User logs in at Google. Google redirects back with a code. You exchange code for tokens. OIDC adds identity (who) on top of OAuth (what they can access).",
        flow: ["Click 'Login with Google'","→ Redirect to Google →","User logs in at Google","→ Redirect back ?code=XYZ →","Exchange code for tokens","→ Get user profile"],
        details: ["OAuth 2.0 = authorization ('can this app read your calendar?')","OpenID Connect = authentication ('who are you?') built on top of OAuth","Flows: Auth Code + PKCE (web/mobile), Client Credentials (machine-to-machine)","Never build your own auth — use Clerk, Auth.js/NextAuth, or Supabase Auth"],
        code: `// Step 1: Redirect user to Google\nhttps://accounts.google.com/o/oauth2/auth\n  ?client_id=YOUR_CLIENT_ID\n  &redirect_uri=https://app.com/callback\n  &scope=openid email profile\n  &response_type=code\n  &state=csrf_token\n\n// Step 2: Receive code, exchange for tokens\nPOST https://oauth2.googleapis.com/token\n  { code, client_id, client_secret, redirect_uri }\n// Returns: { access_token, id_token (JWT with user info) }`,
        interview: "OAuth = authorization (access someone's resources). OIDC = authentication (prove identity). The id_token is a JWT containing the user's identity. Your app verifies it with Google's public key."
      },
      { term: "Sessions vs JWT", oneliner: "Stateful server-side session vs stateless self-contained token", color: "#A78BFA",
        how: "Sessions: server creates and stores session in DB/Redis, sends opaque session_id in cookie. JWT: server creates signed token with all data inside, client stores and sends it.",
        flow: ["Session: Cookie(session_id) → DB lookup → User data (stateful)","JWT: Token → Verify signature → Decode payload → User data (NO DB!)"],
        details: ["Sessions: easy to revoke (delete from DB), but requires DB/Redis on every request","JWT: no DB lookup = faster, horizontally scalable, but can't revoke until expiry","httpOnly cookie: JS cannot read it — blocks XSS stealing your auth token","Secure flag: cookie only sent over HTTPS. SameSite=Strict: blocks CSRF attacks"],
        code: `// Sessions\nreq.session.userId = user.id;  // stored server-side\n// Cookie sent: session_id=abc (opaque, no data)\n\n// JWT\nconst token = jwt.sign({ userId: user.id }, SECRET);\n// Cookie sent: token=eyJ... (data encoded inside)\n\n// Best practice for both:\nres.cookie('token', value, {\n  httpOnly: true,   // JS cannot access\n  secure: true,     // HTTPS only\n  sameSite: 'strict' // CSRF protection\n});`,
        interview: "Use sessions when you need instant revocation (banking, high security). Use JWT for stateless APIs and microservices. Never store auth tokens in localStorage — XSS can steal them."
      },
      { term: "CORS", oneliner: "Browser blocks cross-origin requests unless server explicitly allows them", color: "#A78BFA",
        how: "Browser enforces same-origin policy. Cross-origin request → browser sends OPTIONS preflight → server responds with allowed origins in headers → browser allows or blocks the real request.",
        flow: ["app.com → fetch('api.other.com')","→ Browser sends OPTIONS preflight →","Server: Access-Control-Allow-Origin: app.com","→ Browser: allowed → Sends real request"],
        details: ["Only browsers enforce CORS — Postman/curl/server-to-server bypass it completely","Simple requests (GET, basic POST) skip preflight. Complex (PUT, DELETE, custom headers) trigger it","Credentials (cookies) require specific origin (not *) + credentials: true on both sides","CORS errors are ALWAYS fixed server-side — add the headers on the server, not the client"],
        code: `// npm install cors\n// const cors = require('cors');\n\n// Development\napp.use(cors({ origin: '*' }));\n\n// Production (specific origins)\napp.use(cors({\n  origin: ['https://yourapp.com'],\n  methods: ['GET','POST','PUT','DELETE'],\n  allowedHeaders: ['Content-Type', 'Authorization'],\n  credentials: true // allow cookies\n}));`,
        interview: "CORS is a browser security feature, not a server feature. It prevents malicious websites from silently making API calls using your logged-in cookies. The fix is always on the server — add the correct headers."
      },
      { term: "XSS & CSRF Attacks", oneliner: "Two most common web security attacks — and how to prevent them", color: "#A78BFA",
        how: "XSS: attacker injects malicious JS into your page — steals tokens, hijacks sessions. CSRF: tricks your browser into making authenticated requests to another site using your cookies.",
        flow: ["XSS: Inject script → Runs in victim browser → Steals localStorage/cookies","CSRF: Evil site → Triggers request to bank.com → Bank sees your cookie → Transfer!"],
        details: ["XSS prevention: escape all user input, use Content-Security-Policy header, httpOnly cookies (JS can't steal)","CSRF prevention: SameSite=Strict cookies, CSRF tokens in forms, check Origin/Referer headers","Stored XSS: malicious script saved in DB, runs for all visitors — most dangerous","Never use innerHTML with user data — use textContent or a sanitizer like DOMPurify"],
        code: `// XSS prevention\ndiv.textContent = userInput; // safe\ndiv.innerHTML = userInput;   // DANGEROUS — executes scripts!\n\n// CSP header blocks inline scripts\nContent-Security-Policy: default-src 'self'\n\n// CSRF prevention in Express\n// Use 'csurf' package — generates token per session\n// app.use(csrfProtection());\n// Token must be in form/header — attacker can't read it\n\n// SameSite cookie = best CSRF defense\nres.cookie('session', val, { sameSite: 'strict' });`,
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
        code: `// Cookies (set by server — most secure for auth)\nSet-Cookie: token=abc; HttpOnly; Secure; SameSite=Strict\n\n// localStorage (persists across sessions)\nlocalStorage.setItem('theme', 'dark');\nlocalStorage.getItem('theme'); // 'dark'\n\n// sessionStorage (tab-scoped)\nsessionStorage.setItem('step', '2');\n\n// ❌ NEVER store auth tokens in localStorage!\nlocalStorage.setItem('jwt', token); // XSS steals it!`,
        interview: "httpOnly cookies for auth (JS can't steal them). localStorage for non-sensitive preferences. Session data in cookies or server sessions. If you store JWT in localStorage, XSS attack = game over."
      },
      { term: "Caching Layers", oneliner: "Store results of expensive work temporarily — the key to fast apps", color: "#34D399",
        how: "Multiple cache layers between user and database. Each layer is faster than the one below. Cache hit = fast. Cache miss = go to next layer.",
        flow: ["Browser Cache","→ CDN Cache →","Reverse Proxy Cache","→ Redis (in-memory) →","PostgreSQL/MongoDB (source of truth)"],
        details: ["Browser: Cache-Control header controls freshness. max-age=3600 caches for 1 hour","CDN: caches at edge servers globally — serves static assets near the user","Redis: in-memory, sub-millisecond response. Cache DB query results, sessions, rate limit counters","Cache invalidation: hardest problem in CS. Either TTL-based or event-driven (purge on write)"],
        code: `// HTTP caching headers\nCache-Control: max-age=3600           // cache 1 hour\nCache-Control: no-store               // never cache\nCache-Control: stale-while-revalidate // serve stale + refresh\n\n// Redis cache-aside pattern\nasync function getUser(id) {\n  const hit = await redis.get('user:' + id);\n  if (hit) return JSON.parse(hit); // HIT — fast!\n  const user = await db.findById(id); // MISS — slow\n  await redis.setex('user:'+id, 3600, JSON.stringify(user));\n  return user;\n}`,
        interview: "Cache invalidation is the hardest part — when to clear the cache? Two strategies: TTL (expire after N seconds, possibly stale) or event-driven (clear immediately when data changes)."
      },
      { term: "CDN", oneliner: "Copy static assets to servers worldwide — serve from closest one", color: "#34D399",
        how: "User requests asset → CDN routes to nearest edge server → if cached: serve instantly. If not cached: fetch from origin, cache for next user. All future users in that region get it fast.",
        flow: ["User in Mumbai","→ Request logo.png →","CDN routes to Mumbai edge","→ Cache hit: 5ms →","vs 200ms to US origin"],
        details: ["Assets: images, JS, CSS, fonts, videos — static content","Some CDNs (Cloudflare) can cache API responses and run serverless functions at the edge","Cache busting: add content hash to filename (app.a3f9.js) — forces fresh download on deploy","Popular: Cloudflare, AWS CloudFront, Fastly, Vercel Edge Network"],
        code: `// Without CDN: User (India) → Origin (US) → ~200ms\n// With CDN: User (India) → Edge (India) → ~5ms\n\n// Static assets — cache forever (hash = cache busting)\nCache-Control: public, max-age=31536000, immutable\n// filename: main.a3f9b2.js (hash changes on new deploy)\n\n// HTML — no cache (always fresh)\nCache-Control: no-cache\n\n// Next.js on Vercel: CDN automatic for all static files`,
        interview: "CDN = geographically distributed cache. Key insight: physics limits speed — reduce distance between server and user. A CDN in Mumbai serves Indian users 40x faster than a US origin server."
      },
      { term: "DNS", oneliner: "Internet's phonebook — converts domain names to IP addresses", color: "#34D399",
        how: "Browser checks cache → asks OS → asks Recursive Resolver (ISP) → asks Root Nameserver → asks .com TLD server → asks domain's Authoritative Nameserver → gets IP → connects.",
        flow: ["Type google.com","→ Browser cache? →","Recursive Resolver (ISP)","→ Root NS → .com NS →","google.com Nameserver","→ Returns IP"],
        details: ["A record: domain → IPv4 (93.184.x.x). AAAA: → IPv6. CNAME: alias to another domain. MX: email server","TTL: how long each answer is cached. Low TTL = faster propagation when you change DNS","DNS propagation: changing DNS takes 24-48hrs because old TTL caches expire gradually","DNSSEC: signs DNS records cryptographically to prevent DNS spoofing/poisoning attacks"],
        code: `// DNS record types\nA      example.com     → 93.184.216.34    (IPv4)\nAAAA   example.com     → 2606:2800::...   (IPv6)\nCNAME  www.example.com → example.com      (alias)\nMX     example.com     → mail.example.com (email)\nTXT    example.com     → "v=spf1..."      (verification)\n\n// Check DNS:\nnslookup example.com\ndig example.com A\ndig example.com MX`,
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
        code: `# Nginx upstream (load balancer)\nupstream backend {\n  least_conn;  # strategy: fewest active connections\n  server app1.example.com weight=3;\n  server app2.example.com weight=1;\n  server app3.example.com backup; # failover only\n}\nserver {\n  listen 80;\n  location / { proxy_pass http://backend; }\n}`,
        interview: "Load balancing enables horizontal scaling — many small servers instead of one big one. Stateless apps scale perfectly. Session-based apps need sticky sessions or shared Redis for session storage."
      },
      { term: "Message Queues", oneliner: "Decouple services — producer sends work, consumer processes when ready", color: "#60A5FA",
        how: "Producer puts message in queue and immediately continues. Queue persists the message durably. Consumer picks it up and processes at its own pace. They never communicate directly — fully decoupled.",
        flow: ["User pays","→ Producer: queue.add('send_email') →","Queue persists message","→ Consumer picks up →","Sends email (async, retryable)"],
        details: ["Patterns: Work Queue (distribute tasks), Pub/Sub (fan-out to multiple consumers), Dead Letter Queue (failed messages)","Tools: Redis + BullMQ (simple), RabbitMQ (flexible routing), Kafka (high-throughput event streaming, millions/sec)","Use when: long-running tasks (video encoding), spike traffic absorption, cross-service communication","Messages can be retried on failure — unlike direct HTTP calls which fail permanently"],
        code: `// BullMQ + Redis example\n// Producer (payment service):\nawait emailQueue.add('receipt', {\n  to: user.email, orderId: order.id\n});\n// Returns immediately! Payment flow not blocked.\n\n// Consumer (email service — separate process):\nconst worker = new Worker('emails', async (job) => {\n  if (job.name === 'receipt')\n    await sendEmail(job.data);\n}, { connection: redis });`,
        interview: "Queues give resilience and decoupling. If email service is down, payments still work — emails queue up and drain when it recovers. The queue acts as a buffer between services."
      },
      { term: "Docker & Containers", oneliner: "Package app + environment together — runs identically everywhere", color: "#60A5FA",
        how: "Docker image = layered snapshot of your app + OS + dependencies. Container = running instance of that image. 'Works on my machine' problem eliminated.",
        flow: ["Write Dockerfile","→ docker build → Image (portable)","→ docker run → Container (running)","→ Same on dev/staging/prod →","No environment differences"],
        details: ["Image: read-only blueprint. Container: running instance (like class vs object in OOP)","Docker Compose: define and run multi-container apps (app + postgres + redis) with one command","Each container is isolated — its own filesystem, network, process space","Kubernetes (K8s): orchestrate containers at scale — auto-scaling, self-healing, rolling deployments"],
        code: `# Dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD ["node", "dist/index.js"]\n\n# docker-compose.yml\nservices:\n  app:\n    build: .\n    ports: ["3000:3000"]\n    depends_on: [db]\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_DB: myapp`,
        interview: "Container = isolated process with its own filesystem. Much lighter than VM (no guest OS). Docker standardizes 'the environment' — dev, CI, and prod all run identical images."
      },
      { term: "CI/CD Pipeline", oneliner: "Automatically test and deploy code on every git push", color: "#60A5FA",
        how: "CI: every push triggers automated tests. CD: if all tests pass, automatically deploy to staging or production. Catch bugs before users do, ship faster with confidence.",
        flow: ["git push","→ GitHub Actions triggers →","Install → Lint → Test → Build","→ All green? →","Deploy to Staging → Production"],
        details: ["CI = Continuous Integration: merge often, test automatically, surface conflicts early","CD = Continuous Delivery (auto-deploy to staging) or Deployment (auto-deploy to prod)","Tools: GitHub Actions (most popular), GitLab CI, CircleCI, Jenkins","Branch protection: require CI to pass before merging to main — prevents broken deploys"],
        code: `# .github/workflows/deploy.yml\nname: CI/CD\non: [push]\njobs:\n  pipeline:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '20' }\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npm run build\n      - name: Deploy\n        if: github.ref == 'refs/heads/main'\n        run: vercel --prod --token=$\{{ secrets.VERCEL_TOKEN }}`,
        interview: "CI/CD removes fear of shipping. Every commit is tested automatically. If tests fail, deployment stops. You get fast feedback loops and can deploy many times per day safely."
      },
      { term: "Rate Limiting", oneliner: "Limit requests per user per time window — block abuse and DDoS", color: "#60A5FA",
        how: "Track how many requests each user (by IP or userId) makes per time window. If they exceed the limit, return 429. Counts stored in Redis so all server instances share state.",
        flow: ["100 requests from one IP","→ Redis counter increments →","Under limit: pass through","Over limit: 429 Too Many Requests + Retry-After header"],
        details: ["Algorithms: Fixed Window (simple), Sliding Window (smoother), Token Bucket (allows bursts)","Store counters in Redis — shared across all server instances for distributed systems","Apply at: API Gateway level, Nginx, or Express middleware","Differentiate: strict limit for login attempts (brute force), loose limit for general API"],
        code: `// npm install express-rate-limit\n// const rateLimit = require('express-rate-limit');\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100,                  // 100 requests per window\n  message: { error: 'Too many requests' },\n  standardHeaders: true,     // send RateLimit-* headers\n  keyGenerator: (req) => req.user?.id || req.ip,\n});\n\n// Strict login limiting (prevent brute force)\nconst loginLimiter = rateLimit({ windowMs: 60000, max: 5 });\napp.post('/login', loginLimiter, loginHandler);`,
        interview: "Rate limiting protects against DDoS, brute force, and scrapers. Use Redis for distributed counter storage. Return 429 with Retry-After header so well-behaved clients know when to retry."
      },
      { term: "Microservices vs Monolith", oneliner: "One big deployable vs many specialized services — when to use which", color: "#60A5FA",
        how: "Monolith: all code in one deployable unit, one DB. Simple to start. Microservices: separate services per business domain, each with own DB, deployed independently.",
        flow: ["Monolith: User+Order+Payment code → one deploy → one DB","Microservices: User Service ↔ Order Service ↔ Payment Service (own DB, own deploy)"],
        details: ["Monolith pros: simple dev, easy debugging, one deploy, fast iteration. Cons: scales as one unit","Microservices pros: scale independently, different tech stacks per service. Cons: network latency, distributed tracing, eventual consistency","Service mesh (Istio, Linkerd): handles service-to-service communication, observability","Start monolith. Extract services when a specific domain needs independent scaling."],
        code: `// Monolith — everything in one Express app:\napp.use('/users', usersRouter);\napp.use('/orders', ordersRouter);    // same process\napp.use('/payments', paymentsRouter); // same DB\n\n// Microservices — separate apps:\n// User Service:    user-svc:3001\n// Order Service:   order-svc:3002 → calls user-svc\n// Payment Service: pay-svc:3003\n// API Gateway:     gateway:3000 → routes to all\n// Each: own Dockerfile, own DB, own CI/CD pipeline`,
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
        code: `// Short Polling (simplest, most wasteful)\nsetInterval(() => fetch('/api/messages'), 5000);\n\n// Long Polling (better)\nasync function poll() {\n  const res = await fetch('/api/messages?since=' + lastId);\n  handle(await res.json());\n  poll(); // immediately request next\n}\n\n// SSE (best for server→client feeds)\nconst es = new EventSource('/api/stream');\nes.onmessage = e => render(e.data);\n\n// WebSocket (best for bidirectional)\nconst ws = new WebSocket('wss://api.example.com');\nws.onmessage = e => render(e.data);\nws.send('hello server!');`,
        interview: "Rule of thumb: SSE for server-to-client only (AI streaming, live feeds, notifications). WebSocket for bidirectional real-time (chat, games, collaborative editing). Long polling as universal fallback."
      },
      { term: "API Gateway", oneliner: "Single entry point for all client requests — centralized cross-cutting concerns", color: "#F472B6",
        how: "Instead of clients calling 10 services directly, they call the API Gateway. Gateway handles routing, auth, rate limiting, logging, SSL termination once — not in every service.",
        flow: ["Client (one URL)","→ API Gateway →","Auth check → Rate limit → Route","→ User Svc / Order Svc / Payment Svc"],
        details: ["Handles cross-cutting concerns once: auth, logging, CORS, rate limiting, SSL","BFF Pattern (Backend for Frontend): different gateway shapes response for mobile vs web clients","Tools: AWS API Gateway, Kong, Nginx, Traefik, custom Express gateway","Adds latency (one extra hop) — keep gateway logic thin, push business logic to services"],
        code: `// Custom Express API Gateway\napp.use(authMiddleware);   // auth for ALL services\napp.use(rateLimiter);      // rate limit everything\napp.use(requestLogger);    // log all requests\n\n// Route to microservices\napp.use('/users',   createProxyMiddleware({ target: 'http://user-svc:3001' }));\napp.use('/orders',  createProxyMiddleware({ target: 'http://order-svc:3002' }));\napp.use('/payment', createProxyMiddleware({ target: 'http://pay-svc:3003' }));`,
        interview: "API Gateway = front door for microservices. Clients don't know or care about service locations. You handle auth once at the gateway instead of reimplementing in every service."
      },
      { term: "SSL/TLS & HTTPS", oneliner: "Encrypts all data between browser and server — prevents eavesdropping", color: "#F472B6",
        how: "TLS Handshake: client hello → server sends certificate → client verifies cert with CA → both derive session key using Diffie-Hellman → all subsequent data encrypted with symmetric key.",
        flow: ["Client Hello (cipher suites)","→ Server Hello + Certificate →","Client verifies cert with CA","→ Key exchange (Diffie-Hellman) →","Symmetric session key agreed","↔ Encrypted from here on"],
        details: ["Certificate: issued by trusted CA (Let's Encrypt, DigiCert) — proves server identity","Let's Encrypt: free, auto-renewing SSL certificates — no excuse for HTTP-only sites","TLS 1.3 (current): 1-RTT handshake (vs 2-RTT in 1.2), forward secrecy by default","HSTS: HTTP header that tells browser to always use HTTPS — even if user types http://"],
        code: `# Free SSL with Certbot (Let's Encrypt)\ncertbot --nginx -d example.com -d www.example.com\n\n# Nginx HTTPS config\nserver {\n  listen 443 ssl http2;\n  ssl_certificate /etc/letsencrypt/.../fullchain.pem;\n  ssl_certificate_key /etc/letsencrypt/.../privkey.pem;\n  ssl_protocols TLSv1.3;\n  # HSTS: always use HTTPS for 1 year\n  add_header Strict-Transport-Security "max-age=31536000" always;\n}`,
        interview: "TLS provides: confidentiality (encryption), integrity (data not tampered), authentication (server identity via certificate). HTTPS = HTTP over TLS. Let's Encrypt makes this free and automatic."
      },
      { term: "Service Workers & PWA", oneliner: "Background JS thread — enables offline apps, push notifications, install prompt", color: "#F472B6",
        how: "Service Worker runs in background thread, separate from page. Intercepts all network requests from your app. Can serve from cache when offline. Receives push notifications even when app is closed.",
        flow: ["App makes fetch()","→ Service Worker intercepts →","Cached? → Serve immediately","Not cached? → Fetch from network → Cache for next time"],
        details: ["Lifecycle: install (cache assets) → activate (clean old caches) → fetch (intercept requests)","PWA criteria: served over HTTPS + has Service Worker + has Web App Manifest (for installability)","Cache strategies: Cache First (fast, possibly stale), Network First (fresh, offline fallback), Stale-While-Revalidate","Background Sync API: queue failed requests and retry when connection restores"],
        code: `// service-worker.js\nself.addEventListener('install', e => {\n  e.waitUntil(\n    caches.open('v1').then(c =>\n      c.addAll(['/', '/index.html', '/app.js'])\n    )\n  );\n});\n\nself.addEventListener('fetch', e => {\n  e.respondWith(\n    caches.match(e.request)\n      .then(cached => cached || fetch(e.request))\n  );\n});`,
        interview: "Service Workers power PWAs — web apps that work offline and can be installed. Used by Twitter Lite, Starbucks, Pinterest. The SW intercepts fetch calls and serves from cache — invisible to the app."
      },
    ]
  },
];

const DATA = {
  js: {
    roadmap: [
      { phase: "Phase 1 — Foundations", topics: ["Variables: var/let/const + Hoisting", "Data Types: primitives vs objects", "Functions: declarations, expressions, arrow fns", "Scope: global, function, block", "Closures & Lexical Environment"] },
      { phase: "Phase 2 — Core Mechanics", topics: ["Event Loop: Call Stack + Web APIs + Queue", "Prototypes & Prototype Chain", "this keyword: 4 binding rules", "Callbacks → Promises → async/await", "Error handling: try/catch/finally"] },
      { phase: "Phase 3 — Advanced", topics: ["Higher Order Functions: map/filter/reduce", "Destructuring, Spread/Rest, Optional chaining", "Modules: ESM vs CommonJS", "WeakMap/WeakSet/Symbol", "Generators & Iterators"] },
      { phase: "Phase 4 — Patterns", topics: ["Design Patterns: Module, Singleton, Observer", "Functional Programming basics", "Immutability patterns", "Memoization & currying", "Debounce & Throttle"] },
    ],
    patterns: [
      { name: "🔗 Closure", what: "A function that remembers its outer scope even after the outer function has returned.", why: "Data privacy, factories, memoization", code: `function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c = makeCounter();\nc(); // 1\nc(); // 2 — count persists!`, interview: "Closures let inner functions access outer variables. Classic use: creating private state without classes." },
      { name: "🔄 Event Loop", what: "JS is single-threaded. Event loop picks tasks from queue when call stack is empty.", why: "Explains async behavior and microtask priority", code: `console.log('1');\nsetTimeout(() => console.log('2'), 0); // macrotask\nPromise.resolve().then(() => console.log('3')); // microtask\nconsole.log('4');\n// Output: 1, 4, 3, 2`, interview: "Microtasks (Promises) always run before macrotasks (setTimeout), even if setTimeout is 0ms." },
      { name: "📦 Prototype Chain", what: "Every object has a __proto__ link. Property lookup walks the chain until found or null.", why: "Foundation of JS inheritance", code: `const animal = { breathes: true };\nconst dog = Object.create(animal);\ndog.barks = true;\nconsole.log(dog.breathes); // true — from prototype!`, interview: "JS uses prototypal inheritance. Classes are syntactic sugar over the same prototype mechanism." },
      { name: "🎯 this Binding", what: "4 rules: default (window/undefined), implicit (obj.fn()), explicit (call/bind), new.", why: "Most confusing JS concept", code: `const obj = {\n  name: 'Dev',\n  greet() { console.log(this.name); }, // 'Dev'\n  arrow: () => console.log(this.name), // undefined\n};\nobj.greet(); // this = obj (implicit)\nobj.arrow(); // this = outer (lexical)`, interview: "Arrow functions don't have their own 'this'. They inherit from the surrounding lexical context." },
    ],
    questions: [
      { q: "What is the difference between == and ===?", a: "== type coerces (0 == '0' is true). === checks value AND type (0 === '0' is false). Always use ===." },
      { q: "Explain var vs let vs const", a: "var: function-scoped, hoisted to undefined. let: block-scoped, TDZ. const: block-scoped, can't reassign but object contents can mutate." },
      { q: "What is a closure? Real-world example?", a: "Function that retains access to outer scope. React useState uses closures — the setter remembers which state slot to update." },
      { q: "How does async/await work under the hood?", a: "Syntactic sugar over Promises. async fn returns a Promise. await pauses that function only, not the thread — resumes when promise resolves." },
      { q: "What is event delegation?", a: "Attach one listener to parent, not each child. Uses event bubbling. event.target identifies the clicked child. Better performance." },
      { q: "Explain call, apply, bind", a: "All set 'this'. call(thisArg, a, b) — invokes now. apply(thisArg, [a,b]) — invokes with array. bind(thisArg) — returns new function, doesn't invoke." },
      { q: "What is debounce vs throttle?", a: "Debounce: fires after N ms of inactivity (search input). Throttle: fires at most once per N ms (scroll handler)." },
      { q: "What is hoisting?", a: "Function declarations and var hoisted to top of scope. Functions fully hoisted. var hoisted as undefined. let/const in TDZ." },
    ]
  },
  ts: {
    roadmap: [
      { phase: "Phase 1 — Type Basics", topics: ["Primitive types, inference vs annotation", "Arrays, Tuples, Enums", "Union | and Intersection & types", "Type aliases vs Interfaces"] },
      { phase: "Phase 2 — Functions & Objects", topics: ["Function types, optional & default params", "readonly and optional properties", "Type assertions (as) and non-null (!)"] },
      { phase: "Phase 3 — Generics", topics: ["Generic functions and interfaces", "Constraints with extends", "keyof and typeof operators", "Mapped Types, Conditional Types"] },
      { phase: "Phase 4 — Advanced Types", topics: ["Utility Types: Partial, Required, Pick, Omit, Record", "Discriminated Unions", "Template Literal Types", "tsconfig: strict, paths, target"] },
    ],
    patterns: [
      { name: "🧩 Generics", what: "Write reusable code that works with any type while keeping safety.", why: "Avoids duplicate code and unsafe 'any'", code: `function identity<T>(arg: T): T { return arg; }\nconst s = identity<string>('hi'); // type: string\nconst n = identity<number>(42);   // type: number`, interview: "Generics let you write flexible, reusable functions without sacrificing type safety." },
      { name: "🔀 Discriminated Unions", what: "Union with a shared literal property enabling safe narrowing.", why: "Model loading/success/error states cleanly", code: `type State =\n  | { status: 'loading' }\n  | { status: 'success'; data: string }\n  | { status: 'error'; message: string };\n\nif (s.status === 'success') {\n  s.data // TS KNOWS this exists!\n}`, interview: "Discriminated unions model real-world states and enable exhaustive checks — TS errors if you miss a case." },
      { name: "🛠 Utility Types", what: "Built-in generic types that transform existing types.", why: "Compose instead of duplicate", code: `interface User { id: number; name: string; email: string; }\ntype P = Partial<User>;          // all optional\ntype N = Pick<User, 'name'>;     // only name\ntype E = Omit<User, 'email'>;    // remove email\ntype M = Record<string, User>;   // dict`, interview: "Utility types like Partial, Pick, Omit let you derive types — DRY principle applied to types." },
    ],
    questions: [
      { q: "What is the difference between type and interface?", a: "Interface: extendable, declaration merging, best for objects. Type: unions, intersections, primitives. Rule: interface for objects, type for everything else." },
      { q: "What is 'any' vs 'unknown'?", a: "any: disables checking (unsafe). unknown: safe — forces you to narrow before using. Prefer unknown for external/API data." },
      { q: "What are mapped types?", a: "Create new types by transforming each property. Partial<T> is: { [K in keyof T]?: T[K] }." },
      { q: "What is a discriminated union?", a: "Union with shared literal property (discriminant). TS narrows type in if/switch blocks — enables exhaustive checking." },
      { q: "What does strict mode enable?", a: "strictNullChecks (null/undefined not assignable without explicit union), noImplicitAny, strictFunctionTypes, and more." },
    ]
  },
  react: {
    roadmap: [
      { phase: "Phase 1 — Core", topics: ["JSX & rendering", "Props & one-way data flow", "State with useState", "Event handling", "Conditional rendering & lists + keys"] },
      { phase: "Phase 2 — Hooks", topics: ["useEffect: side effects & cleanup", "useRef: DOM access + persistent values", "useContext: avoid prop drilling", "useMemo & useCallback: performance", "Custom hooks: extracting logic"] },
      { phase: "Phase 3 — Patterns", topics: ["Controlled vs Uncontrolled components", "Lifting state up", "Composition over inheritance", "Higher Order Components (HOC)"] },
      { phase: "Phase 4 — Advanced", topics: ["React.memo for memoization", "Lazy loading + Suspense", "Error Boundaries", "useTransition, useDeferredValue"] },
    ],
    patterns: [
      { name: "🎣 useEffect Mental Model", what: "Run side effects after render. Dependency array controls when it re-runs.", why: "Most misunderstood hook", code: `useEffect(() => { /* every render */ });\nuseEffect(() => { /* once on mount */ }, []);\nuseEffect(() => {\n  const sub = subscribe(id);\n  return () => sub.unsubscribe(); // CLEANUP!\n}, [id]); // re-run when id changes`, interview: "Return a cleanup function to prevent memory leaks. Missing cleanup = bug. Missing deps = stale closure." },
      { name: "🏗 Custom Hooks", what: "Extract stateful logic into reusable 'use' functions.", why: "Share logic between components", code: `function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    fetch(url).then(r=>r.json()).then(d=>{\n      setData(d); setLoading(false);\n    });\n  }, [url]);\n  return { data, loading };\n}`, interview: "Custom hooks share stateful logic, not UI. Follow the same rules as built-in hooks." },
      { name: "⚡ useMemo vs useCallback", what: "useMemo caches a VALUE. useCallback caches a FUNCTION reference.", why: "Prevent unnecessary re-renders", code: `const total = useMemo(\n  () => items.reduce((s,i) => s + i.price, 0),\n  [items]\n);\nconst click = useCallback(\n  () => onSelect(id),\n  [id, onSelect]\n);`, interview: "Don't over-use. Profile first. Only helps when memoized children use these as props." },
    ],
    questions: [
      { q: "What is the virtual DOM?", a: "A JS copy of the real DOM. React diffs old vs new (reconciliation) and only updates changed parts." },
      { q: "When does a component re-render?", a: "1) State changes 2) Props change 3) Parent re-renders 4) Context changes. React.memo skips if props are shallowly equal." },
      { q: "Prop drilling solution?", a: "useContext for global state, component composition, or state management (Zustand/Redux)." },
      { q: "Controlled vs Uncontrolled?", a: "Controlled: React state is source of truth (value + onChange). Uncontrolled: DOM manages state, access via useRef." },
      { q: "What are Error Boundaries?", a: "Class components catching errors in child tree — show fallback UI. Use react-error-boundary library for functional equivalent." },
    ]
  },
  nextjs: {
    roadmap: [
      { phase: "Phase 1 — App Router", topics: ["File-based routing: page.tsx, layout.tsx, loading.tsx", "Server vs Client Components", "Link component & navigation", "Image, Font optimization"] },
      { phase: "Phase 2 — Data Fetching", topics: ["Server Component fetch (no useEffect!)", "Route Handlers (API routes)", "Server Actions: mutations", "Streaming with Suspense", "Caching and revalidation"] },
      { phase: "Phase 3 — Advanced", topics: ["Middleware for auth/redirects", "Dynamic routes [id] + catch-all [...slug]", "Metadata API for SEO", "Parallel and intercepting routes"] },
      { phase: "Phase 4 — Production", topics: ["ISR: Incremental Static Regeneration", "Edge Runtime vs Node Runtime", "next/image CDN optimization", "Deployment: Vercel/self-hosted"] },
    ],
    patterns: [
      { name: "🖥 Server vs Client Components", what: "Server runs on server (zero JS sent). Client ('use client') runs in browser.", why: "Server = smaller bundle, direct DB access", code: `// Server Component (default)\nasync function Page({ id }) {\n  const data = await db.find(id); // direct DB!\n  return <div>{data.name}</div>;\n}\n\n// Client Component\n'use client';\nexport function Button() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n+1)}>{n}</button>;\n}`, interview: "Default is Server. Add 'use client' only for hooks/events. Push 'use client' boundary as far down the tree as possible." },
      { name: "⚡ Server Actions", what: "Async functions marked 'use server' — run on server, callable from client.", why: "Replaces simple API routes for mutations", code: `'use server';\nexport async function createPost(fd) {\n  const title = fd.get('title');\n  await db.posts.create({ title });\n  // revalidatePath clears this route's cache\n}\n\n// In Server Component:\n<form action={createPost}>\n  <input name="title" />\n  <button>Create</button>\n</form>`, interview: "Server Actions handle mutations server-side. No API route needed. The form action is the function itself." },
      { name: "🗃 Caching", what: "4 cache layers. Next.js 15: fetch no longer cached by default.", why: "Most confusing Next.js concept", code: `fetch(url, { cache: 'no-store' }); // always fresh\nfetch(url, { next: { revalidate: 60 } }); // ISR-like\n\n// After mutation — purge route cache:\n// revalidatePath('/posts') from next/cache module`, interview: "Next.js 15 changed defaults — fetch is no longer cached. Be explicit. revalidatePath purges the cache for a specific route." },
    ],
    questions: [
      { q: "App Router vs Pages Router?", a: "App Router: layouts, Server Components, Server Actions, streaming. Pages Router: older, getServerSideProps/getStaticProps. App Router is the future." },
      { q: "When NOT to use Server Components?", a: "When you need: useState, useEffect, onClick, browser APIs, third-party libs using window. Add 'use client' for those." },
      { q: "What is ISR?", a: "Incremental Static Regeneration: statically generated pages revalidated in background after a set time. Fast static + fresh data." },
      { q: "What is Next.js Middleware?", a: "Runs on Edge before request. Used for: auth redirects, A/B testing, locale detection, rate limiting. Export from middleware.ts at root." },
    ]
  },
  backend: {
    roadmap: [
      { phase: "Phase 1 — Node.js Core", topics: ["Node event loop (libuv)", "Modules: CommonJS vs ESM", "File system (fs), Streams, Buffers", "Environment: process, dotenv"] },
      { phase: "Phase 2 — Express/Fastify", topics: ["Routing: GET, POST, PUT, DELETE", "Middleware: parsing, CORS, logging", "Error handling middleware (4 params)", "Fastify: schema validation, plugins"] },
      { phase: "Phase 3 — Databases", topics: ["PostgreSQL with Prisma ORM", "MongoDB with Mongoose", "Redis: caching, sessions, queues", "Transactions & ACID properties"] },
      { phase: "Phase 4 — Auth & Security", topics: ["JWT: access + refresh tokens", "OAuth 2.0 / OpenID Connect", "Rate limiting, CORS, Helmet", "Input validation: zod/joi"] },
      { phase: "Phase 5 — Production", topics: ["Docker: containerization", "CI/CD with GitHub Actions", "Logging: Winston/Pino", "Health checks & monitoring"] },
    ],
    patterns: [
      { name: "🔐 JWT Auth Flow", what: "Stateless auth using signed tokens.", why: "Most common API auth pattern", code: `app.post('/login', async (req, res) => {\n  const user = await verify(req.body);\n  const token = jwt.sign(\n    { userId: user.id }, SECRET, { expiresIn: '15m' }\n  );\n  res.json({ token });\n});\n\nconst auth = (req, res, next) => {\n  const t = req.headers.authorization?.split(' ')[1];\n  try { req.user = jwt.verify(t, SECRET); next(); }\n  catch { res.status(401).json({ error: 'Unauthorized' }); }\n};`, interview: "Short-lived access token + long-lived refresh token in httpOnly cookie. Never store in localStorage." },
      { name: "🗄 Prisma ORM", what: "Type-safe database queries from schema.", why: "Most popular Node.js + TS ORM", code: `// schema.prisma\nmodel User {\n  id    Int    @id @default(autoincrement())\n  email String @unique\n  posts Post[]\n}\n\n// Type-safe, auto-generated:\nconst user = await prisma.user.findUnique({\n  where: { email: 'hi@test.com' },\n  include: { posts: true }, // JOIN\n});`, interview: "Prisma generates TS types from schema — DB queries are type-safe at compile time." },
      { name: "🧱 Middleware Chain", what: "Middleware processes request sequentially, call next() to continue.", why: "Core Express architecture", code: `app.use(express.json());\napp.use(cors());\napp.use(rateLimit({ max: 100 }));\n\napp.get('/safe', authMiddleware, handler);\n\n// Error handler — MUST be last, MUST have 4 params:\napp.use((err, req, res, next) => {\n  res.status(err.status || 500).json({ error: err.message });\n});`, interview: "Middleware runs in order. Error handlers are identified by 4 params and must be registered last." },
    ],
    questions: [
      { q: "What are the main HTTP status codes?", a: "200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Rate Limited, 500 Server Error." },
      { q: "What is the N+1 query problem?", a: "Fetching N records then querying related data for each = N+1 queries. Solve with eager loading/JOIN. In Prisma: include: { posts: true }." },
      { q: "CORS — what is it and how do you fix it?", a: "Browser blocks cross-origin requests. Fix: add Access-Control-Allow-Origin header on the server. Use cors() middleware in Express." },
      { q: "What is ACID?", a: "Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), Durability (committed = persisted). Guarantees DB reliability." },
      { q: "How do you secure a Node.js API?", a: "Helmet, CORS config, rate limiting, input validation (zod), parameterized queries, httpOnly cookies, env vars for secrets, HTTPS." },
    ]
  },
};

const CONNECTIONS = [
  { from: "JS Closures", to: "React useState", note: "useState uses closures to remember state between renders" },
  { from: "JS Promises + async/await", to: "fetch() + REST API", note: "Every API call returns a Promise — async/await wraps it" },
  { from: "JS Event Loop", to: "Node.js async I/O", note: "Node uses same single-threaded event loop — never blocks" },
  { from: "TypeScript Generics", to: "React useState<T>", note: "useState<number>(0) ensures state and setter are both number" },
  { from: "React Server Components", to: "Next.js App Router", note: "App Router is built entirely on React Server Components" },
  { from: "REST API endpoints", to: "Webhooks", note: "Webhooks = reverse API. They POST to YOUR endpoint on events" },
  { from: "JWT Auth", to: "OAuth 2.0 / OIDC", note: "OAuth returns a JWT (id_token) containing user identity claims" },
  { from: "HTTP Request/Response", to: "REST / GraphQL / gRPC", note: "All 3 run over HTTP — just different ways to structure calls" },
  { from: "HTTP Upgrade", to: "WebSockets", note: "WS starts as HTTP request then upgrades to persistent socket" },
  { from: "HTTP Keep-Alive", to: "SSE (Server-Sent Events)", note: "SSE is just HTTP with long-lived response and streaming body" },
  { from: "Redis in-memory store", to: "Rate Limiting + Caching", note: "Redis stores rate limit counters AND cached query results" },
  { from: "CI/CD Pipeline", to: "Docker Containers", note: "CI builds Docker image → CD deploys container to production" },
  { from: "Load Balancer", to: "Horizontal Scaling", note: "Add more servers + LB in front = scale to millions of users" },
  { from: "Message Queue", to: "Microservices", note: "Queues decouple microservices — they never call each other directly" },
];

function RoadmapPhase({ phase, topics, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: '8px', border: `1px solid ${color}22`, borderRadius: '8px', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: `${color}11`, border: 'none', cursor: 'pointer', color: '#e8e8e8', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600 }}>
        <span>{phase}</span>
        <span style={{ color, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'none' }}>›</span>
      </button>
      {open && (
        <div style={{ padding: '12px 16px', background: '#0d0d0d' }}>
          {topics.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '13px', color: '#b0b0b0' }}>
              <span style={{ color, flexShrink: 0 }}>▸</span><span>{t}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PatternCard({ p, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${color}33`, borderRadius: '10px', overflow: 'hidden', marginBottom: '12px' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '14px 16px', background: `${color}0d`, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>{p.name}</div>
          <div style={{ color: '#888', fontSize: '12px' }}>{p.why}</div>
        </div>
        <span style={{ color, fontSize: '20px', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none', flexShrink: 0, marginLeft: '12px' }}>+</span>
      </button>
      {open && (
        <div style={{ background: '#080808', padding: '16px' }}>
          <div style={{ color: '#bbb', fontSize: '13px', marginBottom: '12px', lineHeight: '1.6' }}>{p.what}</div>
          <pre style={{ background: '#111', border: `1px solid ${color}22`, borderRadius: '8px', padding: '14px', margin: '0 0 12px', fontSize: '12px', color: '#e8e8e8', overflowX: 'auto', lineHeight: '1.7', fontFamily: 'monospace' }}>{p.code}</pre>
          <div style={{ background: `${color}15`, border: `1px solid ${color}40`, borderRadius: '6px', padding: '10px 12px' }}>
            <span style={{ color, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>💬 Interview: </span>
            <span style={{ color: '#ccc', fontSize: '13px' }}>{p.interview}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionCard({ item, i, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid #222`, borderRadius: '8px', marginBottom: '8px', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '13px 16px', background: '#0d0d0d', border: 'none', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'flex-start', fontFamily: 'inherit', textAlign: 'left' }}>
        <span style={{ color, fontWeight: 700, fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>Q{i + 1}</span>
        <span style={{ color: '#ddd', fontSize: '14px', fontWeight: 500 }}>{item.q}</span>
      </button>
      {open && (
        <div style={{ background: '#070707', padding: '12px 16px 16px', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ color: '#444', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>ANS</span>
            <p style={{ color: '#bbb', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>{item.a}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FlashCard({ card, color }) {
  const [open, setOpen] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const c = card.color || color;

  return (
    <div style={{ marginBottom: '12px', border: `1px solid ${c}33`, borderRadius: '12px', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '16px', background: open ? `${c}18` : '#0f0f0f', cursor: 'pointer', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', transition: 'background 0.2s', fontFamily: 'inherit' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ color: c, fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>{card.term}</div>
          <div style={{ color: '#777', fontSize: '13px' }}>{card.oneliner}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0, marginLeft: '12px' }}>
          <button onClick={e => { e.stopPropagation(); setQuiz(!quiz); setRevealed(false); setOpen(true); }}
            style={{ background: quiz ? `${c}30` : '#1a1a1a', border: `1px solid ${quiz ? c : '#333'}`, borderRadius: '6px', padding: '4px 9px', color: quiz ? c : '#666', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
            {quiz ? '✓ Quiz' : 'Quiz'}
          </button>
          <span style={{ color: c, fontSize: '18px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>⌄</span>
        </div>
      </button>
      {open && (
        <div style={{ background: '#080808', padding: '16px', borderTop: `1px solid ${c}22` }}>
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: c, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>⚙️ How it works</div>
            <div style={{ color: '#ccc', fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-line' }}>{card.how}</div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: c, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>🔀 Visual Flow</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
              {card.flow.map((step, i) => {
                const isArrow = step.startsWith('→') || step.startsWith('↔') || step.startsWith('↓');
                return (
                  <div key={i} style={{ background: isArrow ? 'transparent' : `${c}18`, border: isArrow ? 'none' : `1px solid ${c}40`, borderRadius: '6px', padding: isArrow ? '0 2px' : '4px 8px', color: isArrow ? c : '#ddd', fontSize: '12px', fontWeight: isArrow ? 700 : 400 }}>{step}</div>
                );
              })}
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: c, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>📋 Key Details</div>
            {card.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '5px' }}>
                <span style={{ color: c, flexShrink: 0, fontSize: '12px', marginTop: '1px' }}>▸</span>
                <span style={{ color: '#b0b0b0', fontSize: '13px', lineHeight: '1.5' }}>{d}</span>
              </div>
            ))}
          </div>
          <pre style={{ background: '#111', border: `1px solid ${c}22`, borderRadius: '8px', padding: '14px', margin: '0 0 12px', fontSize: '12px', color: '#e8e8e8', overflowX: 'auto', lineHeight: '1.7', fontFamily: 'monospace' }}>{card.code}</pre>
          {!quiz ? (
            <div style={{ background: `${c}15`, border: `1px solid ${c}40`, borderRadius: '6px', padding: '10px 12px' }}>
              <span style={{ color: c, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>💬 Interview: </span>
              <span style={{ color: '#ccc', fontSize: '13px' }}>{card.interview}</span>
            </div>
          ) : (
            <div style={{ background: '#0a0a0a', border: `1px solid #333`, borderRadius: '8px', padding: '14px' }}>
              <div style={{ color: '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>
                ❓ Explain <span style={{ color: c }}>{card.term}</span> in your own words:
              </div>
              {!revealed ? (
                <button onClick={() => setRevealed(true)} style={{ background: `${c}22`, border: `1px solid ${c}`, borderRadius: '8px', padding: '10px 20px', color: c, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Reveal Model Answer →
                </button>
              ) : (
                <div style={{ background: `${c}15`, border: `1px solid ${c}40`, borderRadius: '6px', padding: '12px' }}>
                  <span style={{ color: '#ccc', fontSize: '13px', lineHeight: '1.7' }}>{card.interview}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function WebTrack({ color }) {
  const [cat, setCat] = useState(0);
  return (
    <div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {WEB_CARDS.map((c, i) => (
          <button key={i} onClick={() => setCat(i)} style={{ padding: '7px 12px', borderRadius: '20px', border: `1px solid ${cat === i ? color : '#222'}`, background: cat === i ? `${color}20` : 'transparent', color: cat === i ? color : '#666', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.15s' }}>
            {c.category}
          </button>
        ))}
      </div>
      <div style={{ color: '#555', fontSize: '12px', marginBottom: '14px' }}>
        Tap any card to expand the full explanation. Hit <span style={{ color }}>Quiz</span> to test yourself before reading.
      </div>
      {WEB_CARDS[cat].cards.map((card, i) => <FlashCard key={i} card={card} color={color} />)}
    </div>
  );
}

function ConnectionMap({ color }) {
  return (
    <div>
      <p style={{ color: '#555', fontSize: '12px', marginBottom: '14px' }}>The conceptual links between everything. Understanding these is what separates good developers from great ones.</p>
      {CONNECTIONS.map((l, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch', marginBottom: '7px' }}>
          <div style={{ background: '#141414', border: `1px solid ${color}33`, borderRight: 'none', borderRadius: '8px 0 0 8px', padding: '9px 13px', minWidth: '120px', display: 'flex', alignItems: 'center' }}>
            <span style={{ color, fontSize: '12px', fontWeight: 700 }}>{l.from}</span>
          </div>
          <div style={{ background: `${color}22`, display: 'flex', alignItems: 'center', padding: '0 6px' }}>
            <span style={{ color, fontSize: '16px' }}>→</span>
          </div>
          <div style={{ background: '#141414', border: `1px solid ${color}33`, borderLeft: 'none', borderRadius: '0 8px 8px 0', padding: '9px 13px', flex: 1 }}>
            <div style={{ color: '#e0e0e0', fontSize: '12px', fontWeight: 700, marginBottom: '2px' }}>{l.to}</div>
            <div style={{ color: '#666', fontSize: '11px' }}>{l.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeTrack, setActiveTrack] = useState("js");
  const [activeTab, setActiveTab] = useState("roadmap");
  const [showConn, setShowConn] = useState(false);

  const track = TRACKS.find(t => t.id === activeTrack);
  const data = DATA[activeTrack];
  const color = track.color;
  const isWeb = activeTrack === "web";
  const TABS = isWeb ? ["flashcards"] : ["roadmap", "patterns", "questions"];

  return (
    <div style={{ minHeight: '100vh', background: '#050505', fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: '#e8e8e8' }}>
      <div style={{ padding: '24px 20px 0', textAlign: 'center', borderBottom: '1px solid #111', paddingBottom: '20px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#555', textTransform: 'uppercase', marginBottom: '6px' }}>Full Stack Developer</div>
        <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Complete Roadmap</h1>
        <p style={{ color: '#555', fontSize: '12px', margin: '0 0 18px' }}>Roadmap · Patterns · Interview Questions · Web Essentials · Everything</p>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {TRACKS.map(t => (
            <button key={t.id} onClick={() => { setActiveTrack(t.id); setActiveTab(t.id === 'web' ? 'flashcards' : 'roadmap'); setShowConn(false); }}
              style={{ padding: '7px 14px', borderRadius: '20px', border: `1px solid ${activeTrack === t.id ? t.color : '#222'}`, background: activeTrack === t.id ? `${t.color}20` : 'transparent', color: activeTrack === t.id ? t.color : '#666', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.15s' }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #111', padding: '0 20px', overflowX: 'auto' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setShowConn(false); }}
            style={{ padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer', color: activeTab === tab && !showConn ? color : '#555', fontFamily: 'inherit', fontSize: '13px', fontWeight: activeTab === tab && !showConn ? 700 : 400, borderBottom: activeTab === tab && !showConn ? `2px solid ${color}` : '2px solid transparent', marginBottom: '-1px', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
            {tab === 'roadmap' ? '🗺 Roadmap' : tab === 'patterns' ? '🧠 Patterns' : tab === 'questions' ? '🎯 Interview Qs' : '🃏 Flashcards'}
          </button>
        ))}
        <button onClick={() => setShowConn(!showConn)}
          style={{ padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer', color: showConn ? '#FF6B6B' : '#555', fontFamily: 'inherit', fontSize: '13px', fontWeight: showConn ? 700 : 400, borderBottom: showConn ? `2px solid #FF6B6B` : '2px solid transparent', marginBottom: '-1px', marginLeft: 'auto', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
          🔗 Connections
        </button>
      </div>

      <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
        {showConn && (
          <div>
            <h2 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: '#FF6B6B' }}>🔗 How Everything Connects</h2>
            <ConnectionMap color="#FF6B6B" />
          </div>
        )}
        {!showConn && isWeb && (
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 800, color }}>🌐 Web Essentials</h2>
            <p style={{ color: '#555', fontSize: '12px', margin: '0 0 16px' }}>HTTP, REST, GraphQL, Webhooks, WebSockets, Auth, DNS, CDN, Docker, CI/CD — the entire modern web.</p>
            <WebTrack color={color} />
          </div>
        )}
        {!showConn && !isWeb && activeTab === 'roadmap' && (
          <div>
            <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 800, color }}>{track.icon} {track.label} Learning Path</h2>
            {data.roadmap.map((r, i) => <RoadmapPhase key={i} phase={r.phase} topics={r.topics} color={color} />)}
          </div>
        )}
        {!showConn && !isWeb && activeTab === 'patterns' && (
          <div>
            <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 800, color }}>Key Patterns — {track.label}</h2>
            <p style={{ color: '#555', fontSize: '12px', marginBottom: '16px' }}>Tap any pattern to see concept, code, and interview explanation.</p>
            {data.patterns.map((p, i) => <PatternCard key={i} p={p} color={color} />)}
          </div>
        )}
        {!showConn && !isWeb && activeTab === 'questions' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color }}>Interview Qs — {track.label}</h2>
              <span style={{ background: `${color}20`, color, fontSize: '11px', padding: '3px 8px', borderRadius: '10px', fontWeight: 700 }}>{data.questions.length} Qs</span>
            </div>
            <p style={{ color: '#555', fontSize: '12px', marginBottom: '16px' }}>Try answering out loud first, then reveal.</p>
            {data.questions.map((item, i) => <QuestionCard key={i} item={item} i={i} color={color} />)}
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #0f0f0f', color: '#2a2a2a', fontSize: '11px', letterSpacing: '1px' }}>
        JS · TS · React · Next.js · Backend · Web Essentials
      </div>
    </div>
  );
}
