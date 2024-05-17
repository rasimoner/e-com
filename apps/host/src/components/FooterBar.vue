<script lang="ts" setup>
import { ref, watch } from "vue";
import IconEcom from "./icons/IconEcom.vue";
import IconSocialInstagram from "@components/icons/IconSocialInstagram.vue";
import IconSocialYoutube from "@components/icons/IconSocialYoutube.vue";
import IconSocialFacebook from "@components/icons/IconSocialFacebook.vue";
import { router } from "@router/index";
import { SelectModel } from "@e-com/common";

const pageList = ref<SelectModel[]>([
    {
        text: "Home",
        value: "home",
        selected: false,
    },
    {
        text: "Shop",
        value: "shop",
        selected: false,
    },
    {
        text: "Product",
        value: "product",
        selected: false,
    },
    {
        text: "Contact Us",
        value: "contact",
        selected: false,
    },
]);
const willPush = (page: string): boolean => router.currentRoute.value.name !== page;
const pageChanged = (page: string) => {
    if (willPush(page)) router.push({ name: page });
};
const setCurrentPageIsActive = () => {
    pageList.value?.forEach(
        (page: SelectModel) =>
            (page.selected = page.value?.toString() === router.currentRoute.value.name)
    );
};
watch(
    () => router.currentRoute.value,
    () => {
        setCurrentPageIsActive();
    },
    { immediate: true }
);
</script>

<template>
    <div
        class="w-full pt-20 pb-8 flex-col justify-end items-start gap-10 inline-flex bottom-0 left-0 card"
    >
        <div class="w-full justify-center items-center">
            <div class="justify-between items-center md:flex gap-5">
                <div class="grow shrink basis-0 items-center inline-flex">
                    <div>
                        <IconEcom
                            class="text-black dark:text-white hover:text-slate-700 hover:dark:text-slate-300 cursor-pointer"
                            @click="pageChanged('home')"
                        />
                    </div>
                    <div class="h-6 justify-start items-center gap-8 flex">
                        <div class="w-px h-6 bg-slate-600" />
                        <div
                            class="w-full text-black dark:text-white text-base font-normal font-['Inter'] leading-normal"
                        >
                            Design furniture Store
                        </div>
                    </div>
                </div>

                <ul
                    class="md:flex md:items-center md:justify-center md:gap-10 md:px-0 px-3 md:pb-0 pb-10 md:static md:w-auto w-full flex-1"
                >
                    <li
                        v-for="page in pageList"
                        :class="page.selected ? 'border-black' : 'border-slate-400'"
                        class="justify-start items-center gap-0.5 my-6 flex"
                    >
                        <button
                            :class="page.selected ? 'text-black dark:text-white' : 'text-slate-400'"
                            class="text-base font-normal font-['Inter'] leading-normal hover:text-slate-700 hover:dark:text-slate-300"
                            type="button"
                            @click="pageChanged(`${page.value}`)"
                        >
                            {{ page.text }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div
            class="w-full py-4 border-t border-slate-600 justify-between items-start flex md:flex-row flex-col"
        >
            <div class="justify-start items-start gap-7 flex md:flex-row flex-col">
                <div class="text-slate-400 text-[13px] font-normal font-['Inter']">
                    Copyright © 2024 e-com. All rights reserved
                </div>
                <div class="text-slate-400 text-[13px] font-normal font-['Inter']">
                    Privacy Policy
                </div>
                <div class="text-slate-400 text-[13px] font-normal font-['Inter']">
                    Terms of Use
                </div>
            </div>
            <div class="justify-start items-start gap-6 flex md:p-0 pt-3">
                <div class="w-6 h-6 relative">
                    <IconSocialInstagram
                        class="text-black dark:text-white hover:text-slate-700 hover:dark:text-slate-300 cursor-pointer"
                        @click="pageChanged('home')"
                    />
                </div>
                <div class="w-6 h-6 relative">
                    <IconSocialYoutube
                        class="text-black dark:text-white hover:text-slate-700 hover:dark:text-slate-300 cursor-pointer"
                        @click="pageChanged('home')"
                    />
                </div>
                <div class="w-6 h-6 relative">
                    <IconSocialFacebook
                        class="text-black dark:text-white hover:text-slate-700 hover:dark:text-slate-300 cursor-pointer"
                        @click="pageChanged('home')"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
