<template>
  <div class="shadow-sm shadow-gray-500 rounded-md p-5 m-5 bg-yellow dark:dark:bg-[#B4B9DE] bg-gray-50 animate-fadeIn">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import  { defineComponent } from 'vue';

export default defineComponent({
  name: 'BoxComponent'
})
</script>