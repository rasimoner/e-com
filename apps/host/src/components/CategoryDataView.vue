<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { productService } from "@api/product/product.service";
import { EnumInventoryStatus, ProductModel } from "@interfaces/product";
import DataView from "primevue/dataview";
import Tag from "primevue/tag";
import Rating from "primevue/rating";
import DataViewLayoutOptions, {
    DataViewLayoutOptionsPassThroughOptions,
} from "primevue/dataviewlayoutoptions";
import { CategoryModel } from "@interfaces/category";
import { categoryService } from "@api/category";
import { SelectModel } from "@e-com/common";

const products = ref<ProductModel[]>([]);
const categories = ref<CategoryModel[]>([]);
const layout = ref("grid");
const dataViewLayoutOptions = ref<DataViewLayoutOptionsPassThroughOptions>({
    root: {
        content: {
            class: [
                "p-0",
                "border-0",
                "text-surface-700 dark:text-white/80",
                "bg-surface-0 dark:bg-surface-800",
            ],
        },
        grid: {
            class: ["flex flex-wrap", "ml-0 mr-0 mt-0", "bg-surface-0 dark:bg-surface-800"],
        },
        header: {
            class: [
                "font-bold",
                "p-4",
                "text-surface-800 dark:text-white/80",
                "bg-surface-50 dark:bg-surface-800",
                "border-surface-200 dark:border-surface-700 border-y",
            ],
        },
    },

    listButton: ({ props }) => ({
        class: [
            // Font
            "leading-none",
            // Flex Alignment
            "inline-flex items-center align-bottom text-center",
            // Shape
            "border rounded-md rounded-r-none",
            // Spacing
            "px-4 py-3",
            // Color
            props.modelValue === "list"
                ? "bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400 text-white dark:text-surface-900"
                : "bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-white/80",
            // States
            "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
            props.modelValue === "list"
                ? "hover:bg-primary-600 dark:hover:bg-primary-300"
                : "hover:bg-surface-50 dark:hover:bg-surface-800/80",
            // Transition
            "transition duration-200",
            // Misc
            "cursor-pointer select-none overflow-hidden",
        ],
    }),
    gridButton: ({ props }) => ({
        class: [
            // Font
            "leading-none",
            // Flex Alignment
            "inline-flex items-center align-bottom text-center",
            // Shape
            "border rounded-md rounded-l-none",
            // Spacing
            "px-4 py-3",
            // Color
            props.modelValue === "grid"
                ? "bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400 text-white dark:text-surface-900"
                : "bg-surface-0 dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-white/80",
            // States
            "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
            props.modelValue === "grid"
                ? "hover:bg-primary-600 dark:hover:bg-primary-300"
                : "hover:bg-surface-50 dark:hover:bg-surface-800/80",
            // Transition
            "transition duration-200",
            // Misc
            "cursor-pointer select-none overflow-hidden",
        ],
    }),
});

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

const getSeverity = computed(() => (product: ProductModel): SelectModel => {
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
    <DataView :layout="layout" :value="products">
        <template #header>
            <div class="flex justify-end">
                <DataViewLayoutOptions v-model="layout" :pt="dataViewLayoutOptions" />
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
