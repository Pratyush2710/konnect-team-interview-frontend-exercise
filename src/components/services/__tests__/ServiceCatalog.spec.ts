import { vi, describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import servicesData from "../../../../mocks/services";
import ServiceCatalog from "../ServiceCatalog.vue";
import ServiceCardVue from "../ServiceCard.vue";

// Mock the axios module for fetching API services
const mockedResponses = new Map().set(
  "/api/services",
  vi.fn(() => ({
    data: servicesData,
  }))
);

/**
 * Source: https://www.npmjs.com/package/vue-router-mock
 * Added library
 */
const router = createRouterMock();
beforeEach(() => {
  router.reset(); // reset the router state
  injectRouterMock(router);
});

vi.mock("axios", async () => {
  const actual: any = await vi.importActual("axios");
  return {
    default: {
      ...actual.default,
      // Mock get request responses
      get: (url: string) =>
        vi
          .fn()
          .mockResolvedValue(
            mockedResponses.get(url) !== undefined
              ? mockedResponses.get(url)()
              : undefined
          )(),
    },
  };
});

// Example component test for ServiceCatalog.vue
describe("ServiceCatalog tests", () => {
  it("shows the search input", async () => {
    // No `mockedResponses` modification needed; just use the default mocked response
    const wrapper = mount(ServiceCatalog);

    expect(wrapper.findTestId("search-input").isVisible()).toBe(true);
  });

  it("renders the service catalog header", () => {
    const wrapper = mount(ServiceCatalog);

    // Assert the presence of title and subtitle elements
    expect(wrapper.find(".title-container .title").text()).toBe("Service Hub");
    expect(wrapper.find(".title-container .subtitle").text()).toContain(
      "Organize services"
    );
  });

  it("properly handles no services returned from the API", async () => {
    // Provide a custom `mockedResponses` response payload instead of using the default mocked response
    mockedResponses.get("/api/services").mockReturnValue({
      data: [],
    });

    const wrapper = mount(ServiceCatalog);

    expect(wrapper.findTestId("no-results").isVisible()).toBe(true);
  });
});
