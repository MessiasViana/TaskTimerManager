import type ITask from "@/intarfaces/ITask";
import type { State } from "@/store";
import type Module from "vuex";
import http from "@/http"
import type { Commit } from "vuex/types/index.js";

export interface StateTask {
  tasks: ITask[];
}

export const task: Module<StateTask, State> = {
  state: {
    tasks: [],
  },
  mutations: {
    'DEFINE_TASKS'(state: State, tasks: ITask[]) {
      state.tasks = tasks
    },
    'ADD_TASK'(state: State, task: ITask) {
      state.tasks.push(task)
    },
    'EDIT_TASK'(state: State, task: ITask) {
      const index = state.tasks.findIndex((t: ITask) => t.id === t.id)
      state.tasks[index] = task
    }
  },
  actions: {
    'GET_TASKS'({ commit }: { commit: Commit }, filter: string) {
      let url = "tasks"

      if (filter) {
        url += "?description=" + filter
      }

      http.get(url).then((response) => commit('DEFINE_TASKS', response.data))
    },
    'REGISTER_TASK'({ commit }: { commit: Commit }, task: ITask) { 
      return http.post('/tasks', task)
      .then((res) => commit('ADD_TASK', res.data))
    },
    'CHANGE_TASK'({ commit }: { commit: Commit }, task: ITask) { 
      return http.put(`/tasks/${task.id}`, task).then((response) => commit('EDIT_TASK', task))
    }
  }
}