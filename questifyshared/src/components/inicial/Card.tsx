import React from 'react';
import Button from '../button/Button';
import styles from '../Wrapper';

interface ClassCardProps {
  label: string;
  title: string;
  imageUrl?: string; // Novo campo para imagem
  tela?: string;
  onClick?:  (event: React.MouseEvent<HTMLDivElement>) => void;
  tooltipText?: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ title, label, imageUrl, onClick, tela, tooltipText }) => {
  return (
    <a href={`/${tela}`}>
      <div className={`${styles.wrapper} w-full flex flex-col p-4 dark:bg-dark-containerColor`}>
        {/* Imagem */}
        <div className="w-full h-3/4 overflow-hidden shadow-md border border-gray-200 bg-white">
          <img src={imageUrl} alt={title} className="w-full h-auto object-fit"/> 
        </div>

        {/* Conteúdo do card */}
        <div className="p-3 ">
          <h3 className="flex justify-center text-base md:text-lg font-bold mb-4 text-titlleColor dark:text-dark-titlleColor">{title}</h3>
          <Button label={label} onClick={onClick} tooltipText={tooltipText}/>
        </div>
      </div>
    </a>
  )
}

export default ClassCard;
