import React from 'react';

interface QuestifyTittleProps {
  titulo: string;
}

const QuestifyTittle: React.FC<QuestifyTittleProps> = ({ titulo }) => {
  return (
    <div className="flex items-center justify-center mb-16 mt-8">
      {/* Ícone de Educação (Livro) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-[#4D4482] mr-4" // Cor personalizada
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>

      {/* Título com Cor Personalizada e Sombra Suave */}
      <h1 className="text-4xl sm:text-5xl font-bold text-[#4D4482] drop-shadow-md">
        {titulo}
      </h1>
    </div>
  );
};

export default QuestifyTittle;