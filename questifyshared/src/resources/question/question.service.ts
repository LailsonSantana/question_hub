import {Question} from "./question.resource"
import { useAuth } from '@/resources'

class QuestionService{
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/api/questions";
    auth = useAuth();

    async getAllQuestions() : Promise<Question[]>{
        const userSession = this.auth.getUserSession()
        const response = await fetch(`${this.baseUrl}`, {
          headers:{
            "Authorization": `Bearer ${userSession?.accessToken}`
          }
        });

        if (!response.ok) {
          console.error(`Erro na resposta: ${response.status} ${response.statusText}`);
          throw new Error(`HTTP error! status: ${response.status}`);
      }
        return await response.json();
    }

    async getByUser(userId: number): Promise<Question[]>{
      const response = await fetch(`http://localhost:8080/api/questions/${userId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar questões');
      }
      const data: Question[] = await response.json();
      return data;
    }

    // Originalmente era Promise<Question[]>  
    async getQuestionByUser(id : number) : Promise<string>{
      const userSession = this.auth.getUserSession()
          const response = await fetch(`${this.baseUrl}/?${encodeURIComponent(id)}`, {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${userSession?.accessToken}`,
            },
        });

        if (!response.ok) {
          throw new Error('Erro ao obter disciplinas');
          
        }
        else{
          const responseData = await response.json();
          console.log('Resposta do servidor:', responseData);
        }

        return response.headers.get('location') ?? '';
    }

    async getQuestionById(id: number): Promise<Question> {
      const userSession = this.auth.getUserSession();
  
      // Corrigindo a URL: não é necessário usar encodeURIComponent para o id na query
      const response = await fetch(`${this.baseUrl}/questionId/${id}`, {
          method: 'GET',
          headers: {
              "Authorization": `Bearer ${userSession?.accessToken}`,
          },
      });
  
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
          throw new Error('Erro ao obter a questão');
      }
  
      // Converte a resposta para JSON
      const responseData = await response.json();
      console.log('Resposta do servidor:', responseData);
  
      // Retorna o objeto Question
      return responseData as Question;
  }
    

    async filterQuestions(discipline : string): Promise<string>{

        console.log("DISCIPLINA ENVIADA :" , discipline)
        const userSession = this.auth.getUserSession()
          const response = await fetch(`${this.baseUrl}/filter?discipline=${encodeURIComponent(discipline)}`, {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${userSession?.accessToken}`,
            },
        });

        if (!response.ok) {
          throw new Error('Erro ao obter disciplinas');
          
        }
        else{
          const responseData = await response.json();
          console.log('Resposta do servidor:', responseData);
        }

        return response.headers.get('location') ?? '';
    }

    async save(dados: Question): Promise<string> {
        console.log("BASE URL É :",this.baseUrl)
        const userSession = this.auth.getUserSession()
        console.table(dados)
        //dados.userId = userSession!.id

        const response = await fetch(`${this.baseUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', "Authorization": `Bearer ${userSession?.accessToken}`
          } ,
          //
          body: JSON.stringify(dados),
        });

    
        if (!response.ok) {
          throw new Error('Erro ao salvar a pergunta do form');
          
        }
        else{
          const responseData = await response.json();
        console.log('Resposta do servidor:', responseData);
        }
        return response.headers.get('location') ?? '';
      }
    }
// react hook -> useNomeFuncao
// Funções do tipo hook são usadas para gerar mudança de estado de um componente
export const useQuestionService = () => new QuestionService();