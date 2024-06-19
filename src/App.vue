<template>
  <HeaderComponent />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/Header.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderComponent,
  },
});
</script>

<style lang="scss">
// Unscoped styles for html and body
html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f8f8fa;
  color: #3c4557;
  font-family: Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}
*,
*::before,
*::after {
  /* consistent box model across all elements */
  box-sizing: border-box;
}
</style>
