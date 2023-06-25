<template>
  <header class="bg-dark-secundary flex flex-col items-center h-full md:min-h-screen md:w-full">
    <h1>
      <img src="../assets/logo.png" alt="" />
    </h1>
    <nav class="my-5 text-white">
      <ul class="w-[calc(100%+20px)] mx-auto">
        <li class="flex justify-center mb-4 border-b border-white p-1">
          <IconList class="mr-1"/>
          <RouterLink to="/">Tarefas</RouterLink>
        </li>
        <li class="flex justify-center border-b border-white p-1">
          <IconProjects class="mr-1"/>
          <RouterLink to="/projetos">Projetos</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import IconList from './icons/IconList.vue';
  import IconProjects from './icons/IconProjects.vue';

  export default defineComponent({
    name: 'SideBar',
    components: {
      IconList,
      IconProjects
    }
  })
</script>