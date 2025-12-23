// src/hooks/useGames.js
import { useState, useEffect, useRef } from "react";
import { gamesApi } from "../api/mockapi";

export const useGames = (simulateDelay = true, delayTime = 1000) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// 使用 ref 防止重复调用
	const fetchedRef = useRef(false);

	useEffect(() => {
		// 如果已经调用过，直接返回
		if (fetchedRef.current) {
			return;
		}

		// 标记为已调用
		fetchedRef.current = true;

		const fetchGames = async () => {
			try {
				// 模拟加载延迟
				if (simulateDelay) {
					await new Promise(resolve => setTimeout(resolve, delayTime));
				}

				const res = await gamesApi.getAll();

				// 确保是数组
				const games = Array.isArray(res) ? res : [];

				setData(games);
				setError(null);
			} catch (err) {
				setError(err.message || "获取数据失败");
				setData([]);
			} finally {
				setLoading(false);
			}
		};

		fetchGames();
	}, []); // 空依赖数组

	return { data, loading, error };
};