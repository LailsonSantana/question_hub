'use client'


import ButtonTutorial from "@/components/button/ButtonTutorial"
import Card1 from "@/components/Card1"
import { Template } from "@/components/Template"


export default function AjudaPage() {

    return(
        <Template>
            

            <div className="flex flex-col items-center">
                <Card1 title="Card Teste" content="Esse é um card de teste"></Card1>
                <ButtonTutorial />
            </div>
        </Template>
    )
}