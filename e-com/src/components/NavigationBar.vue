<script lang="ts" setup>
import IconSearch from "./icons/IconSearch.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconElementsNavigationIcShoppingBag from "./icons/IconElementsNavigationIcShoppingBag.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import { ref } from "vue";
import { SelectModel } from "../types";
import IconEcom from "./icons/IconEcom.vue";

const pageList = ref<SelectModel[]>([
    {
        text: "Home",
        value: "Home",
        selected: false,
    },
    {
        text: "Shop",
        value: "Shop",
        selected: false,
    },
    {
        text: "Product",
        value: "Product",
        selected: false,
    },
    {
        text: "Contact Us",
        value: "Contact",
        selected: false,
    },
]);
const pageChanged = (page: SelectModel) => {
    pageList.value.forEach((p) => (p.selected = false));
    page.selected = true;
};
</script>

<template>
    <div
        class="w-full justify-between items-center inline-flex fixed top-0 left-0 z-[2] bg-white dark:bg-gray-800 shadow"
    >
        <div>
            <icon-ecom class="dark:text-white text-black" />
        </div>
        <div class="justify-center items-center gap-10 flex">
            <div v-for="page in pageList" class="justify-start items-center gap-0.5 flex">
                <div
                    :class="page.selected ? 'border-black' : 'border-slate-400'"
                    class="justify-start items-center gap-0.5 flex"
                >
                    <button
                        :class="page.selected ? 'text-black dark:text-white' : 'text-slate-400'"
                        class="text-base font-normal font-['Inter'] leading-normal"
                        type="button"
                        @click="pageChanged(page)"
                    >
                        {{ page.text }}
                    </button>
                </div>
            </div>
        </div>
        <div class="justify-end items-center gap-4 flex">
            <div class="w-6 h-6 relative">
                <icon-search class="dark:text-white text-black" />
            </div>
            <div class="w-6 h-6 relative">
                <icon-user class="dark:text-white text-black" />
            </div>
            <div class="w-[50px] h-7 pl-px py-0.5 justify-center items-center gap-[5px] flex">
                <div class="w-6 h-6 relative flex-col justify-start items-start flex">
                    <icon-elements-navigation-ic-shopping-bag class="dark:text-white text-black" />
                </div>
                <div class="w-5 h-5 relative flex-col justify-start items-start flex">
                    <div class="w-5 h-5 bg-black rounded-full"></div>
                    <div
                        class="text-center text-black text-[13px] font-normal font-['Inter'] dark:text-white"
                    >
                        2
                    </div>
                </div>
            </div>
            <ThemeSwitcher />
        </div>
    </div>
</template>
