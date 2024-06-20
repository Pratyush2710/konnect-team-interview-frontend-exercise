<template>
  <ul
    v-if="usersToBeListed.length"
    class="avatar-list"
    data-testid="avatar-list"
  >
    <li
      v-for="(user, i) in usersToBeListed"
      :key="user?.id || i"
    >
      <img
        v-if="user"
        :alt="user.name"
        class="avatar"
        :src="user.avatar"
      >
    </li>
    <li v-if="offsetUsersCount">
      <div class="offset-tile">
        + {{ offsetUsersCount }}
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type Developer } from '@/common/types.ts'
export default defineComponent({
  name: 'AvatarTiles',
  props: {
    users: {
      type: Array as PropType<Developer[]>,
      required: true,
    },
    limit: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    totalUsersCount(): number {
      return this.users.length
    },
    offsetUsersCount(): number {
      // Difference of remaining users post limit is reached
      return this.totalUsersCount > this.limit
        ? this.totalUsersCount - this.limit
        : 0
    },
    usersToBeListed(): Developer[] {
      // Users list as per the provided limit
      return this.users.slice(0, this.limit)
    },
  },
})
</script>

<style lang="scss" scoped>
.avatar-list {
  display: flex;
  padding: 0.5rem;

  li {
    list-style: none;
    max-width: 2.2rem;
  }

  .avatar {
    border-radius: 50%;
    height: 3.6rem;
    width: 3.6rem;
  }
}

.offset-tile {
  align-items: center;
  background-color: #f1f1f8;
  border: 1px solid #fff;
  border-radius: 50%;
  color: #777d8a;
  display: inline-flex;
  font-size: 1.2rem;
  font-weight: 600;
  height: 3.6rem;
  justify-content: center;
  letter-spacing: 0.2rem;
  width: 3.6rem;
}
</style>
