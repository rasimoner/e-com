<script lang="ts" setup>
import { computed, ref } from "vue";

const props = defineProps<{
    value: boolean;
}>();
const emit = defineEmits<{
    (event: "input", value: boolean): void;
}>();
const input = (value: boolean) => emit("input", value);

const email = ref("");
const userName = ref("");
const password = ref("");
const hasAccount = ref(false);
const rememberMe = ref(false);
const agreeCondition = ref(false);
const passwordInputType = ref("password");
const passwordInputSuffixIcon = ref("eyeClosed");

const suffixIconClick = () => {
    passwordInputType.value = passwordInputType.value === "password" ? "text" : "password";
    passwordInputSuffixIcon.value =
        passwordInputSuffixIcon.value === "eyeClosed" ? "eye" : "eyeClosed";
};

const title = computed(() => {
    return hasAccount.value ? "Login" : "Sing Up";
});

const hint = computed(() => {
    return hasAccount.value ? "Don’t have an account yet" : "Already have an account?";
});

const toggleHasAccount = () => (hasAccount.value = !hasAccount.value);
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
        dismissable-mask
        modal
        @update:visible="input"
    >
        <template #container>
            <div class="flex flex-col sm:flex-row" style="background: var(--body-bg)">
                <div class="items-center justify-center px-8 flex flex-1 sm:order-1 order-2 my-5">
                    <FormKit type="form">
                        <div class="text-black dark:text-white text-4xl font-medium mb-3">
                            {{ title }}
                        </div>
                        <div class="pb-3">
                            <span class="text-black dark:text-white text-base leading-relaxed"
                                >{{ hint }}
                            </span>
                            <a
                                class="text-emerald-400 text-base font-semibold leading-relaxed hover:cursor-pointer"
                                @click="toggleHasAccount"
                                >{{ title }}</a
                            >
                        </div>
                        <FormKit
                            v-if="!hasAccount"
                            v-model="userName"
                            class="w-full"
                            label="Username"
                            placeholder="Username"
                        />
                        <FormKit
                            v-model="email"
                            class="w-full"
                            label="Email"
                            placeholder="vikas@gmail.com"
                            type="email"
                            validation="required|email|ends_with:.com"
                        />
                        <FormKit
                            v-model="password"
                            :suffix-icon="passwordInputSuffixIcon"
                            :type="passwordInputType"
                            class="w-full"
                            label="Password"
                            placeholder="Password"
                            suffix-icon-class="hover:text-blue-500 hover:dark:text-white"
                            validation="required"
                            @suffix-icon-click="suffixIconClick"
                        />
                        <div v-if="hasAccount" class="flex flex-raw">
                            <FormKit
                                v-model="rememberMe"
                                label="Remember me"
                                name="terms"
                                type="checkbox"
                            />
                            <div
                                class="text-sm font-semibold leading-relaxed hover:cursor-pointer mb-1 text-black dark:text-white"
                                @click="toggleHasAccount"
                            >
                                Forgot password?
                            </div>
                        </div>
                        <div v-else>
                            <FormKit
                                v-model="agreeCondition"
                                name="terms"
                                type="checkbox"
                                validation="accepted"
                            >
                                <template #label>
                                    <span class="pt-5">
                                        I agree with
                                        <a class="cursor-pointer"
                                            ><strong>Privacy Policy</strong></a
                                        >
                                        and
                                        <a class="cursor-pointer"><b>Terms of Use</b></a>
                                    </span>
                                </template>
                            </FormKit>
                        </div>

                        <template #actions>
                            <div class="flex align-items-center gap-2">
                                <Button
                                    :label="title"
                                    class="p-3 w-full text-primary-50 dark:text-white border border-surface-200 dark:border-surface-600"
                                    type="submit"
                                    @submit="input(false)"
                                />
                            </div>
                        </template>
                    </FormKit>
                </div>

                <div class="items-center justify-center flex sm:order-2 order-1 sm:mt-0 mt-10">
                    <img
                        alt="login"
                        class="max-w-[18.5em] sm:max-w-md sm:order-2 order-1"
                        src="../assets/images/login.png"
                    />
                </div>
            </div>
        </template>
    </Dialog>
</template>
