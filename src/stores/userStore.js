import { defineStore } from "pinia";
import axios from 'axios';

export const useUserStore = defineStore('user',{
    state: () => ({
        users: [],
        loading: false,
        error: ''
    }),
    actions: {
        fetchUser() {
            this.loading = true
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                this.users = response.data
            })
            .catch(error => {
                this.error = "Không tải được dữ liệu..."
            })
            .finally(() => {
                this.loading = false
            })
        }
    },
    getters: {
        getUserById(state) {
            return (userID) => state.users.find(user => user.id === userID)
        }
    }
})