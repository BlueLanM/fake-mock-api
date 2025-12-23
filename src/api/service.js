import axios from 'axios';
import { API_CONFIG } from './config.js';

// 创建 axios 实例
const apiClient = axios.create({
	baseURL: API_CONFIG.apiBase,
	timeout: API_CONFIG.timeout,
	headers: {
		'Content-Type': 'application/json'
	}
});

// 请求拦截器
apiClient.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
apiClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		// 统一错误处理
		const errorMessage = error.response?.data?.message || error.message || '请求失败';

		return Promise.reject({
			status: error.response?.status,
			message: errorMessage,
			data: error.response?.data
		});
	}
);

// API Service 类
class ApiService {
	// GET 请求
	async get(url, params = {}) {
		return apiClient.get(url, { params });
	}

	// POST 请求
	async post(url, data = {}) {
		return apiClient.post(url, data);
	}

	// PUT 请求
	async put(url, data = {}) {
		return apiClient.put(url, data);
	}

	// PATCH 请求
	async patch(url, data = {}) {
		return apiClient.patch(url, data);
	}

	// DELETE 请求
	async delete(url) {
		return apiClient.delete(url);
	}
}

export default new ApiService();