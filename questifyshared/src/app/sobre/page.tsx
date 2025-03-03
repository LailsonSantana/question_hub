'use client'
import 'flowbite';


import { Template } from "@/components/Template"

import Accordion from "@/components/about/Accordion"
import Titulo from '@/components/inicial/Titulo';


export default function AjudaPage() {

    return(
        <Template>
            <div className='mb-16'>
                <Titulo titulo='Informações'/>
            </div>

            <Accordion />
        </Template>
    )
}