<template>
  <div class="shadow-md shadow-gray-500 rounded-md flex justify-center">
    <div class="grid grid-cols-2 grid-rows-4 md:grid-rows-3 w-full">
      <div class="col-span-2 row-start-2 mx-2 md:col-start-1" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" placeholder="Qual tarefa você deseja iniciar?" class="border-2 border-gray-700 rounded-md p-2 w-full"/>
      </div>
      <div class="row-start-3 w-screen mt-3 md:w-full md:row-start-2 md:mt-0">
        <div class="flex items-center justify-center h-full my-auto mr-10">
          <section class="px-2">
            <strong>{{ timeElapsed }}</strong>
          </section>
          <div>
            <button class="px-2 border border-1 border-slate-700 rounded-md" @click="play">
              <IconPlay class="inline-block"/>
              Play
            </button>
            <button class="px-2 ml-2 border border-1 border-slate-700 rounded-md" @click="stop">
              <IconStop class="inline-block"/>
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import IconStop from './icons/IconStop.vue'
  import IconPlay from './icons/IconPlay.vue'

  export default defineComponent({
    name: 'TaskForm',
    components: {
      IconStop,
      IconPlay
    },
    data() {
      return {
        timeInSeconds: 0,
        stopwatch: 0
      }
    },
    computed: {
      timeElapsed(): string { 
        return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8)
      }
    },
    methods: {
      play() {
        this.stopwatch = setInterval(() => { 
          this.timeInSeconds++;
        }, 1000)
      },
      stop() {
        clearInterval(this.stopwatch);
      }
    }
  })
</script>
