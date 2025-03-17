'use client'
import 'flowbite';


import { Template } from "@/components/Template"

import Accordion from "@/components/about/Accordion"
import MainTitle from '@/components/MainTitle';


export default function AjudaPage() {

    return(
        <Template>
            <div className='mb-16'>
                <MainTitle titulo='Sobre Nós'/>
            </div>

            <Accordion />
        </Template>
    )
}