export const TS_DATA = {
  roadmap: [
    { phase: "Phase 1 — Type Basics", topics: ["Primitive types, inference vs annotation", "Arrays, Tuples, Enums", "Union | and Intersection & types", "Type aliases vs Interfaces"] },
    { phase: "Phase 2 — Functions & Objects", topics: ["Function types, optional & default params", "readonly and optional properties", "Type assertions (as) and non-null (!)"] },
    { phase: "Phase 3 — Generics", topics: ["Generic functions and interfaces", "Constraints with extends", "keyof and typeof operators", "Mapped Types, Conditional Types"] },
    { phase: "Phase 4 — Advanced Types", topics: ["Utility Types: Partial, Required, Pick, Omit, Record", "Discriminated Unions", "Template Literal Types", "tsconfig: strict, paths, target"] },
  ],
  patterns: [
    { name: "🧩 Generics", what: "Write reusable code that works with any type while keeping safety.", why: "Avoids duplicate code and unsafe 'any'", code: `function identity<T>(arg: T): T { return arg; }
const s = identity<string>('hi'); // type: string
const n = identity<number>(42);   // type: number`, interview: "Generics let you write flexible, reusable functions without sacrificing type safety." },
    { name: "🔀 Discriminated Unions", what: "Union with a shared literal property enabling safe narrowing.", why: "Model loading/success/error states cleanly", code: `type State =
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; message: string };

if (s.status === 'success') {
  s.data // TS KNOWS this exists!
}`, interview: "Discriminated unions model real-world states and enable exhaustive checks — TS errors if you miss a case." },
    { name: "🛠 Utility Types", what: "Built-in generic types that transform existing types.", why: "Compose instead of duplicate", code: `interface User { id: number; name: string; email: string; }
type P = Partial<User>;          // all optional
type N = Pick<User, 'name'>;     // only name
type E = Omit<User, 'email'>;    // remove email
type M = Record<string, User>;   // dict`, interview: "Utility types like Partial, Pick, Omit let you derive types — DRY principle applied to types." },
  ],
  questions: [
    { q: "What is the difference between type and interface?", a: "Interface: extendable, declaration merging, best for objects. Type: unions, intersections, primitives. Rule: interface for objects, type for everything else." },
    { q: "What is 'any' vs 'unknown'?", a: "any: disables checking (unsafe). unknown: safe — forces you to narrow before using. Prefer unknown for external/API data." },
    { q: "What are mapped types?", a: "Create new types by transforming each property. Partial<T> is: { [K in keyof T]?: T[K] }." },
    { q: "What is a discriminated union?", a: "Union with shared literal property (discriminant). TS narrows type in if/switch blocks — enables exhaustive checking." },
    { q: "What does strict mode enable?", a: "strictNullChecks (null/undefined not assignable without explicit union), noImplicitAny, strictFunctionTypes, and more." },
  ]
};
