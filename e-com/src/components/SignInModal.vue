<script lang="ts" setup>
import { ref } from "vue";
import { router } from "@/router";

const props = defineProps<{
    value: boolean;
}>();
const emit = defineEmits<{
    (event: "input", value: boolean): void;
}>();
const input = (value: boolean) => emit("input", value);

const userName = ref("");
const password = ref("");

const willPush = (page: string): boolean => router.currentRoute.value.name !== page;
const pageChanged = (page: string) => {
    if (willPush(page)) router.push({ name: page });

    input(false);
};
</script>

<template>
    <Dialog
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :pt="{
            mask: {
                style: 'backdrop-filter: blur(5px)',
            },
        }"
        :style="{ width: '50rem' }"
        :visible="value"
        class="rounded-2xl"
        dismissable-mask
        modal
        @update:visible="input"
    >
        <template #container="{ closeCallback }">
            <div class="flex flex-col sm:flex-row" style="background: var(--body-bg)">
                <div class="items-center justify-center flex flex-1 sm:order-1 order-2 my-10">
                    <FormKit type="form">
                        <div class="text-black dark:text-white text-4xl font-medium mb-3">
                            Log in
                        </div>
                        <div class="pb-3">
                            <span class="text-black dark:text-white text-base leading-relaxed"
                                >Don’t have an accout yet?
                            </span>
                            <a
                                class="text-emerald-400 text-base font-semibold leading-relaxed hover:cursor-pointer"
                                @click="pageChanged('signUp')"
                                >Sign Up</a
                            >
                        </div>
                        <FormKit
                            v-model="userName"
                            class="w-full"
                            label="UserName"
                            placeholder="UserName"
                        />
                        <FormKit
                            v-model="password"
                            class="w-full"
                            label="Password"
                            placeholder="Password"
                            type="password"
                            validation="required"
                        />

                        <template #actions>
                            <div class="flex align-items-center gap-2">
                                <Button
                                    class="p-3 w-full text-primary-50 dark:text-white border border-surface-200 dark:border-surface-600"
                                    label="Sign-In"
                                    type="submit"
                                    @submit="input(false)"
                                />
                                <Button
                                    class="p-3 w-full text-primary-50 dark:text-white border border-surface-200 dark:border-surface-600"
                                    label="Cancel"
                                    text
                                    @click="input(false)"
                                />
                            </div>
                        </template>
                    </FormKit>
                </div>

                <div class="flex-1 max-h-96 sm:order-2 order-1 overflow-hidden">
                    <img
                        alt="login"
                        class="sm:w-full w-full h-full object-fill sm:max-h-full md:max-h-full"
                        src="../assets/images/login.png"
                    />
                </div>
            </div>
        </template>
    </Dialog>
</template>
