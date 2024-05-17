<script lang="ts" setup>
import NavigationBar from "@components/NavigationBar.vue";
import { RouterView } from "vue-router";
import FooterBar from "@components/FooterBar.vue";
import Newsletter from "@components/Newsletter.vue";
</script>

<template>
    <NavigationBar />
    <RouterView class="pt-16" />
    <div class="flex flex-col">
        <div class="flex-1" />
        <Newsletter />
        <FooterBar />
    </div>
</template>
