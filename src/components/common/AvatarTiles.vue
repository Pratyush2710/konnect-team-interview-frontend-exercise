<template>
    <ul class="avatar-list" v-if="usersToBeListed.length">
        <li v-for="(user, i) in usersToBeListed" :key="user?.id || i">
            <img v-if="user" :src="user.avatar" :alt="user.name" class="avatar">
        </li>
        <li v-if="offsetUsersCount">
            <div class="offset-tile">+ {{ offsetUsersCount }}</div>
        </li>
    </ul>
</template>


<script lang="ts">


import { defineComponent, type PropType } from "vue";
import { type Developer } from '@/common/types.ts'
export default defineComponent({
    name: "AvatarTiles",
    props: {
        users: {
            type: Array as PropType<Developer[]>,
            required: true
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
            return this.totalUsersCount > this.limit ? this.totalUsersCount - this.limit : 0
        },
        usersToBeListed(): Developer[] {
            return this.users.slice(0, this.limit)
        }
    }
});



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
    background-color: #F1F1F8;
    border: 1px solid #fff;
    border-radius: 50%;
    color: #777D8A;
    display: inline-flex;
    font-size: 1.2rem;
    font-weight: 600;
    height: 3.6rem;
    justify-content: center;
    letter-spacing: 0.2rem;
    width: 3.6rem;
}
</style>