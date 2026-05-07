export const REACT_DATA = {
  roadmap: [
    { phase: "Phase 1 — Modern Essentials", topics: ["JSX & Fragments", "Props vs State", "Conditional Rendering", "List Mapping & Keys", "Event Handling"] },
    { phase: "Phase 2 — Advanced Hooks", topics: ["useMemo & useCallback (Optimization)", "useRef (DOM access & instance vars)", "useReducer (Complex state)", "useContext (Global state)", "Custom Hooks"] },
    { phase: "Phase 3 — React 19 & Future", topics: ["The 'use' Hook", "Actions & useActionState", "Optimistic Updates (useOptimistic)", "Server Components vs Client Components", "The Compiler (Auto-memoization)"] },
    { phase: "Phase 4 — State Management", topics: ["Zustand / Redux Toolkit", "React Query (Server state)", "Context API Optimization", "Immer for immutable state"] },
    { phase: "Phase 5 — Performance", topics: ["Code Splitting (React.lazy)", "Suspense & Transitions", "Virtualization (React Window)", "Profiler API", "Hydration Errors"] },
  ],
  patterns: [
    { 
      name: "🧩 Compound Components", 
      what: "A pattern where components work together to form a stateful UI, allowing users to rearrange children freely.", 
      why: "Provides ultimate flexibility to the consumer without prop-drilling.", 
      code: "<Tabs>\n  <Tabs.List>\n    <Tabs.Trigger value=\"1\">One</Tabs.Trigger>\n  </Tabs.List>\n  <Tabs.Content value=\"1\">Panel 1</Tabs.Content>\n</Tabs>", 
      interview: "Think of <select> and <option>. The parent manages state, children consume it via Context." 
    },
    { 
      name: "🚀 Render Props", 
      what: "Passing a function as a prop to share logic between components.", 
      why: "Less common now due to Hooks, but still powerful for component injection.", 
      code: "<MouseTracker render={mouse => (\n  <p>Position: {mouse.x}, {mouse.y}</p>\n)} />", 
      interview: "Hooks replaced 90% of Render Props, but it's still useful for libraries where you need to provide data to a specific part of the UI tree." 
    }
  ],
  questions: [
    { q: "What is the Virtual DOM?", a: "A lightweight representation of the real DOM. React updates the VDOM first, diffs it (Reconciliation), and only applies the necessary changes to the real DOM." },
    { q: "useEffect vs useLayoutEffect?", a: "useEffect runs asynchronously AFTER the browser has painted. useLayoutEffect runs synchronously BEFORE the paint, used for measuring DOM nodes to avoid flickering." },
    { q: "How do you optimize a slow React app?", a: "1. Memoization (memo, useMemo). 2. Windowing/Virtualization for long lists. 3. Code splitting. 4. React.lazy/Suspense. 5. Throttling/Debouncing inputs." },
    { q: "What are React Hooks?", a: "Functions that allow you to 'hook into' React state and lifecycle features from function components." },
    { q: "Explain the 'Rules of Hooks'.", a: "1. Only call hooks at the top level (not inside loops/conditions). 2. Only call hooks from React functions." },
    { q: "What is the difference between state and props?", a: "State is internal to a component and can be changed. Props are external inputs passed from a parent and are immutable to the child." },
    { q: "Explain React.memo().", a: "A higher-order component that prevents a functional component from re-rendering if its props haven't changed." },
    { q: "What is the Context API?", a: "A way to share values like themes or user info between components without having to explicitly pass props through every level of the tree." },
    { q: "Explain useReducer hook.", a: "A hook used for complex state logic that involves multiple sub-values or when the next state depends on the previous one. Similar to Redux." },
    { q: "What is React.lazy() and Suspense?", a: "React.lazy() allows you to load components dynamically. Suspense allows you to show a fallback (like a spinner) while the component is loading." },
    { q: "What are 'Keys' in React and why are they important?", a: "Keys help React identify which items in a list have changed, been added, or removed. They should be stable, predictable, and unique." },
    { q: "Explain the reconciliation process.", a: "The algorithm React uses to diff one tree with another to determine which parts need to be changed." },
    { q: "What is a Higher-Order Component (HOC)?", a: "A function that takes a component and returns a new component with additional props or logic." },
    { q: "Explain the difference between Controlled and Uncontrolled components.", a: "Controlled components have their state managed by React. Uncontrolled components use the DOM (via refs) to manage their state." },
    { q: "What is the 'useRef' hook used for?", a: "Accessing DOM nodes directly or storing mutable values that don't trigger a re-render when they change." },
    { q: "Explain React Fragments.", a: "A way to group a list of children without adding extra nodes to the DOM." },
    { q: "What are Error Boundaries?", a: "React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI." },
    { q: "Explain the difference between useMemo and useCallback.", a: "useMemo memoizes the result of a calculation. useCallback memoizes the function itself." },
    { q: "What is Hydration in React?", a: "The process of attaching event listeners to the HTML that was rendered on the server, making it interactive on the client." },
    { q: "Explain React Portals.", a: "A way to render children into a DOM node that exists outside the hierarchy of the parent component (e.g., for modals)." }
  ]
};
