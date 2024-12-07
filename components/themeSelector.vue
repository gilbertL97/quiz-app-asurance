// components/ThemeSelection.vue
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Selecciona un tema</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <UCard v-for="theme in themes" :key="theme.id" class="mb-4">
        <template #header>
          <h3 class="text-lg font-semibold">{{ theme.name }}</h3>
        </template>
        <p>Este tema contiene {{ theme.questions.length }} preguntas.</p>
        <template #footer>
          <UButton @click="selectTheme(theme.id)">Comenzar este tema</UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizThemeTypes } from "@/types/quiz.types";

const props = defineProps<{
  themes: QuizThemeTypes[] | undefined;
}>();

const emit = defineEmits<{
  (e: "select", themeId: string): void;
}>();

const selectTheme = (themeId: string) => {
  emit("select", themeId);
};
</script>
