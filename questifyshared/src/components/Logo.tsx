import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      {/* Container da Logo */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Círculo do "Q" */}
        <div className="absolute w-16 h-16 border-4 border-white rounded-full"></div>

        {/* Linha vertical do "H" */}
        <div className="absolute w-4 h-16 bg-white transform translate-x-6"></div>

        {/* Linha horizontal do "H" */}
        <div className="absolute w-10 h-4 bg-white transform translate-y-2"></div>

        {/* Livro (elemento educacional) */}
        <div className="absolute w-8 h-6 bg-white transform -translate-x-6 -translate-y-4 rotate-12">
          {/* Detalhes do livro */}
          <div className="absolute w-1 h-6 bg-gray-200 left-1"></div>
          <div className="absolute w-1 h-6 bg-gray-200 right-1"></div>
        </div>
      </div>

      {/* Texto ao lado da logo (opcional) */}
      <span className="ml-4 text-white text-2xl font-bold">QH Edu</span>
    </div>
  );
};

export default Logo;