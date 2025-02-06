import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Classification } from '@/resources/classification/classification.resource';
import { useEffect, useState } from 'react'
import { useClassificationService } from '@/resources/classification/classification.service';
import { useQuestionService } from '@/resources/question/question.service';


interface RateComponentProps{
  onClick: (classification: Classification) => void;
  userId: number;
  questionId: number;
  countRating: number;
  totalRating: number;
}

const RateComponent: React.FC<RateComponentProps> = ({userId, questionId, countRating, totalRating, onClick}) => {

  const [hasMounted, setHasMounted] = useState(false);
  const [rating, setRating] = React.useState<number | null>(0.0); // Estado para armazenar o valor da avaliação
  const [mediaRating, setMediaRating] = React.useState<number | null>(0.0)
  const useServiceClassification = useClassificationService();
  const useServiceQuestion = useQuestionService();

  useEffect(() => {
          setHasMounted(true);
          findClassification();
          console.log("QUESTION ID" , userId)
          //console.log("USUÁRIO E ID :",questionId,userId)
      }, []);
  
      if (!hasMounted) {
          return null; 
      }

  async function findClassification(){
    const result = await useServiceClassification.getClassification(questionId , userId);
    const result1 = await useServiceQuestion.updateRating(Number(result), questionId)
    setRating(Number(result))
    setMediaRating(result1)
    //console.table(result);
  }

  async function getMediaRating(){
    
    //setMediaRating(result);
    //console.log("Media Rating")
    //console.table(result)
  }
  

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue); // Atualiza o estado com o valor da avaliação
    const newClassification = new Classification(newValue! , userId , questionId)
    onClick(newClassification);
  };


  return (
    <Stack spacing={1} direction="row" alignItems="center" className="w-full">
      <div className="w-1/2">
        <Rating
          name="half-rating"
          value={rating}
          precision={0.5}
          onChange={handleRatingChange}/>
        <p>Sua avaliação: {rating}</p>
      </div>
  
      <div className="w-1/2">
        <Rating
          name="half-rating-read"
          value={mediaRating}
          precision={0.5}
          readOnly
        />
        <p>Média de avaliação: {mediaRating}</p>
      </div>
  </Stack>
  );
}

export default RateComponent;

