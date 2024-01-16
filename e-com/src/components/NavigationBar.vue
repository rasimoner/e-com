<script lang="ts" setup>
import IconSearch from "./icons/IconSearch.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconElementsNavigationIcShoppingBag from "./icons/IconElementsNavigationIcShoppingBag.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import { onMounted, ref, watch } from "vue";
import { SelectModel } from "../types";
import IconEcom from "./icons/IconEcom.vue";
import { router } from "../router";
import SignInModal from "@/components/SignInModal.vue";

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
    {
        text: "Sign Up",
        value: "signUp",
        selected: false,
    },
]);
const signInModalVisible = ref(false);
const isNavbarCollapsed = ref(true);
const willPush = (page: string): boolean => router.currentRoute.value.name !== page;
const setIsNavbarCollapsed = () => (isNavbarCollapsed.value = true);
const pageChanged = (page: string) => {
    if (willPush(page))
        router.push({
            name: page,
        });

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
    const hasNavbar = (event.target as HTMLElement).closest(".navigation-bar");

    if (!isNavbarCollapsed.value && !hasNavbar) setIsNavbarCollapsed();
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
        :class="[isNavbarCollapsed ? 'w-full' : 'h-full']"
        class="navigation-bar w-auto md:w-full md:h-auto justify-between md:items-center fixed top-0 left-0 z-[2] md:px-0 px-6 bg-white dark:bg-gray-800 shadow flex md:flex-row flex-col"
        @click="handleOutsideClick"
    >
        <span
            class="absolute md:hidden right-6 top-1 cursor-pointer text-4xl"
            @click="toggleNavbar()"
        >
            <i :class="[isNavbarCollapsed ? 'pi pi-bars' : 'pi pi-bars']"></i>
        </span>
        <div class="m-2">
            <icon-ecom
                class="dark:text-white text-black cursor-pointer hover:text-slate-700 hover:dark:text-slate-300"
                @click="pageChanged('home')"
            />
        </div>
        <ul
            :class="{ hidden: isNavbarCollapsed }"
            class="md:flex md:items-center md:justify-center md:gap-10 md:px-0 px-10 md:pb-0 pb-10 md:static md:w-auto w-full flex-1 duration-700 ease-in"
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
            class="justify-end items-center gap-4 flex md:flex md:static"
        >
            <div class="w-6 h-6 relative">
                <icon-search class="dark:text-white text-black" />
            </div>
            <div class="w-6 h-6 relative" title="SignUp">
                <icon-user
                    class="dark:text-white text-black hover:opacity-50 hover:cursor-pointer"
                    title="SignUp"
                    @click="toggleSignInModal(true)"
                />
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
            <SignInModal
                v-if="signInModalVisible"
                v-model:value="signInModalVisible"
                @input="toggleSignInModal(false)"
            />
        </div>
    </div>
</template>
