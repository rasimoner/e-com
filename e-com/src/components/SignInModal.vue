<script lang="ts" setup>
import { computed, ref } from "vue";
import { EnumToastSeverity, UserModel } from "@/types";
import { authService } from "@/api/firebase/auth-service";
import { userModule } from "@/store";
import { User } from "firebase/auth";
import { ToastMessageOptions } from "primevue/toast";

defineProps<{
    value: boolean;
}>();
const emit = defineEmits<{
    (event: "input", value: boolean): void;
    (event: "onShowToast", value: ToastMessageOptions): void;
}>();

const input = (value: boolean) => emit("input", value);
const onShowToast = (value: ToastMessageOptions) => emit("onShowToast", value);

const userModel = ref<UserModel>({
    userName: "",
    email: "",
    password: "",
});
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
const redirectToPrivacyPolicy = () => {};
const redirectToTermsOfUse = () => {};
const userAction = async () => (hasAccount.value ? getUser() : createUser());

const setCurrentUser = (user: User) => userModule().setCurrentUser(user);
const createUser = async () => {
    const res = await authService.createUser(userModel.value);
    if (!res?.user) return;

    setCurrentUser(res.user);
    onShowToast({
        severity: EnumToastSeverity.Success,
        summary: "İşlem Başarılı",
        detail: "Kullanıcı Oluşturuldu",
        life: 3000,
    });
    input(false);
};

const getUser = async () => {
    const res = await authService.signIn(userModel.value);
    if (!res) return;

    setCurrentUser(res.user);
    onShowToast({
        severity: EnumToastSeverity.Success,
        summary: "İşlem Başarılı",
        detail: "Giriş Yapıldı",
        life: 3000,
    });

    input(false);
};

const title = computed(() => (hasAccount.value ? "Login" : "Sing Up"));
const hintButton = computed(() => (!hasAccount.value ? "Login" : "Sing Up"));
const hint = computed(() =>
    hasAccount.value ? "Don’t have an account yet" : "Already have an account?",
);

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
            <div
                class="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
                style="background: var(--body-bg)"
            >
                <div class="items-center justify-center px-8 flex flex-1 md:order-1 order-2 my-5">
                    <FormKit :actions="false" type="form" @submit="userAction">
                        <div
                            class="text-black dark:text-white text-4xl font-medium mb-3 flex justify-center"
                        >
                            {{ title }}
                        </div>
                        <div class="pb-3 flex justify-center">
                            <span class="text-black dark:text-white text-base leading-relaxed">
                                {{ hint }}
                            </span>
                            <a
                                class="text-emerald-400 text-base font-semibold leading-relaxed hover:cursor-pointer pt-0"
                                @click="toggleHasAccount"
                            >
                                {{ hintButton }}
                            </a>
                        </div>
                        <FormKit
                            v-if="!hasAccount"
                            v-model="userModel.userName"
                            class="w-full"
                            label="Username"
                            placeholder="Username"
                        />
                        <FormKit
                            v-model="userModel.email"
                            class="w-full"
                            label="Email"
                            placeholder="test@gmail.com"
                            type="email"
                            validation="required|email|ends_with:.com"
                        />
                        <FormKit
                            v-model="userModel.password"
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
                                            ><strong @click.prevent="redirectToPrivacyPolicy"
                                                >Privacy Policy</strong
                                            ></a
                                        >
                                        and
                                        <a
                                            class="cursor-pointer"
                                            @click.prevent="redirectToTermsOfUse"
                                            ><b>Terms of Use</b></a
                                        >
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
                                    @submit="userAction"
                                />
                            </div>
                        </template>
                    </FormKit>
                </div>
                <div class="items-center justify-center flex md:order-2 order-1 md:mt-0 mt-8">
                    <img
                        alt="login"
                        class="max-w-[15em] md:max-w-md md:order-2 order-1"
                        src="../assets/images/login.png"
                    />
                </div>
            </div>
        </template>
    </Dialog>
</template>
