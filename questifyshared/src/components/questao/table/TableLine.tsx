'use client'

interface TableLineProps{
    codigo: number
    enunciado?: string
    data_criacao?: string
    disciplina?: string
}

const TableLine: React.FC<TableLineProps> = ({codigo , enunciado, data_criacao , disciplina}) => {
    //const formatedEnunciado = enunciado!.replace(/<[^>]+>/g, '');
    const maxLength = 75; // Defina o limite de caracteres desejado
    const formatedEnunciado = enunciado!.replace(/<[^>]+>/g, '').slice(0, maxLength) + (enunciado!.length > maxLength ? '...' : '');

    
    return(
            <tr>
                <td className="px-6 py-4">
                    QN{codigo}
                </td>

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                       {formatedEnunciado}
                    </a>
                </th>

                <td className="px-6 py-4">
                    {data_criacao}
                </td>

                <td className="px-6 py-4">
                    {disciplina}
                </td>

                <td className="px-6 py-4">

                </td>
            </tr>
    );
}

export default TableLine;