'use client';

import { useEffect, useRef, useState } from 'react';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Importar Editor dinamicamente para evitar execução no lado do servidor
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
    ssr: false, // Desativa a renderização do lado do servidor para este componente
    loading: () => <div>Carregando editor...</div>,
});

interface TextEditorProps {
    onChange: (content: string) => void;
    onValidationError?: (error: string) => void; // Callback para erro de validação
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange, onValidationError}) => {
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Função para capturar mudanças no estado do editor
    const onEditorStateChange = (newState: EditorState) => {
        if (!isMounted.current) return false;
        setEditorState(newState);
        const contentState = newState.getCurrentContent();
        validateContent(contentState); // Valida o conteúdo sempre que o estado do editor muda
    };
    

    // Função para validar o conteúdo (PROBLEMA NÃO ESTÁ AQUI)
    const validateContent = (content: ContentState) => {
        if (!isMounted.current) return true;
        const plainText = content.getPlainText().trim(); // Extrai o texto sem formatação
        if (!plainText) {
            onValidationError?.('O texto não pode estar vazio.'); // Chama o callback se definido
            console.log("PARECE QUE TEMOS UM TEXTO VAZIO")
            return false;
        }
        onChange(JSON.stringify(convertToRaw(content))); // Envia o conteúdo se válido
        return true;
    };
    

    return (
        <div className="border border-gray-300 rounded shadow-inner bg-white w-10/12 h-full m-auto">
            {/*style={{ width: '580px', height: '460px' }}*/}
            <div className="text-editor h-full">
                <div className="editor h-full overflow-y-auto p-6">
                    <Editor
                        editorState={editorState}
                        //onEditorStateChange={onEditorStateChange}
                        placeholder="Digite o enunciado da sua questão aqui:"
                        toolbar={{
                            options: ['inline', 'list', 'textAlign', 'link', 'history'],
                            inline: { inDropdown: false, options: ['bold', 'italic', 'underline'] },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TextEditor;



