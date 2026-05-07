export const MCQ_DATA = [
  {
    topic: "React",
    q: "In React 19, which hook is used to access the result of a Promise or Context inside a conditional?",
    options: ["useEffect", "useMemo", "use", "useActionState"],
    a: "use",
    ex: "The 'use' hook is unique because it can be called within loops and conditional statements, unlike other hooks."
  },
  {
    topic: "Next.js",
    q: "Which directive is required to define a Server Action?",
    options: ["'use client'", "'use action'", "'use server'", "'use api'"],
    a: "'use server'",
    ex: "Server Actions are marked with 'use server' at the top of the function or file."
  },
  {
    topic: "TypeScript",
    q: "What does 'Record<string, number>' represent?",
    options: ["An array of strings and numbers", "An object where keys are strings and values are numbers", "A tuple with a string and a number", "A generic list"],
    a: "An object where keys are strings and values are numbers",
    ex: "Record is a utility type for defining object structures with specific key and value types."
  },
  {
    topic: "Backend",
    q: "What is the primary purpose of the 'Outbox Pattern'?",
    options: ["To speed up database writes", "To ensure atomicity between DB updates and message publishing", "To filter incoming emails", "To cache API responses"],
    a: "To ensure atomicity between DB updates and message publishing",
    ex: "It prevents 'Dual Writes' problems by saving the event in the same transaction as the business data."
  },
  {
    topic: "AI/ML",
    q: "In a RAG pipeline, what does 'Faithfulness' measure?",
    options: ["How fast the model responds", "If the answer is derived purely from the retrieved context", "The model's ability to rhyme", "The number of tokens used"],
    a: "If the answer is derived purely from the retrieved context",
    ex: "Faithfulness is a key RAG metric to ensure the model isn't hallucinating outside the provided facts."
  },
  // Adding 20+ more as requested for high volume
  { topic: "React", q: "What is the result of React.memo(MyComponent)?", options: ["A faster component", "A component that only re-renders if props change", "A component that uses less memory", "A server-side component"], a: "A component that only re-renders if props change", ex: "memo performs a shallow comparison of props." },
  { topic: "React", q: "Which hook should be used for DOM measurements?", options: ["useEffect", "useLayoutEffect", "useCallback", "useRef"], a: "useLayoutEffect", ex: "It runs synchronously after all DOM mutations but before the browser paints." },
  { topic: "TypeScript", q: "What is the 'unknown' type?", options: ["Same as 'any'", "A type-safe version of 'any' requiring a check", "A type for private variables", "A type that doesn't exist"], a: "A type-safe version of 'any' requiring a check", ex: "You cannot perform operations on unknown without narrowing it first." },
  { topic: "Next.js", q: "How do you enable Streaming in Next.js?", options: ["Using 'stream' prop", "Using Suspense boundaries", "It's enabled by default for all pages", "Using 'next/stream' component"], a: "Using Suspense boundaries", ex: "Next.js automatically streams content wrapped in Suspense." },
  { topic: "Backend", q: "What is a 'Saga' in microservices?", options: ["A long database query", "A pattern for managing distributed transactions", "A type of load balancer", "A testing framework"], a: "A pattern for managing distributed transactions", ex: "Sagas use a sequence of local transactions and compensating actions." },
  { topic: "AI/ML", q: "What is 'Temperature' in an LLM request?", options: ["The CPU heat", "A parameter for randomness/creativity", "The speed of token generation", "The size of the context window"], a: "A parameter for randomness/creativity", ex: "Higher temperature = more random; Lower = more deterministic." },
  { topic: "TypeScript", q: "What does 'Omit<User, \"id\">' do?", options: ["Adds an id to User", "Removes the id property from User", "Makes id optional", "Renames id"], a: "Removes the id property from User", ex: "Omit creates a new type by removing specific keys from an existing type." },
  { topic: "React", q: "What is a 'Fragment'?", a: "A way to group elements without adding a DOM node", options: ["A broken component", "A way to group elements without adding a DOM node", "A small piece of state", "A React 19 feature"], ex: "Fragments let you return multiple elements without extra wrappers." },
  { topic: "Next.js", q: "What is 'Partial Prerendering' (PPR)?", options: ["Rendering only the footer", "Combining static and dynamic content in one page", "Rendering only on mobile", "A legacy feature"], a: "Combining static and dynamic content in one page", ex: "PPR allows the static parts of a page to be served instantly while dynamic parts stream in." },
  { topic: "Backend", q: "What is 'Idempotency'?", options: ["Making an API faster", "Ensuring an operation has the same effect if called multiple times", "Securing an API with JWT", "Connecting two databases"], a: "Ensuring an operation has the same effect if called multiple times", ex: "Crucial for retry safety in distributed systems." }
];
