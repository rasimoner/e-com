<script setup lang="ts">
import { ref } from "vue";
import { PhotoModel } from "@interfaces/photo";

defineProps<{
    images: PhotoModel[];
}>();

const responsiveOptions = ref([
    {
        breakpoint: "1300px",
        numVisible: 4,
    },
    {
        breakpoint: "575px",
        numVisible: 1,
    },
]);
</script>

<template>
    <Galleria
        :value="images"
        :responsive-options="responsiveOptions"
        :num-visible="5"
        container-style="max-width: 640px"
        circular
        auto-play
        :transition-interval="5000"
    >
        <template #item="slotProps">
            <img :src="slotProps.item.imageSrc" :alt="slotProps.item.alt" class="block w-full" />
        </template>
        <template #thumbnail="slotProps">
            <img :src="slotProps.item.thumbnailSrc" :alt="slotProps.item.alt" class="block" />
        </template>
    </Galleria>
</template>
