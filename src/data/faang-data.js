export const FAANG_DATA = {
  role: "FAANG / MAANG Master Prep",
  company: "Big Tech (Meta, Amazon, Apple, Netflix, Google)",
  sections: [
    {
      title: "1. System Design & Scale (The 'Design' Round)",
      questions: [
        {
          q: "Design a URL Shortener (e.g., bit.ly). How do you handle 100k requests per second?",
          rubric: {
            mention: ["Hashing (Base62)", "Database Sharding", "Caching (Redis)", "Rate Limiting", "Unique ID Generation (Snowflake)"],
            strong: "Discusses the trade-offs between NoSQL and SQL for this specific write-heavy use case."
          },
          a: "For 100k req/s, I would use a distributed hash generation approach. 1. Use Base62 encoding on a unique 64-bit ID. 2. Use a NoSQL DB like Cassandra for horizontal writes. 3. Implement a massive Redis cache for the most popular redirects. 4. Use a Load Balancer (ELB) with auto-scaling groups."
        },
        {
          q: "Design a News Feed (e.g., Facebook). Compare Push vs Pull models.",
          rubric: {
            mention: ["Fan-out", "Feed service", "Graph DB", "Redis caching", "Pagination (Cursor vs Offset)"],
            strong: "Correctly identifies that a hybrid model (Push for normal users, Pull for celebrities) is necessary to avoid 'Fan-out' bottlenecks."
          },
          a: "A 'Push' model (fan-out on write) means when a user posts, it's pushed to all followers' feeds. This is fast for reads but slow for writers with millions of followers (Celebrity problem). A 'Pull' model (fan-out on read) is slower for reads. I'd use a Hybrid approach: Push for users with < 10k followers, Pull for others."
        }
      ]
    },
    {
      title: "2. Data Structures & Algorithms Theory",
      questions: [
        {
          q: "Compare Time Complexity: Array vs Linked List.",
          a: "Array: O(1) Access, O(n) Insertion/Deletion (shift needed). Linked List: O(n) Access, O(1) Insertion/Deletion (if pointer is known)."
        },
        {
          q: "When would you use a Tries (Prefix Tree)?",
          a: "For autocomplete, spell checkers, and IP routing where prefix matching is common. It offers O(L) lookup where L is word length."
        },
        {
          q: "Explain Dijkstra's vs A* search.",
          a: "Dijkstra's is a greedy algorithm for shortest path. A* is an optimized version that uses a 'Heuristic' function to guide the search towards the goal faster."
        }
      ]
    },
    {
      title: "3. Computer Science Fundamentals",
      questions: [
        {
          q: "Process vs Thread?",
          a: "A Process is an independent execution unit with its own memory. A Thread is a subset of a process that shares memory with other threads in the same process."
        },
        {
          q: "What is an Index in a DB and why is it usually a B-Tree?",
          a: "B-Trees are used because they keep data sorted and allow for O(log n) searches, insertions, and deletions. They are optimized for systems that read large blocks of data (Disk I/O)."
        }
      ]
    },
    {
      title: "4. Behavioral (The 'Leadership Principles' Round)",
      questions: [
        {
          q: "Amazon: Tell me about a time you 'Dived Deep' into a technical problem.",
          a: "Focus on a situation where you looked beyond the symptoms to find the root cause (e.g., memory leak, race condition) and implemented a long-term fix."
        },
        {
          q: "Google: How do you handle ambiguity in a project?",
          a: "Explain your process: Research -> Prototyping -> Stakeholder feedback -> Incremental delivery."
        }
      ]
    }
  ],
  advice: "FAANG interviews are as much about 'How' you think as 'What' you know. Always start with clarifying questions. For System Design, follow the path: Requirements -> API Design -> DB Schema -> High Level Design -> Deep Dive into Bottlenecks."
};
// Adding 40 more quick-fire questions to hit the 50 goal for this section
export const FAANG_QUICK_FIRE = [
  { q: "What is the difference between TCP and UDP?", a: "TCP is connection-oriented and reliable (retries). UDP is connectionless and fast (no retries)." },
  { q: "Explain the concept of 'Consistency' in the CAP theorem.", a: "Every read receives the most recent write or an error." },
  { q: "What is a Binary Search Tree (BST)?", a: "A tree where each node has at most two children, and the left child is smaller than the parent, right is larger." },
  { q: "Explain Quicksort average vs worst case.", a: "Average: O(n log n). Worst: O(n^2) if pivot is poorly chosen." },
  { q: "What is a Hash Table collision?", a: "When two different keys hash to the same index. Handled via Chaining or Open Addressing." },
  { q: "Explain Virtual Memory.", a: "A memory management technique that uses hardware and software to allow a computer to compensate for physical memory shortages by temporarily transferring data from RAM to disk." },
  { q: "What is a Deadlock and how to prevent it?", a: "Four conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Prevent by breaking any of these." },
  { q: "Explain Garbage Collection in Java/Python.", a: "Automated memory management that reclaims memory occupied by objects that are no longer in use." },
  { q: "What is a 'Pure Function'?", a: "A function that always produces the same output for the same input and has no side effects." },
  { q: "Explain Big O notation.", a: "A mathematical notation that describes the limiting behavior of a function when the argument tends towards infinity (algorithmic efficiency)." },
  { q: "What is a Singleton pattern?", a: "Ensures a class has only one instance and provides a global point of access to it." },
  { q: "Explain DNS (Domain Name System).", a: "The 'phonebook' of the internet that translates human-readable domain names (google.com) to IP addresses." },
  { q: "What is a 3-way handshake in TCP?", a: "SYN, SYN-ACK, ACK." },
  { q: "Explain the difference between Symmetric and Asymmetric encryption.", a: "Symmetric uses the same key for encryption/decryption. Asymmetric uses a public/private key pair." },
  { q: "What is a CDN (Content Delivery Network)?", a: "A distributed network of servers that delivers web content to users based on their geographic location." },
  { q: "Explain the 'Observer' pattern.", a: "A design pattern where an object (subject) maintains a list of dependents (observers) and notifies them of state changes." },
  { q: "What is a 'Race Condition'?", a: "When the behavior of a program depends on the relative timing of events (e.g., two threads updating the same variable)." },
  { q: "Explain 'Dependency Injection'.", a: "A design pattern where an object's dependencies are provided by an external entity rather than created by the object itself." },
  { q: "What is a Binary Heap?", a: "A complete binary tree that satisfies the heap property (Max-heap: parent >= children; Min-heap: parent <= children)." },
  { q: "Explain 'Normalization' in databases.", a: "The process of organizing data to reduce redundancy and improve data integrity (1NF, 2NF, 3NF)." },
  { q: "What is an 'Atomic' operation?", a: "An operation that appears to happen instantaneously to the rest of the system (all or nothing)." },
  { q: "Explain 'Lazy Loading'.", a: "Postponing the initialization of an object or resource until it is actually needed." },
  { q: "What is a 'Closure' in programming?", a: "A function that remembers the environment in which it was created." },
  { q: "Explain the difference between a Stack and a Queue.", a: "Stack is LIFO (Last-In, First-Out). Queue is FIFO (First-In, First-Out)." },
  { q: "What is an 'Interface' in OOP?", a: "A contract that defines a set of methods that a class must implement." },
  { q: "Explain 'Recursion'.", a: "A function that calls itself to solve a problem by breaking it down into smaller sub-problems." },
  { q: "What is 'Dynamic Programming'?", a: "An optimization technique that solves complex problems by breaking them into overlapping sub-problems and storing results." },
  { q: "Explain 'Paging' in OS.", a: "A memory management scheme that eliminates the need for contiguous allocation of physical memory." },
  { q: "What is a 'Database Transaction'?", a: "A unit of work performed within a database that is treated as a single, indivisible operation." },
  { q: "Explain 'Multithreading'.", a: "The ability of a CPU to provide multiple threads of execution concurrently." },
  { q: "What is a 'Semaphor'?", a: "A variable used to control access to a common resource by multiple processes." },
  { q: "Explain 'OAuth'.", a: "An open standard for access delegation, commonly used as a way for users to grant websites access to their information on other websites." },
  { q: "What is 'HTTP/2'?", a: "A major revision of the HTTP network protocol that improves performance via header compression and multiplexing." },
  { q: "Explain 'B-Tree'.", a: "A self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time." },
  { q: "What is 'MVC' (Model-View-Controller)?", a: "A software architectural pattern for implementing user interfaces." },
  { q: "Explain 'REST' vs 'SOAP'.", a: "REST is an architectural style (flexible, JSON). SOAP is a protocol (strict, XML)." },
  { q: "What is 'Idempotency' in APIs?", a: "When making multiple identical requests has the same effect as making a single request." },
  { q: "Explain 'Bloom Filter'.", a: "A space-efficient probabilistic data structure used to test whether an element is a member of a set." },
  { q: "What is 'Raft' or 'Paxos'?", a: "Consensus algorithms used to achieve agreement on a single data value among a distributed set of computers." },
  { q: "Explain 'Inversion of Control' (IoC).", a: "A design principle in which the control of objects or portions of a program is transferred to a container or framework." }
];
