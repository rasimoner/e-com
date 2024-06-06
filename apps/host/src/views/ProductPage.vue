<script setup lang="ts">
import { onMounted, ref } from "vue";
import UiBreadcrumb from "@components/custom/UiBreadcrumb.vue";
import UiPageLayout from "@components/custom/UiPageLayout.vue";
import ProductGalleria from "@components/ProductGalleria.vue";
import { PhotoModel } from "@interfaces/photo/photo-model";
import { photoService } from "@api/photo";

const props = defineProps<{
    productId: string;
}>();

const images = ref<PhotoModel[]>([]);

const getImages = async () => {
    const reqModel = { referenceId: props.productId } as PhotoModel;
    const res = await photoService().getPhotos(reqModel);

    images.value = res ?? [];
};

onMounted(async () => {
    await getImages();
});
</script>

<template>
    <ui-page-layout>
        <template #header>
            <UiBreadcrumb />
        </template>
        <div>
            <ProductGalleria :images="images" />
        </div>
    </ui-page-layout>
</template>
