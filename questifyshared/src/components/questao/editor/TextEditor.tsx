'use client';

import { useEffect, useState } from 'react';
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

const TextEditor: React.FC<TextEditorProps> = ({ onChange, onValidationError }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isMounted, setIsMounted] = useState(false);

    // Verifica se o componente está montado
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    // Função para capturar mudanças no estado do editor
    const onEditorStateChange = (newState: EditorState) => {
        if (!isMounted) return; // Não atualiza o estado se o componente não estiver montado
        setEditorState(newState);
    };

    // Valida o conteúdo sempre que o estado do editor muda
    useEffect(() => {
        if (!isMounted) return; // Não valida se o componente não estiver montado

        const contentState = editorState.getCurrentContent();
        const plainText = contentState.getPlainText().trim(); // Extrai o texto sem formatação

        if (!plainText) {
            onValidationError?.('O texto não pode estar vazio.'); // Chama o callback se definido
            return;
        }

        onChange(JSON.stringify(convertToRaw(contentState))); // Envia o conteúdo se válido
    }, [editorState, onChange, onValidationError, isMounted]);

    return (
        <div className="border border-gray-300 rounded shadow-inner bg-white max-w-2xl mx-auto">
            <div className="text-editor">
                <div className="editor p-6">
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
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