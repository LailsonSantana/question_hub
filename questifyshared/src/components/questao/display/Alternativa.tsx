import React from 'react';

interface AlternativaProps {
  circleLabel: string;
  value: string;
  isSelected?: boolean;
  text: string
  onClick: () => void;
  type?:"submit" | "button" | "reset" | undefined
  
}
// Perceba que alguns valores são passados depois que indicamos qual a classe , como por exemplo o 
// onClick e o type , isso acontece pq são atributos nativos do react , já atributos como
// isSelected e circleLabel foi criado por nós , logo são passados entre chaves
const Alternativa: React.FC<AlternativaProps> = ({ circleLabel, value, isSelected,text ,type , onClick}) => {

  return (

    <div className='flex items-center space-x-2'>
        <button className={`flex-shrink-0 flex justify-center items-center w-10 h-10 rounded-full border-2 ${
          isSelected ? 'bg-[#433E5B]' : 'bg-[#9489C9]'} text-white`}
          onClick={onClick}
          type={type}>
          {isSelected}
          {circleLabel}
        </button>
        <span className="text-md font-light">{text}</span>
    </div>
  );
};

export default Alternativa;