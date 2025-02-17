import React from 'react';

interface TituloProps{
    titulo: string;
}

const Titulo: React.FC<TituloProps> = ({titulo}) => {
    return (
        <h1 className="flex justify-center text-3xl font-bold mb-8 text-titlleColor mt-4">{titulo}</h1>
    );
};
  
export default Titulo;