<script setup lang="ts">
import { SelectModel } from "@e-com/common";
import { onMounted, ref } from "vue";
import { categoryService } from "@api/category";

const emit = defineEmits<{
    (event: "categoryChanged", value: number): void;
}>();

const categories = ref<SelectModel<number>[]>([]);

const getCategories = async () => {
    const res = await categoryService().getCategories();
    if (!res?.length) return;

    categories.value = res
        .map(
            (item, index) =>
                <SelectModel<number>>{
                    text: item.categoryName,
                    value: item.categoryValue,
                    selected: index === 0,
                }
        )
        .sort((a, b: SelectModel<number>) =>
            a.text.toLocaleLowerCase("tr-TR").localeCompare(b.text.toLocaleLowerCase("tr-TR"), "tr")
        );
};

onMounted(async () => {
    await getCategories();
});

const onCategoryChanged = (model: SelectModel<number>) => {
    if (!model.value) return;

    categories.value.forEach((item) => {
        item.selected = model.value === item.value;
    });
    categoryChanged(model.value);
};
const categoryChanged = (value: number) => emit("categoryChanged", value);
</script>

<template>
    <div v-for="item in categories">
        <div
            class="cursor-pointer p-2"
            :class="
                item.selected
                    ? 'text-black dark:text-white'
                    : 'text-slate-400 hover:text-slate-700 hover:dark:text-slate-300'
            "
            @click="onCategoryChanged(item)"
        >
            {{ item.text }}
        </div>
    </div>
</template>
