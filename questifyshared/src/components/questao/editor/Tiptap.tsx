import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Bold as BoldIcon, Italic as ItalicIcon, Underline as UnderlineIcon, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

// Definição dos props aceitos pelo editor
interface TextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void; 
  name?: string;
  value?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialContent = '', onChange , onKeyDown , name , value}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML()); // Envia o HTML atualizado para o callback
      }
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
      editor.commands.setTextSelection(0);
      setTimeout(() => {
        editor.commands.focus("end"); // Foca no final do texto para evitar bug
      }, 100);
    }
  }, [value, editor]);

  if (!editor) return null;

  // Funções para formatar o texto
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const alignLeft = () => editor.chain().focus().setTextAlign('left').run();
  const alignCenter = () => editor.chain().focus().setTextAlign('center').run();
  const alignRight = () => editor.chain().focus().setTextAlign('right').run();
  const alignJustify = () => editor.chain().focus().setTextAlign('justify').run();

  return (
    <div className="w-full border border-gray-300 rounded shadow-inner bg-white max-w-2xl mx-auto p-4 h-[380px]">
      {/* Barra de ferramentas */}
      <div className="w-full container grid grid-cols-4 sm:grid-cols-8 gap-2 mb-2 border-b pb-2 ">
        <button type='button' className="p-2 border rounded w-full" onClick={toggleBold}><BoldIcon size={18}/></button>
        <button type='button' className="p-2 border rounded w-full" onClick={toggleItalic}><ItalicIcon size={18}/></button>
        <button type='button' className="p-2 border rounded w-full" onClick={toggleUnderline}><UnderlineIcon size={18}/></button>
        <button type='button' className="p-2 border rounded w-full" onClick={alignJustify}><AlignJustify size={18}/></button>
        <button type='button' className="p-2 border rounded w-full" onClick={toggleOrderedList}><ListOrdered size={18}/></button>
        <button type='button' className="p-2 border rounded w-full" onClick={alignLeft}><AlignLeft size={18} /></button>
        <button type='button' className="p-2 border rounded w-full" onClick={alignCenter}><AlignCenter size={18} /></button>
        <button type='button' className="p-2 border rounded w-full" onClick={alignRight}><AlignRight size={18} /></button>
      </div>

      {/* Área de Edição */}
      <div >
        <EditorContent className="border-none shadow-none ring-0 focus:ring-0 outline-none" required editor={editor} onKeyDown={onKeyDown}/>
      </div>
    </div>
  );
};

export default TextEditor;







