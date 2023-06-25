<template>
    <TaskForm @whenSavingTask="saveTask"/>
    <div class="p-10">
      <Task v-for="(task, index) in tasks" :key="index" :task="task"/>
      <Box v-if="listIsEmpty">
        Você ainda não realizou nenhuma tarefa hoje :(
      </Box>
    </div>
</template>

<script lang="ts">
  import TaskForm from '../components/TaskForm.vue';
  import Task from '../components/Task.vue';
  import Box from '../components/Box.vue';
  import { defineComponent } from 'vue';
  import type ITask from '../intarfaces/ITask';

  export default defineComponent({
    name: 'App',
    components: {
      TaskForm,
      Task,
      Box
    },
    data() {
      return { 
        tasks: [] as ITask[]
      }
    },
    methods: {
      saveTask(task: ITask) { 
        this.tasks.unshift(task);
      }
    },
    computed: {
      listIsEmpty() {
        return this.tasks.length === 0
      }
    }
  })
  
</script>