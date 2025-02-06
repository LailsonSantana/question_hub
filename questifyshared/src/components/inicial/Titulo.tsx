import React from 'react';

interface TituloProps{
    titulo: string;
}

const Titulo: React.FC<TituloProps> = ({titulo}) => {
    return (
        <h1 className="text-3xl font-bold mb-8 text-titllecolor mt-8">{titulo}</h1>
    );
};
  
export default Titulo;