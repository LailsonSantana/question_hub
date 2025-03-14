import React from 'react';

interface CabecalhoProps{
    id : number
    assunto : string
    autor? : string
}
//
// flex flex-col
//className='flex justify-between items-center font-bold'
//items-start font-bold md:justify-between md:items-center'
//className='absolute left-1/2 transform -translate-x-1/2 text-center'
const Cabecalho: React.FC<CabecalhoProps> = ({id , assunto , autor}) => {
    return (
        <div className='flex flex-col items-start md:flex-row md:justify-between md:items-center font-bold'>
            <div>
                <span>Questão - {id}</span>
            </div>

            <span >{assunto}</span>

            <span>Autor : {autor}</span>
        </div>
    );
};
  
export default Cabecalho;