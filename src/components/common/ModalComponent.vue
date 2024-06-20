<template>
  <div
    class="container"
    data-testid="modal-container"
    @click="checkModalOverlayClicked"
    @touchstart="checkModalOverlayClicked"
  >
    <div
      aria-modal="true"
      class="modal-wrapper"
      role="dialog"
    >
      <slot name="close">
        <div class="close-modal">
          <button @click="$emit('close')">
            X
          </button>
        </div>
      </slot>
      <div
        class="modal-body"
        data-testid="modal-body"
      >
        <slot>
          <h3>Modal content</h3>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ModalComponent',
  emits: ['close'],
  methods: {
    checkModalOverlayClicked(e: MouseEvent | TouchEvent): void {
      // Check if the modal is clicked, not an element inside the modal:
      if (e.target === e.currentTarget) {
        this.$emit('close')
      }
    },
  },
})
</script>

<style scoped lang="scss">
.container {
  align-items: center;
  background: #00000080;
  display: flex;
  inset: 0px;
  justify-content: center;
  position: fixed;

  .modal-wrapper {
    background-color: #fff;
    border-radius: 0.4rem;
    box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04),
      0px 4px 8px rgba(96, 97, 112, 0.16);
    max-height: 70vh;
    max-width: 80vw;
    opacity: 1;
    overflow-y: auto;
  }

  .modal-body {
    padding: 3rem;
    padding-top: 1rem;
  }
  .close-modal {
    padding: 0.5rem 0.5rem 0 0;
    text-align: right;
    button {
      background-color: transparent;
      border: none;
      color: #1456cb;
      cursor: pointer;
      font-size: 1.6rem;
      padding: 1rem 1rem 0 0;
    }
  }
}
</style>
