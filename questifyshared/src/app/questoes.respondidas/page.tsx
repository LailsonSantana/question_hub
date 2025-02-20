'use client'

import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import Titulo from "@/components/inicial/QuestifyTittle";
import TableQuestion from "@/components/questao/table/TableQuestion";
import { Template } from "@/components/Template";
import { useEffect, useState } from "react";

export default function QuestoesRespondidasPage(){

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);
      
    if (!hasMounted) {
        return null; 
    }
      
    return(
        <AuthenticatedPage>
            <Template>
                <div className="flex flex-col items-center">
                    <Titulo titulo="Questões respondidas por você"/>
                    <div className="p-16">
                        EM BREVE
                    </div>
                </div>
            </Template>
        </AuthenticatedPage>
    );
}