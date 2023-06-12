<template>
  <div class="flex flex-col items-center justify-center h-full my-auto lg:mr-10 lg:flex-row">
    <Stopwatch :timeInSeconds="timeInSeconds" class="dark:text-white" />

    <div class="flex flex-wrap justify-center">
      <button
        v-for="button in buttons"
        :key="button.label"
        class="px-2 ml-2 mt-2 border border-1 border-slate-700 rounded-md lg:mt-0 disabled:border-gray-500 disabled:text-gray-500 dark:bg-white disabled:dark:text-gray-400 disabled:dark:bg-gray-600"
        @click="button.action"
        :disabled="button.disabled(stopwatchRunning)"
      >
        <component :is="button.icon" class="inline-block" />
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Stopwatch from './Stopwatch.vue'
import IconPlay from './icons/IconPlay.vue'
import IconStop from './icons/IconStop.vue'
import IconComplete from './icons/IconComplete.vue'

export default defineComponent({
  name: 'Timer',
  emits: ['timerEnd'],
  components: {
    Stopwatch,
    IconPlay,
    IconStop,
    IconComplete
  },
  data() {
    return {
      timeInSeconds: 0,
      stopwatch: 0,
      text: '',
      stopwatchRunning: false,
      buttons: [
      {
        label: 'Iniciar',
        icon: IconPlay,
        action: this.play,
        disabled: (stopwatchRunning: boolean): boolean => stopwatchRunning
      },
      {
        label: 'Parar',
        icon: IconStop,
        action: this.stop,
        disabled: (stopwatchRunning: boolean): boolean => !stopwatchRunning
      },
      {
        label: 'Concluir',
        icon: IconComplete,
        action: this.complete,
        disabled: (): boolean => false
      }
    ]
    }
  },
  methods: {
    update(time: number) {
      this.timeInSeconds = time
    },
    play() {
      this.stopwatchRunning = true

      this.stopwatch = setInterval(() => {
        this.timeInSeconds++
      }, 1000)
    },
    stop() {
      this.stopwatchRunning = false

      clearInterval(this.stopwatch);
    },
    complete() { 
      
      this.stopwatchRunning = false
      clearInterval(this.stopwatch)
      this.$emit('timerEnd', this.timeInSeconds)
      this.timeInSeconds = 0
    }
  }
})
</script>
