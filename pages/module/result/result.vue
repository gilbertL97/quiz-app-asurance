<template>
  <section class="dark:bg-gray-900 text-white">
    <div
      class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[90%] lg:items-center"
    >
      <div class="mx-auto max-w-3xl text-center">
        <h3
          class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
          Puntuación : {{ score }} puntos
        </h3>
        <div
          class="flex items-center justify-center bg-green-100 rounded-md my-5"
        >
          <strong class="text-xl font-medium text-gray-500">
            Correctas :
          </strong>
          <p>
            <span class="text-2xl font-medium text-green-600 pl-2">
              {{ score }} / {{ totalQuestions }} : {{ rightAnswersPercent }}%
            </span>
          </p>
        </div>
        <div class="flex items-center justify-center bg-red-100 rounded-md">
          <strong class="text-xl font-medium text-gray-500">
            Incorrectas :
          </strong>

          <p>
            <span class="text-2xl font-medium text-red-600 pl-2">
              {{ totalQuestions - score }} / {{ totalQuestions }} :
              {{ wrongAnswersPercent }}%
            </span>
          </p>
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <UButton class="px-12 mx-20 py-4" to="/"> Volver al Inicio </UButton>
        </div>
        <ListWrongAnswer v-if="wrongAnswers.length != 0" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useQuiz } from "~/composable/usequiz";

const {
  score,
  wrongAnswers,
  wrongAnswersPercent,
  rightAnswersPercent,
  totalQuestions,
} = useQuiz();
</script>

<style scoped></style>
