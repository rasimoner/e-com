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
import { dateUtils, TimestampModel } from "@e-com/common";

const images = ref<PhotoModel[]>([]);
const reviews = ref<ReviewModel[]>([]);
const localModel = ref<ProductModel>({
    name: "",
    price: 0,
    picture: "",
    categoryId: EnumProductCategory.Other,
    originalPrice: 0,
});

const reviewDate = computed(
    () => (date: TimestampModel) => dateUtils.dateTimeFormatFromTimestamp(date)
);
const subReviews = computed(
    () => (id: string) => reviews.value?.filter((x) => x.parentId === id) ?? []
);
const avatarLabel = computed(() => (user: string) => {
    const nameParts = user.trim().split(/\s+/);
    let result = nameParts.map((part) => part.charAt(0).toUpperCase()).join("");

    const lastPart = nameParts[nameParts.length - 1];
    if (!isNaN(Number(lastPart))) result = result.slice(0, -1) + lastPart;

    return result;
});

const getNewProduct = async (productId: string) => {
    const reqModel = { id: productId } as ProductModel;
    const res = await productService().getProducts(reqModel);

    localModel.value =
        res?.[0] ??
        <ProductModel>{
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
    reviews.value = res?.toSorted((a, b) => a.createdAt - b.createdAt) ?? [];
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
                    <div v-if="!item.parentId" class="flex border-t pt-1">
                        <Avatar
                            :label="avatarLabel(item.user)"
                            size="xlarge"
                            shape="circle"
                            class="mr-2"
                        />
                        <div>
                            <div class="font-bold text-black dark:text-white">{{ item.user }}</div>
                            <Rating class="mt-2" :cancel="false" :modelValue="item.rate" readonly />
                            <div>{{ item.comment }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">
                                {{ reviewDate(item.createdAt) }}
                            </div>
                        </div>
                    </div>
                    <template v-if="!!item?.id && !!subReviews(item?.id ?? '')?.length">
                        <div
                            v-for="(child, index) in subReviews(item?.id ?? '')"
                            class="p-2 px-5 m-4 flex"
                            :key="`${index}_${item.id}`"
                        >
                            <Avatar
                                size="normal"
                                shape="circle"
                                class="mr-2"
                                :label="avatarLabel(child.user)"
                            />
                            <div>
                                <div class="font-bold text-black dark:text-white">
                                    {{ child.user }}
                                </div>
                                <Rating
                                    class="mt-2"
                                    :cancel="false"
                                    :modelValue="child.rate"
                                    readonly
                                />
                                <div>{{ child.comment }}</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ reviewDate(child.createdAt) }}
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </ui-page-layout>
</template>
