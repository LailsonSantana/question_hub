'use client'

import TableQuestion from "@/components/questao/table/TableQuestion";
import { Template } from "@/components/Template";

export default function QuestoesCriadasPage(){
    return(
        <Template>
            <div className="p-16">
                <TableQuestion/>
            </div>
        </Template>
    );
}