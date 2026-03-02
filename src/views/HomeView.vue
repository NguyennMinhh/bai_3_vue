<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const { users, loading, error } = storeToRefs(userStore);

onMounted(() => {
    userStore.fetchUsers()
});
</script>

<template>
    <div v-if="error">Error: {{ error }}</div>
    <div v-else-if="loading">Loading...</div>
    <ul v-else-if="users && users.length > 0">
        <li v-for="user in users" :key="user.id">
            Name: {{ user.name }}
            <br>
            Email: {{ user.email }}
        </li>
    </ul>
    <ul v-else>Không có user nào</ul>
</template>

<style scoped>
</style>