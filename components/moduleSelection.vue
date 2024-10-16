// components/ModuleSelection.vue
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Selecciona un tema</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <UCard v-for="module in modules" :key="module.id" class="mb-4">
        <template #header>
          <h3 class="text-lg font-semibold">{{ module.name }}</h3>
        </template>
        <p>Este tema contiene {{ module.questions.length }} preguntas.</p>
        <template #footer>
          <UButton @click="selectModule(module.id)"
            >Comenzar este tema</UButton
          >
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizModuleTypes } from "@/types/quiz.types";

const props = defineProps<{
  modules: QuizModuleTypes[];
}>();

const emit = defineEmits<{
  (e: "select", moduleId: string): void;
}>();

const selectModule = (moduleId: string) => {
  emit("select", moduleId);
};
</script>
