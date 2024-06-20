<template>
  <div class="card-header">
    <StatusBar
      :configured="service.configured"
      :published="service.published"
    />

    <div
      v-if="service.versions.length"
      class="versions"
    >
      {{ service.versions.length }}
      {{ service.versions.length > 1 ? "versions" : "version" }}
    </div>
  </div>
  <p class="name">
    {{ service.name }}
  </p>
  <p class="description">
    {{ service.description }}
  </p>
  <div class="card-footer">
    <ServiceMetrics
      :configured="service.configured"
      :metrics="service.metrics"
    />
    <AvatarTiles :users="getUniqueDeveloperList(service)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import StatusBar from '@/components/common/StatusBar.vue'
import ServiceMetrics from '@/components/services/ServiceMetrics.vue'
import AvatarTiles from '@/components/common/AvatarTiles.vue'
import { type Service, type Developer } from '@/common/types.ts'

export default defineComponent({
  name: 'ServiceCard',
  components: {
    StatusBar,
    ServiceMetrics,
    AvatarTiles,
  },
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
  setup() {
    const getUniqueDeveloperList = (serviceItem: Service): Array<Developer> => {
      // Filter duplicate developers per service version
      const developerSet = new Set()
      const unique = [] as Developer[]
      for (const item of serviceItem.versions) {
        if (!developerSet.has(item?.developer?.id)) {
          developerSet.add(item?.developer?.id)
          unique.push(item.developer as Developer)
        }
      }

      return unique
    }

    return {
      getUniqueDeveloperList,
    }
  },
})
</script>

<style lang="scss" scoped>
.card-header {
  align-items: center;
  display: flex;
  font-size: 1.2rem;
  justify-content: space-between;
  line-height: 1.5rem;

  .versions {
    background-color: #f2f6fe;
    border-radius: 10rem;
    color: #5888db;
    font-weight: 600;
    padding: 0.8rem 1.6rem;
  }
}

.name {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.description {
  color: #707888;
  font-size: 1.3rem;
  line-height: 2rem;
}

.card-footer {
  align-items: end;
  display: flex;
  justify-content: space-between;

  ul {
    margin: 0;
  }
}
</style>
