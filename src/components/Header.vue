<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
});
</script>

<template>
  <header>
    <div class="navbar">
      <router-link to="/">
        <img alt="Kong logo" src="/logo/kong-logo.svg" />
      </router-link>
      <div class="navbar-list">
        <span class="navbar-list-item">
          <img
            height="20px"
            width="20px"
            src="/icons/organisation.svg"
            alt="organisation icon"
          />
          Organization
        </span>
        <span class="navbar-list-item">
          <img
            height="20px"
            width="20px"
            src="/icons/settings.svg"
            alt="settings icon"
          />
          Settings
        </span>
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

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  height: 6rem;
  color: rgb(255 255 255 / 0.8);
}

.navbar {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0;
  padding-right: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(180deg, #09224f 0%, #073382 100%);
}

.navbar-list {
  display: flex;
  gap: 2rem;

  .navbar-list-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
  padding: 0 2rem;
  background: rgba(7, 40, 99, 1);

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
