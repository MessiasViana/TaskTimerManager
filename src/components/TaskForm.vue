<template>
  <div class="rounded-md flex justify-center">
    <div class="grid grid-cols-3 grid-rows-5 md:grid-rows-3 w-full">
      <div class="col-span-3 row-start-2 mx-2 md:col-start-1" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" placeholder="Qual tarefa você deseja iniciar?" class="border border-black/10  rounded-md p-2 w-full shadow-xl dark:text-white dark:bg-gray-700 dark:border-gray-900/50 focus:outline-none" v-model="description"/>
      </div>

      <div class="my-5 row-start-3 col-start-2 mt-2 md:w-full lg:m-0 lg:row-start-2 lg:col-span-1">
        <div class="lg:mr-5 h-full">
          <select v-model="idProject" class="h-full border border-black/10  rounded-md p-2 w-full shadow-xl dark:text-white dark:bg-gray-700 dark:border-gray-900/50 focus:outline-none">
            <option value="">Selecione o projeto</option>
            <option 
            v-for="project in projects"
            :value="project.id"
            :key="project.id"
            >{{ project.name }}</option>
          </select>
        </div>
      </div>

      <div class="row-start-4 col-span-4 mt-2 md:w-full lg:row-start-3">
        <Timer @timerEnd="endTask"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Timer from './Timer.vue'
import { useStore } from 'vuex'
import { key } from "@/store"
import type IProject from "@/intarfaces/IProject"

export default defineComponent({
  name: 'TaskForm',
  emits: ["whenSavingTask"],
  components: {
    Timer
  },
  data() { 
    return {
      description: '',
      idProject: '',
    }
  },
  methods: {
    endTask(elapsedTime: number): void { 
      this.$emit("whenSavingTask", {
        durationInSeconds: elapsedTime,
        description: this.description,
        project: this.projects.find((proj: IProject) => proj.id == this.idProject)
      })
      this.description = ''
    }
  },
  setup() {
    const store = useStore(key)
    return {
      projects: computed(() => store.state.projects)
    }
  }
})
</script>
