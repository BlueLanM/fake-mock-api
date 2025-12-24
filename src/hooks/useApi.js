import { useState, useEffect, useRef } from "react";

/**
 * 通用的 API 调用 Hook
 * @param {Function} apiFn - API 调用函数
 * @param {Object} options - 配置选项
 * @param {boolean} options.simulateDelay - 是否模拟延迟
 * @param {number} options.delayTime - 延迟时间(ms)
 * @param {boolean} options.immediate - 是否立即执行，默认为 true
 * @param {Array} options.deps - 依赖数组，当依赖变化时重新请求
 * @param {*} options.defaultValue - 默认值，默认为 []
 * @returns {Object} { data, loading, error, refetch }
 */
export const useApi = (apiFn, options = {}) => {
	const {
		simulateDelay = true,
		delayTime = 1000,
		immediate = true,
		deps = [],
		defaultValue = []
	} = options;

	const [data, setData] = useState(defaultValue);
	const [loading, setLoading] = useState(immediate);
	const [error, setError] = useState(null);

	// 使用 ref 防止重复调用
	const fetchedRef = useRef(false);
	const isMountedRef = useRef(true);

	// 手动触发请求的函数
	const refetch = async () => {
		setLoading(true);
		setError(null);

		try {
			// 模拟加载延迟
			if (simulateDelay) {
				await new Promise(resolve => setTimeout(resolve, delayTime));
			}
			const res = await apiFn();
			// 如果默认值是数组，确保返回值也是数组
			const result = Array.isArray(defaultValue) 
				? res.data 
					? (Array.isArray(res.data) 
						? res.data : [])
					: res
				: res;
			setData(result);
			setError(null);
			setLoading(false);
		} catch (err) {
			setError(err.message || "获取数据失败");
			setData(defaultValue);
			setLoading(false);
		}
	};

	useEffect(() => {
		// 如果不立即执行，则直接返回
		if (!immediate) {
			setLoading(false);
			return;
		}

		// 如果已经调用过且没有依赖项，直接返回
		if (fetchedRef.current && deps.length === 0) {
			return;
		}

		// 标记为已调用
		fetchedRef.current = true;

		refetch();

		// 清理函数
		return () => {
			isMountedRef.current = false;
		};
	}, deps); // eslint-disable-line react-hooks/exhaustive-deps

	return { data, loading, error, refetch };
};
