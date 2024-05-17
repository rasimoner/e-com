<script setup lang="ts">
import DataView from "primevue/dataview";
import { ref, watch } from "vue";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import { ProductModel } from "@interfaces/product";
import { productService } from "@api/product";
import Rating from "primevue/rating";

const props = defineProps<{
    categoryId: number;
}>();

const layout = ref<"grid" | "list">("grid");
const products = ref<ProductModel[]>([]);

const getData = async () => {
    const reqModel = { categoryId: props.categoryId } as ProductModel;
    const res = await productService().getProducts(reqModel);

    products.value = res ?? [];
};
watch(
    () => props.categoryId,
    () => {
        getData();
    },
    { immediate: true }
);
</script>

<template>
    <DataView :layout="layout" :value="products">
        <template #empty>
            <div class="text-slate-400 text-center">No Data Found</div>
        </template>
        <template #header>
            <div class="flex"></div>
            <div class="flex justify-end">
                <DataViewLayoutOptions v-model="layout" />
            </div>
        </template>

        <template #list="slotProps">
            <div class="flex flex-wrap">d1{{ slotProps.items?.[0] }}</div>
        </template>
        <template #grid="slotProps">
            <div class="flex flex-wrap">
                <div
                    v-for="(item, index) in slotProps.items"
                    :key="index"
                    class="w-full p-3 sm:w-6/12 xl:w-4/12"
                >
                    <div
                        class="border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 rounded"
                    >
                        <div class="flex flex-col gap-3">
                            <img
                                :alt="item.name"
                                :src="item.picture"
                                class="w-full shadow-md rounded"
                            />
                            <div class="mx-2">
                                <Rating :cancel="false" :modelValue="item.rating" readonly />
                                <div class="text-2xl font-bold">{{ item.name }}</div>
                                <div class="font-semibold">${{ item.price }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>
