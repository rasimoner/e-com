<script setup lang="ts">
import UiBreadcrumb from "@components/custom/UiBreadcrumb.vue";
import UiPageLayout from "@components/custom/UiPageLayout.vue";
import CategoryList from "@components/CategoryList.vue";
import CategoryListView from "@components/CategoryListView.vue";
import { ref } from "vue";

const categoryId = ref(0);

const onCategoryChanged = (value: number) => (categoryId.value = value);
</script>

<template>
    <ui-page-layout>
        <template #header>
            <UiBreadcrumb />
        </template>
        <template #left>
            <CategoryList
                class="hidden md:flex md:flex-col pt-10"
                @category-changed="onCategoryChanged"
            />
        </template>
        <CategoryListView :category-id="categoryId" class="flex-1">
            <template #filter-button>
                <CategoryList class="flex md:hidden" @category-changed="onCategoryChanged" />
            </template>
        </CategoryListView>
    </ui-page-layout>
</template>
