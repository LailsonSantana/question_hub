'use client'

import { Template } from "@/components/Template"
import { useQuestionService } from '@/resources/question/question.service'
import { useEffect, useState } from 'react'
import { Question } from "@/resources/question/question.resource"
import QuestionComponent from "@/components/questao/display/QuestionComponent"
import MultipleSelectCheckmarks from "@/components/questao/create/SeletorDisciplina"
import React from "react"
import { AuthenticatedPage } from "@/components/AuthenticatedPage"
import Button from "@/components/button/ButtonQ"
import Scoreboard from "@/components/questao/display/ScoreBoard"

export default function QuestoesPage(){

    const useServiceQuestion = useQuestionService();
    const [questions , setQuestions] = useState<Question[]>([])
    const [hasMounted, setHasMounted] = useState(false);
    const [disciplineName, setDisciplineName] = useState<string[]>([]);

    const acertosStr = localStorage.getItem('placarA');
    const errosStr = localStorage.getItem('placarE');

    const acertos = acertosStr ? JSON.parse(acertosStr).count : 0;
    const erros = errosStr ? JSON.parse(errosStr).count : 0;  

    useEffect(() => {
        setHasMounted(true);
        searchQuestions();
    }, []);

    if (!hasMounted) {
        return null; 
    }

    async function searchQuestions() {
        const result = await useServiceQuestion.getAllQuestions();
        setQuestions(result);
    }

    const handleDisciplinesChange = (selectedDisciplines: string[]): void => {
        setDisciplineName(selectedDisciplines);
    }

    async function subjectFilter(){
        const result = await useServiceQuestion.getQuestionsByDisciplines(disciplineName);
        setQuestions(result);
    }

    function mapperQuestion(question : Question){
        return(
            <div key={question.id}>
                <QuestionComponent id={question.id!}
                                   enunciado={question.statement} 
                                   answers={question.answers}
                                   discipline={question.discipline}
                                   userId={question.userId!}
                                   nameUser={question.nameUser}
                                   previousId={question.previousId}
                                   justification={question.justification}
                                   createdAt={question.createdAt}
                                   countRating={question.countRating}
                                   totalRating={question.totalRating}>  
                </QuestionComponent>
            </div>        
        );
    }

    function mapperQuestions(){
        return(
            questions.map(mapperQuestion)
        )
    }

    return (
        <AuthenticatedPage>
            <Template>
                <div className="flex flex-col items-end">
                    <Scoreboard correct={acertos} incorrect={erros} />
                </div>

                <div className='flex flex-col items-center justify-center my-5'>
                    <div className="flex items-center space-x-4">
                            
                            <MultipleSelectCheckmarks onDisciplinesChange={handleDisciplinesChange}/>

                            <Button label="Buscar" onClick={subjectFilter} />

                    </div>
                </div>

                <section className='grid grid-cols-1'>
                    {
                        mapperQuestions()
                    }
                </section>
            </Template>
        </AuthenticatedPage>
    ) 
}