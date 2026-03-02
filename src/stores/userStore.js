import { defineStore } from "pinia";
import axios from 'axios';

export const useUserStore = defineStore('user',{
    state: () => ({
        users: [],
        loading: false,
        error: ''
    }),
    actions: {
        async fetchUsers() {
            this.loading = true
            this.error = ''
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users")
                this.users = response.data
            } catch(error) {
                this.error = "Không tải được dữ liệu"
            } finally {
                this.loading = false
            }
        }
    },
    getters: {
        getUserById(state) {
            return (userID) => state.users.find(user => user.id === userID)
        }
    }
})