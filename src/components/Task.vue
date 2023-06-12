<template>
  <Box>
    <div class="grid grid-cols-3 max-sm:flex max-sm:flex-col">
      <div class="col-span-2">
        {{ task.description || "Tarefa sem descrição"}}
      </div>
      <div class="col-span-1 dark:text-black">
        <Stopwatch :timeInSeconds="task.durationInSeconds" class="max-sm:p-0"/>
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Stopwatch from './Stopwatch.vue';
import Box from './Box.vue';
import type { PropType } from 'vue';
import type ITask from '../intarfaces/ITask'

export default defineComponent({
  name: 'Task',
  components: {
    Stopwatch,
    Box
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true
    }
  }
})
</script>