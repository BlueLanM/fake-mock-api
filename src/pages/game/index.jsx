import { useGames } from "../../hooks/useGames";

import "./index.css";

const GameApp = () => {
	const { data, loading, error } = useGames();
	
	return (
		<div className="games-grid">
			{data.map((game) => (
				<div key={game.id} className="game-card">
					<h3>{game.title}</h3>
				</div>
			))}
		</div>
	);
}

export default GameApp;