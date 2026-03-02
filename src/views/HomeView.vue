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
        <ul>
            <li v-for="user in filteredUsers" :key="user.id">
                <router-link
                    :to="`/user/${user.id}`">
                    Name: {{ user.name }}
                    <br>
                    Email: {{ user.email }}
                </router-link>
                <button @click="goToDetail(user.id)">View Detail</button>
            </li>
        </ul>
    </div>
    <div v-else>Không có user nào</div>
</template>

<style scoped>
.error {
    color: red;
}
</style>