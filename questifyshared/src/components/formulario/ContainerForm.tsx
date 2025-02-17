import React from 'react';

interface ContainerFormProps{
    children: React.ReactNode
}

const ContainerForm: React.FC<ContainerFormProps> = ({children}) => {
    return (
        <div className="container flex flex-col border border-gray-300 rounded p-8 m-8 shadow-lg bg-containerColor w-full h-11/12">
            {children}
        </div>
    );
};
  
export default ContainerForm;