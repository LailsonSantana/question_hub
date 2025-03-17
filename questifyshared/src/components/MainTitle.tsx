import React from 'react';

interface MainTitleProps {
  titulo: string;
}

const MainTitle: React.FC<MainTitleProps> = ({ titulo }) => {
  return (
    <div className="flex items-center justify-center mb-16 mt-8 p-4">
      
      <h1 className="text-4xl sm:text-5xl font-bold text-[#4D4482] drop-shadow-md">
        {titulo}
      </h1>
      
    </div>
  );
};

export default MainTitle;