import React from "react";

interface InputTextProps{
    style?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    label?: string;
    placeholder?: string;
    id?: string;
    value?: string
    type?: string
}
//
export const InputText: React.FC<InputTextProps> = ({
    onChange , style , placeholder , id , value , type = "text"
} : InputTextProps) => {
    return(
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1" 
               required
               type={type}
               onChange={onChange}
               placeholder={placeholder}
               id={id}
               value={value}
        />
        
    );
}