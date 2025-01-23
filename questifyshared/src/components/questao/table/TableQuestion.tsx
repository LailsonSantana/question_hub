import React, { useEffect, useState } from 'react';
import TableLine from './TableLine';
import { useQuestionService } from '@/resources';
import { Question } from '@/resources/question/question.resource';

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
        const result = await useServiceQuestion.getByUser(1);
        setQuestions(result);
        console.table(result);
    }

    function mapperQuestion(question : Question){
        console.log("Mapper Question")
            return(
                    <TableLine key={question.id} codigo={question.id!}
                               enunciado={question.statement}
                               disciplina={question.discipline}>
                    </TableLine>
            );
        }
    
        function mapperQuestions(){
            console.log("Mapper Questions")
            return(
                questions.map(mapperQuestion)
            )
        }
    return (
        
        <section className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Código
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Enunciado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data de Criação
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Disciplina
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {mapperQuestions()}
                    {/*<TableLine codigo='QN1' enunciado='Durante os estudos de matemática financeira ...' data_criacao='24/10/2024'
                               disciplina='Discreta'
                    />
                    <TableLine codigo='QN2' enunciado='Durante os estudos de matemática financeira ...' data_criacao='24/10/2024'
                               disciplina='Compiladores'
                    />
                    <TableLine codigo='QN3' enunciado='Durante os estudos de matemática financeira ...' data_criacao='24/10/2024'
                                disciplina='Teoria dos Grafos'
                    />
                    <TableLine codigo='QN4' enunciado='Durante os estudos de matemática financeira ...' data_criacao='24/10/2024'
                                disciplina='Análise de Algoritmos'
                    />
                    <TableLine codigo='QN5' enunciado='Durante os estudos de matemática financeira ...' data_criacao='24/10/2024'
                                disciplina='Cálculo I'
                    />*/}
                    
                </tbody>
            </table>
        </section>
    );
};
  
export default TableQuestion;