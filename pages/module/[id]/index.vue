// pages/quiz.vue
<template>
  <div class="container mx-auto px-4 py-8">
    <template v-if="!selectedTheme">
      <ThemeSelector :themes="selectedModule?.themes" @select="startQuiz" />
    </template>
    <template v-else>
      <h2 class="text-2xl font-bold mb-4">
        Pregunta {{ currentQuestionIndex + 1 }} de {{ questions.length }}
      </h2>
      <QuizQuestions :question="currentQuestion" @answer="handleAnswer" />
      <p class="mt-4">Puntuación actual: {{ score }}</p>
      <UButton v-if="quizCompleted" @click="selectResult" class="mt-4">Finalizar Quiz</UButton>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from "~/composable/usequiz";
import QuizQuestions from "~/components/quizQuestions.vue";
const route = useRoute();
const selectResult = () => {
  finishQuiz(),
    navigateTo({
      path: `/module/${route.params.id}/result`
    });
}
const {
  selectedTheme,
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
