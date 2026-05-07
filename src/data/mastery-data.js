export const MASTERY_PLAN = {
  title: "15-Day Tech Mastery Sprint",
  days: [
    {
      day: 1,
      tech: "TypeScript",
      topic: "Discriminated Unions",
      snippet: "type Result = \n  | { status: 'success', data: string }\n  | { status: 'error', message: string };\n\nfunction handle(res: Result) {\n  if (res.status === 'success') console.log(res.data);\n  else console.error(res.message);\n}",
      takeaway: "Always use a literal 'status' string to narrow types safely.",
      challenge: "Add a 'loading' state and update the handler."
    },
    {
      day: 2,
      tech: "TypeScript",
      topic: "Generic Constraints",
      snippet: "function getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}",
      takeaway: "Use 'extends' to ensure a Generic has specific properties.",
      challenge: "Create a function that only accepts objects with an 'id' property."
    },
    {
      day: 3,
      tech: "TypeScript",
      topic: "Utility Types (Omit/Pick)",
      snippet: "interface User { id: string, name: string, email: string }\ntype UserPreview = Pick<User, 'id' | 'name'>;\ntype UserWithoutId = Omit<User, 'id'>;",
      takeaway: "Don't recreate interfaces; transform them using Utility Types.",
      challenge: "Create a 'PartialUpdate' type for a Todo interface."
    },
    {
      day: 4,
      tech: "React",
      topic: "useMemo Optimization",
      snippet: "const sortedList = useMemo(() => {\n  return items.sort((a, b) => a.value - b.value);\n}, [items]);",
      takeaway: "Only memoize when the computation is expensive or referential identity matters for children.",
      challenge: "When would using useMemo actually HURT performance?"
    },
    {
      day: 5,
      tech: "React",
      topic: "Custom Hooks (Logic Reuse)",
      snippet: "function useLocalStorage(key, initial) {\n  const [val, setVal] = useState(() => JSON.parse(localStorage.getItem(key)) || initial);\n  useEffect(() => localStorage.setItem(key, JSON.stringify(val)), [val]);\n  return [val, setVal];\n}",
      takeaway: "Hooks are just functions that can hold React state. Abstract your side-effects!",
      challenge: "Add a way to sync state across different browser tabs using the 'storage' event."
    },
    {
      day: 6,
      tech: "React",
      topic: "React 19 'use' Hook",
      snippet: "function Post({ promise }) {\n  const content = use(promise);\n  return <div>{content}</div>;\n}",
      takeaway: "The 'use' hook can handle Promises and Context inside loops and conditionals (unlike other hooks).",
      challenge: "Compare this with the traditional useEffect + useState loading pattern."
    },
    {
      day: 7,
      tech: "React",
      topic: "Compound Components",
      snippet: "const Select = ({ children }) => <div className='select'>{children}</div>;\nSelect.Option = ({ value }) => <div className='option'>{value}</div>;",
      takeaway: "Allows users to rearrange children while maintaining shared state via Context.",
      challenge: "Implement a 'Toggle' component using this pattern."
    },
    {
      day: 8,
      tech: "Next.js",
      topic: "Server Components (RSC)",
      snippet: "// default in App Router\nasync function Page() {\n  const data = await db.query();\n  return <List items={data} />;\n}",
      takeaway: "Zero JS is sent to the client for RSCs. Fetch data directly in the component!",
      challenge: "How do you pass data from an RSC to a Client Component?"
    },
    {
      day: 9,
      tech: "Next.js",
      topic: "Server Actions",
      snippet: "async function create(formData) {\n  'use server';\n  await db.add(formData.get('name'));\n  revalidatePath('/');\n}",
      takeaway: "Actions handle POST requests automatically. No need to create /api/ routes for forms.",
      challenge: "Add 'useActionState' to show a loading spinner during submission."
    },
    {
      day: 10,
      tech: "Next.js",
      topic: "Parallel Routes",
      snippet: "export default function Layout({ children, analytics, team }) {\n  return <div>{children}{analytics}{team}</div>\n}",
      takeaway: "Render independent sections of a page with their own loading/error states.",
      challenge: "Create a dashboard layout with a 'Stats' and 'Activity' slot."
    },
    {
      day: 11,
      tech: "Next.js",
      topic: "Streaming with Suspense",
      snippet: "<Suspense fallback={<Skeleton />}>\n  <SlowComponent />\n</Suspense>",
      takeaway: "Streaming breaks the page into chunks so the user sees the UI faster.",
      challenge: "Explain 'Hydration' in the context of streaming."
    },
    {
      day: 12,
      tech: "Backend",
      topic: "Idempotency",
      snippet: "// Header: X-Idempotency-Key: guid-123\nif (await redis.has(key)) return cachedResponse;\nconst res = await process();\nawait redis.set(key, res);",
      takeaway: "Critical for payments and distributed systems to prevent double-processing.",
      challenge: "Implement an idempotent webhook handler in Node.js."
    },
    {
      day: 13,
      tech: "AI/ML",
      topic: "Vector Search (pgvector)",
      snippet: "SELECT * FROM docs ORDER BY embedding <=> '[0.1, 0.2...]' LIMIT 5;",
      takeaway: "The '<=>' operator performs cosine similarity search in Postgres.",
      challenge: "Explain why we use 'Cosine Similarity' instead of 'Euclidean Distance' for text."
    },
    {
      day: 14,
      tech: "AI/ML",
      topic: "RAG Chunking",
      snippet: "const chunks = text.split(/\\n\\n/).map(c => c.trim());",
      takeaway: "Chunking determines the granularity of retrieved knowledge. Too small = lost context; Too large = noise.",
      challenge: "Explain 'Sliding Window' chunking."
    },
    {
      day: 15,
      tech: "System Design",
      topic: "The Outbox Pattern",
      snippet: "db.transaction(async tx => {\n  await tx.insert(order);\n  await tx.insert(outbox_event);\n});",
      takeaway: "Ensures events are only sent if the database transaction succeeds.",
      challenge: "What happens if the 'Event Relay' worker crashes?"
    }
  ]
};
