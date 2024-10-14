// components/QuizQuestion.vue
<template>
  <UCard>
    <h3 class="text-xl font-semibold mb-4">{{ question.question }}</h3>
    <URadio
      v-for="(option, index) in question.options"
      :key="index"
      v-model="selectedAnswer"
      :label="option"
      :name="question.question"
      :value="index"
      class="mb-2"
    />
    <UButton @click="submitAnswer" class="mt-4" :disabled="selectedAnswer === undefined">
      Responder
    </UButton>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type {  QuizQuestionTypes } from '@/types/quiz.types'

const props = defineProps<{
  question: QuizQuestionTypes
}>()

const emit = defineEmits<{
  (e: 'answer', index: number): void
}>()

const selectedAnswer = ref<number | undefined  >(undefined)

const submitAnswer = () => {
  if (selectedAnswer.value !== undefined) {
    emit('answer', selectedAnswer.value)
    selectedAnswer.value = undefined
  }
}
</script>