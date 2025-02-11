'use client'

import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import ClassCard from "@/components/inicial/Card";
import Titulo from "@/components/inicial/Titulo";
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

    return (
        <AuthenticatedPage>
            <Template>
                <div className="flex flex-col items-center h-screen">
                    <Titulo titulo="Bem-vindo ao Questify Shared"/>
                    <div className="flex flex-row">
                        <div className="grid grid-cols-4 gap-8">
                            <ClassCard 
                                label="Elaborar" 
                                title="Elabore uma questão" 
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
                </div>
            </Template>
        </AuthenticatedPage>
    );
}

