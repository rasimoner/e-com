<script lang="ts" setup>
import { ref } from "vue";

const email = ref("");
const signUp = () => alert("Need to add a new newsletter page");
</script>

<template>
    <div class="card w-full flex max-h-72 items-end justify-end">
        <img alt="lamb" class="min-w-[10em] md:block hidden" src="../assets/images/lamb.png" />
        <div class="flex-col justify-center items-center gap-8 inline-flex w-full">
            <div class="flex-col justify-start items-center gap-2 flex">
                <div
                    class="w-96 text-center text-black dark:text-slate-300 text-3xl font-medium font-['Poppins'] uppercase"
                >
                    Join Our Newsletter
                </div>
                <div
                    class="w-96 text-center text-black dark:text-slate-700 text-xl font-normal font-['Inter']"
                >
                    Sign up for deals, new products and promotions!
                </div>
            </div>
            <div class="w-96 flex-col justify-center items-start gap-2 flex">
                <div class="self-stretch justify-start items-start gap-2 inline-flex">
                    <FormKit
                        #default="{ state: { valid } }"
                        :actions="false"
                        type="form"
                        @submit="signUp"
                    >
                        <div class="self-stretch justify-start items-start gap-2 inline-flex">
                            <FormKit
                                v-model="email"
                                placeholder="Email"
                                type="email"
                                validation="required|email|ends_with:.com"
                            />
                            <Button
                                :disabled="!valid"
                                label="Sign up"
                                type="submit"
                                @submit="signUp"
                            />
                        </div>
                    </FormKit>
                </div>
            </div>
        </div>
        <img
            alt="tv-unit"
            class="min-w-[10em] md:block hidden"
            src="../assets/images/tv-unit.png"
        />
    </div>
</template>
