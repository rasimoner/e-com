<script setup lang="ts">
import DataView from "primevue/dataview";
import { ref, watch } from "vue";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import { EnumInventoryStatus, ProductModel } from "@interfaces/product";
import { productService } from "@api/firebase";
import Rating from "primevue/rating";
import { router } from "@router/index";

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

const itemClick = (item: ProductModel) =>
    router.push({ name: "product", params: { productId: item.id } });
</script>

<template>
    <DataView
        :layout="layout"
        :value="products"
        paginator
        :always-show-paginator="false"
        :rows="5"
        :data-key="layout"
        class="mb-3"
    >
        <template #empty>
            <div class="text-slate-400 text-center">No Data Found</div>
        </template>
        <template #header>
            <div class="flex">
                <slot name="filter-button" />
                <span class="flex-1" />
                <span class="justify-end">
                    <DataViewLayoutOptions v-model="layout" />
                </span>
            </div>
        </template>

        <template #list="slotProps">
            <div class="flex flex-wrap">
                <div v-for="(item, index) in slotProps.items" :key="index" class="w-full">
                    <div
                        class="flex flex-col md:flex-row md:items-center px-0 md:px-3 py-3 gap-3 cursor-pointer md:cursor-default"
                        :class="{
                            'border-t border-surface-200 dark:border-surface-700': index !== 0,
                        }"
                    >
                        <div class="hidden md:w-[10rem] relative">
                            <img
                                class="block mx-auto rounded-md w-full"
                                :src="item.picture"
                                :alt="item.name"
                                @click="itemClick(item)"
                            />
                        </div>
                        <div
                            class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4"
                        >
                            <div
                                class="flex flex-row md:flex-col justify-between items-start gap-2"
                            >
                                <div
                                    class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2"
                                >
                                    {{ item.name }}
                                </div>
                                <Rating
                                    class="mt-2"
                                    :cancel="false"
                                    :modelValue="item.rating"
                                    readonly
                                />
                            </div>
                            <div class="flex flex-col items-end gap-5">
                                <span
                                    class="text-xl font-semibold text-surface-900 dark:text-surface-0"
                                    >${{ item.price }}</span
                                >
                                <div class="flex flex-row-reverse md:flex-row gap-2">
                                    <Button icon="pi pi-heart" outlined />
                                    <Button
                                        icon="pi pi-shopping-cart"
                                        label="Buy Now"
                                        :disabled="
                                            item.inventoryStatus === EnumInventoryStatus.OutOfStock
                                        "
                                        class="flex-auto md:flex-initial white-space-nowrap"
                                        @click="itemClick(item)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #grid="slotProps">
            <div class="flex flex-wrap">
                <div
                    v-for="(item, index) in slotProps.items"
                    :key="index"
                    class="w-full px-0 md:px-3 py-3 md:w-4/12"
                >
                    <div
                        class="border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 rounded cursor-default md:cursor-pointer"
                    >
                        <div class="flex flex-col gap-3">
                            <img
                                :alt="item.name"
                                :src="item.picture"
                                class="w-full shadow-md rounded"
                                @click="itemClick(item)"
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
