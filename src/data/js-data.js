export const JS_DATA = {
  roadmap: [
    { phase: "Phase 1 — The Fundamentals", topics: ["Variables (var, let, const)", "Data Types", "Operators", "Template Literals", "Loops & Logic"] },
    { phase: "Phase 2 — Objects & Functions", topics: ["Arrow Functions", "Methods", "this Keyword", "Classes & Prototypal Inheritance", "Modules (ESM)"] },
    { phase: "Phase 3 — Async JS", topics: ["Callbacks & Hell", "Promises", "Async/Await", "Event Loop", "Microtasks vs Macrotasks"] },
    { phase: "Phase 4 — Advanced Concepts", topics: ["Closures", "Hoisting", "Strict Mode", "Currying", "Memoization", "Proxies & Reflection"] },
  ],
  patterns: [
    { 
      name: "🔒 Closures", 
      what: "A function bundled together with its lexical environment.", 
      why: "Enables private variables and persistent state without globals.", 
      code: "function counter() {\n  let count = 0;\n  return () => ++count;\n}", 
      interview: "FAANG: Explain how closures lead to memory leaks if not handled (detached DOM trees)." 
    },
    { 
      name: "🚀 Event Loop", 
      what: "The mechanism that handles async execution in a single-threaded environment.", 
      why: "Crucial for building non-blocking applications.", 
      code: "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n// Output: 1, 4, 3, 2", 
      interview: "MAANG: Why do Promises (Microtasks) execute before setTimeout (Macrotasks)?" 
    }
  ],
  questions: [
    { q: "What is the difference between == and ===?", a: "== performs type coercion (converts types to match), while === (strict equality) checks both value and type without coercion." },
    { q: "Explain Hoisting.", a: "JavaScript's behavior of moving declarations to the top of their scope during compilation. Variables declared with 'var' are hoisted as undefined; 'let' and 'const' are hoisted but remain in a 'Temporal Dead Zone'." },
    { q: "What are the different ways to create an object in JS?", a: "1. Object Literal. 2. Constructor Function. 3. Object.create(). 4. ES6 Classes. 5. Factory Functions." },
    { q: "Explain 'this' keyword.", a: "The value of 'this' depends on how a function is called. In global scope, it's 'window'. In a method, it's the object. In an arrow function, it's lexically inherited from the parent scope." },
    { q: "What is a Promise?", a: "An object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It can be Pending, Fulfilled, or Rejected." },
    { q: "Explain Prototype Chain.", a: "Every JS object has a prototype. When a property is accessed, JS looks at the object, then its prototype, then the prototype's prototype, until it finds the property or reaches null." },
    { q: "What is the difference between null and undefined?", a: "undefined means a variable has been declared but not yet assigned a value. null is an assignment value that represents the intentional absence of any object value." },
    { q: "What is Currying?", a: "A technique of evaluating functions with multiple arguments into a sequence of functions with a single argument. e.g., f(a,b,c) -> f(a)(b)(c)." },
    { q: "What is the Temporal Dead Zone (TDZ)?", a: "The period between the entering of a scope and the actual declaration of a variable (let/const), during which accessing the variable results in a ReferenceError." },
    { q: "Explain Map vs WeakMap.", a: "Map allows keys of any type and keeps them alive. WeakMap only allows objects as keys and holds 'weak' references, allowing garbage collection if no other references exist." },
    { q: "What is memoization?", a: "An optimization technique that speeds up applications by storing the results of expensive function calls and returning the cached result when the same inputs occur again." },
    { q: "Explain call(), apply(), and bind().", a: "call() and apply() execute a function with a specified 'this'. apply() takes arguments as an array. bind() returns a new function with 'this' permanently set." },
    { q: "What is the difference between var, let, and const?", a: "var is function-scoped and hoisted as undefined. let and const are block-scoped and hoisted to TDZ. const cannot be reassigned." },
    { q: "What are higher-order functions?", a: "Functions that take other functions as arguments or return a function as a result (e.g., map, filter, reduce)." },
    { q: "Explain the concept of 'Shadow DOM'.", a: "A web standard that allows developers to encapsulate their HTML and CSS, preventing styles from leaking out or in. Used heavily in Web Components." },
    { q: "What is an IIFE (Immediately Invoked Function Expression)?", a: "A function that runs as soon as it is defined, creating a private scope to avoid polluting the global namespace." },
    { q: "How does 'strict mode' change JS behavior?", a: "Prevents accidental globals, makes assignments that would otherwise fail throw errors, and prohibits duplicate property names." },
    { q: "What is the difference between deep copy and shallow copy?", a: "Shallow copy only copies top-level properties (nested objects are still referenced). Deep copy recursively copies all levels (e.g., using JSON.parse(JSON.stringify(obj)) or structuredClone)." },
    { q: "Explain Event Delegation.", a: "A pattern where you attach a single event listener to a parent element to manage events for all its children, using event bubbling to identify the target." },
    { q: "What is the spread operator vs rest operator?", a: "Spread (...) expands an array/object into individual elements. Rest (...) collects multiple elements into a single array (used in function params)." }
  ]
};
