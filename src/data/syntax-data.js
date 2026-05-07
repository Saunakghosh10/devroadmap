export const SYNTAX_DATA = {
  js: [
    { title: "Arrow Functions", code: "const add = (a, b) => a + b;" },
    { title: "Destructuring", code: "const { name, age } = user;\nconst [first, second] = list;" },
    { title: "Spread / Rest", code: "const newObj = { ...oldObj, key: 'val' };\nconst sum = (...args) => args.reduce((a, b) => a + b, 0);" }
  ],
  ts: [
    { title: "Interface", code: "interface User {\n  id: number;\n  name: string;\n  email?: string;\n}" },
    { title: "Generics", code: "function wrap<T>(item: T): { value: T } {\n  return { value: item };\n}" }
  ],
  react: [
    { title: "useState", code: "const [state, setState] = useState(initialValue);" },
    { title: "useEffect", code: "useEffect(() => {\n  // effect\n  return () => { /* cleanup */ };\n}, [deps]);" }
  ]
};
