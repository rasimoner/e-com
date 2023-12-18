<script lang="ts" setup></script>

<template>
    <h1 class="text-3xl font-bold underline">
        <FormKit
            help="Enter mail address"
            label="email"
            prefix-icon="email"
            type="email"
            validation="required|email"
        />
    </h1>
</template>
