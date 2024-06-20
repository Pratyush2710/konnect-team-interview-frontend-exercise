import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PrimaryButtonVue from "../PrimaryButton.vue";

describe("PrimaryButton tests", () => {
  it("Button should render the provided label and emit event", () => {
    const label = "Primary Button";
    const wrapper = mount(PrimaryButtonVue, {
      props: {
        label,
      },
    });
    const button = wrapper.find("button");

    expect(button.text()).toBe(label);

    button.trigger("click");

    expect(wrapper.emitted("click:event")).toHaveLength(1);
  });
});
