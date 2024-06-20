<template>
  <button
    class="btn-primary"
    @click="$emit('click:event')"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PrimaryButton',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['click:event'],
})
</script>

<style lang="scss" scoped>
.btn-primary {
  background: #07a88d;
  border: none;
  border-radius: 10rem;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2rem;
  padding: 1rem 3rem;
  @media only screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 1rem 1.2rem;
  }
}
</style>
