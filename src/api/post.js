import axios from './axios.js'

// 전체 조회 (페이징)
export const getPosts = (page = 0) => {
    return axios.get(`/api/posts?page=${page}`)
}

// 단건 조회
export const getPost = (id) => {
    return axios.get(`/api/posts/${id}`)
}

// 게시글 작성
export const createPost = (data) => {
    return axios.post('/api/posts', data)
}

// 게시글 수정
export const updatePost = (id, data) => {
    return axios.put(`/api/posts/${id}`, data)
}

// 게시글 삭제
export const deletePost = (id) => {
    return axios.delete(`/api/posts/${id}`)
}

// 댓글 전체 조회
export const getComments = (postId) => {
    return axios.get(`/api/posts/${postId}/comments`)
}

// 댓글 작성
export const createComment = (postId, data) => {
    return axios.post(`/api/posts/${postId}/comments`, data)
}

// 댓글 삭제
export const deleteComment = (postId, commentId) => {
    return axios.delete(`/api/posts/${postId}/comments/${commentId}`)
}

// 댓글 수정
export const updateComment = (postId, commentId, data) => {
    return axios.put(`/api/posts/${postId}/comments/${commentId}`, data)
}