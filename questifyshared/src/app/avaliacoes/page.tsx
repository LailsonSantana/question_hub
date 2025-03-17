'use client'

import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import MainTitle from "@/components/MainTitle";
import { Template } from "@/components/Template";
import { useEffect, useState } from "react";

export default function AvaliacoesPage(){

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
                    <MainTitle titulo="Avaliações"/>
                    <div className="p-16">
                        EM BREVE
                    </div>
                </div>
            </Template>
        </AuthenticatedPage>
    );
}