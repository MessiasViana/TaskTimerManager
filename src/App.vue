<template>
  <main class="md:grid md:grid-cols-3">
    <div>
      <HeaderLogo />
    </div>
    <div class="md:col-span-2">
      <TaskForm />
    </div>
  </main>
</template>

<script lang="ts">
  import HeaderLogo from './components/HeaderLogo.vue';
  import TaskForm from './components/TaskForm.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    components: {
      HeaderLogo,
      TaskForm
    }
  })
  
</script>