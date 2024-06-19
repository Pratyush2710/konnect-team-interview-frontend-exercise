<template>
    <ul class="metrics-container">
        <template v-if="configured">
            <li v-if="metrics.latency">
                <span class="status-dot" />
                <span class="content">
                    <b>{{ metrics.latency }}ms</b> latency
                </span>
            </li>
            <li v-if="metrics.uptime">
                <span class="status-dot" />
                <span class="content">
                    <b>{{ formatPercentage(metrics.uptime) }}</b> uptime
                </span>
            </li>
            <li v-if="metrics.requests">
                <span class="status-dot" />
                <span class="content">
                    <b>{{
                        Intl.NumberFormat('en', { notation: 'compact', maximumSignificantDigits: 3 }).format(
                            metrics.requests
                        )
                    }}</b>
                    requests - <b>{{ formatPercentage(metrics.errors) }}</b> errors
                </span>
            </li>
        </template>
        <li v-else>
            <span class="status-dot disabled" />
            <span class="content"> Not configured with runtime yet</span>
        </li>
    </ul>
</template>

<script lang="ts">

import { defineComponent, type PropType } from "vue";
import { type Service } from "@/common/types.ts";
export default defineComponent({
    name: "ServiceMetrics",
    props: {
        metrics: {
            type: Object as PropType<Service['metrics']>,
            required: true,
        },
        configured: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        formatPercentage(value: number) {
            return (value * 100).toFixed(2) + '%';
        }
    }
});
</script>

<style scoped lang="scss">
.metrics-container {
    padding: 0.25rem;
    white-space: nowrap;

    >li {
        align-items: center;
        display: flex;
        height: 20px;
    }

    .content {
        color: #707888;
        font-size: 12px;
        line-height: 16px;


        b {
            color: #3c4557;
        }
    }
}

.status-dot {
    background: #42d782;
    border-radius: 50%;
    display: inline-block;
    height: 6px;
    margin-right: 8px;
    width: 6px;

    &.disabled {
        background: #b6b6bd;
    }
}
</style>