import React, { useEffect, useState } from 'react';
import TableLine from './TableLine';
import { Question } from '@/resources/question/question.resource';
import { useQuestionService } from '@/resources/question/question.service';

interface TableQuestionProps{

}

const TableQuestion: React.FC<TableQuestionProps> = () => {

    const useServiceQuestion = useQuestionService();
    const [questions , setQuestions] = useState<Question[]>([])
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
            setHasMounted(true);
            questionByUser();
        }, []);
    
        if (!hasMounted) {
            return null; 
        }

    async function questionByUser(){
        const result = await useServiceQuestion.getQuestionsByUser(1);
        setQuestions(result);
        console.table(result);
    }

    function mapperQuestion(question : Question){
            return(
                    <TableLine key={question.id} codigo={question.id!}
                               enunciado={question.statement}
                               disciplina={question.discipline}
                               data_criacao={question.createdAt}>
                    </TableLine>
            );
    }
    
    function mapperQuestions(){
        return(
            questions.map(mapperQuestion)
        )
    }

    return (
        <section className="relative max-h-[70vh] overflow-auto shadow-md sm:rounded-lg bg-white">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Código</th>
                        <th scope="col" className="px-6 py-3">Enunciado</th>
                        <th scope="col" className="px-6 py-3">Data de Criação</th>
                        <th scope="col" className="px-6 py-3">Disciplina</th>
                        <th scope="col" className="px-6 py-3">Rate</th>
                        <th scope="col" className="px-6 py-3">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {mapperQuestions()}                    
                </tbody>
            </table>
        </section>

    );
};
  
export default TableQuestion;