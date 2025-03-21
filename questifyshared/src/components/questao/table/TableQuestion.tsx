import React, { useEffect, useState } from 'react';
import TableLine from './TableLine';
import { Question } from '@/resources/question/question.resource';
import { useQuestionService } from '@/resources/question/question.service';
import { Skeleton } from '@mui/material';
import { useAuth } from '@/resources/user/authentication.service';

interface TableQuestionProps{

}

const TableQuestion: React.FC<TableQuestionProps> = () => {

    const useServiceQuestion = useQuestionService();
    const [questions , setQuestions] = useState<Question[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);
    const auth = useAuth();
    const user = auth.getUserSession()
    const rate = 0

    useEffect(() => {
            setHasMounted(true);
            questionByUser();
    }, []);
    
    if (!hasMounted) {
        return null;
    }

    async function questionByUser(){
        const result = await useServiceQuestion.getQuestionsByUser(user?.id!);
        
        setQuestions(result);
        setIsLoading(false)
    }


    function mapperQuestion(question : Question){

            return(
                <TableLine key={question.id} codigo={question.id!}
                        enunciado={question.statement}
                        disciplina={question.discipline}
                        data_criacao={question.createdAt}
                        rate={rate}>
                </TableLine>
            );
    }
    
    function mapperQuestions(){
        
        if (isLoading) {
                    // Exibe Skeletons enquanto as questões estão sendo carregadas
                    return Array.from({ length: 4 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-6 py-4">
                            <Skeleton variant="rectangular" width={40} height={20} />
                          </td>
                      
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Skeleton variant="rectangular" width={200} height={20} />
                          </th>
                      
                          <td className="px-6 py-4">
                            <Skeleton variant="rectangular" width={100} height={20} />
                          </td>
                      
                          <td className="px-6 py-4">
                            <Skeleton variant="rectangular" width={100} height={20} />
                          </td>
                      
                          <td className="px-6 py-4">
                            <Skeleton variant="rectangular" width={50} height={20} />
                          </td>
                        </tr>
                      ));
        } else {
        return(
            questions.map(mapperQuestion)
        )}
    }

    return (
        <section className="relative max-h-[70vh] overflow-auto shadow-md sm:rounded-lg bg-white">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto">
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