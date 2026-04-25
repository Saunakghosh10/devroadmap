export const JS_DATA = {
  roadmap: [
    { phase: "Phase 1 — Foundations", topics: ["Variables: var/let/const + Hoisting", "Data Types: primitives vs objects", "Functions: declarations, expressions, arrow fns", "Scope: global, function, block", "Closures & Lexical Environment"] },
    { phase: "Phase 2 — Core Mechanics", topics: ["Event Loop: Call Stack + Web APIs + Queue", "Prototypes & Prototype Chain", "this keyword: 4 binding rules", "Callbacks → Promises → async/await", "Error handling: try/catch/finally"] },
    { phase: "Phase 3 — Advanced", topics: ["Higher Order Functions: map/filter/reduce", "Destructuring, Spread/Rest, Optional chaining", "Modules: ESM vs CommonJS", "WeakMap/WeakSet/Symbol", "Generators & Iterators"] },
    { phase: "Phase 4 — Patterns", topics: ["Design Patterns: Module, Singleton, Observer", "Functional Programming basics", "Immutability patterns", "Memoization & currying", "Debounce & Throttle"] },
  ],
  patterns: [
    { name: "🔗 Closure", what: "A function that remembers its outer scope even after the outer function has returned.", why: "Data privacy, factories, memoization", code: `function makeCounter() {
  let count = 0;
  return () => ++count;
}
const c = makeCounter();
c(); // 1
c(); // 2 — count persists!`, interview: "Closures let inner functions access outer variables. Classic use: creating private state without classes." },
    { name: "🔄 Event Loop", what: "JS is single-threaded. Event loop picks tasks from queue when call stack is empty.", why: "Explains async behavior and microtask priority", code: `console.log('1');
setTimeout(() => console.log('2'), 0); // macrotask
Promise.resolve().then(() => console.log('3')); // microtask
console.log('4');
// Output: 1, 4, 3, 2`, interview: "Microtasks (Promises) always run before macrotasks (setTimeout), even if setTimeout is 0ms." },
    { name: "📦 Prototype Chain", what: "Every object has a __proto__ link. Property lookup walks the chain until found or null.", why: "Foundation of JS inheritance", code: `const animal = { breathes: true };
const dog = Object.create(animal);
dog.barks = true;
console.log(dog.breathes); // true — from prototype!`, interview: "JS uses prototypal inheritance. Classes are syntactic sugar over the same prototype mechanism." },
    { name: "🎯 this Binding", what: "4 rules: default (window/undefined), implicit (obj.fn()), explicit (call/bind), new.", why: "Most confusing JS concept", code: `const obj = {
  name: 'Dev',
  greet() { console.log(this.name); }, // 'Dev'
  arrow: () => console.log(this.name), // undefined
};
obj.greet(); // this = obj (implicit)
obj.arrow(); // this = outer (lexical)`, interview: "Arrow functions don't have their own 'this'. They inherit from the surrounding lexical context." },
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
};
