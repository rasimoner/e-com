<script setup lang="ts">
import { computed, ref, watch } from "vue";
import UiBreadcrumb from "@components/custom/UiBreadcrumb.vue";
import UiPageLayout from "@components/custom/UiPageLayout.vue";
import ProductGalleria from "@components/ProductGalleria.vue";
import { PhotoModel } from "@interfaces/photo/photo-model";
import Rating from "primevue/rating";
import { EnumProductCategory, ProductModel } from "@interfaces/product";
import { productService } from "@api/firebase";
import { useRoute } from "vue-router";
import { ReviewModel } from "@interfaces/review";
import { Timestamp } from "firebase/firestore";
import { dateUtils } from "@e-com/common";

const images = ref<PhotoModel[]>([]);
const reviews = ref<ReviewModel[]>([]);
const localModel = ref<ProductModel>({
    name: "",
    price: 0,
    picture: "",
    categoryId: EnumProductCategory.Other,
    originalPrice: 0,
});

const reviewDate = computed(() => (date: Timestamp) => dateUtils.dateTimeFormatFromTimestamp(date));
const subReviews = computed(() => (id: string) => reviews.value?.filter((x) => x.parentId === id));

const getNewProduct = async (productId: string) => {
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

const getProductPhotos = async (productId: string) => {
    const res = await productService().getProductPhotos(productId);
    images.value = res ?? [];
};

const getProductReviews = async (productId: string) => {
    const res = await productService().getProductReviews(productId);
    reviews.value = res ?? [];
};

watch(
    () => useRoute().params?.productId,
    async () => {
        const productId = useRoute().params?.productId ?? "";
        if (!productId) return;

        await Promise.all([
            getNewProduct(productId.toString()),
            getProductPhotos(productId.toString()),
            getProductReviews(productId.toString()),
        ]);
    },
    { immediate: true }
);
</script>

<template>
    <ui-page-layout>
        <template #header>
            <UiBreadcrumb />
        </template>
        <div>
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
            <div class="p-2">
                <div class="text-xl font-bold text-black dark:text-white">
                    {{ reviews?.length ?? 0 }} Reviews
                </div>
                <div v-for="(item, i) in reviews" :key="i" class="p-2">
                    <div v-if="!item.parentId">
                        <div class="font-bold text-black dark:text-white">{{ item.user }}</div>
                        <Rating class="mt-2" :cancel="false" :modelValue="item.rate" readonly />
                        <div>{{ item.comment }}</div>
                        <div>{{ reviewDate(item.createdAt) }}</div>
                    </div>
                    <div
                        v-for="(child, index) in subReviews(item.id)"
                        v-if="!!item.id && !!subReviews?.length"
                        class="border-l-2 p-2 m-4"
                        :key="`${index}_${item.id}`"
                    >
                        <div class="font-bold text-black dark:text-white">{{ child.user }}</div>
                        <Rating class="mt-2" :cancel="false" :modelValue="child.rate" readonly />
                        <div>{{ child.comment }}</div>
                        <div>{{ reviewDate(child.createdAt) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </ui-page-layout>
</template>
