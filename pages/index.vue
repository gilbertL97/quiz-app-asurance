// pages/quiz.vue
<template>
  <div class="container mx-auto px-4 py-8">
    <ModuleSelection :modules="modules" @select="selectedModule" />
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from "~/composable/usequiz";

const { modules, selectModule } = useQuiz();
const selectedModule = (key: number) => {
  selectModule(key);
  navigateTo({
    path: `/module/${key}`
  })
}
</script>
