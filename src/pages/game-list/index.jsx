import { useGames } from "../../hooks/useGames";
import Table from "../../components/Table";
import Loading from "../../components/Loading";

import "./index.css";

const GameApp = () => {
	const { data, loading, error } = useGames(); // 默认1秒延迟

	const gameColumns = [
		{
			title: "ID",
			dataIndex: "id",
		},
		{
			title: "名称",
			dataIndex: "title",
		},
		,
		{
			title: "热度",
			dataIndex: "views",
		}
	]

	return (
		<div className="game-container">
			<Table rowKey="id" dataSource={data} columns={gameColumns} loading={loading} />
		</div>
	);
}

export default GameApp;