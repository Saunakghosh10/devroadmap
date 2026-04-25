export const REACT_DATA = {
  roadmap: [
    { phase: "Phase 1 — Core", topics: ["JSX & rendering", "Props & one-way data flow", "State with useState", "Event handling", "Conditional rendering & lists + keys"] },
    { phase: "Phase 2 — Hooks", topics: ["useEffect: side effects & cleanup", "useRef: DOM access + persistent values", "useContext: avoid prop drilling", "useMemo & useCallback: performance", "Custom hooks: extracting logic"] },
    { phase: "Phase 3 — Patterns", topics: ["Controlled vs Uncontrolled components", "Lifting state up", "Composition over inheritance", "Higher Order Components (HOC)"] },
    { phase: "Phase 4 — Advanced", topics: ["React.memo for memoization", "Lazy loading + Suspense", "Error Boundaries", "useTransition, useDeferredValue"] },
  ],
  patterns: [
    { name: "🎣 useEffect Mental Model", what: "Run side effects after render. Dependency array controls when it re-runs.", why: "Most misunderstood hook", code: `useEffect(() => { /* every render */ });
useEffect(() => { /* once on mount */ }, []);
useEffect(() => {
  const sub = subscribe(id);
  return () => sub.unsubscribe(); // CLEANUP!
}, [id]); // re-run when id changes`, interview: "Return a cleanup function to prevent memory leaks. Missing cleanup = bug. Missing deps = stale closure." },
    { name: "🏗 Custom Hooks", what: "Extract stateful logic into reusable 'use' functions.", why: "Share logic between components", code: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url).then(r=>r.json()).then(d=>{
      setData(d); setLoading(false);
    });
  }, [url]);
  return { data, loading };
}`, interview: "Custom hooks share stateful logic, not UI. Follow the same rules as built-in hooks." },
    { name: "⚡ useMemo vs useCallback", what: "useMemo caches a VALUE. useCallback caches a FUNCTION reference.", why: "Prevent unnecessary re-renders", code: `const total = useMemo(
  () => items.reduce((s,i) => s + i.price, 0),
  [items]
);
const click = useCallback(
  () => onSelect(id),
  [id, onSelect]
);`, interview: "Don't over-use. Profile first. Only helps when memoized children use these as props." },
  ],
  questions: [
    { q: "What is the virtual DOM?", a: "A JS copy of the real DOM. React diffs old vs new (reconciliation) and only updates changed parts." },
    { q: "When does a component re-render?", a: "1) State changes 2) Props change 3) Parent re-renders 4) Context changes. React.memo skips if props are shallowly equal." },
    { q: "Prop drilling solution?", a: "useContext for global state, component composition, or state management (Zustand/Redux)." },
    { q: "Controlled vs Uncontrolled?", a: "Controlled: React state is source of truth (value + onChange). Uncontrolled: DOM manages state, access via useRef." },
    { q: "What are Error Boundaries?", a: "Class components catching errors in child tree — show fallback UI. Use react-error-boundary library for functional equivalent." },
  ]
};
