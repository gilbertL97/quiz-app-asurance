<template>
  <div class="pt-3">
    <h3 class="dark:text-gray-200 text-2xl text-gray-700">
      Respuestas Incorrectas :
    </h3>

    <UAccordion :items="items" type="multiple">
      <template #wrong="{ item }">
        <p class="text-sm pb-3.5 bg-green-100 text-green-600">
          Correcta : {{ item.content }}
        </p>
        <p class="text-sm pb-3.5 bg-red-100 text-red-500">
          Tu Respuesta: {{ item.youResponse }}
        </p>
      </template>
    </UAccordion>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from "~/composable/usequiz";
const { wrongAnswers } = useQuiz();
const items = wrongAnswers.value.map((wrongAnswer) => {
  return {
    label: wrongAnswer.question,
    content: wrongAnswer.correctAnswer,
    slot: "wrong",
    youResponse: wrongAnswer.selectedAnswer,
  };
});
</script>

<style scoped></style>
