<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { loading, error } = storeToRefs(userStore)

onMounted(() => {
    console.log(userStore.users.length)
    if (userStore.users.length === 0) {
        userStore.fetchUsers()
    }
})

const user = computed(() => {
    const userId = Number(route.params.id)
    return userStore.getUserById(userId)
})

const goBack = () => {
    router.push('/')
}
</script>

<template>
    <button @click="goBack">Back</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" style="color: red;">Error: {{ error }}</div>
    <div v-else-if="!user">User not found</div>
    <div v-else>
        <div>User Detail:</div>
        <div>name: {{ user.name }}</div>
        <div>email: {{ user.email }}</div>
        <div>phone: {{ user.phone }}</div>
        <div>website: {{ user.website }}</div>
        <div>company name: {{ user.company?.name }}</div>
    </div>
</template>

<style scoped>
</style>