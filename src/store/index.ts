import type { INotification } from "@/intarfaces/INotification";
import type { InjectionKey,  } from "vue";
import { createStore, Store } from "vuex";
import { type StateProject, project } from "./modules/project";
import { type StateTask, task } from "./modules/task";
import type IProject from "@/intarfaces/IProject";
import type ITask from "@/intarfaces/ITask";

export interface State {
  project: StateProject;
  notifications: INotification[];
  task: StateTask;
  projects: IProject[];
  tasks: ITask[];
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    project: {
      projects: [],
    },
    task: {
      tasks: [],
    },
    notifications: []
  },
  mutations: {
    'NOTIFY'(state: State, newNotification: INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)

      setTimeout(() => {
        state.notifications = state.notifications.filter((notify: INotification) => notify.id != newNotification.id)
      }, 3000)
    }
  },
  modules: {
    project,
    task
  }
})