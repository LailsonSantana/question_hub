'use client'

import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import TableQuestion from "@/components/questao/table/TableQuestion";

export default function QuestoesUsuarioPage(){
    return(
        <AuthenticatedPage>
            <div className="p-24">
                <TableQuestion />
            </div>
        </AuthenticatedPage>
    );
}