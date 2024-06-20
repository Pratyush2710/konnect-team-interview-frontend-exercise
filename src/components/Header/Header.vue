<template>
  <header>
    <div class="navbar">
      <router-link to="/">
        <img alt="Kong logo" src="/logo/kong-logo.svg" />
      </router-link>
      <div class="navbar-list">
        <template v-for="option in menuOptions" :key="option.title">
          <span class="navbar-list-item" @click="option.action">
            <img
              height="20px"
              width="20px"
              :src="option.src"
              :alt="option.title"
            />
            {{ option.title }}
          </span>
        </template>
      </div>
    </div>

    <div class="user-profile">
      <img
        height="30px"
        width="30px"
        src="/icons/avatar.svg"
        alt="avatar icon"
      />
      <span class="username">Katherine Ellis</span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { type MenuItem } from "@/common/types.ts";
export default defineComponent({
  name: "AppHeader",
  data() {
    return {
      menuOptions: [
        {
          title: "Organization",
          src: "/icons/organisation.svg",
          action: () => {
            alert("Organizations HomePage!");
          },
        },
        {
          title: "Settings",
          src: "/icons/settings.svg",
          action: () => {
            alert("Settings HomePage!");
          },
        },
      ] as MenuItem[],
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  align-items: center;
  color: #fffc;
  display: flex;
  height: 6rem;
  position: sticky;
  top: 0;
  z-index: 1;
}

.navbar {
  align-items: center;
  background: linear-gradient(180deg, #09224f 0%, #073382 100%);
  display: flex;
  flex-grow: 1;
  font-size: 1.5rem;
  font-weight: 600;
  height: 100%;
  justify-content: space-between;
  padding: 0;
  padding-right: 2rem;
}

.navbar-list {
  display: flex;
  gap: 2rem;
  height: 100%;

  .navbar-list-item {
    align-items: center;
    border-radius: 0.5rem;
    display: flex;
    gap: 1rem;
    padding-inline: 1rem;

    &:hover {
      background-color: #ffffff1a;
      cursor: pointer;
      opacity: 1;
    }
  }
}

.user-profile {
  align-items: center;
  background: rgba(7, 40, 99, 1);
  display: flex;
  gap: 1.5rem;
  height: 100%;
  padding: 0 2rem;

  .avatar-container {
    align-items: center;
    background-color: #0a7fae;
    border-radius: 100%;

    display: flex;
    height: 3rem;
    justify-content: center;
    width: 3rem;
  }

  .username {
    font-size: 1.5rem;
  }
}
</style>
import type { cursorTo } from "readline";
