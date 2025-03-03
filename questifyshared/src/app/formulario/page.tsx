'use client';

import { useEffect, useState } from "react";
import { Template } from "@/components/Template";
import InputAlternativa from "@/components/questao/create/InputAlternativa";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button/Button";
import Selecionador from "@/components/questao/create/Selecionador";
import ContainerForm from "@/components/formulario/ContainerForm";
import Tiptap from "@/components/questao/tiptap/Tiptap";
import { FormProvider, useForm } from "react-hook-form";
import { useQuestionService } from "@/resources/question/question.service";
import { useAuth } from "@/resources/user/authentication.service";
import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import { useNotification } from "@/components/notification";
import Titulo from "@/components/inicial/Titulo";

export default function FormularioPage() {
    const service = useQuestionService();
    const notification = useNotification();
    const [loading, setLoading] = useState(false);
    const defaultURL = 'http://localhost:3000/formulario?id=1'; // Defina sua URL padrão aqui

    const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams(defaultURL));
    const auth = useAuth();
    const user = auth.getUserSession();

    const id = Number(searchParams.get("id") || 0);

    useEffect(() => {
        const queryString = window.location.search;
        setSearchParams(new URLSearchParams(queryString));
    }, []);

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
                    const response = await service.getQuestionById(id);
                        reset({ 
                            statement: response.statement || "",
                            alt1: response.answers[0]?.text || "",
                            alt2: response.answers[1]?.text || "",
                            alt3: response.answers[2]?.text || "",
                            alt4: response.answers[3]?.text || "",
                            alt5: response.answers[4]?.text || "",
                            select: response.discipline || "",
                            correctAnswer: response.answers.find(a => a.isCorrect)?.text || ""
                        });

                } catch (error) {
                    console.error("Erro ao carregar a questão:", error);
                }
            };
            fetchData();
        }else{
            console.log("NADA DE ID")
        }
    }, [id]);


    const correctAnswer = watch('correctAnswer');
    
    const onSelectAlternative = (name: string) => {
        setValue('correctAnswer', name);
    };

    const [justification, setJustification] = useState('');

    const handleSave = async (data: FormProps) => {
        setLoading(true) 
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
            justification: justification,
            countRating: 0,
            totalRating: 0
        };

        try {
            if(id){
                await service.saveNewVersion(dados , id);
                notification.notify("Sua versão foi enviada para análise!", "success");
                setLoading(false)
            }
            else{
                await service.save(dados);
                notification.notify("Sua questão foi enviada para análise!", "success"); 
                setLoading(false)
            }
            reset({ 
                statement: "",
                alt1: "",
                alt2: "",
                alt3: "",
                alt4: "",
                alt5: "",
                select: "",
                correctAnswer: ""
            });
            setJustification('');
             // Reseta o formulário
        } catch (error) {
            console.error("Erro ao salvar a pergunta:", error);
            alert("Erro ao salvar a pergunta.");
        }
    };
    

// O prefixo sm: aplica aos tamanhos de tela a partir daquele valor , e não naquele valor
    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(handleSave)}>
                        <span className="m-4 mt-8 flex flex-col items-center justify-center">
                            <Selecionador register={methods.register} name="select" />
                        </span>
                        <section className="container flex flex-col md:flex-row gap-8 w-full  min-h-screen p-8 items-center sm:items-stretch"> 
                            <ContainerForm>

                                <Titulo titulo="Desenvolva o Enunciado" />

                                <div className="w-full">   
                                    <Tiptap value={watch("statement")} onChange={(value) => setValue("statement", value)} onKeyDown={(e) => e.stopPropagation()}/>
                                </div>

                                <div className="flex flex-row items-center space-x-2 mb-4 mt-8">
                                    <Button type="submit" label="Enviar" />
                                    <Button type="button" label="Cancelar" />
                                </div>

                            </ContainerForm>
                        
                            <ContainerForm>

                                <Titulo titulo="Desenvolva as Alternativas" />

                                <div className="px-4 space-y-6">
                                    
                                        <InputAlternativa register={methods.register} name="alt1"
                                            isSelected={correctAnswer === 'alt1'}
                                            onSelect={() => onSelectAlternative('alt1')}
                                            justification={correctAnswer === 'alt1' ? justification : ''}
                                            setJustification={setJustification}
                                        />

                                        <InputAlternativa register={methods.register} name="alt2"
                                            isSelected={correctAnswer === 'alt2'}
                                            onSelect={() => onSelectAlternative('alt2')}
                                            justification={correctAnswer === 'alt2' ? justification : ''}
                                            setJustification={setJustification}
                                        />

                                        <InputAlternativa register={methods.register} name="alt3"
                                            isSelected={correctAnswer === 'alt3'}
                                            onSelect={() => onSelectAlternative('alt3')}
                                            justification={correctAnswer === 'alt3' ? justification : ''}
                                            setJustification={setJustification}
                                        />
                
                                        <InputAlternativa register={methods.register} name="alt4"
                                            isSelected={correctAnswer === 'alt4'}
                                            onSelect={() => onSelectAlternative('alt4')}
                                            justification={correctAnswer === 'alt4' ? justification : ''}
                                            setJustification={setJustification}  
                                        />
            
                                        <InputAlternativa register={methods.register} name="alt5"
                                            isSelected={correctAnswer === 'alt5'}
                                            onSelect={() => onSelectAlternative('alt5')}
                                            justification={correctAnswer === 'alt5' ? justification : ''}
                                            setJustification={setJustification}
                                        />
                                </div>
                            </ContainerForm>
                        </section>
                    </form>
                </FormProvider>
            </Template>
        </AuthenticatedPage>
    );
}






