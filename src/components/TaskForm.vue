<template>
  <div class=" rounded-md flex justify-center">
    <div class="grid grid-cols-2 grid-rows-4 md:grid-rows-3 w-full">
      <div class="col-span-2 row-start-2 mx-2 md:col-start-1" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" placeholder="Qual tarefa você deseja iniciar?" class="border border-black/10  rounded-md p-2 w-full shadow-xl dark:text-white dark:bg-gray-700 dark:border-gray-900/50 focus:outline-none" v-model="description"/>
      </div>
      <div class="row-start-3 w-screen mt-3 md:w-full md:col-span-2 md:m-0 lg:row-start-2 lg:col-span-1">
        <Timer @timerEnd="endTask"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Timer from './Timer.vue'

  export default defineComponent({
    name: 'TaskForm',
    emits: ["whenSavingTask"],
    components: {
      Timer
    },
    data() { 
      return {
        description: ''
      }
    },
    methods: {
      endTask(elapsedTime: number): void { 
        this.$emit("whenSavingTask", {
          durationInSeconds: elapsedTime,
          description: this.description
        })
        this.description = ''
      }
    }
  })
</script>
