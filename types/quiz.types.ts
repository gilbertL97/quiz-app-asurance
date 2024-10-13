// types/quiz.ts
export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
  }
  
  export interface QuizModule {
    id: string;
    name: string;
    questions: QuizQuestion[];
  }
  
  export interface QuizData {
    modules: QuizModule[];
  }