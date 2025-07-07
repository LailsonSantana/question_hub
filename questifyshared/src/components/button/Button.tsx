import { Tooltip } from "@mui/material";
import React, { useState } from "react";

interface ButtonProps{
    onClick?: (event : any) => void;
    label?: string;
    type?: "submit" | "button" | "reset" | undefined
    isTooltipOpen?: boolean
    tooltipText?: string
    color?: string;

}
const Button: React.FC<ButtonProps> = ({onClick,label,type,isTooltipOpen, tooltipText, color} : ButtonProps) => {
    return(
        <Tooltip title={tooltipText} arrow open={isTooltipOpen}>
            
            <button className={`w-full text-white rounded-lg text-md p-2.5 focus:outline-none 
                    ${color} hover:bg-${color}`}
                    type={type}
                    onClick={onClick}>
                    { label }
            </button>                                    
        </Tooltip>
    );
}

export default Button;