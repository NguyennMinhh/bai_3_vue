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
        <table class="dashboard">
            <thead>
                <tr>
                    <th><strong>Name</strong></th>
                    <th><strong>Email</strong></th>
                    <th><strong>Phone</strong></th>
                    <th><strong>Website</strong></th>
                    <th><strong>Company Name</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.website }}</td>
                    <td>{{ user.company?.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>


.dashboard {
    border-collapse: collapse;
    width: 100%;
    margin-top: 1rem;
}

.dashboard td, td {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
}
</style>