<script lang="ts" setup>
import IconSearch from "./icons/IconSearch.vue";
import IconUser from "@/components/icons/IconUser.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import { onMounted, ref, watch } from "vue";
import { SelectModel } from "../types";
import IconEcom from "./icons/IconEcom.vue";
import { router } from "../router";
import SignInModal from "@/components/SignInModal.vue";
import IconSocialOutlineFacebook from "@/components/icons/IconSocialOutlineFacebook.vue";
import IconSocialOutlineInstagram from "@/components/icons/IconSocialOutlineİnstagram.vue";
import IconSocialOutlineYoutube from "@/components/icons/IconSocialOutlineYoutube.vue";
import IconShoppingBag from "@/components/icons/IconShoppingBag.vue";
import IconHeartLine from "@/components/icons/IconHeartLine.vue";
import IconMenuLineHorizontal from "@/components/icons/IconMenuLineHorizontal.vue";
import IconCloseLine from "@/components/icons/IconCloseLine.vue";

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
const signInModalVisible = ref(false);
const isNavbarCollapsed = ref(true);
const searchTerm = ref("");
const willPush = (page: string): boolean => router.currentRoute.value.name !== page;
const setIsNavbarCollapsed = () => (isNavbarCollapsed.value = true);
const pageChanged = (page: string) => {
    if (willPush(page)) router.push({ name: page });

    setIsNavbarCollapsed();
};

const toggleSignInModal = (value: boolean) => {
    signInModalVisible.value = value;
    if (value) setIsNavbarCollapsed();
};
const setCurrentPageIsActive = () => {
    pageList.value?.forEach(
        (page: SelectModel) =>
            (page.selected = page.value?.toString() === router.currentRoute.value.name),
    );
};
const toggleNavbar = () => (isNavbarCollapsed.value = !isNavbarCollapsed.value);
const handleOutsideClick = (event: MouseEvent) => {
    if (isNavbarCollapsed.value) return;

    const hasNavbar = (event.target as HTMLElement).closest(".navigation-bar");
    if (!hasNavbar) setIsNavbarCollapsed();
};
onMounted(() => window.addEventListener("click", handleOutsideClick));
watch(
    () => router.currentRoute.value,
    () => {
        setCurrentPageIsActive();
    },
    { immediate: true },
);
</script>

<template>
    <div
        :class="[
            isNavbarCollapsed
                ? 'w-full min-h-0 transition-max-h ease-in duration-700'
                : 'md:min-h-0 min-h-full transition-max-h ease-in duration-700',
        ]"
        class="navigation-bar min-w-[275px] md:w-full md:h-auto justify-between md:items-center fixed top-0 left-0 z-[2] md:px-0 px-2 bg-white dark:bg-gray-800 shadow flex md:flex-row flex-col"
        @click.stop="handleOutsideClick"
    >
        <div class="m-2 flex flex-row">
            <icon-ecom
                class="dark:text-white text-black cursor-pointer hover:text-slate-700 hover:dark:text-slate-300"
                @click="pageChanged('home')"
            />
            <ThemeSwitcher class="px-5 top-1" />
            <span class="absolute md:hidden right-4 pt-3">
                <IconMenuLineHorizontal
                    v-if="isNavbarCollapsed"
                    class="cursor-pointer"
                    @click.stop="toggleNavbar()"
                />
                <IconCloseLine v-else class="cursor-pointer" @click.stop="toggleNavbar()" />
            </span>
        </div>
        <div
            :class="{ hidden: isNavbarCollapsed }"
            class="md:hidden block text-black dark:text-white"
        >
            <FormKit v-model="searchTerm" placeholder="Search" type="search" />
        </div>
        <ul
            :class="{ hidden: isNavbarCollapsed }"
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
        <div
            :class="{ hidden: isNavbarCollapsed }"
            class="md:justify-end justify-center items-center gap-4 flex md:flex md:static"
        >
            <div class="w-6 h-6 relative md:block hidden">
                <icon-search class="dark:text-white text-black" />
            </div>
            <div class="md:flex md:flex-row flex-col flex-1 px-3">
                <div
                    class="md:w-[50px] md:h-7 md:pl-px md:py-0.5 md:justify-center justify-between items-center gap-[5px] flex flex-row my-2 border-b md:border-none border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-50"
                    @click="toggleSignInModal(true)"
                >
                    <div
                        class="md:hidden flex-1 text-slate-400 text-base font-normal font-['Inter'] leading-normal"
                    >
                        Cart
                    </div>
                    <div class="md:w-6 md:h-6 relative flex-col justify-start items-start flex">
                        <IconShoppingBag class="dark:text-white text-black" />
                    </div>
                    <div class="md:w-5 md:h-5 relative flex-col justify-start items-start flex">
                        <div class="md:w-5 md:h-5 md:bg-black rounded-full"></div>
                        <div
                            class="text-center text-black text-[13px] font-normal font-['Inter'] dark:text-white"
                        >
                            2
                        </div>
                    </div>
                </div>
                <div
                    class="md:hidden justify-between items-center gap-[5px] flex flex-row my-2 border-b border-slate-200 dark:border-slate-700 dark:text-white text-black hover:opacity-50 cursor-pointer"
                    @click="toggleSignInModal(true)"
                >
                    <div
                        class="md:hidden flex-1 text-slate-400 text-base font-normal font-['Inter'] leading-normal"
                    >
                        Wish List
                    </div>
                    <div class="md:w-6 md:h-6 relative flex-col justify-start items-start flex">
                        <IconHeartLine class="dark:text-white text-black" />
                    </div>
                    <div class="md:w-5 md:h-5 relative flex-col justify-start items-start flex">
                        <div class="md:w-5 md:h-5 md:bg-black rounded-full"></div>
                        <div
                            class="text-center text-black text-[13px] font-normal font-['Inter'] dark:text-white"
                        >
                            3
                        </div>
                    </div>
                </div>
                <div class="md:w-6 md:h-6 relative flex-1 md:my-2" title="SignUp">
                    <IconUser
                        class="dark:text-white text-black hover:opacity-50 hover:cursor-pointer md:flex hidden"
                        title="Sign Up"
                        @click="toggleSignInModal(true)"
                    />
                    <div class="md:hidden flex align-items-center gap-2">
                        <Button
                            class="p-3 w-full text-primary-50 dark:text-white border border-surface-200 dark:border-surface-600 mb-3"
                            label="Sign Up"
                            @click="toggleSignInModal(true)"
                        />
                    </div>
                </div>
                <div class="md:hidden flex gap-5 pb-3">
                    <IconSocialOutlineInstagram
                        class="cursor-pointer hover:opacity-50"
                        @click="toggleSignInModal(true)"
                    />
                    <IconSocialOutlineFacebook
                        class="cursor-pointer hover:opacity-50"
                        @click="toggleSignInModal(true)"
                    />
                    <IconSocialOutlineYoutube
                        class="cursor-pointer hover:opacity-50"
                        @click="toggleSignInModal(true)"
                    />
                </div>
            </div>

            <SignInModal
                v-if="signInModalVisible"
                v-model:value="signInModalVisible"
                @input="toggleSignInModal(false)"
            />
        </div>
    </div>
</template>
