<script setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore();
const { users, loading, error } = storeToRefs(userStore);
const searchQuery = ref('')

onMounted(() => {
    userStore.fetchUsers()
});

const goToDetail = (userId) => {
    router.push(`/user/${userId}`)
}

const filteredUsers = computed(() => {
    const keyword = searchQuery.value.trim().toLowerCase()
    return users.value.filter(user => 
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    )
})
</script>

<template>
    <div v-if="error" class="error">Error: {{ error }}</div>
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="users && users.length > 0">
        <input 
            type="text" 
            v-model="searchQuery"
        />
        <table class="dashboard">
            <thead>
                <tr>
                    <th><strong>ID</strong></th>
                    <th><strong>Name</strong></th>
                    <th><strong>Email</strong></th>
                    <th><strong>Action</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in filteredUsers" :key="user.id">
                    <td>
                        <router-link :to="`/user/${user.id}`">{{ user.id }}</router-link>
                    </td>
                    <td>
                        <router-link :to="`/user/${user.id}`">{{ user.name }}</router-link>
                    </td>
                    <td>
                        <router-link :to="`/user/${user.id}`">{{ user.email }}</router-link>
                    </td>
                    <td>
                        <button @click="goToDetail(user.id)">View Detail</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Không có user nào</div>
</template>

<style scoped>
.error {
    color: red;
}

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