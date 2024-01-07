<script lang="ts" setup>
import NavigationBar from "./components/NavigationBar.vue";
import { RouterView } from "vue-router";
import FooterBar from "./components/FooterBar.vue";
</script>

<template>
    <navigation-bar />
    <span class="mt-60" />
    <router-view />
    <footer-bar />
</template>
