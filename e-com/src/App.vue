<script lang="ts" setup>
import NavigationBar from "./components/NavigationBar.vue";
import { RouterView } from "vue-router";
import FooterBar from "./components/FooterBar.vue";
import Newsletter from "@/components/Newsletter.vue";
</script>

<template>
    <NavigationBar />
    <span class="mt-60" />
    <RouterView />
    <Newsletter />
    <FooterBar />
</template>
