<template>
  <div>
    <div v-for="notification in notifications" :key="notification.id">
      <div>{{ notification.title }}</div>
      <div>{{ notification.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { TypeNotification } from '@/intarfaces/INotification';
import { key } from '@/store';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Notifications',
  data() {
    return {
      context: {
        [TypeNotification.SUCESS]: 'sucesso',
        [TypeNotification.WARNING]: 'atencao',
        [TypeNotification.FAIL]: 'falha',
      }
    }
  },
  setup() {
    const store = useStore(key)
    return {
      notifications: computed(() => store.state.notifications)
    }
  }
})

</script>