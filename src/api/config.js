// API 配置
const config = {
	development: {
		apiBase: import.meta.env.VITE_API_BASE || 'http://localhost:3000',
		timeout: 10000,
		debug: true
	},
	production: {
		apiBase: import.meta.env.VITE_API_BASE || 'https://my-json-server.typicode.com/BlueLanM/fake-mock-api',
		timeout: 15000,
		debug: false
	}
};

// 获取当前环境
const currentEnv = import.meta.env.VITE_APP_ENV || 'development';

export const API_CONFIG = config[currentEnv];
export const IS_DEVELOPMENT = currentEnv === 'development';
export const IS_PRODUCTION = currentEnv === 'production';

// 打印当前环境信息
if (API_CONFIG.debug) {
	console.log('🚀 当前环境:', currentEnv);
	console.log('🌐 API 地址:', API_CONFIG.apiBase);
}