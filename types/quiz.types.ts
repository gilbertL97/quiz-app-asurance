// types/quiz.ts
export interface QuizQuestionTypes {
    question: string;
    options: string[];
    correctAnswer: number;
  }
  
  export interface QuizModuleTypes {
    id: string;
    name: string;
    questions: QuizQuestionTypes[];
  }
  
  export interface QuizData {
    modules: QuizModuleTypes[];
  }