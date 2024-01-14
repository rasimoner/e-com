<script lang="ts" setup>
import { ref } from "vue";
import { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete";
import { useToast } from "primevue/usetoast";

const value = ref("");
const date = ref("");
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
</script>

<template>
    <div class="card flex justify-center">
        <h1 class="text-3xl font-bold underline">
            <FormKit
                help="Enter mail address"
                label="email"
                prefix-icon="email"
                type="email"
                validation="required|email"
            />
        </h1>
        <div class="pt-4">
            <Button class="mx-2" icon="pi pi-check" label="Check" />
            <AutoComplete
                v-model="value"
                :suggestions="items"
                class="mx-2"
                placeholder="Ara..."
                @complete="search"
                @item-select="itemSelected"
            />
            <calendar
                v-model="date"
                class="mx-2"
                placeholder="Tarih Seçimi"
                @date-select="onDateChanged"
            />
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
        </div>
    </div>
</template>
