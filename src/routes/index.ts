import { createRouter, createWebHistory } from "vue-router";
import Tasks from "../views/Tasks.vue";
import Projects from "../views/Projects.vue";
import Form from "../views/Projects/Form.vue";
import List from "../views/Projects/List.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/projetos',
    component: Projects,
    children: [
      {
        path: '',
        name: 'projects',
        component: List
      },
      {
        path: 'novo',
        name: 'new project',
        component: Form
      },
      {
        path: ':id',
        name: 'edit project',
        component: Form,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router