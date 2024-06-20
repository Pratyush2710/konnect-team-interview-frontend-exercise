import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { getFormattedTime } from "@/common/utils.ts";
import ServiceVersions from "../ServiceVersions.vue";
import ServiceDetails from "../ServiceDetails.vue";
import serviceData from "../../../../mocks/services";

import StatusBar from "@/components/common/StatusBar.vue";
import ServiceMetrics from "../ServiceMetrics.vue";
import type { Service } from "@/common/types";

const serviceDataMock = serviceData[1] as Service;
describe("ServiceDetails test", () => {
  const type = "REST";

  it("Assert ui elements", () => {
    const wrapper = mount(ServiceDetails, {
      props: {
        service: serviceDataMock,
      },
    });

    // Asserting service details
    const logo = wrapper.findTestId("kong-logo");

    expect(wrapper.find(".service-detail-modal").exists()).toBe(true);
    expect(wrapper.find(".modal-title").text()).toBe(serviceDataMock.name);
    expect(wrapper.find(".modal-description").text()).toBe(
      serviceDataMock.description
    );

    // Assert StatusBar component is rendered
    const statusBar = wrapper.findComponent(StatusBar);
    expect(statusBar.exists()).toBe(true);
    expect(statusBar.props("configured")).toBe(serviceDataMock.configured);
    expect(statusBar.props("published")).toBe(serviceDataMock.published);

    // Assert ServiceMetrics component is rendered
    const serviceMetrics = wrapper.findComponent(ServiceMetrics);
    expect(serviceMetrics.exists()).toBe(true);

    // Assert ServiceVersions component is rendered
    if (serviceDataMock.versions.length) {
      const serviceVersions = wrapper.findComponent(ServiceVersions);
      expect(serviceVersions.exists()).toBe(true);

      const versionList = wrapper.findAll(".version-list");
      expect(versionList.length).toBe(serviceDataMock.versions.length);
      // Asserting items in the list view
      serviceDataMock.versions.forEach((version, index) => {
        const versionWrapper = versionList[index];
        expect(versionWrapper.find(".name").text()).toBe(`v${version.name}`);
        expect(versionWrapper.find(".description").text()).toBe(
          version.description
        );
        expect(versionWrapper.find(".user-details .name").text()).toBe(
          version.developer?.name
        );
        expect(versionWrapper.find(".timeLapsed").text()).toBe(
          getFormattedTime(version.updated_at)
        );
        expect(versionWrapper.find(".type-tag").text()).toBe(type);
      });
    }
  });
});
