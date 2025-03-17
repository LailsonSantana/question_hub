'use client'

import ButtonTutorial from "@/components/button/ButtonTutorial"
import MainTitle from "@/components/MainTitle"
import { Template } from "@/components/Template"

export default function AjudaPage() {

    return(
        <Template>
            <div className="flex flex-col items-center">
                <MainTitle titulo='Ajuda'/>
                <ButtonTutorial />
            </div>
        </Template>
    )
}