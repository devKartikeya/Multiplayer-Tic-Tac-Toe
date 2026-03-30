import React from 'react'

function Board({ board, onClick }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((cell, i) => (
        <div
          key={i}
          onClick={() => onClick(i)}
          className="w-24 h-24 bg-gray-700 flex items-center justify-center text-3xl font-bold cursor-pointer hover:bg-gray-600"
        >
          {cell}
        </div>
      ))}
    </div>
  );
}

export default Board;
