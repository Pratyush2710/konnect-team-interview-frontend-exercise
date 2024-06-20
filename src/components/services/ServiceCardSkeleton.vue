<template>
  <div class="card-container">
    <div class="card-title shimmer" />
    <div class="card-description shimmer" />
    <div class="card-footer shimmer" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ServiceCardSkeleton',
})
</script>
<style scoped lang="scss">
.card-container {
  height: 24rem;
  width: 42rem;

  .card-title {
    background-color: #e5e5e5;
    height: 5rem;
    margin-bottom: 0.5rem;
  }

  .card-description {
    background-color: #e5e5e5;
    height: 2rem;
    margin-bottom: 0.5rem;
  }
  .card-footer {
    background-color: #e5e5e5;
    height: 15rem;
  }
}

.shimmer {
  animation: shimmer 1.5s ease-in-out infinite;
  background-image: linear-gradient(
    -90deg,
    #f5f5f5 0%,
    #e5e5e5 20%,
    #f5f5f5 60%,
    #e5e5e5 80%
  );
  background-repeat: no-repeat;
  background-size: 400%;
  height: 24rem;
  width: 42rem;
}

@keyframes shimmer {
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
}
</style>
