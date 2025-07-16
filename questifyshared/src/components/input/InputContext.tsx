import React from "react";
import Informativo from "../feedback/Informativo";

interface InputContextProps{
    context : string
    setContext: (value: string) => void;
}
//
export const InputContext: React.FC<InputContextProps> = ({context, setContext} : InputContextProps) => {
    return(

        <form>
            <Informativo text="Neste campo você deve definir qual será o contexto ou a informação inicial que será passada para o chat
            GPT para que ele possa analisar o enunciado que será enviado pelos alunos" />
            <div>
                {/*<div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">*/}
                <label htmlFor="context" className="sr-only">Contexto :</label>
                    <textarea 
                        id="context" 
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        rows={4} 
                        className="w-full h-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400 px-4 py-2" 
                        placeholder="Defina o contexto" 
                        required
                    ></textarea>
            </div>
        </form>  
    );
}