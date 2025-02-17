'use client'

import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import ButtonTutorial from "@/components/inicial/ButtonTutorial";
import ClassCard from "@/components/inicial/Card";
import Titulo from "@/components/inicial/QuestifyTittle";
import { Template } from "@/components/Template";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function InicialPage() {

    const [hasMounted, setHasMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
              setHasMounted(true);
    }, []);
      
    if (!hasMounted) {
        return null; 
    }

    const handleNavigation = (event : any, path : string) => {
        // Aqui você pode acessar o evento de clique
        router.push(path)
    };
// AS DEFINIÇÕES DE LAYOUT SÃO APLICADAS INICIALMENTE EM TELAS PEQUENAS 
// OS PREFIXOS sm , md e lg são usados conforme das telas vão aumentando.
    return (
        <AuthenticatedPage>
            <Template>
                <div className="flex flex-col items-center h-screen mx-auto min-h-screen">
                    
                    <Titulo titulo="Bem-vindo ao Questify Shared"/>

                    <ButtonTutorial />

                        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <ClassCard 
                                label="Elaborar" 
                                title="Elabore Questões" 
                                onClick={(event) => handleNavigation(event, '/formulario')}
                                imageUrl="/assets/elabore3.png" 
                            />
                            <ClassCard 
                                label="Responder" 
                                title="Responda questões" 
                                onClick={(event) => handleNavigation(event, '/questoes')}
                                imageUrl="/assets/answer.png" 
                            />
                            <ClassCard 
                                label="Visualizar" 
                                title="Questões Respondidas" 
                                imageUrl="/assets/check.png"
                            />
                            <ClassCard 
                                label="Visualizar" 
                                title="Questões Criadas" 
                                onClick={(event) => handleNavigation(event, '/questoes.criadas')}
                                imageUrl="/assets/created.png" 
                            />
                        </div>
                </div>
            </Template>
        </AuthenticatedPage>
    );
}

