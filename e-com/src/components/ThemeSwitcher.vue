<template>
    <div class="flex justify-end p-2">
        <ul class="flex list-none m-0 p-0 gap-2 items-center">
            <li class="relative">
                <button
                    class="inline-flex border-1 w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded"
                    type="button"
                    @click="onThemeToggler"
                >
                    <i :class="`dark:text-white pi ${iconClass}`" />
                </button>
            </li>
            <li class="relative">
                <Button
                    v-styleclass="{
                        selector: '@next',
                        enterClass: 'hidden',
                        enterActiveClass: 'scalein',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'fadeout',
                        hideOnOutsideClick: true,
                    }"
                    class="inline-flex border-1 w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded"
                    type="button"
                >
                    <i class="pi pi-palette dark:text-white"></i>
                </Button>
                <Configurator />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Configurator from "./Configurator.vue";

const iconClass = ref("pi-moon");

const onThemeToggler = () => {
    const root = document.getElementsByTagName("html")[0];

    root.classList.toggle("dark");
    iconClass.value = iconClass.value === "pi-moon" ? "pi-sun" : "pi-moon";
};
</script>
