<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { router } from "@router/index";
import IconSearch from "./icons/IconSearch.vue";
import IconUser from "@components/icons/IconUser.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import IconEcom from "./icons/IconEcom.vue";
import SignInModal from "@components/SignInModal.vue";
import IconSocialFacebook from "@components/icons/IconSocialFacebook.vue";
import IconSocialInstagram from "@components/icons/IconSocialInstagram.vue";
import IconSocialYoutube from "@components/icons/IconSocialYoutube.vue";
import IconShoppingBag from "@components/icons/IconShoppingBag.vue";
import IconHeart from "@components/icons/IconHeart.vue";
import IconMenu from "@components/icons/IconMenu.vue";
import IconClose from "@components/icons/IconClose.vue";
import { userModule } from "@store/user-module";
import { useToast } from "primevue/usetoast";
import { ToastMessageOptions } from "primevue/toast";
import CartSidebar from "@components/CartSidebar.vue";
import { SelectModel } from "@e-com/common";
import { User } from "firebase/auth";

const toast = useToast();
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
        disabled: true,
    },
    {
        text: "Contact Us",
        value: "contact",
        selected: false,
    },
]);
const searchTerm = ref("");
const isNavbarCollapsed = ref(true);
const isSignInModalVisible = ref(false);
const isWishListModalVisible = ref(false);
const isCartModalVisible = ref(false);

const willPush = (page: string): boolean => router.currentRoute.value.name !== page;
const setIsNavbarCollapsed = () => (isNavbarCollapsed.value = true);
const pageChanged = (page: string) => {
    if (willPush(page)) router.push({ name: page });

    setIsNavbarCollapsed();
};
const showToast = (options: ToastMessageOptions) => toast.add(options);

const toggleWishListModal = (value: boolean) => (isWishListModalVisible.value = value);
const toggleCartModal = (value: boolean) => {
    isCartModalVisible.value = value;
    isNavbarCollapsed.value = true;
};
const openInstagram = () => {};
const openFacebook = () => {};
const openYoutube = () => {};

const toggleSignInModal = (value: boolean) => {
    isSignInModalVisible.value = value;
    if (value) setIsNavbarCollapsed();
};
const setCurrentPageIsActive = () => {
    pageList.value?.forEach(
        (page: SelectModel) =>
            (page.selected = page.value?.toString() === router.currentRoute.value.name)
    );
};
const toggleNavbar = () => (isNavbarCollapsed.value = !isNavbarCollapsed.value);
const handleOutsideClick = (event: MouseEvent) => {
    if (isNavbarCollapsed.value) return;

    const hasNavbar = (event.target as HTMLElement).closest(".navigation-bar");
    if (!hasNavbar) setIsNavbarCollapsed();
};
onMounted(() => window.addEventListener("click", handleOutsideClick));
const currentUser = computed((): User | null => userModule().currentUser);

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
                <IconMenu
                    v-if="isNavbarCollapsed"
                    class="cursor-pointer"
                    @click.stop="toggleNavbar()"
                />
                <IconClose v-else class="cursor-pointer" @click.stop="toggleNavbar()" />
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
                :class="{
                    'border-black': page.selected,
                    'border-slate-400': !page.selected,
                    'hover:text-slate-700 hover:dark:text-slate-300': !page.disabled,
                }"
                class="justify-start items-center gap-0.5 my-6 flex"
            >
                <button
                    :class="page.selected ? 'text-black dark:text-white' : 'text-slate-400'"
                    :disabled="page.disabled"
                    class="text-base font-normal font-['Inter'] leading-normal"
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
                    @click="toggleCartModal(true)"
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
                    @click="toggleWishListModal(true)"
                >
                    <div
                        class="md:hidden flex-1 text-slate-400 text-base font-normal font-['Inter'] leading-normal"
                    >
                        Wish List
                    </div>
                    <div class="md:w-6 md:h-6 relative flex-col justify-start items-start flex">
                        <IconHeart class="dark:text-white text-black" />
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
                <div
                    class="md:h-6 relative flex-1 md:my-2"
                    title="Sign Up"
                    @click="toggleSignInModal(true)"
                >
                    <div
                        class="dark:text-white text-black hover:opacity-50 hover:cursor-pointer md:flex hidden"
                    >
                        <IconUser title="Sign Up" @click="toggleSignInModal(true)" />
                        <span>{{ currentUser?.displayName }}</span>
                    </div>
                    <div class="md:hidden flex align-items-center gap-2">
                        <Button
                            class="p-3 w-full text-primary-50 dark:text-white border border-surface-200 dark:border-surface-600 mb-3"
                            label="Sign Up"
                        />
                    </div>
                </div>
                <div class="md:hidden flex gap-5 pb-3">
                    <IconSocialInstagram
                        class="cursor-pointer hover:opacity-50"
                        @click="openInstagram()"
                    />
                    <IconSocialFacebook
                        class="cursor-pointer hover:opacity-50"
                        @click="openFacebook()"
                    />
                    <IconSocialYoutube
                        class="cursor-pointer hover:opacity-50"
                        @click="openYoutube()"
                    />
                </div>
            </div>

            <SignInModal
                v-if="isSignInModalVisible"
                v-model:value="isSignInModalVisible"
                @input="toggleSignInModal(false)"
                @onShowToast="showToast"
            />
            <CartSidebar
                v-if="isCartModalVisible"
                v-model:value="isCartModalVisible"
                @input="toggleCartModal(false)"
            />
            <Toast />
        </div>
    </div>
</template>
