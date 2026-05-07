export const AI_ML_DATA = {
  roadmap: [
    { phase: "Phase 1 — LLM Fundamentals", topics: ["Transformers Architecture", "Tokenization & Embeddings", "Attention Mechanism", "Context Windows", "Hallucinations & Temperature"] },
    { phase: "Phase 2 — RAG (Retrieval)", topics: ["Vector Databases (pgvector, Pinecone)", "Semantic Search vs Keyword Search", "Chunking Strategies", "Embedding Models", "Retrieval Optimization"] },
    { phase: "Phase 3 — Fine-Tuning", topics: ["Supervised Fine-Tuning (SFT)", "LoRA & QLoRA", "PEFT (Parameter-Efficient Fine-Tuning)", "Data Curation for FT", "Evaluation Metrics (BLEU, ROUGE)"] },
    { phase: "Phase 4 — Deployment & Orchestration", topics: ["LangChain / LlamaIndex", "Azure ML / OpenAI API", "Prompt Engineering", "Guardrails & Safety", "Inference Optimization (Quantization)"] },
  ],
  patterns: [
    { 
      name: "🧠 RAG Pipeline", 
      what: "Enhancing LLM responses by retrieving relevant data from a private knowledge base before generation.", 
      why: "Reduces hallucinations and provides up-to-date information.", 
      code: "// Simple RAG Flow\nconst query = \"What are the Q3 results?\";\nconst embedding = await getEmbedding(query);\nconst context = await db.vectorSearch(embedding);\nconst response = await llm.complete({\n  prompt: `Context: ${context}\\nQuery: ${query}`\n});", 
      interview: "RAG solves the 'knowledge cutoff' problem. Key metrics are 'Faithfulness' (answer vs context) and 'Relevance' (answer vs query)." 
    },
    { 
      name: "⚡ LoRA Fine-Tuning", 
      what: "Low-Rank Adaptation: injecting trainable rank decomposition matrices into each layer of a pre-trained model.", 
      why: "Reduces trainable parameters by 10,000x while maintaining performance.", 
      code: "from peft import LoraConfig, get_peft_model\nconfig = LoraConfig(\n    r=16, \n    lora_alpha=32, \n    target_modules=[\"q_proj\", \"v_proj\"]\n)\nmodel = get_peft_model(base_model, config)", 
      interview: "LoRA is perfect for domain adaptation when you have limited compute. You only train the 'adapter' weights, not the whole model." 
    }
  ],
  questions: [
    { q: "What is a Transformer model?", a: "A deep learning architecture that uses self-attention mechanisms to process sequence data. It is the foundation of models like GPT and BERT." },
    { q: "What is the difference between Fine-tuning and RAG?", a: "Fine-tuning updates model weights for style/domain. RAG provides external facts at inference time. RAG is better for knowledge retrieval; Fine-tuning is better for behavior modification." },
    { q: "Explain Vector Embeddings.", a: "Numerical representations of text in high-dimensional space where distance (cosine similarity) correlates with semantic meaning." },
    { q: "How do you optimize LLM inference latency?", a: "Quantization (FP16 to INT8/4), Batching, KV Caching, and using smaller models for simpler tasks (LLM Routing)." },
    { q: "What is the 'Attention' mechanism?", a: "A mechanism that allows the model to weigh the importance of different tokens in a sequence when generating a response." },
    { q: "What is Prompt Engineering?", a: "The process of structuring text input to an LLM to get the desired output (e.g., Few-shot prompting, Chain-of-Thought)." },
    { q: "Explain Hallucinations in LLMs.", a: "When an LLM generates text that is factually incorrect but sounds plausible. Reduced by RAG and grounding." },
    { q: "What is LoRA?", a: "Low-Rank Adaptation, a parameter-efficient fine-tuning technique that only trains small adapter matrices instead of the whole model." },
    { q: "What is a Context Window?", a: "The maximum number of tokens a model can process in a single request (input + output)." },
    { q: "Explain RLHF (Reinforcement Learning from Human Feedback).", a: "A method of training LLMs to align with human preferences by having humans rank model outputs." },
    { q: "What is Quantization?", a: "Reducing the precision of model weights (e.g., from 32-bit floats to 4-bit integers) to reduce memory usage and speed up inference." },
    { q: "Explain Tokenization.", a: "Breaking down text into smaller units (tokens) that the model can process. Can be characters, words, or sub-words." },
    { q: "What is the difference between Zero-shot and Few-shot prompting?", a: "Zero-shot gives the model a task without examples. Few-shot provides a few examples to guide the model." },
    { q: "Explain Temperature in LLMs.", a: "A parameter that controls the randomness of the model's output. Higher temperature = more creative/random; lower = more deterministic." },
    { q: "What is a Vector Database?", a: "A specialized database designed to store and search high-dimensional vector embeddings efficiently (e.g., Pinecone, Weaviate, pgvector)." },
    { q: "Explain LLM Agents.", a: "AI systems that can use tools (like search engines or code interpreters) to perform complex, multi-step tasks autonomously." },
    { q: "What is 'Chain-of-Thought' prompting?", a: "Asking the model to explain its reasoning step-by-step before giving the final answer, which improves performance on complex tasks." },
    { q: "Explain Overfitting in ML.", a: "When a model learns the training data too well, including its noise, and fails to generalize to new, unseen data." },
    { q: "What is the role of the Activation Function?", a: "Introduces non-linearity into the neural network, allowing it to learn complex patterns (e.g., ReLU, Sigmoid)." },
    { q: "Explain Gradient Descent.", a: "An optimization algorithm used to minimize the loss function by iteratively moving in the direction of the steepest descent." }
  ]
};
