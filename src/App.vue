<template>
  <main class="md:grid md:grid-cols-4 dark:bg-dark-primary min-h-screen">
  <div class="md:col-span-1">
      <SideBar />
    </div>
    <div class="md:col-span-3 min-h-full">
      <Notifications />
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
  import SideBar from './components/SideBar.vue';
  import Notifications from './components/Notifications.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    components: {
    SideBar,
    Notifications
}
  })
  
</script>