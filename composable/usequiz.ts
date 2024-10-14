import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import quizData from "@/assets/questions.json";
import type {
  QuizQuestionTypes,
  QuizData,
  QuizModuleTypes,
} from "@/types/quiz.types";
export function useQuiz() {
  const router = useRouter();

  const questions = ref<QuizQuestionTypes[]>([]);
  const currentQuestionIndex = ref(0);
  const score = ref(0);
  const selectedModule = ref<string | null>(null);

  const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const prepareQuestions = (moduleId: string) => {
    const module: QuizModuleTypes | undefined = (
      quizData as QuizData
    ).modules.find((m) => m.id === moduleId);
    if (!module) return;

    questions.value = module.questions.map((q) => {
      const shuffledOptions = shuffleArray(q.options);
      const newCorrectAnswer = shuffledOptions.indexOf(
        q.options[q.correctAnswer]
      );
      return {
        question: q.question,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswer,
      };
    });
    questions.value = shuffleArray(questions.value);
  };

  const startQuiz = (moduleId: string) => {
    selectedModule.value = moduleId;
    prepareQuestions(moduleId);
    currentQuestionIndex.value = 0;
    score.value = 0;
  };

  const quizCompleted = computed(
    () => currentQuestionIndex.value === questions.value.length - 1
  );

  const currentQuestion = computed(
    () => questions.value[currentQuestionIndex.value]
  );

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === currentQuestion.value.correctAnswer) {
      score.value += 1;
    }
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
    }
    if (currentQuestionIndex.value === questions.value.length - 1) {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const finalScore = Math.round((score.value / questions.value.length) * 100);
    router.push({ path: "/result", query: { score: finalScore.toString() } });
  };
  return {
    questions,
    currentQuestionIndex,
    score,
    selectedModule,
    currentQuestion,
    quizCompleted,
    handleAnswer,
    startQuiz,
    finishQuiz,
  };
}
