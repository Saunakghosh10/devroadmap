export const LABS = [
  {
    title: "React 19 Async Components",
    difficulty: "Advanced",
    steps: [
      {
        title: "The 'use' Hook",
        description: "Learn how to use the new 'use' hook to handle promises directly in render.",
        tasks: ["Import 'use' from react", "Fetch data from an API", "Pass promise to 'use'"],
        code: `import { use } from 'react';\n\nfunction UserProfile({ userPromise }) {\n  const user = use(userPromise);\n  return <div>{user.name}</div>;\n}`
      },
      {
        title: "Server Actions",
        description: "Implementing form-based server actions for zero-boilerplate mutations.",
        tasks: ["Create an async function", "Add 'use server' directive", "Assign to form action"],
        code: `async function updateProfile(formData) {\n  'use server';\n  const name = formData.get('name');\n  await db.update({ name });\n}\n\n<form action={updateProfile}>\n  <input name="name" />\n  <button>Save</button>\n</form>`
      }
    ]
  },
  {
    title: "Vector Search Lab (PostgreSQL)",
    difficulty: "Intermediate",
    steps: [
      {
        title: "Schema Setup",
        description: "Initialize the pgvector extension and create a table with a vector column.",
        tasks: ["Enable pgvector", "Define embedding dimensions", "Create IVFFlat index"],
        code: `CREATE EXTENSION IF NOT EXISTS vector;\n\nCREATE TABLE documents (\n  id serial PRIMARY KEY,\n  content text,\n  embedding vector(1536) -- OpenAI size\n);`
      },
      {
        title: "Similarity Query",
        description: "Query documents using cosine similarity operator (<=>).",
        tasks: ["Calculate input embedding", "Use <=> operator", "Limit results"],
        code: `SELECT content FROM documents\nORDER BY embedding <=> '[0.1, 0.2, ...]' -- cosine dist\nLIMIT 5;`
      }
    ]
  }
];
