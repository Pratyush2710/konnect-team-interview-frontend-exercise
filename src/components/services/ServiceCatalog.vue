<template>
  <div class="service-catalog">
    <div class="header">
      <div class="title-container">
        <p class="title">Service Hub</p>
        <p class="subtitle">
          Organize services, manage and track versioning and API service
          documentation. <a href="/docs">Learn More</a>

        </p>
      </div>
      <div class="input-container">
        <label>
          <input v-model="searchQuery" class="search-input" data-testid="search-input" placeholder="Search"
            type="search" />
        </label>

        <PrimaryButton @click:event="createNewService()" :label="`+ Service Package`" />
      </div>
    </div>

    <template v-if="paginatedListItems.length">
      <div class="catalog">
        <section v-for="service in paginatedListItems" :key="service.id" class="service-card">
          <ServiceCard :service="service" />
        </section>
      </div>
      <Pagination v-if="totalPageCount > 1" :totalItems="totalListItems" :currentPage="currentPage"
        :totalPages="totalPageCount" @navigate="handlePagination" />
    </template>
    <div v-else data-testid="no-results" class="no-results">
      {{ searchQuery ? `No services found for '${searchQuery}'` : 'No services present. ' }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onBeforeMount } from "vue";
import { useRouter, useRoute } from 'vue-router';
import useDebouncedRef from "@/composables/useDebouncedRef";
import useServices from "@/composables/useServices";
import useGetPaginatedData from "@/composables/useGetPaginatedData";
import ServiceCard from "@/components/services/ServiceCard.vue";
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import Pagination from '@/components/Pagination/Pagination.vue'

export default defineComponent({
  name: "ServiceCatalog",
  components: {
    ServiceCard,
    PrimaryButton,
    Pagination
  },
  setup() {
    // Import services from the composable
    const { services, loading, getServices } = useServices();
    const router = useRouter();
    const { query } = useRoute();

    // Set the search string to a Vue ref
    const searchQuery = useDebouncedRef("", 300);

    const { currentPage, totalPageCount, totalListItems, paginatedListItems, handlePagination } =
      useGetPaginatedData(services);

    watch(searchQuery, (newQuery) => {
      console.log({ newQuery });
      // Fetch services based on queryParam
      getServices(newQuery);
      if (newQuery) {
        router.replace({
          query: {
            ...query,
            search: newQuery, 'page': 1
          },
        });
      } else {
        // Resetting query params on input clear
        router.push({ query: {} });
      }
      currentPage.value = 1
    });

    const createNewService = () => {
      alert('New Service created successfully')
    }
    onBeforeMount(() => {
      // Initialize searchQuery from parameters if present
      const existingParams = query['search']
      if (existingParams) {
        searchQuery.value = existingParams
      }
    })

    return {
      services,
      loading,
      searchQuery,
      currentPage,
      totalPageCount,
      totalListItems,
      paginatedListItems,
      createNewService,
      handlePagination
    };
  },
});
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 5rem auto;
  padding: 0 4rem;

  .header {
    align-items: start;
    display: flex;
    gap: 2rem;
    justify-content: space-between;

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
  box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 24rem;
  padding: 2rem;
  width: 42rem;
}
</style>
