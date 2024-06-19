import { ref, computed, type Ref } from "vue";
import type { Service, UseGetPaginatedDataReturnType } from "@/common/types";

export default function useGetPaginatedData(
  itemList: Ref<Service[]>,
  limit = 10
): UseGetPaginatedDataReturnType {
  // Ref to track the current page number
  const currentPage = ref(1);
  const totalListItems = computed(() => itemList.value.length);
  const totalPageCount = computed(() =>
    Math.ceil(totalListItems.value / limit)
  );

  const paginatedListItems = computed(() => {
    const startIndex = (currentPage.value - 1) * limit;
    const endIndex = startIndex + limit;
    // Slice the itemList to get the current page's data - not mutating original list
    return itemList.value.slice(startIndex, endIndex);
  });

  function handlePagination(direction: number): void {
    if (
      (direction === -1 && currentPage.value > 1) ||
      (direction === 1 && currentPage.value < totalPageCount.value)
    ) {
      currentPage.value += direction;
    }
  }

  return {
    currentPage,
    totalListItems,
    totalPageCount,
    paginatedListItems,
    handlePagination,
  };
}
