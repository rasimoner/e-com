<script lang="ts" setup>
import IconClose from "@components/icons/IconClose.vue";
import CartItem from "@components/CartItem.vue";
import { computed, onMounted, ref } from "vue";
import { CartItemModel } from "@interfaces/cart-item";
import { productService } from "@api/product";

defineProps<{
    value: boolean;
}>();
const emit = defineEmits<{
    (event: "input", value: boolean): void;
}>();

const items = ref<CartItemModel[]>([]);

const goToCartPage = () => {};
const removeItem = (value: CartItemModel) => {
    items.value = items.value.filter((cart) => cart !== value);
};

const getData = async () => {
    const res = await productService().getProducts();
    // TODO
    // color alanının set edilmesi incelenecek.
    items.value =
        res?.map(
            (x, i) =>
                <CartItemModel>{
                    ...x,
                    total: 0,
                    count: 0,
                    // color: x.colors?.[i] ?? x.colors?.[0] ?? "",
                }
        ) ?? [];
};
onMounted(async () => {
    await getData();
});

const onItemChanged = (value: CartItemModel) => {
    items.value.forEach((item) => {
        if (item.name === value.name) item = value;

        return item;
    });
};

const total = computed(() => {
    let result = 0;
    items.value?.forEach((x) => (result += x.total));
    return result;
});

const input = (value: boolean) => emit("input", value);
</script>

<template>
    <Sidebar :visible="value" block-scroll position="right" @update:visible="input">
        <template #container="{ closeCallback }">
            <div class="flex flex-col">
                <div class="flex align-middle justify-between px-4 pt-3 flex-shrink-0 w-full">
                    <span class="font-semibold text-2xl text-primary flex-1">Cart</span>
                    <Button
                        class="h-fit border-none"
                        outlined
                        raised
                        rounded
                        type="button"
                        @click="closeCallback"
                    >
                        <template #icon>
                            <IconClose />
                        </template>
                    </Button>
                </div>
            </div>
            <div class="overflow-y-auto">
                <ul class="list-none p-3 m-0">
                    <li v-for="item in items">
                        <CartItem
                            :cart-item="item"
                            class="border-b"
                            @remove="removeItem"
                            @item-changed="onItemChanged"
                        />
                    </li>
                </ul>
            </div>
            <div class="mt-auto">
                <div class="flex flex-col mx-3">
                    <div class="flex justify-between">
                        <div class="font-normal">Subtotal</div>
                        <div class="font-bold">{{ total }} TL</div>
                    </div>
                    <hr class="my-3 border-t-1 surface-border" />
                    <div class="flex justify-between">
                        <div class="font-normal text-2xl">Total</div>
                        <div class="font-bold text-xl">{{ total }} TL</div>
                    </div>
                    <Button
                        class="p-3 mt-3 w-full text-primary-50 dark:text-white border border-surface-200 dark:border-surface-600 mb-3"
                        label="Check out"
                    />
                    <div class="text-center pb-3" @click="goToCartPage">
                        <span
                            class="border-b cursor-pointer text-slate-400 hover:text-slate-700 hover:dark:text-slate-300"
                        >
                            View Cart
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </Sidebar>
</template>
