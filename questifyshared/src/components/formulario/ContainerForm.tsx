import React from 'react';

interface ContainerFormProps{
    children: React.ReactNode
}

const ContainerForm: React.FC<ContainerFormProps> = ({children}) => {
    return (
        <div className="container flex flex-col border border-gray-300 rounded p-4 shadow-lg m-4 bg-containerColor w-1/2 h-[570px]">
            {children}
        </div>
    );
};
  
export default ContainerForm;