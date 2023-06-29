<template>
  <div v-if="show">
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-[80%] items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalComponent',
  props: {
    show: {
      type: Boolean,
      required: true,
    }
  }
})
</script>