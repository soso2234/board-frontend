import { defineStore } from 'pinia'
import { login as loginApi, signup as signupApi } from '@/api/auth.js'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        username: localStorage.getItem('username') || null
    }),

    getters: {
        isLoggedIn: (state) => !!state.token
    },

    actions: {
        async login(data) {
            const response = await loginApi(data)
            this.token = response.data.token
            this.username = data.username
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', data.username)
        },

        async signup(data) {
            await signupApi(data)
        },

        logout() {
            this.token = null
            this.username = null
            localStorage.removeItem('token')
            localStorage.removeItem('username')
        }
    }
})