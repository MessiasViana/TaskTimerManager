import type { INotification } from "@/intarfaces/INotification";
import type IProject from "@/intarfaces/IProject";
import type { InjectionKey,  } from "vue";
import { createStore, Store } from "vuex";
import http from "@/http"
import type { Commit } from "vuex/types/index.js";

interface State {
  projects: IProject[];
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projects: [],
    notifications: [],
  },
  mutations: {
    'ADD_PROJECT'(state: State, nameProject: string) {
      const project = {
        id: new Date().toISOString(),
        name: nameProject
      } as IProject
      state.projects.push(project)
    },
    'EDIT_PROJECT'(state: State, project: IProject) {
      const index = state.projects.findIndex((proj: IProject) => proj.id === project.id)
      state.projects[index] = project
    },
    'DELETE_PROJECT'(state: State, id: string) {
      state.projects = state.projects.filter((proj: IProject) => proj.id != id)
    },
    'DEFINE_PROJECTS'(state: State, projects: IProject[]) {
      state.projects = projects
    },
    'NOTIFY'(state: State, newNotification: INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)

      setTimeout(() => {
        state.notifications = state.notifications.filter((notify: INotification) => notify.id != newNotification.id)
      }, 3000)
    }
  },
  actions: {
    'GET_PROJECTS'({ commit }: { commit: Commit }) {
      http.get('projects').then((response) => commit('DEFINE_PROJECTS', response.data))
    }
  }
})