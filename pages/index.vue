// pages/quiz.vue
<template>
  <div class="container mx-auto px-4 py-8">
    <template v-if="!selectedModule">
      <ModuleSelection :modules="quizData.modules" @select="startQuiz" />
    </template>
    <template v-else>
      <h2 class="text-2xl font-bold mb-4">
        Pregunta {{ currentQuestionIndex + 1 }} de {{ questions.length }}
      </h2>
      <QuizQuestions :question="currentQuestion" @answer="handleAnswer" />
      <p class="mt-4">Puntuación actual: {{ score }}</p>
      <UButton v-if="quizCompleted" @click="finishQuiz" class="mt-4"
        >Finalizar Quiz</UButton
      >
    </template>
  </div>
  <footer>
    <p class="flex items-center justify-center">Hecho con ❤ por Gilbert</p>
  </footer>
</template>

<script setup lang="ts">
import { useQuiz } from "~/composable/usequiz";
import quizData from "@/assets/questions.json";
import QuizQuestions from "~/components/quizQuestions.vue";

const {
  selectedModule,
  startQuiz,
  questions,
  currentQuestionIndex,
  score,
  currentQuestion,
  handleAnswer,
  quizCompleted,
  finishQuiz,
} = useQuiz();
</script>
