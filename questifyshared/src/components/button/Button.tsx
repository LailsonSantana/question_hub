import { Tooltip } from "@mui/material";
import React, { useState } from "react";

interface ButtonProps{
    onClick?: (event : any) => void;
    label?: string;
    type?: "submit" | "button" | "reset" | undefined
    isTooltipOpen?: boolean
    tooltipText?: string

}
const Button: React.FC<ButtonProps> = ({onClick,label,type,isTooltipOpen, tooltipText} : ButtonProps) => {
    return(
        <Tooltip title={tooltipText} arrow open={isTooltipOpen}>
            <button className="w-full text-white dark:text-dark-text bg-buttonColor dark:bg-dark-buttonColor hover:bg-[#362975] focus:ring-4 focus:ring-blue-300 rounded-lg text-md p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type={type}
                    onClick={onClick}>
                    { label }
            </button>                                    
        </Tooltip>
        
    );
}

export default Button;