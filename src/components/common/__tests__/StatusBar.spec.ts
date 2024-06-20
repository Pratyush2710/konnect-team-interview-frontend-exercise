import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import StatusBar from "../StatusBar.vue";

describe("StatusBar tests", () => {
  const statusMetadata = [
    {
      configured: false,
      published: false,
      label: "In progress",
    },
    {
      configured: true,
      published: true,
      label: "Published to Portal",
    },
    {
      configured: true,
      published: false,
      label: "Unpublished",
    },
  ];

  statusMetadata.forEach((status) => {
    it(`renders ${status.label} label`, () => {
      const wrapper = mount(StatusBar, {
        props: status,
      });

      const span = wrapper.find("span");

      expect(span.text()).toBe(status.label);
    });
  });
});
