import React from "react";

interface ScoreboardProps {
  correct: number;
  incorrect: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ correct, incorrect }) => {
  return (
    <div className="bg-buttonColor text-white p-4 rounded-2xl shadow-lg w-64 text-center">
      <h2 className="text-xl font-bold mb-2">Placar</h2>
      <div className="flex justify-around items-center">
        <div className="flex flex-col items-center">
          <span className="text-green-400 text-3xl font-semibold">{correct}</span>
          <span className="text-sm">Acertos</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-red-400 text-3xl font-semibold">{incorrect}</span>
          <span className="text-sm">Erros</span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
