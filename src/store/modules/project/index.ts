import http from "@/http";
import type IProject from "@/intarfaces/IProject";
import type { State } from "@/store";
import type Module from "vuex";
import type { Commit } from "vuex/types/index.js";

export interface StateProject {
  projects: IProject[];
}

export const project: Module<StateProject, State> = {
  state: {
    projects: [],
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
  },
  actions: {
    'GET_PROJECTS'({ commit }: { commit: Commit }) {
      http.get('/projects').then((response) => commit('DEFINE_PROJECTS', response.data))
    },
    'REGISTER_PROJECT'(context: any, nameProject: string) { 
      return http.post('/projects', {
        name: nameProject
      })
    },
    'CHANGE_PROJECT'(context: any, project: IProject) { 
      return http.put(`/projects/${project.id}`, project)
    },
    'REMOVE_PROJECT'({ commit }: { commit: Commit }, id: string) { 
      return http.delete(`/projects/${id}`).then(() => commit('DELETE_PROJECT', id))
    },
  }
}