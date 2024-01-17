<script lang="ts" setup>
import { ref } from "vue";
import { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete";
import { useToast } from "primevue/usetoast";
import SignInModal from "@/components/SignInModal.vue";

const value = ref("");
const date = ref("");
const isSignInModalVisible = ref(false);
const items = ref<string[]>([]);

const toast = useToast();

const onDateChanged = () => {
    if (!date.value) return;

    toast.add({
        severity: "success",
        text: `${date.value} tarihi seçildi.`,
        life: 1000,
    });
};

const itemSelected = (event: AutoCompleteItemSelectEvent) => {
    toast.add({
        severity: "success",
        text: `${event.value} seçildi.`,
        life: 1000,
    });
};

const search = (event: AutoCompleteCompleteEvent) => {
    items.value = [...Array(10).keys()].map((item) => event.query + "-" + item);
};

const toggleSignInModal = (value: boolean) => {
    isSignInModalVisible.value = value;
};
</script>

<template>
    <div class="card flex">
        <div class="pt-4 flex flex-col">
            <FormKit
                help="Enter mail address"
                label="email"
                prefix-icon="email"
                type="email"
                validation="required|email"
            />
            <AutoComplete
                v-model="value"
                :suggestions="items"
                placeholder="Ara..."
                @complete="search"
                @item-select="itemSelected"
            />
            <calendar
                v-model="date"
                class="my-2"
                placeholder="Tarih Seçimi"
                @date-select="onDateChanged"
            />
            <Button icon="pi pi-check" label="Check" @click="toggleSignInModal(true)" />
            <Toast position="bottom-center">
                <template #container="{ message, closeCallback }">
                    <div class="flex items-center justify-between gap-8">
                        <span>{{ message.text }}</span>
                        <button
                            class="rounded-lg text-primary-400 hover:bg-primary-500/20 dark:text-surface-700 dark:hover:bg-surface-200"
                            type="button"
                            @click="closeCallback"
                        >
                            {{ message.action }}
                        </button>
                    </div>
                </template>
            </Toast>
            <SignInModal
                v-if="isSignInModalVisible"
                v-model:value="isSignInModalVisible"
                @input="toggleSignInModal(false)"
            />
        </div>
    </div>
</template>
