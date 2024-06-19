<template>
  <div class="service-catalog">
    <div class="header">
      <div class="title-container">
        <p class="title">Service Hub</p>
        <p class="subtitle">
          Organize services, manage and track versioning and API service
          documentation.
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
          />
        </label>

        <button class="service-package" @click="handleCreateServiceClick">
          + Service Package
        </button>
      </div>
    </div>

    <ul v-if="services.length" class="catalog">
      <li v-for="service in services" :key="service.id" class="service">
        <div>
          <p>
            {{ service.name }}
          </p>
          <p>{{ service.description }}</p>
        </div>
      </li>
    </ul>
    <div v-else data-testid="no-results">No services</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useDebouncedRef from "@/composables/useDebouncedRef";
import useServices from "@/composables/useServices";

export default defineComponent({
  name: "ServiceCatalog",
  setup() {
    // Import services from the composable
    const { services, loading } = useServices();

    // Set the search string to a Vue ref
    const searchQuery = useDebouncedRef("", 300);
    watch(searchQuery, (newQuery) => {
      console.log({ newQuery });
      // init an API request
    });

    return {
      services,
      loading,
      searchQuery,
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
        background: url("/public/icons/magnifier.svg") center / contain
          no-repeat;
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

      .service-package {
        background: #07a88d;
        border: none;
        border-radius: 10rem;
        color: #ffffff;
        cursor: pointer;
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 2rem;
        padding: 1rem 3rem;
      }
    }
  }
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0 0;
}

.service {
  border: 1px solid #999;
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;
  width: 200px;

  p:first-of-type {
    color: #333;
    font-weight: 700;
  }

  p {
    color: #666;
  }
}
</style>
