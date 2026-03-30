import { useEffect, useState } from "react";
import axios from "axios";
import Board from "./components/Board";

//const url = "http://localhost:3000";
const url = "https://multiplayer-tic-tac-toe-311q.onrender.com";

function App() {
  const [player, setPlayer] = useState("");
  const [game, setGame] = useState(null);

  //Join
  useEffect(() => {
    axios.get(`${url}/join`).then(res => {
      setPlayer(res.data.player);
    });
  }, []);
  
    //State of Game
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${url}/state`).then(res => {
        setGame(res.data);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const makeMove = async (index) => {
    await axios.post(`${url}/move`, {
      index,
      player
    });
  };

  const resetGame = async () => {
    await axios.post(`${url}/reset`);
  };

  if (!game) return <h2>Loading...</h2>;

  return (

    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>

      <p className="mb-2">You are: <span className="font-bold">{player}</span></p>

      {game.winner ? (
        <p className="text-green-400 text-xl mb-4">
          Winner: {game.winner}
          {alert(game.winner === player ? `${game.winner} win!` : "You lose!")}
        </p>
      ) : (
        <p className="text-yellow-400 mb-4">
          Turn: {game.currentPlayer}
        </p>
      )}

      <Board board={game.board} onClick={makeMove} />

      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
      >
        Reset Game
      </button>
    </div>

  );
}

export default App;