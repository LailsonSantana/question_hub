import React from "react";

interface ButtonProps{
    onClick?: (event : any) => void;
    label?: string;
    type?: "submit" | "button" | "reset" | undefined
}
//className="px-8 mt-4 py-2 bg-[#818cf8] text-white rounded-md shadow hover:bg-[#3730a3]">
const Button: React.FC<ButtonProps> = ({onClick,label,type} : ButtonProps) => {
    return(
        <button className="w-full text-white dark:text-dark-text bg-buttonColor dark:bg-dark-buttonColor hover:bg-[#362975] focus:ring-4 focus:ring-blue-300 rounded-lg text-md p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        
                type={type}
                onClick={onClick}>
                { label }
        </button>
    );
}

export default Button;