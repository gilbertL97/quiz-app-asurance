import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import quizData1 from "@/assets/module1.json";
import quizData2 from "@/assets/module2.json";
import type {
  QuizQuestionTypes,
  QuizModule,
  QuizThemeTypes,
  WrongResponse,
} from "@/types/quiz.types";
const score = ref(0);
const totalQuestions = ref(0);
const wrongAnswers = ref<WrongResponse[]>([]);
const rightAnswersPercent = ref<number>(0);
const wrongAnswersPercent = ref<number>(0);
const modules = ref<QuizModule[]>([quizData1, quizData2]);
const selectedModule = ref<QuizModule>();
export function useQuiz() {
  const router = useRouter();

  const questions = ref<QuizQuestionTypes[]>([]);
  const currentQuestionIndex = ref(0);

  const selectedTheme = ref<string | null>(null);

  const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const prepareQuestions = (themeId: string) => {
    const theme: QuizThemeTypes | undefined = (
      selectedModule.value as QuizModule
    ).themes.find((m) => m.id === themeId);
    if (!theme) return;

    questions.value = theme.questions.map((q) => {
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
    totalQuestions.value = questions.value.length;
  };

  const startQuiz = (moduleId: string) => {
    selectedTheme.value = moduleId;
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
    if (selectedIndex != currentQuestion.value.correctAnswer) {
      addWronggAnswer(
        currentQuestion.value.options[currentQuestion.value.correctAnswer],
        currentQuestion.value.options[selectedIndex],
        currentQuestion.value.question
      );
    }
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
    }
  };
  const addWronggAnswer = (
    correct: string,
    incorrect: string,
    question: string
  ) => {
    wrongAnswers.value.push({
      question: question,
      correctAnswer: correct,
      selectedAnswer: incorrect,
    });
  };
  const finishQuiz = () => {
    calculatePercentages();
  };
  const calculatePercentages = () => {
    const totalQuestions = questions.value.length;
    rightAnswersPercent.value = Math.round(
      (score.value / totalQuestions) * 100
    );
    wrongAnswersPercent.value = 100 - rightAnswersPercent.value;
  };


  const selectModule = (moduleId: number) => {
    selectedModule.value = modules.value[moduleId];
    console.log(selectedModule.value)
  }


  return {
    questions,
    currentQuestionIndex,
    score,
    selectedTheme,
    currentQuestion,
    quizCompleted,
    wrongAnswers,
    rightAnswersPercent,
    wrongAnswersPercent,
    totalQuestions,
    modules,
    selectedModule,
    selectModule,
    handleAnswer,
    startQuiz,
    finishQuiz,
  };
}
