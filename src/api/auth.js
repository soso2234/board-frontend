import axios from './axios.js'

// 회원가입
export const signup = (data) => {
    return axios.post('/api/auth/signup', data)
}

// 로그인
export const login = (data) => {
    return axios.post('/api/auth/login', data)
}