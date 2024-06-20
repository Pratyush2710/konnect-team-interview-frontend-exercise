import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Pagination from "../Pagination.vue";

describe("Pagination tests", () => {
  it("renders previous and next buttons with text content and prev button disabled on first page", () => {
    const props = {
      totalPages: 5,
      currentPage: 1,
      totalItems: 20,
      pageSize: 10,
    };
    const wrapper = mount(Pagination, { props });
    const prevButton = wrapper.findTestId("prev-navigation-btn");
    const nextButton = wrapper.findTestId("next-navigation-btn");
    // Assert button visibility
    expect(prevButton.text()).toBe("←");
    expect(nextButton.text()).toBe("→");
    expect(prevButton.attributes("disabled")).toBe("");
    //  Assert summary labels based on current page and limit
    const summaryText = wrapper.find(".summary-text");
    expect(summaryText.text()).toBe("1 to 10 of 20 services");
    // Next button should navigate with +1
    nextButton.trigger("click");
    expect(wrapper.emitted("navigate")).toEqual([[1]]);
  });

  it("prev button should emit navigate event with -1 on click", () => {
    const props = {
      totalPages: 3,
      currentPage: 2,
      totalItems: 25,
      pageSize: 10,
    };
    const wrapper = mount(Pagination, { props });
    const prevButton = wrapper.findTestId("prev-navigation-btn");
    prevButton.trigger("click");
    expect(wrapper.emitted("navigate")).toEqual([[-1]]);
  });

  it('Empty scenario - "No services" when totalItems is 0', () => {
    const props = {
      totalPages: 1,
      currentPage: 1,
      totalItems: 0,
      pageSize: 10,
    };
    const wrapper = mount(Pagination, { props });
    const summaryText = wrapper.findTestId("empty-list");
    expect(summaryText.text()).toBe("No services");
  });
});
