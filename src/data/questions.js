export const questions = [
  {
    id: 1,
    question: "What is the output of `console.log(typeof NaN)`?",
    options: ["number", "NaN", "undefined", "object"],
    answer: 0,
    difficulty: "easy",
    category: "Basics",
    explanation: "`NaN` (Not-a-Number) is a special value of the Number type in JavaScript."
  },
  {
    id: 2,
    question: "Which of the following is not a reserved word in JavaScript?",
    options: ["interface", "throws", "program", "short"],
    answer: 2,
    difficulty: "medium",
    category: "Basics",
    explanation: "`program` is not a reserved word, while `interface`, `throws`, and `short` are reserved for future or specific uses."
  },
  {
    id: 3,
    question: "What will `console.log(0.1 + 0.2 === 0.3)` output?",
    options: ["true", "false", "undefined", "TypeError"],
    answer: 1,
    difficulty: "medium",
    category: "Arithmetic",
    explanation: "Due to floating-point precision issues, `0.1 + 0.2` results in `0.30000000000000004`."
  },
  {
    id: 4,
    question: "How do you create a function in JavaScript?",
    options: ["function myFunction()", "def myFunction()", "create myFunction()", "func myFunction()"],
    answer: 0,
    difficulty: "easy",
    category: "Functions",
    explanation: "The `function` keyword is used to declare a function in JavaScript."
  },
  {
    id: 5,
    question: "What does `Array.prototype.map()` return?",
    options: ["The same array modified", "A new array", "The length of the array", "The first element"],
    answer: 1,
    difficulty: "easy",
    category: "Arrays",
    explanation: "The `map()` method creates a new array populated with the results of calling a provided function on every element in the calling array."
  },
  {
    id: 6,
    question: "What is the result of `[] + []`?",
    options: ["[]", "undefined", "'' (Empty String)", "NaN"],
    answer: 2,
    difficulty: "hard",
    category: "Coercion",
    explanation: "When adding two arrays, JavaScript converts them to strings. Empty arrays become empty strings, so `'' + '' = ''`."
  },
  {
    id: 7,
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useContext", "useEffect", "useReducer"],
    answer: 2,
    difficulty: "easy",
    category: "React",
    explanation: "`useEffect` is the standard hook for handling side effects like API calls or manual DOM manipulations."
  },
  {
    id: 8,
    question: "What is closure in JavaScript?",
    options: ["A way to lock a variable", "A function bundled with its lexical environment", "The end of a code block", "A method to delete objects"],
    answer: 1,
    difficulty: "hard",
    category: "Advanced",
    explanation: "Closure gives a function access to its outer scope even after the outer function has returned."
  }
];
