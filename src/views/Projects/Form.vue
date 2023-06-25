<template>
  <section>
    <form @submit.prevent="save" class="">
      <div class="">
        <label for="nameProject" class="mx-2 block">Nome do projeto</label>
        <input 
        type="text" 
        v-model="nameProject" id="nameProject" 
        class="mx-2 block border w-10/12 border-black/10 rounded-md p-2 shadow-xl dark:text-white dark:bg-gray-700 dark:border-gray-900/50 focus:outline-none"
        placeholder="Coloque um nome para seu projeto"
        />
      </div>

      <div class="">
        <button type="submit" class="px-2 ml-2 mt-2 border border-1 border-slate-700 rounded-md lg:mt-0 dark:bg-white">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { TypeNotification} from '@/intarfaces/INotification'
import useNotifier from '@/hooks/notifier'
import type IProject from '@/intarfaces/IProject'

export default defineComponent({
  name: 'Form',
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find((p: IProject) => p.id == this.id)
      this.nameProject = project?.name || ''
    }
  },
  data() {
    return {
      nameProject: ''
    }
  },
  methods: {
    save() {
      this.nameProject = this.nameProject.trim()

      if (this.id) {
        this.store.commit("EDIT_PROJECT", {
          id: this.id,
          name: this.nameProject
        })
        this.notify(TypeNotification.SUCCESS, 'Boaaa', 'Projeto editado com sucesso')
        this.$router.push('/projetos')
      } else {
        if (this.nameProject.length > 0) {
          this.store.commit("ADD_PROJECT", this.nameProject)
          this.nameProject = ''
          this.notify(TypeNotification.SUCCESS, 'Excelente', 'Projeto adicionado com sucesso')
          this.$router.push('/projetos')
        } else {
          this.notify(TypeNotification.FAIL, 'Erro', 'Coloque um nome')
        }
      }
    }
  },
  setup() {
    const store = useStore(key)
    const { notify } = useNotifier()
    return {
      store,
      notify
    }
  }
})
</script>
