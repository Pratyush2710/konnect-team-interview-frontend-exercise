import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HeaderComponent from "../Header.vue";
import { HeaderMenuItem } from "../utils";

describe("HeaderComponent tests", () => {
  it("Logo and nav items should render ", () => {
    const wrapper = mount(HeaderComponent);
    const logo = wrapper.findTestId("kong-logo");

    expect(logo.exists()).toBe(true); // Assert header logo

    // Assert menuItems are renderd
    const listItems = wrapper.findAll(".navbar-list-item");
    expect(listItems.length).toBe(HeaderMenuItem.length);
  });
});
