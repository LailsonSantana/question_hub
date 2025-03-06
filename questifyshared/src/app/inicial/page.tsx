'use client'

import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import ClassCard from "@/components/inicial/Card";
import QuestifyTittle from "@/components/inicial/QuestifyTittle";
import { Template } from "@/components/Template";
import ThemeToggle from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InicialPage() {

    const [hasMounted, setHasMounted] = useState(false);
    const [loading , setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        setHasMounted(true);
    }, []);
      
    if (!hasMounted) {
        return null; 
    }

    const handleNavigation = (event : any, path : string) => {
        // Aqui você pode acessar o evento de clique
        setLoading(true)
        router.push(path)
    };
// AS DEFINIÇÕES DE LAYOUT SÃO APLICADAS INICIALMENTE EM TELAS PEQUENAS 
// OS PREFIXOS sm , md e lg são usados conforme das telas vão aumentando.
    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <div className="flex flex-col items-center mx-auto min-h-screen">
                    <ThemeToggle />
                    <QuestifyTittle titulo="Bem-vindo ao Question Hub"/>

                        <div className="container grid grid-cols-1 lg:grid-cols-4 gap-8 p-4">
                            <ClassCard 
                                label="Elaborar" 
                                title="Elabore Questões" 
                                onClick={(event) => handleNavigation(event, '/formulario')}
                                imageUrl="/assets/image_card_1.png" 
                                tela="formulario"
                            />
                            <ClassCard 
                                label="Responder" 
                                title="Responda questões" 
                                onClick={(event) => handleNavigation(event, '/questoes')}
                                imageUrl="/assets/image_card_2.png" 
                                tela="questoes"
                            />

                            <ClassCard 
                                label="Visualizar" 
                                title="Questões Criadas" 
                                onClick={(event) => handleNavigation(event, '/questoes.criadas')}
                                imageUrl="/assets/image_card_3.png" 
                                tela="questoes.criadas"
                            />
                            <ClassCard 
                                label="Visualizar" 
                                title="Avaliações" 
                                onClick={(event) => handleNavigation(event, '/avaliacoes')}
                                imageUrl="/assets/image_card_4.png"
                                tela="avaliacoes"
                            />
                        </div>
                </div>
            </Template>
        </AuthenticatedPage>
    );
}

