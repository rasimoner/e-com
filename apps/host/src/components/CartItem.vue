<script lang="ts" setup>
import IconClose from "@components/icons/IconClose.vue";
import { ref, watch } from "vue";
import { CartItemModel } from "@interfaces/cart-item";
import { EnumProductCategory } from "@interfaces/product";

const props = defineProps<{
    cartItem: CartItemModel;
}>();
const emit = defineEmits<{
    (event: "remove", value: CartItemModel): void;
    (event: "itemChanged", value: CartItemModel): void;
}>();

const localCartItem = ref<CartItemModel>({
    count: 0,
    total: 0,
    name: "",
    picture: "",
    price: 0,
    categoryId: EnumProductCategory.Other,
});
const onCountChanged = () => {
    localCartItem.value.total = localCartItem.value.price * localCartItem.value.count;
    itemChanged();
};

watch(
    () => props.cartItem,
    () => {
        localCartItem.value = props.cartItem;
    },
    { immediate: true, deep: true },
);
const remove = () => emit("remove", localCartItem.value);
const itemChanged = () => emit("itemChanged", localCartItem.value);
</script>

<template>
    <div class="w-full justify-start items-center gap-2 inline-flex py-2">
        <img alt="80*96" class="w-20 h-24 relative" src="https://via.placeholder.com/80x96" />
        <div class="w-full self-stretch justify-between items-start flex">
            <div class="w-full flex-col justify-center items-start gap-2 inline-flex">
                <div class="w-full text-black dark:text-white text-base font-bold font-['Inter']">
                    {{ localCartItem.name }}
                </div>
                <div
                    class="text-neutral-600 dark:text-neutral-300 text-xs font-normal font-['Inter']"
                >
                    Color: {{ localCartItem.color ?? "" }}
                </div>
                <InputNumber
                    v-model="localCartItem.count"
                    :min="1"
                    button-layout="horizontal"
                    input-class="w-full"
                    placeholder="Adet"
                    show-buttons
                    @input="onCountChanged"
                >
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
            </div>
            <div class="flex-col gap-2 inline-flex items-end">
                <div class="font-semibold">${{ localCartItem.price }}</div>
                <Button
                    class="border-none"
                    outlined
                    rounded
                    severity="secondary"
                    size="small"
                    type="button"
                    @click="remove"
                >
                    <template #icon>
                        <IconClose />
                    </template>
                </Button>
            </div>
        </div>
    </div>
</template>
