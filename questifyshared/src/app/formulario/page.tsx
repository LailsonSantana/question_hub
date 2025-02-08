'use client';

import { useEffect, useState } from "react";
import { Template } from "@/components/Template";
import InputAlternativa from "@/components/questao/create/InputAlternativa";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "./FieldError";
import ButtonB from "@/components/button/Button";
import Selecionador from "@/components/questao/create/Selecionador";
import ContainerForm from "@/components/formulario/ContainerForm";
import Tiptap from "@/components/questao/tiptap/Tiptap";
import { FormProvider, useForm } from "react-hook-form";
import { useQuestionService } from "@/resources/question/question.service";
import { useAuth } from "@/resources/user/authentication.service";

export default function FormularioPage() {
    const service = useQuestionService();
    const [hasMounted, setHasMounted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //const queryString = window.location.search;
    //const searchParams = new URLSearchParams(queryString);
    const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
    //const id = Number(searchParams!.get("id"));
    const auth = useAuth();
    const user = auth.getUserSession();

    useEffect(() => {
        setHasMounted(true);  
        const queryString = window.location.search;
        setSearchParams(new URLSearchParams(queryString));
    }, []);


    if (!hasMounted || !searchParams) return null; // Garante que só renderiza quando estiver pronto

    const id = Number(searchParams.get("id") || 0); // Evita erro se "id" não existir

    const schema = z.object({
        statement: z.string().min(10,"Esse campo não pode ficar vazio"),
        alt1: z.string().min(1,"Esse campo não pode ficar vazio"),
        alt2: z.string().min(1,"Esse campo não pode ficar vazio"),
        alt3: z.string().min(1,"Esse campo não pode ficar vazio"),
        alt4: z.string().min(1,"Esse campo não pode ficar vazio"),
        alt5: z.string().min(1,"Esse campo não pode ficar vazio"),
        select: z.string(),
        correctAnswer: z.string().nonempty("A justificativa não pode ficar vazia")
    });

    type FormProps = z.infer<typeof schema>;

    const methods = useForm<FormProps>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {statement: "",},
    });

    const { handleSubmit, watch, setValue, reset, formState: { errors } } = methods;

    useEffect(() => {
        if(id){
            const fetchData = async () => {
                try {
                    const response = await service.getQuestionById(id); // Substitua pelo ID correto
                    reset({ 
                        statement: response.statement || "hh",
                        alt1: response.answers[0]?.text || "",
                        alt2: response.answers[1]?.text || "",
                        alt3: response.answers[2]?.text || "",
                        alt4: response.answers[3]?.text || "",
                        alt5: response.answers[4]?.text || "",
                        select: response.discipline || "",
                        correctAnswer: response.answers.find(a => a.isCorrect)?.text || ""
                    });
                    setValue("statement", response.statement || "");
                    console.log("O ENUNCIADO É :" , response.statement)
                } catch (error) {
                    console.error("Erro ao carregar a questão:", error);
                }
            };
            fetchData();
        }else{
            console.log("NADA DE ID")
        }
    }, [id, reset, setValue]);

    
    const correctAnswer = watch('correctAnswer');
    
    const onSelectAlternative = (name: string) => {
        setValue('correctAnswer', name);
    };

    const [justification, setJustification] = useState('');

    const handleSave = async (data: FormProps) => {
        console.log("Handle save acabou de ser chamado");

        const answers = [
            { text: data.alt1, isCorrect: correctAnswer === "alt1" },
            { text: data.alt2, isCorrect: correctAnswer === "alt2" },
            { text: data.alt3, isCorrect: correctAnswer === "alt3" },
            { text: data.alt4, isCorrect: correctAnswer === "alt4" },
            { text: data.alt5, isCorrect: correctAnswer === "alt5" },
        ];

        const dados = {
            statement: data.statement,
            discipline: data.select,
            answers: answers,
            userId: user?.id!,
            nameUser: user?.name!,
            countRating: 0,
            totalRating: 0
        };

        try {
            if(id){
                await service.saveNewVersion(dados , id);
            }
            else{
                await service.save(dados);
            }
            
            alert("Pergunta salva com sucesso!");
            reset(); // Reseta o formulário
        } catch (error) {
            console.error("Erro ao salvar a pergunta:", error);
            alert("Erro ao salvar a pergunta.");
        }
    };
    

    const handleValidationError = (errorMessage: string) => {
        setError(errorMessage);
    };

    return (
        <Template>
            
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleSave)}>
                    <span className="m-4 mt-8 flex flex-col items-center justify-center">
                        <Selecionador register={methods.register} name="select" />
                    </span>

                    <div className="flex flex-col items-center justify-center h-full w-full">
                        
                    <section className="flex items-center w-11/12"> 
                                <ContainerForm>
                                    <div className="flex flex-col items-center mb-8">
                                        <h1 className="text-3xl font-bold text-titllecolor">Desenvolva o Enunciado</h1>
                                    </div>

                                    <div className="space-y-2">    
                                        <Tiptap value={watch("statement")} onChange={(value) => setValue("statement", value)} onKeyDown={(e) => e.stopPropagation()}/>
                                    </div>

                                    <div className="flex items-center space-x-2 mb-4 mt-8 ml-32">
                                        <ButtonB type="submit" label="Salvar" />
                                        <ButtonB type="button" label="Cancelar" />
                                    </div>
                                </ContainerForm>
                            
                                <ContainerForm>
                                    <div className="flex flex-col items-center mb-8">
                                        <h1 className="text-3xl font-bold text-titllecolor">Desenvolva as Alternativas</h1>

                                    </div>

                                    <div className="px-4 space-y-6">
                                        
                                            <InputAlternativa register={methods.register} name="alt1"
                                                isSelected={correctAnswer === 'alt1'}
                                                onSelect={() => onSelectAlternative('alt1')}
                                                justification={correctAnswer === 'alt1' ? justification : ''}
                                                setJustification={setJustification}
                                            />
                                            <FieldError error={errors.alt1?.message} />

                                            <InputAlternativa register={methods.register} name="alt2"
                                                isSelected={correctAnswer === 'alt2'}
                                                onSelect={() => onSelectAlternative('alt2')}
                                                justification={correctAnswer === 'alt2' ? justification : ''}
                                                setJustification={setJustification}
                                            />
                                            <FieldError error={errors.alt2?.message} />
     
                                            <InputAlternativa register={methods.register} name="alt3"
                                                isSelected={correctAnswer === 'alt3'}
                                                onSelect={() => onSelectAlternative('alt3')}
                                                justification={correctAnswer === 'alt3' ? justification : ''}
                                                setJustification={setJustification}
                                            />
                                            <FieldError error={errors.alt3?.message} />
                       
                                            <InputAlternativa register={methods.register} name="alt4"
                                                isSelected={correctAnswer === 'alt4'}
                                                onSelect={() => onSelectAlternative('alt4')}
                                                justification={correctAnswer === 'alt4' ? justification : ''}
                                                setJustification={setJustification}  
                                            />
                                            <FieldError error={errors.alt4?.message} />
                
                                            <InputAlternativa register={methods.register} name="alt5"
                                                isSelected={correctAnswer === 'alt5'}
                                                onSelect={() => onSelectAlternative('alt5')}
                                                justification={correctAnswer === 'alt5' ? justification : ''}
                                                setJustification={setJustification}
                                            />
                                            <FieldError error={errors.alt5?.message} />
                                    </div>
                                </ContainerForm>
                            </section>
                            
                    </div>
                </form>
            </FormProvider>
        </Template>
    );
}






