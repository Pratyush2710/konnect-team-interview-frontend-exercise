``<template>
    <div class="container" role="navigation">
        <button :disabled="isFirstPage || !isDataAvailable" @click="$emit('navigate', -1)">
            &#8592;
        </button>


        <span v-if="totalItems" class="summary-text"><b class="active-summary"> {{ startIndex }} to {{ endIndex }}</b>
            of {{ totalItems }}
            services </span>
        <span v-else>No services </span>


        <button :disabled="isLastPage || !isDataAvailable" @click="$emit('navigate', 1)">
            &#8594;
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Pagination',
    props: {
        totalPages: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },

        totalItems: {
            type: Number,
            required: true,
        },
        pageSize: {
            type: Number,
            required: false,
            default: 10
        },
    },
    emits: ['navigate'],
    computed: {
        isFirstPage() {
            return this.currentPage <= 1
        },
        isLastPage() {
            return this.currentPage >= this.totalPages
        },
        isDataAvailable() {
            return this.totalItems > 0
        },
        startIndex() {
            return ((this.currentPage - 1) * this.pageSize) + 1
        },
        endIndex() {
            return this.totalPages === 1 || this.currentPage === this.totalPages
                ? this.totalItems
                : this.currentPage * this.pageSize;
        },

    },
})
</script>

<style lang="scss">
.container {
    align-items: center;
    display: flex;
    font-size: 1.3rem;
    gap: 2.4rem;
    justify-content: center;
    line-height: 2rem;

    button {
        background-color: transparent;
        border: 1px solid #A6C6FF;
        border-radius: 50%;
        color: #1456CB;
        cursor: pointer;
        font-size: 1.8rem;
        padding: 1.2rem;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    .summary-text {
        color: #707888;
    }

    .active-summary {
        color: #3C4557;
    }

}
</style>