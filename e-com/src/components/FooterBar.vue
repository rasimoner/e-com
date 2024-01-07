<script lang="ts" setup>
import { SelectModel } from "../types";
import { ref } from "vue";
import IconEcom from "./icons/IconEcom.vue";
import IconSocialOutlineInstagram from "./icons/IconSocialOutlineİnstagram.vue";
import IconSocialOutlineYoutube from "./icons/IconSocialOutlineYoutube.vue";
import IconSocialOutlineFacebook from "./icons/IconSocialOutlineFacebook.vue";

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
    {
        text: "Blog",
        value: "Blog",
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
        class="w-full h-72 px-16 pt-20 pb-8 flex-col justify-start items-start gap-10 inline-flex bottom-0 left-0"
    >
        <div class="w-full justify-center items-center inline-flex">
            <div class="grow shrink basis-0 self-stretch justify-between items-center inline-flex">
                <div>
                    <IconEcom class="text-black dark:text-white" />
                </div>
                <div class="h-6 justify-start items-center gap-8 flex">
                    <div class="w-px h-6 bg-slate-600" />
                    <div
                        class="w-full text-black dark:text-white text-base font-normal font-['Inter'] leading-normal"
                    >
                        Design furniture Store
                    </div>
                </div>
                <div class="justify-start items-start gap-10 flex">
                    <div v-for="page in pageList" class="justify-start items-center gap-0.5 flex">
                        <div class="border-gray-200 justify-start items-center gap-0.5 flex">
                            <div class="justify-start items-center gap-1 flex">
                                <button
                                    :class="
                                        page.selected
                                            ? 'text-black dark:text-white'
                                            : 'text-slate-400'
                                    "
                                    class="text-base font-normal font-['Inter'] leading-normal"
                                    type="button"
                                    @click="pageChanged(page)"
                                >
                                    {{ page.text }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full py-4 border-t border-slate-600 justify-between items-start inline-flex">
            <div class="justify-start items-start gap-7 flex">
                <div class="text-slate-400 text-[13px] font-normal font-['Inter']">
                    Copyright © 2023 Iconic. All rights reserved
                </div>
                <div class="text-slate-400 text-[13px] font-normal font-['Inter']">
                    Privacy Policy
                </div>
                <div class="text-slate-400 text-[13px] font-normal font-['Inter']">
                    Terms of Use
                </div>
            </div>
            <div class="justify-start items-start gap-6 flex">
                <div class="w-6 h-6 relative">
                    <icon-social-outline-instagram />
                </div>
                <div class="w-6 h-6 relative">
                    <icon-social-outline-youtube />
                </div>
                <div class="w-6 h-6 relative">
                    <icon-social-outline-facebook />
                </div>
            </div>
        </div>
    </div>
</template>
