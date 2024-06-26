<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { categoryService, productService } from "@api/firebase";
import { EnumInventoryStatus, ProductModel } from "@interfaces/product";
import DataView from "primevue/dataview";
import Tag from "primevue/tag";
import Rating from "primevue/rating";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import { CategoryModel } from "@interfaces/category";
import { SelectModel } from "@e-com/common";

const products = ref<ProductModel[]>([]);
const categories = ref<CategoryModel[]>([]);
const layout = ref<"grid" | "list">("grid");

const getProducts = async () => {
    const res = await productService().getProducts();
    if (!res?.length) return;

    products.value = res;
};

const getCategories = async () => {
    const res = await categoryService().getCategories();
    if (!res?.length) return;

    categories.value = res;
};

onMounted(async () => {
    await getCategories();
    await getProducts();
});

const categoryName = computed(() => (categoryId?: number) => {
    if (!categoryId) return "";

    return categories.value?.find((x) => x.categoryValue === categoryId)?.categoryName ?? "";
});

const getSeverity = computed(() => (product: ProductModel): SelectModel<string> => {
    switch (product?.inventoryStatus) {
        case EnumInventoryStatus.InStock:
            return { value: "success", text: "INSTOCK" };
        case EnumInventoryStatus.LowStock:
            return { value: "warning", text: "LOWSTOCK" };
        case EnumInventoryStatus.OutOfStock:
            return { value: "danger", text: "OUTOFSTOCK" };
        default:
            return { value: "", text: "" };
    }
});
</script>
<template>
    <DataView :layout="layout" :value="products" :data-key="layout">
        <template #header>
            <div class="flex justify-end">
                <DataViewLayoutOptions v-model="layout" />
            </div>
        </template>

        <template #list="slotProps">
            <div class="flex flex-wrap">
                <div v-for="(item, index) in slotProps.items" :key="index" class="w-full p-3">
                    <div
                        :class="{
                            'border-t border-surface-200 dark:border-surface-700': index !== 0,
                        }"
                        class="flex flex-col xl:flex-row xl:items-start p-4 gap-4"
                    >
                        <img
                            :alt="item.name"
                            :src="item.picture"
                            class="w-9/12 sm:w-[16rem] xl:w-[10rem] shadow-md block xl:block mx-auto rounded"
                        />
                        <div
                            class="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-4"
                        >
                            <div class="flex flex-col items-center sm:items-start gap-3">
                                <div
                                    class="text-2xl font-bold text-surface-900 dark:text-surface-0"
                                >
                                    {{ item.name }}
                                </div>
                                <Rating :cancel="false" :modelValue="item.rating" readonly />
                                <div class="flex items-center gap-3">
                                    <span class="flex items-center gap-2">
                                        <i class="pi pi-tag" />
                                        <span class="font-semibold">
                                            {{ categoryName(item?.categoryId) }}
                                        </span>
                                    </span>
                                    <Tag
                                        :severity="getSeverity(item)?.value"
                                        :value="getSeverity(item)?.text"
                                    />
                                </div>
                            </div>
                            <div class="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
                                <span class="text-2xl font-semibold">${{ item.price }}</span>
                                <Button
                                    :disabled="
                                        item.inventoryStatus === EnumInventoryStatus.OutOfStock
                                    "
                                    icon="pi pi-shopping-cart"
                                    rounded
                                />
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
                    class="w-full p-3 sm:w-6/12 xl:w-4/12"
                >
                    <div
                        class="p-4 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-800 rounded"
                    >
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <div class="flex items-center gap-2">
                                <i class="pi pi-tag" />
                                <span class="font-semibold">
                                    {{ categoryName(item?.categoryId) }}
                                </span>
                            </div>
                            <Tag
                                :severity="getSeverity(item)?.value"
                                :value="getSeverity(item)?.text"
                            />
                        </div>
                        <div class="flex flex-col items-center gap-3 py-5">
                            <img
                                :alt="item.name"
                                :src="item.picture"
                                class="w-9/12 shadow-md rounded"
                            />
                            <div class="text-2xl font-bold">{{ item.name }}</div>
                            <Rating :cancel="false" :modelValue="item.rating" readonly />
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-2xl font-semibold">${{ item.price }}</span>
                            <Button
                                :disabled="item.inventoryStatus === EnumInventoryStatus.OutOfStock"
                                icon="pi pi-shopping-cart"
                                rounded
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>
