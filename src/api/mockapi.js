import apiService from './service.js';

export const gamesApi = {
	// 获取所有游戏
	getAll: (_page, _per_page) => apiService.get('/games', { _page, _per_page }),

	// 获取单个游戏
	getById: (id) => apiService.get(`/games/${id}`),

	// 创建游戏
	create: (data) => apiService.post('/games', data),

	// 更新游戏
	update: (id, data) => apiService.put(`/games/${id}`, data),

	// 删除游戏
	delete: (id) => apiService.delete(`/games/${id}`),

	// 搜索游戏
	search: (query) => apiService.get('/games', { search: query })
};