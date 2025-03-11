import React from "react";

interface CardProps{
    title: string;
    content?: string;
}



const Card1:  React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="relative bg-white m-[0.5rem_0_1rem_0] p-6 rounded-md transition-shadow duration-200 hover:shadow-lg">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};



export default Card1;