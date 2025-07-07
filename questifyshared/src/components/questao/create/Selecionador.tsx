import React from 'react';
import { useFormContext } from 'react-hook-form'; // Importando o hook para trabalhar com formulários

interface SelecionadorProps {
    register?: any; // Tipo correto seria UseFormRegisterReturn, mas você pode manter any se preferir
    name: string;
}

const Selecionador: React.FC<SelecionadorProps> = ({ register, name }) => {
    const { setValue } = useFormContext(); // Para sincronizar as mudanças com react-hook-form

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(name, event.target.value); // Atualiza o valor no react-hook-form
    };

    return (
        <div className='flex flex-col items-center'>
            <p className="text-sm text-gray-500 mb-2">Disciplina da questão.</p>
            <select
                id="disciplines"
                onChange={handleSelectChange}
                className="w-60 h-30 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register(name)} // Isso ainda permite o react-hook-form registrar o input


            >
                <option value="Conhecimentos Gerais">Conhecimentos Gerais</option>
                <option value="Algoritmos e Programação II">Algoritmos e Programação II</option>
                <option value="Banco de Dados I">Banco de Dados I</option>
                <option value="Engenharia de Software I">Engenharia de Software I</option>
                <option value="Redes de Computadores I">Redes de Computadores I</option>
                <option value="Software Educativo">Software Educativo</option>
            </select>
        </div>
    );
};

export default Selecionador;

