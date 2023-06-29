<template>
  <TaskForm @whenSavingTask="saveTask" />

  <div
    class="w-full p-3 flex justify-center lg:justify-start md:mt-3 md:p-0"
    role="form"
    aria-label="Formulário para criação de uma nova tarefa"
  >
    <input
      type="text"
      placeholder="Digite para filtrar"
      class="border border-black/10 rounded-md p-2 shadow-xl w-full md:w-64 md:ml-2 dark:text-white dark:bg-gray-700 dark:border-gray-900/50 focus:outline-none"
      v-model="filter"
    />
  </div>

  <div class="p-10">
    <Box v-if="listIsEmpty"> Você ainda não realizou nenhuma tarefa hoje :( </Box>

    <Task v-for="(task, index) in tasks" :key="index" :task="task" @taskClicked="selectTask" />

    <ModalComponent :show="taskSelected != null" v-if="taskSelected">
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
      >
        <div class="bg-white py-6">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                Editar Tarefa
              </h3>
              <div class="mt-2 flex items-center flex-col sm:items-start">
                <label for="descriptionTask" class="block">Descrição da tarefa</label>
                <input
                  type="text"
                  v-model="taskSelected.description"
                  id="descriptionTask"
                  class="block border w-9/12 sm:w-full border-black/10 rounded-md p-2 shadow-xl dark:border-gray-900/50 focus:outline-none"
                  placeholder="Coloque um nome para seu projeto"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            class="mb-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mb-0 sm:w-auto"
            @click="changeTask"
          >
            Salvar
          </button>

          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mr-3 sm:w-auto"
            @click="closeModal"
          >
            Cancelar
          </button>
        </div>
      </div>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import TaskForm from '../components/TaskForm.vue'
import Task from '../components/Task.vue'
import Box from '../components/Box.vue'
import ModalComponent from '../components/Modal.vue'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import type ITask from '@/intarfaces/ITask'

export default defineComponent({
  name: 'App',
  components: {
    TaskForm,
    Task,
    Box,
    ModalComponent
  },
  data() {
    return {
      taskSelected: null as ITask | null
    }
  },
  methods: {
    saveTask(task: ITask) {
      this.store.dispatch('REGISTER_TASK', task)
    },
    selectTask(task: ITask) {
      this.taskSelected = task
    },
    closeModal() {
      this.taskSelected = null
    },
    changeTask() {
      this.store.dispatch('CHANGE_TASK', this.taskSelected).then(() => this.closeModal())
    }
  },
  computed: {
    listIsEmpty() {
      return this.tasks.length === 0
    }
  },
  setup() {
    const store = useStore(key)
    store.dispatch('GET_TASKS')
    store.dispatch('GET_PROJECTS')

    const filter = ref('')

    watchEffect(() => {
      store.dispatch('GET_TASKS', filter.value)
    })

    return {
      tasks: computed(() => store.state.task.tasks),
      store,
      filter
    }
  }
})
</script>
