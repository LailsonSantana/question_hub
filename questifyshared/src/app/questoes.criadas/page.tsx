'use client'

import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import Titulo from "@/components/inicial/QuestifyTittle";
import TableQuestion from "@/components/questao/table/TableQuestion";
import { Template } from "@/components/Template";
import { useEffect, useState } from "react";

export default function QuestoesCriadasPage(){

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
                    <Titulo titulo="Questões criadas por você"></Titulo>
                    <div className="p-16">
                        <TableQuestion/>
                    </div>
                </div>
            </Template>
        </AuthenticatedPage>
    );
}