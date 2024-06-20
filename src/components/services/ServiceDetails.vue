<template>
  <div class="service-detail-modal">
    <p class="modal-title">
      {{ service.name }}
    </p>
    <p class="modal-description">
      {{ service.description }}
    </p>
    <div class="metadata-container">
      <section class="left-content">
        <h3>Status</h3>
        <StatusBar
          :configured="service.configured"
          :published="service.published"
        />
      </section>
      <section>
        <h3>Metrics</h3>
        <ServiceMetrics
          :configured="service.configured"
          :metrics="service.metrics"
        />
      </section>
    </div>
    <section v-if="service.versions?.length">
      <p class="versions">
        Versions ({{ service.versions.length }})
      </p>
      <ServiceVersions
        :type="service.type"
        :versions="service.versions"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type Service } from '@/common/types.ts'
import StatusBar from '@/components/common/StatusBar.vue'
import ServiceMetrics from '@/components/services/ServiceMetrics.vue'
import ServiceVersions from '@/components/services/ServiceVersions.vue'

export default defineComponent({
  name: 'ServiceDetails',
  components: {
    StatusBar,
    ServiceMetrics,
    ServiceVersions,
  },
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.service-detail-modal {
  p {
    margin: 0;
  }

  .modal-title {
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.4rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  .modal-description {
    color: #707888;
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 2rem;
    margin-bottom: 1.4rem;
  }

  .versions {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 24px;
  }

  .version-list {
    list-style: none;
    padding: 0;

    & > li:not(:first-child) {
      border-top: 1px solid #f1f1f5;
    }
  }

  .left-content {
    align-items: start;
    display: flex;
    flex-direction: column;
  }

  .metadata-container {
    display: flex;
    gap: 5rem;
    @media only screen and (max-width: 600px) {
      gap: 1rem;
      flex-wrap: wrap;
    }
  }
}
</style>
