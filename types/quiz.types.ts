// types/quiz.ts
export interface QuizQuestionTypes {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizThemeTypes {
  id: string;
  name: string;
  questions: QuizQuestionTypes[];
}

export interface QuizModule {
  name: string;
  professor: string;
  themes: QuizThemeTypes[];
}
export interface WrongResponse {
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
}

export interface Quiz {
  modules: QuizModule[];
}