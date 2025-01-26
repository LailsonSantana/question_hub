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
import { useAuth } from '@/resources'
import { useClassificationService } from '@/resources/classification/classification.service';
import { Classification } from '@/resources/classification/classification.resource';
import QuestionComponent from './QuestionComponent';
import Informativo from '@/components/formulario/Informativo';

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
  questionId: number;
}


export default function BasicTabs({ questionId }: BasicTabsProps) {
  const [value, setValue] = React.useState(1);
  const [comments, setComments] = React.useState<CommentRequest[]>([]);
  const useServiceComment = useCommentService();
  const useServiceClassification = useClassificationService();
  const useAutenticator = useAuth();
  const userSession = useAutenticator.getUserSession();
  const userId = userSession?.id;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function searchComments() {
    const result = await useServiceComment.getAllComents(questionId);
    setComments(result);
    console.table(result)
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

  const saveClassification = async (classification: Classification) => {
    try {
      const location = await useServiceClassification.saveClassification(classification);
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
          questionId: questionId
        },
      ]);
    } catch (error) {
      console.error("Erro ao salvar o comentário:", error);
      alert("Erro ao salvar o comentário.");
    }
  };

  React.useEffect(() => {
    if (value === 1) {
      searchComments();
    }
  }, [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sugerir Alteração" {...a11yProps(0)} />
          <Tab label="Comentários" {...a11yProps(1)} />
          <Tab label="Avaliar Questão" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className='flex flex-col items-start space-y-4'>
          <Informativo text='Você terá a possibilidade de fazer mudanças nessa questão , vale ressaltar que após às mudanças
          a sua versão será considerada uma versão alternativa da questão principal.'
          />
          <a href="http://localhost:3000/formulario" className="text-blue-600 hover:underline m-4">Clique aqui para fazer alterações nessa questão .</a>
        </div>
        {/*<textarea className="textarea" placeholder="Write your thoughts here..."></textarea>*/}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <div className="mr-8 mb-8">
          <InputComment onClick={saveComment} questionId={questionId} userId={userId!} />
        </div>

        <section className="grid grid-cols-1 space-y-10">{mapperComments()}</section>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <RateComponent onClick={saveClassification} userId={userId!} questionId={questionId}/>
      </CustomTabPanel>
    </Box>
  );
}




