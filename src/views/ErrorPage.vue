<template>
  <section class="container">
    <h1>404</h1>
    <p>Oops, we could not find this page.</p>
    <div>
      <PrimaryButton
        :label="`Go Back`"
        @click:event="$router.back()"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
export default defineComponent({
  name: 'ErrorPage',
  components: {
    PrimaryButton,
  },
})
</script>

<style lang="scss" scoped>
.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 5rem 0;
}
</style>
