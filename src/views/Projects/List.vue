<template>
  <section>
    <RouterLink to="/projetos/novo">
      Novo projeto
    </RouterLink>

    <table class="table-auto">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <RouterLink :to="`/projetos/${project.id}`">
              Editar
            </RouterLink>
            <button @click="exclude(project.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
  name: 'List',
  methods: {
    exclude(id: string) {
      this.store.dispatch('REMOVE_PROJECT', id)
    }
  },
  setup() {
    const store = useStore(key)
    store.dispatch("GET_PROJECTS")
    return {
      projects: computed(() => store.state.project.projects),
      store
    }
  }
})
</script>
