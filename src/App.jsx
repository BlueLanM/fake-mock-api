import { useGames } from "./hooks/useGames";

import "./App.css";

const App = () => {
	const { data, loading, error } = useGames();
	console.log(data,"data");
	
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

export default App;