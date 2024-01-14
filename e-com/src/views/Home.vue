<script lang="ts" setup>
import { ref } from "vue";
import { AutoCompleteCompleteEvent } from "primevue/autocomplete";
import { useToast } from "primevue/usetoast";

const value = ref("");
const date = ref("");
const items = ref<string[]>([]);

const toast = useToast();
const visible = ref(false);

const show = () => {
    if (!visible.value) {
        toast.add({ summary: "All changes saved", severity: "success" });
        visible.value = true;
    }
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
        <div>
            <i class="pi pi-check text-green-500"></i>
            <i class="pi pi-times text-red-500"></i>
        </div>
        <div>
            <menubar />
            <Button icon="pi pi-check" label="Check" />
            <AutoComplete v-model="value" :suggestions="items" @complete="search" />
            <calendar v-model="date" />
            <Toast position="bottom-center" @close="visible = false">
                <template #container="{ message, closeCallback }">
                    <div class="flex items-center justify-between gap-8">
                        <span>{{ message.text }}</span>
                        <button
                            class="px-4 py-2 rounded-lg text-primary-400 hover:bg-primary-500/20 dark:text-surface-700 dark:hover:bg-surface-200"
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
