import { CommentResponse } from '@/resources/comment/commentResponse.resource';
import React, { useState } from 'react';

interface InputCommentProps{
    onClick: (comment: CommentResponse) => void;
    userId: number;
    questionId: number;
    
}

const InputComment: React.FC<InputCommentProps> = ({onClick, userId, questionId}) => {
    const [commentText, setCommentText] = useState<string>("");

    // Função para lidar com a submissão do comentário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();  // Previne o comportamento padrão do formulário

        const newComment = new CommentResponse(commentText, userId , questionId)
        onClick(newComment);  // Chama a função `saveComment` passando o comentário criado
        setCommentText("");   // Limpa o campo após a submissão
    };
    //w-full mb-4 
    return (
        <form onSubmit={handleSubmit}>
            <div className="border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div>
                    <label htmlFor="comment" className="sr-only">Seu comentário</label>
                    <textarea 
                        id="comment" 
                        rows={4} 
                        className="w-full text-sm text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400 px-4 py-2 placeholder:opacity-50" 
                        placeholder="Escreva um comentário..." 
                        required
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}  // Atualiza o estado quando o usuário digita
                    ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button type="submit" 
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-buttonColor rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                            >
                        Comentar
                    </button>
                </div>
            </div>
        </form>   
    );
};
  
export default InputComment;