import Alternativa from "./Alternativa";
import Enunciado from "./Enunciado";
import { useState } from "react";
import Resultado from "./Resultado";
import { RenderIf } from "../../Template";
import Cabecalho from "./Cabecalho";
import BasicTabs from "./BasicTabs";
import { Question } from "@/resources/question/question.resource";
import Button from "@/components/button/ButtonQ";

interface Answer{
    text: string;
    isCorrect: boolean;
}
interface QuestionComponentProps{
    id: number;
    enunciado: string;
    answers: Answer[];
    nameUser: string;
    userId: number;
    discipline: string;
    previousId?: number;
    createdAt?: string;
    justification?: string;
    countRating?: number;
    totalRating?: number;
}

const indexToLetter = (index: number): string => {
    return String.fromCharCode(65 + index); // 65 é o código ASCII para 'A'
};

export const QuestionComponent: React.FC<QuestionComponentProps> = ({id,enunciado,answers,nameUser,userId,discipline,previousId,
                                                                        justification,createdAt,countRating,totalRating
} : QuestionComponentProps) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const handleSelect = (index: number) => {
        setSelectedAnswerIndex(index);
    };

    const handleSubmit = () => {
        if (selectedAnswerIndex !== null) {
          const selectedAnswer = answers[selectedAnswerIndex];
          // Verifica se a resposta selecionada está correta
          setIsCorrect(selectedAnswer.isCorrect)
          setIsSubmitted(true);

          if (typeof window !== "undefined") {
          const acertosStr = localStorage.getItem('placarA');
          const errosStr = localStorage.getItem('placarE');
          const acertos = acertosStr ? JSON.parse(acertosStr).count : 0;
          const erros = errosStr ? JSON.parse(errosStr).count : 0; 
          const placarE = { result: 'Erro', count: erros + 1 };
          const placarA = { result: 'Acerto', count: acertos + 1 };

          if(selectedAnswer.isCorrect){
            localStorage.setItem('placarA', JSON.stringify(placarA))  
          }
          else{
            localStorage.setItem('placarE', JSON.stringify(placarE))
          }
        }
        } else {
          console.log('Nenhuma resposta selecionada.');
        }
    };

    return(

        <div className="m-8">
            <div className='border border-gray-300 rounded p-4 shadow-md bg-containerColor'>
                <Cabecalho id={id} assunto={discipline} autor={nameUser}/>
            </div>

            <div className='border border-gray-300 rounded p-8 shadow-md bg-containerColor'>
                <Enunciado text={`${enunciado}`}/>
                <div className="pt-4">
                    <ul>
                        {answers?.map((answer, index) => (
                            <li key={index} className={answer.isCorrect ? 'correct' : 'incorrect'}>
                                <div className="flex space-x-2 mt-3 " style={{ paddingLeft: '25px' }}>
                                    <Alternativa circleLabel={indexToLetter(index)} 
                                                value="optionA" text={answer.text}
                                                type="submit"
                                                onClick={() => handleSelect(index)}
                                                isSelected={selectedAnswerIndex === index}    />  
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-x-32 flex items-center mt-12">
                    <Button type="button" onClick={handleSubmit} label="Responder"/>
                    
                    <RenderIf condition={isSubmitted}>
                        <Resultado isCorrect={isCorrect!}/> 
                    </RenderIf>
                    
                    <RenderIf condition={previousId!=0}>
                        <div className="space-x-4 flex items-center">
                            <h2 className="ml-64">Versão da questão : </h2>
                            <a href='' className="text-blue-600 hover:underline m-4">QN{previousId}</a>
                        </div>
                    </RenderIf>
                </div>
            </div>

            <div className="border border-gray-300 rounded p-4 shadow-md bg-containerColor">
                <BasicTabs question={new Question(id,enunciado,discipline,answers,userId,nameUser, previousId!,justification!,
                createdAt!, countRating! , totalRating!
                )} />
            </div>
        </div>
    )
}

export default QuestionComponent;