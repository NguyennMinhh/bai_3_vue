<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore();
const { users, loading, error } = storeToRefs(userStore);

onMounted(() => {
    userStore.fetchUsers()
});

const goToDetail = (userId) => {
    router.push(`/user/${userId}`)
}
</script>

<template>
    <div v-if="error">Error: {{ error }}</div>
    <div v-else-if="loading">Loading...</div>
    <ul v-else-if="users && users.length > 0">
        <li v-for="user in users" :key="user.id">
            <router-link
                :to="`/user/${user.id}`">
                Name: {{ user.name }}
                <br>
                Email: {{ user.email }}
            </router-link>
            <button @click="goToDetail(user.id)">View Detail</button>
        </li>
    </ul>
    <ul v-else>Không có user nào</ul>
</template>

<style scoped>
</style>