<template>
  <div class="version-wrapper">
    <div
      v-for="{ id, name, description, developer, updated_at } in versions"
      :key="id"
      class="version-list"
    >
      <div class="left">
        <div class="name">
          v{{ name }}
        </div>
        <div class="description">
          {{ description }}
        </div>
        <span
          class="type-tag"
          :class="type === 'REST' ? 'rest-tag' : ''"
        >{{
          type
        }}</span>
      </div>

      <div class="right">
        <div
          v-if="developer"
          class="user-details"
        >
          <div>
            <img
              v-if="developer"
              :alt="developer.name"
              class="user-image"
              :src="developer.avatar"
            >
          </div>
          <div>
            <p class="name">
              {{ developer.name }}
            </p>
            <p class="timeLapsed">
              {{ getFormattedTime(updated_at) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type Version, type Service } from '@/common/types.ts'
import { getFormattedTime } from '@/common/utils.ts'
export default defineComponent({
  name: 'ServiceVersions',
  props: {
    versions: {
      type: Object as PropType<Version[]>,
      required: true,
    },
    type: {
      type: String as PropType<Service['type']>,
      required: true,
    },
  },
  methods: { getFormattedTime },
})
</script>

<style lang="scss" scoped>
.version-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 2rem;
}

.version-list {
  p,
  ul {
    margin: 0;
  }
  align-items: center;
  border-top: 1px solid #f1f1f5;

  display: flex;
  gap: 20rem;
  justify-content: space-between;
  padding: 0.5rem 0 0.25rem 0;

  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
    gap: 1rem;
  }

  &:first-child {
    border-top: none;
  }

  .left {
    align-items: center;
    display: flex;
    gap: 3.2rem;

    @media only screen and (max-width: 600px) {
      flex-wrap: wrap;
      gap: 2rem;
    }
    .name {
      color: #262626;
      font-size: 1.3rem;
      font-weight: 600;
      line-height: 2.4rem;
    }

    .description {
      color: #8a8a8a;
      font-size: 1.2rem;
      line-height: 1.6rem;
      width: 50rem;
      @media only screen and (max-width: 600px) {
        width: 20rem;
      }
    }

    .type-tag {
      background-color: #f8f8fa;
      border-radius: 0.4rem;
      color: #1155cb;
      font-size: 1rem;
      font-weight: 500;
      padding: 0.15rem 0.6rem 0.25rem 0.6rem;

      &.rest-tag {
        background-color: #bdd3f9;
      }
    }
  }

  .right {
    align-items: start;
    display: flex;
    gap: 0.6rem;
    justify-content: start;
    text-align: right;

    .user-details {
      align-items: start;
      display: flex;
      gap: 0.6rem;
      justify-content: start;
      text-align: right;

      .user-image {
        border-radius: 50%;
        height: 3rem;
        width: 3rem;
      }
    }

    .name {
      font-weight: 600;
      line-height: 2.4rem;
    }

    .timeLapsed {
      color: #8a8a8a;
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.6rem;
    }
  }
}
</style>
