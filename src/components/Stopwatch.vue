<template>
  <section class="px-2">
    <strong>{{ timeElapsed }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StopwatchComponent',
  props: {
    timeInSeconds: {
      type: Number,
      default: 0
    }
  },
  computed: {
    timeElapsed(): string { 
      return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8)
    }
  }
})
</script>