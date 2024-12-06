// components/ModuleSelection.vue
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Selecciona un Modulo</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <UCard v-for="(module, index ) in modules" :key="index" class="mb-4">
        <template #header>
          <h3 class="text-lg font-semibold">{{ module.name }}</h3>
        </template>
        <p>Profesor :{{ module.professor }}</p>
        <template #footer>
          <UButton @click="selectModule(index)">Comenzar este Módulo</UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizModule } from '~/types/quiz.types';

const props = defineProps<{
  modules: QuizModule[];
}>();

const emit = defineEmits<{
  (e: "select", moduleId: number): void;
}>();

const selectModule = (moduleId: number) => {
  emit("select", moduleId);
};
</script>
