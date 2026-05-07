export const TS_DATA = {
  roadmap: [
    { phase: "Phase 1 — Type Basics", topics: ["Basic Types (string, number, boolean)", "Arrays & Tuples", "Enums", "Any vs Unknown vs Never"] },
    { phase: "Phase 2 — Interfaces & Aliases", topics: ["Interfaces", "Type Aliases", "Union & Intersection Types", "Optional & Readonly Properties"] },
    { phase: "Phase 3 — Generics & Advanced", topics: ["Generics Basics", "Generic Constraints", "Utility Types (Partial, Pick, Omit)", "Mapped Types", "Conditional Types"] },
    { phase: "Phase 4 — TS in Practice", topics: ["Declaration Files (.d.ts)", "Namespaces vs Modules", "Decorators", "TSConfig Optimization", "Strict Mode Features"] },
  ],
  patterns: [
    { 
      name: "🛡️ Generics", 
      what: "Reusable components that work with a variety of types rather than a single one.", 
      why: "Ensures type safety without sacrificing flexibility.", 
      code: "function identity<T>(arg: T): T { return arg; }", 
      interview: "FAANG: Explain how Generic Constraints (extends) improve safety in complex APIs." 
    },
    { 
      name: "🧩 Discriminated Unions", 
      what: "A pattern for handling multiple types that share a common 'discriminant' property.", 
      why: "Allows for exhaustive type checking in switch statements.", 
      code: "type Shape = { kind: 'circle', r: number } | { kind: 'square', s: number };", 
      interview: "MAANG: How does this improve over simple interfaces for state management?" 
    }
  ],
  questions: [
    { q: "What is TypeScript?", a: "A strongly typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing, classes, and interfaces." },
    { q: "Interface vs Type Alias?", a: "Interfaces are better for objects and supporting declaration merging. Types are better for unions, intersections, and primitives. Use interfaces for public APIs." },
    { q: "any vs unknown?", a: "any bypasses all type checking. unknown is a safer alternative that requires type checking or narrowing before you can perform operations on it." },
    { q: "What are Generics?", a: "They allow you to create reusable components that can work over a variety of types rather than a single one, while maintaining type safety." },
    { q: "Explain 'never' type.", a: "Represents values that never occur. Commonly used for functions that always throw an error or have infinite loops, and in exhaustive switch checks." },
    { q: "What is an Enum?", a: "A way to define a set of named constants. TypeScript supports both numeric and string-based enums." },
    { q: "What are Utility Types?", a: "Built-in types like Partial<T>, Required<T>, Readonly<T>, Pick<T, K>, and Omit<T, K> that help transform existing types into new ones." },
    { q: "Explain Optional Chaining (?.) and Nullish Coalescing (??).", a: "?. allows reading properties deep within an object without checking every level. ?? returns the right-hand operand if the left is null or undefined (unlike || which also checks for 0 or '')." },
    { q: "What is Type Guarding?", a: "A way to narrow down the type of a variable within a conditional block using typeof, instanceof, or custom type predicates (is)." },
    { q: "What are Declaration Files (.d.ts)?", a: "Files that provide type information for existing JavaScript code, allowing TS to understand external libraries." },
    { q: "Explain 'keyof' operator.", a: "Takes an object type and produces a string or numeric literal union of its keys." },
    { q: "What is an abstract class?", a: "A base class that cannot be instantiated directly. It can contain abstract methods that must be implemented by derived classes." },
    { q: "What is a Tuple?", a: "An array with a fixed number of elements where each element has a specific type (e.g., [string, number])." },
    { q: "Explain 'as const' (const assertions).", a: "Tells the compiler to infer the narrowest possible type for an expression (e.g., turning an array into a readonly tuple)." },
    { q: "What is the difference between private, public, and protected?", a: "public (default) is accessible everywhere. private is only accessible within the class. protected is accessible in the class and its subclasses." },
    { q: "What are Mapped Types?", a: "A way to create new types based on an old type by 'mapping' over its keys (e.g., Readonly<T> is implemented as a mapped type)." },
    { q: "Explain Conditional Types.", a: "Types that choose one of two possible types based on a condition expressed as a type relationship (e.g., T extends U ? X : Y)." },
    { q: "What is the 'readonly' modifier?", a: "Prevents a property from being reassigned after its initial declaration." },
    { q: "Explain 'implements' vs 'extends'.", a: "extends is used for class inheritance (inheriting behavior). implements is used for ensuring a class adheres to an interface's contract." },
    { q: "How do you handle 'this' in TS functions?", a: "You can provide a fake 'this' parameter as the first argument of a function to define its type." }
  ]
};
