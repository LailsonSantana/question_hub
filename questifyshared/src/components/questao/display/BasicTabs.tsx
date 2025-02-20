import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useCommentService } from '@/resources/comment/comment.service';
import { CommentRequest } from '@/resources/comment/commentRequest.resource';
import CommentComponent from './CommentComponent';
import RateComponent from './RateComponent';
import InputComment from './InputComment';
import { CommentResponse } from '@/resources/comment/commentResponse.resource';
import { useClassificationService } from '@/resources/classification/classification.service';
import { Classification } from '@/resources/classification/classification.resource';
import Informativo from '@/components/formulario/Informativo';
import { Question } from '@/resources/question/question.resource';
import { useAuth } from '@/resources/user/authentication.service';
import { useQuestionService } from '@/resources/question/question.service';
import { RenderIf } from '@/components/Template';
import { Link } from 'react-router-dom';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface BasicTabsProps {
  question: Question;
}

export default function BasicTabs({ question }: BasicTabsProps) {
  const [value, setValue] = React.useState(0);
  const [comments, setComments] = React.useState<CommentRequest[]>([]);
  const useServiceComment = useCommentService();
  const useServiceClassification = useClassificationService();
  const useServiceQuestion = useQuestionService();
  const auth = useAuth();
  const userSession = auth.getUserSession();

  //console.log("FORMATO DA QUESTÃO")
  console.log("A justificativa que recebemos foi" , question.justification)


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function searchComments() {
    const result = await useServiceComment.getAllComents(question.id!);
    setComments(result);
  }

  function mapperComment(comment: CommentRequest) {
    return (
      <div className="space-y-1" key={comment.text}>
        <CommentComponent text={comment.text} name={comment.nameUser} date={comment.createdAt}/>
      </div>
    );
  }

  function mapperComments() {
    return comments.map(mapperComment);
  }

  const saveClassification = async (newClassification: Classification) => {
    try {
      const location = await useServiceClassification.saveClassification(newClassification);
    }catch (error) {
      console.error("Erro ao salvar o comentário:", error);
      alert("Erro ao salvar o comentário.");
    }
  }

  const updateRate = async (ratingAndId: [number, number]) => {
    try {
      const location = await useServiceQuestion.updateRating(ratingAndId[0],ratingAndId[1]);
    }catch (error) {
      console.error("Erro ao salvar o comentário:", error);
      alert("Erro ao salvar o comentário.");
    }
  }



  const saveComment = async (comment: CommentResponse) => {
    try {
      const location = await useServiceComment.saveComment(comment);
      //alert("Comentário adicionado!");
      setComments((prevComments) => [
        ...prevComments,
        {
          text: comment.text,
          nameUser: userSession?.name!, 
          questionId: question.id!
        },
      ]);
    } catch (error) {
      console.error("Erro ao salvar o comentário:", error);
      alert("Erro ao salvar o comentário.");
    }
  };

  React.useEffect(() => {
    if (value === 0) {
      searchComments();
    }
  }, [value]);

  React.useEffect(() => {
    if (value === 1) {
      searchComments();
    }
  }, [value]);


  const query = new URLSearchParams({
    id: String(question.id)})
    .toString();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sugerir Alteração" {...a11yProps(0)} />
          <Tab label="Comentários" {...a11yProps(1)} />
          <Tab label="Avaliar Questão" {...a11yProps(2)} />
          <Tab label="Justificativa" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>

        <div className='flex flex-col items-start space-y-4'>
          <RenderIf condition={question.previousId == 0}>
            <Informativo text='Você terá a possibilidade de fazer mudanças nessa questão , vale ressaltar que após às mudanças
            a sua versão será considerada uma versão alternativa da questão principal.'
            />
            <Link to="/formulario/1"></Link>
            <a href={`/formulario?${query}`} className="text-blue-600 hover:underline m-4">Clique aqui para fazer alterações nessa questão .</a>
          </RenderIf>

          <RenderIf condition={question.previousId == 1}>
            <Informativo text='Essa função não está habilitada para questões que são versões de outras.'
            />
          </RenderIf>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <div className="mr-8 mb-8">
          <InputComment onClick={saveComment} questionId={question.id!} userId={userSession?.id!} />
        </div>

        <section className="grid grid-cols-1 space-y-10">{mapperComments()}</section>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
      <RateComponent
        onClick={(newClassification, ratingAndId) => {
          saveClassification(newClassification); // Passando o argumento necessário
          updateRate(ratingAndId); // Passando o argumento necessário
        }}
        userId={userSession?.id!}
        questionId={question.id!}
        countRating={question.countRating!}
        totalRating={question.totalRating!}
      />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        <div>{question.justification}</div>
      </CustomTabPanel>
    </Box>
  );
}




