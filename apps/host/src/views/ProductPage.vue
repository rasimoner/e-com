<script setup lang="ts">
import { ref, watch } from "vue";
import UiBreadcrumb from "@components/custom/UiBreadcrumb.vue";
import UiPageLayout from "@components/custom/UiPageLayout.vue";
import ProductGalleria from "@components/ProductGalleria.vue";
import { PhotoModel } from "@interfaces/photo/photo-model";
import { photoService } from "@api/photo";
import Rating from "primevue/rating";
import { EnumProductCategory, ProductModel } from "@interfaces/product";
import { productService } from "@api/product";
import { useRoute } from "vue-router";

const images = ref<PhotoModel[]>([]);
const localModel = ref<ProductModel>({
    name: "",
    price: 0,
    picture: "",
    categoryId: EnumProductCategory.Other,
    originalPrice: 0,
});

const getImages = async (productId: string) => {
    const reqModel = { referenceId: productId } as PhotoModel;
    const res = await photoService().getPhotos(reqModel);

    images.value = res ?? [];
};
const getProduct = async (productId: string) => {
    const reqModel = { id: productId } as ProductModel;
    const res = await productService().getProducts(reqModel);

    localModel.value = res?.[0] ?? {
        name: "",
        price: 0,
        picture: "",
        categoryId: EnumProductCategory.Other,
        description: "",
    };
};

watch(
    () => useRoute().params?.productId,
    async () => {
        const productId = useRoute().params?.productId ?? "";
        if (!productId) return;

        await Promise.all([getImages(productId.toString()), getProduct(productId.toString())]);
    },
    { immediate: true }
);
</script>

<template>
    <ui-page-layout>
        <template #header>
            <UiBreadcrumb />
        </template>
        <div class="md:flex">
            <ProductGalleria class="md:w-1/2" :images="images" />
            <div class="md:w-1/2 p-3">
                <div class="flex py-2">
                    <Rating :cancel="false" :modelValue="localModel.rating" readonly />
                </div>
                <div class="py-2 text-2xl font-bold text-surface-900 dark:text-surface-0">
                    {{ localModel.name }}
                </div>
                <div class="py-2 text-slate-400">{{ localModel.description }}</div>
                <div class="py-2">
                    <span class="text-2xl font-bold text-black dark:text-white">
                        ${{ localModel.price }}
                    </span>
                    <span
                        class="text-lg font-bold text-gray-500 dark:text-gray-400 line-through ml-2"
                    >
                        ${{ localModel.originalPrice }}
                    </span>
                </div>
            </div>
        </div>
    </ui-page-layout>
</template>
