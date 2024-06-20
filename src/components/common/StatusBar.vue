<template>
  <div class="container">
    <template v-if="!configured">
      <img alt="In Progress" src="/icons/in-progress.svg" />
      <span> In progress </span>
    </template>
    <template v-else-if="published">
      <img alt="Published" src="/icons/green-check.svg" />
      <span> Published to Portal </span>
    </template>
    <template v-else-if="!published">
      <img alt="Unpublished" src="/icons/cross.svg" />
      <span> Unpublished </span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "StatusBar",
  props: {
    published: {
      type: Boolean,
      required: true,
    },
    configured: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  align-items: center;
  display: flex;
}
</style>
