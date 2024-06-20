<template>
  <div
    class="container"
    @click="checkModalOverlayClicked"
    @touchstart="checkModalOverlayClicked"
  >
    <div role="dialog" aria-modal="true" class="modal-wrapper">
      <div class="modal-body">
        <slot>
          <h3>Modal content</h3>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ModalComponent",
  emits: ["close"],
  methods: {
    checkModalOverlayClicked(e: MouseEvent | TouchEvent): void {
      // Check if the modal is clicked, not an element inside the modal:
      if (e.target === e.currentTarget) {
        this.$emit("close");
      }
    },
  },
});
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
  }
}
</style>
