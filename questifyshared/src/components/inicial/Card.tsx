import React from 'react';
import Button from '../button/Button';

interface ClassCardProps {
  label: string;
  title: string;
  imageUrl?: string; // Novo campo para imagem
  onClick?:  (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ title, label, imageUrl , onClick }) => {
  return (
    <div className="w-full flex flex-col p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out text-white bg-containerColor">
      {/* Imagem */}
      <div className="w-full h-3/4 overflow-hidden shadow-md border border-gray-200 bg-white">
        <img src={imageUrl} alt={title} className="w-full h-auto object-fit"/> 
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        <h3 className="flex justify-center text-base sm:text-sm md:text-lg font-bold mb-2 text-titlleColor">{title}</h3>
        <Button label={label} onClick={onClick}/>
      </div>
    </div>
  )
}

export default ClassCard;
