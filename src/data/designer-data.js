export const DESIGNER_DATA = {
  role: "Product Designer (Emergent)",
  company: "Emergent (AI Coding Agents)",
  sections: [
    {
      title: "1. Design for AI & Coding Agents",
      questions: [
        {
          q: "Visualizing Intent: Emergent generates apps from 'plain-language intent'. How do you design the interface to show the 'thought process' of the AI while it's building, without overwhelming the user?",
          rubric: {
            mention: ["Progressive Disclosure", "Steppers/Milestones", "Live Preview", "Feedback Loops", "Trust building"],
            pitfalls: "Over-explaining technical details or using a simple 'spinner' which creates a black box.",
            strong: "Proposes a 'Live Sidecar' view where the user sees a simplified tree of actions (e.g., 'Drafting Database', 'Generating UI') with the ability to pause and intervene."
          },
          followup: "How would you handle a scenario where the AI is 'unsure' about an intent and needs user clarification?"
        },
        {
          q: "Designing for Error & Correctness: In AI-driven software, errors are common. How do you design an 'Undo' or 'Correction' system that feels powerful but doesn't require the user to write code?",
          rubric: {
            mention: ["Natural Language Corrections", "Version Comparison", "Selective Reversion", "Visual Diffing"],
            strong: "Suggests a 'Time-Travel' UI combined with 'Chat-based Tweaking' where the user points at a component and says 'make this blue' rather than editing CSS."
          }
        }
      ]
    },
    {
      title: "2. Visual & Interaction Design",
      questions: [
        {
          q: "Design System Scaling: How would you evolve Emergent's design system to support both mobile and desktop while maintaining a 'Premium/State-of-the-art' feel?",
          rubric: {
            mention: ["Atomic Design", "Design Tokens", "Glassmorphism/Modern Aesthetics", "Responsive Patterns"],
            strong: "Focuses on 'Motion' as a core part of the system—subtle animations that indicate AI activity and success."
          }
        }
      ]
    },
    {
      title: "3. Behavioral (Emergent Culture)",
      questions: [
        {
          q: "Emergent reached $100M ARR in 8 months. This implies extreme speed. Tell me about a time you had to ship a 'good enough' design to meet a deadline, and how you iterated on it later.",
          rubric: {
            mention: ["MVP Mindset", "Feedback Loops", "Post-launch Analytics", "Debt Management"],
            strong: "Demonstrates an understanding that 'done is better than perfect' in a hyper-growth startup, provided there is a clear path to quality later."
          }
        }
      ]
    }
  ],
  advice: "Emergent is looking for 'Builders'. Don't just show pretty mocks—show how your design solves technical complexity. Since they are an AI coding agent company, show interest in how AI changes the 'Creative Loop'. Mentioning experience with tools like Figma, Framer, or even a bit of HTML/CSS will go a long way."
};
