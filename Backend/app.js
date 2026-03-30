const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

//GAME STATE
let game = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  players: [],
  winner: ""
};

app.get("/join", (req, res) => {
  if (game.players.length >= 2) {
    return res.json({ player: "Spectator" });
  }
  console.log(game.players);
  const player = game.players.length === 0 ? "X" : "O";
  game.players.push(player);
  res.json({ player });
});

app.post("/move", (req, res) => {
  const { index, player } = req.body;

  if (
    game.board[index] === "" &&
    player === game.currentPlayer &&
    !game.winner
  ) {
    game.board[index] = player;

    if (checkWin(player)) {
      game.winner = player;
    } else {
      game.currentPlayer = player === "X" ? "O" : "X";
    }
  }

  res.json(game);
});

app.get("/state", (req, res) => {
  res.json(game);
});

app.post("/reset", (req, res) => {
  game.board = ["", "", "", "", "", "", "", "", ""];
  game.currentPlayer = "X";
  game.winner = "";
  game.players = [];
  res.json(game);
});

function checkWin(p) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return wins.some(comb =>
    comb.every(i => game.board[i] === p)
  );
}

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});