<script setup>

</script>

<template>
    <div class="panel">
        <div class="panel-header">
            <router-link to="/">Home</router-link>
            <p>User Dashboard</p>
        </div>

        <div class="panel-body">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.panel-header {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>