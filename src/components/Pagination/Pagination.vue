``
<template>
  <div class="container" role="navigation">
    <button
      :disabled="isFirstPage || !isDataAvailable"
      @click="$emit('navigate', -1)"
      data-testid="prev-navigation-btn"
    >
      &#8592;
    </button>

    <span v-if="totalItems" class="summary-text"
      ><b class="active-summary"> {{ startIndex }} to {{ endIndex }}</b> of
      {{ totalItems }} services
    </span>
    <span v-else data-testid="empty-list">No services </span>

    <button
      :disabled="isLastPage || !isDataAvailable"
      @click="$emit('navigate', 1)"
      data-testid="next-navigation-btn"
    >
      &#8594;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },

    totalItems: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  emits: ["navigate"],
  computed: {
    isFirstPage() {
      // Returns true if the current page is the first page
      return this.currentPage <= 1;
    },
    isLastPage() {
      // Returns true if the current page is equal to total pages
      return this.currentPage >= this.totalPages;
    },
    isDataAvailable() {
      // Returns true if any data available for pagination
      return this.totalItems > 0;
    },
    startIndex() {
      // Calculates the starting index for the current page based on page size.
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    endIndex() {
      /**
       * Calculates the ending index for the current page based on page size and total items.
       * Handling edge cases for single page and last page
       * - if single page, return total items
       * - if last page, return totalItems as no page paginated logic required, count is available
       * - else offset of pageSize with currentPage number will provide the endIndex
       */
      return this.totalPages === 1 || this.currentPage === this.totalPages
        ? this.totalItems
        : this.currentPage * this.pageSize;
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  align-items: center;
  display: flex;
  font-size: 1.3rem;
  gap: 2.4rem;
  justify-content: center;
  line-height: 2rem;

  button {
    background-color: transparent;
    border: 1px solid #a6c6ff;
    border-radius: 50%;
    color: #1456cb;
    cursor: pointer;
    font-size: 1.8rem;
    padding: 1.2rem;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .summary-text {
    color: #707888;
  }

  .active-summary {
    color: #3c4557;
  }
}
</style>
