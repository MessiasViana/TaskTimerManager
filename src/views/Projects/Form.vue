<template>
  <section>
    <form @submit.prevent="save" class="">
      <div>
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
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { TypeNotification} from '@/intarfaces/INotification'
import useNotifier from '@/hooks/notifier'
import type IProject from '@/intarfaces/IProject'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Form',
  props: {
    id: {
      type: String
    }
  },
  methods: {
    
  },
  setup(props) {
    const router = useRouter()

    const store = useStore(key)
    const { notify } = useNotifier()

    const nameProject = ref("")

    if(props.id) {
      const project = store.state.project.projects.find((p: IProject) => p.id == props.id)
      nameProject.value = project?.name || ''
    }

    const handleSuccessfully = () => {
      nameProject.value = ''
      notify(TypeNotification.SUCCESS, 'Excelente', 'Ação realizada com sucesso!!')
      router.push('/projetos')
    }

    const save = () => {
      nameProject.value = nameProject.value.trim()

      if (props.id) {
        store.dispatch("CHANGE_PROJECT", {
          id: props.id,
          name: nameProject.value
        })
        .then(() => handleSuccessfully())
      } else {
        if (nameProject.value.length > 0) {
          store.dispatch("REGISTER_PROJECT", nameProject.value)
          .then(() => handleSuccessfully())
        } else {
          notify(TypeNotification.FAIL, 'Erro', 'Coloque um nome')
        }
      }
    }

    return {
      nameProject,
      save
    }
  }
})
</script>
