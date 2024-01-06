<script lang="ts" setup>
import NavigationBar from "./components/NavigationBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
    <navigation-bar />
    <router-view />
</template>
