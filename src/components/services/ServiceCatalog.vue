<template>
  <div class="service-catalog">
    <div class="header">
      <div class="title-container">
        <p class="title">
          Service Hub
        </p>
        <p class="subtitle">
          Organize services, manage and track versioning and API service
          documentation. <a href="/docs">Learn More</a>
        </p>
      </div>
      <div class="input-container">
        <label>
          <input
            v-model="searchQuery"
            class="search-input"
            data-testid="search-input"
            placeholder="Search"
            type="search"
          >
        </label>

        <PrimaryButton
          :label="`+ Service Package`"
          @click:event="createNewService()"
        />
      </div>
    </div>

    <div
      v-if="loading"
      class="catalog"
    >
      <ServiceCardSkeleton
        v-for="ii in PAGE_SIZE"
        :key="ii"
      />
    </div>

    <template v-else-if="paginatedListItems.length">
      <div class="catalog">
        <section
          v-for="service in paginatedListItems"
          :key="service.id"
          class="service-card"
          @click="onServiceCardClick(service)"
        >
          <ServiceCard :service="service" />
        </section>
      </div>
      <Pagination
        v-if="totalPageCount > 1"
        :current-page="currentPage"
        :total-items="totalListItems"
        :total-pages="totalPageCount"
        @navigate="handlePagination"
      />
    </template>
    <div
      v-else
      class="no-results"
      data-testid="no-results"
    >
      {{
        searchQuery
          ? `No services found for '${searchQuery}'`
          : "No services present. "
      }}
    </div>
    <Teleport to="#modal">
      <ModalComponent
        v-if="isModalVisible"
        @close="hideModal"
      >
        <template v-if="selectedServiceData">
          <ServiceDetails :service="selectedServiceData" />
        </template>
      </ModalComponent>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onBeforeMount, markRaw, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { type Service } from '@/common/types.ts'
import useDebouncedRef from '@/composables/useDebouncedRef'
import useServices from '@/composables/useServices'
import useModal from '@/composables/useModal'
import useGetPaginatedData from '@/composables/useGetPaginatedData'
import ServiceCard from '@/components/services/ServiceCard.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import Pagination from '@/components/Pagination/PaginationComponent.vue'
import ModalComponent from '@/components/common/ModalComponent.vue'
import ServiceDetails from '@/components/services/ServiceDetails.vue'
import ServiceCardSkeleton from '@/components/services/ServiceCardSkeleton.vue'

const PAGE_SIZE = 10
export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    ServiceCard,
    PrimaryButton,
    Pagination,
    ServiceDetails,
    ModalComponent,
    ServiceCardSkeleton,
  },
  setup() {
    // Import services from the composable
    const { services, loading, getServices } = useServices()
    const router = useRouter()
    const { query } = useRoute()
    const {
      show: isModalVisible,
      component,
      showModal,
      hideModal,
    } = useModal()

    const openConfirm = () => {
      // Attach the modal to the root and toggle visibility to true
      component.value = markRaw(ModalComponent)
      showModal()
    }

    // Set the search string to a Vue ref - debounced to 300ms
    const searchQuery = useDebouncedRef('', 300)
    // Ref to hold the selected service data
    const selectedServiceData = ref<Service | undefined>()

    const {
      currentPage,
      totalPageCount,
      totalListItems,
      paginatedListItems,
      handlePagination,
    } = useGetPaginatedData(services)

    watch(searchQuery, (newQuery) => {
      // Fetch services based on queryParam
      getServices(newQuery)
      if (newQuery) {
        router.replace({
          query: {
            ...query,
            search: newQuery,
            page: 1,
          },
        })
      } else {
        // Resetting query params on input clear
        router.push({ query: {} })
      }
      currentPage.value = 1
    })

    const createNewService = () => {
      alert('New Service created successfully')
    }

    const onServiceCardClick = (selectedService: Service): void => {
      // Store the service data in the ref and toggles the modal visibility to true
      selectedServiceData.value = selectedService
      openConfirm()
    }

    onBeforeMount(() => {
      // Initialize searchQuery from parameters if present
      const existingParams = query['search'] as string
      if (existingParams) {
        searchQuery.value = existingParams
      }
    })

    return {
      isModalVisible,
      component,
      services,
      loading,
      searchQuery,
      currentPage,
      totalPageCount,
      totalListItems,
      paginatedListItems,
      selectedServiceData,
      hideModal,
      openConfirm,
      createNewService,
      handlePagination,
      onServiceCardClick,
      PAGE_SIZE,
    }
  },
})
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 5rem auto;
  padding: 0 2.5rem;

  .header {
    align-items: start;
    display: flex;
    gap: 2rem;
    justify-content: space-between;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
    }

    .title-container {
      .title {
        font-size: 3.2rem;
        font-weight: 700;
        line-height: 3.6rem;
        margin: 0;
      }

      .subtitle {
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2.4rem;
        margin: 1.6rem 0 0 0;
      }
    }

    .input-container {
      align-items: center;
      display: flex;
      gap: 2.5rem;

      label {
        position: relative;
      }

      label:before {
        background: url("/icons/magnifier.svg") center / contain no-repeat;
        bottom: 0;
        content: "";
        height: 4rem;
        left: 1rem;
        position: absolute;
        top: 0;
        width: 2rem;
      }

      .search-input {
        background-color: #ffffff;
        border: 1px solid #e7e7ec;
        border-radius: 0.4rem;
        padding: 1rem 1.6rem;
        padding-left: 3rem;
        width: 21rem;
      }
    }
  }

  .no-results {
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.4rem;
    margin-top: 30rem;
    text-align: center;
  }

  .service-card-skeleton-loader {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background: gainsboro;
    border-radius: 0.2rem;
    height: 24rem;
    width: 42rem;

    @keyframes pulse {
      50% {
        opacity: 0.5;
      }
    }
  }
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-block: 2.5rem;
}

.service-card {
  align-self: auto;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04),
    0px 4px 8px rgba(96, 97, 112, 0.16);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 24rem;
  padding: 2rem;
  width: 42rem;
}
</style>
