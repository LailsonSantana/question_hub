import React from 'react';

interface EnunciadoProps {
  text: string
}

const Enunciado: React.FC<EnunciadoProps> = ({text}) => {

  //const contentState = convertFromRaw(JSON.parse(text)); // Aqui assumo que `text` é o JSON salvo
  //const htmlContent = stateToHTML(contentState);
  const textContent = text.replace(/<[^>]+>/g, '');

  return (

    <div>
      {/*<<span className='text-md font-bold' dangerouslySetInnerHTML={{ __html: htmlContent }} />*/}
        {<span dangerouslySetInnerHTML={{ __html: text! }} />}
    </div>
  );
};

export default Enunciado;