<template>
  <!-- <div>
    <div v-for="notification in notifications" :key="notification.id">
      <div>{{ notification.title }}</div>
      <div>{{ notification.text }}</div>
    </div>
  </div> -->

  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-for="notification in notifications" :key="notification.id">
        <div class="fixed transition-opacity"></div>
        <div class="fixed top-5 right-1/2 translate-x-1/2 sm:top-0 sm:right-5 sm:translate-x-0 z-10 overflow-y-auto">
          <div
            class="w-full"
          >
          <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs"
      >
        <div class="">
          <div class="sm:flex sm:items-start">
            <div 
            class="p-6 text-center sm:pl-4 sm:mt-0 sm:text-left w-full" 
            :class="{'bg-green-200': notification.type === 0, 'bg-red-200': notification.type === 1, 'bg-yellow-200': notification.type === 2}">
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                {{ notification.title }}
              </h3>
              <div class="mt-2 flex items-center flex-col sm:items-start">
                <div for="descriptionTask" class="block">{{ notification.text }}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TypeNotification } from '@/intarfaces/INotification';
import { key } from '@/store';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'NotificationsComponent',
  data() {
    return {
      context: {
        [TypeNotification.SUCCESS]: 'sucesso',
        [TypeNotification.FAIL]: 'falha',
        [TypeNotification.WARNING]: 'atencao',
      }
    } 
  },
  setup() {
    const store = useStore(key)

    console.log(store.state.notifications)

    return {
      notifications: computed(() => store.state.notifications)
    }
  }
})

</script>