'use client'

import ClassCard from "@/components/inicial/Card";
import { Template } from "@/components/Template";
import { useRouter } from "next/navigation";



export default function InicialPage() {
    const router = useRouter();

    const handleNavigation = (event : any, path : string) => {
        // Aqui você pode acessar o evento de clique
        router.push(path)
    };

    return (
        <Template>
            <div className="flex flex-col items-center h-screen">
                <h1 className="text-3xl font-bold mb-16 text-titllecolor mt-8">Bem-vindo ao Questify Shared</h1>
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
                            imageUrl="/assets/created.png" 
                        />
                    </div>
                </div>
            </div>
        </Template>
    );
}

