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

  function nextPage() {
    // Navigate to the next page if not at the end of the page
    if (currentPage.value < totalPageCount.value) {
      currentPage.value++;
    }
  }

  function previousPage() {
    // Navigate to the previous page after 1st page
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }

  return {
    currentPage,
    totalPageCount,
    paginatedListItems,
    nextPage,
    previousPage,
  };
}
