import { useAuth } from "../user/authentication.service";
import {Question} from "./question.resource"

class QuestionService{
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/api/questions";
    auth = useAuth();

    async getAllQuestions() : Promise<Question[]>{
        const userSession = this.auth.getUserSession()

        try{
          const response = await fetch(`${this.baseUrl}`, {
            headers:{
              "Authorization": `Bearer ${userSession?.accessToken}`
            }
          });

          if (!response.ok) {
            console.error(`Erro na resposta: ${response.status} ${response.statusText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: Question[] = await response.json();
          return data;
        }
        catch(error){
          console.error('Erro na requisição:', error);
            throw error;
        }
    }

    async getQuestionsByUser(userId: number): Promise<Question[]>{
      const userSession = this.auth.getUserSession()

      try{
        const response = await fetch(`${this.baseUrl}/${userId}` , {
          headers:{
            "Authorization": `Bearer ${userSession?.accessToken}`
          }
        });
        
        if (!response.ok) {
          console.error(`Erro na resposta: ${response.status} ${response.statusText}`);
          throw new Error('Erro ao buscar questões do usuário !');
        }
        // Aqui você deixa claro o tipo da variável
        const data: Question[] = await response.json();
        return data;
      }
      catch(error){
        console.error('Erro na requisição:', error);
          throw error;
      }
    }

    async getQuestionById(id: number): Promise<Question> {
      const userSession = this.auth.getUserSession();

      try{
        const response = await fetch(`${this.baseUrl}/questionId/${id}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${userSession?.accessToken}`,
            },
        });
    
        if (!response.ok) {
          throw new Error(`Erro ao obter questão: ${response.statusText}`);
        }
        const data = await response.json();
        // Quando você tem certeza absoluta do tipo retornado você pode retornar assim
        return data as Question;
      }
      catch(error){
        console.error('Erro na requisição:', error);
          throw error;
      }
    }
    
    async getQuestionsByDisciplines(disciplines: string[]): Promise<Question[]> {
      const userSession = this.auth.getUserSession();

      try{
        const response = await fetch(
            `${this.baseUrl}/filter?disciplines=${encodeURIComponent(disciplines.join(','))}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${userSession?.accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`'Erro ao obter disciplinas: ${response.statusText}`);
        }
        const data = await response.json();

        return data;
      } catch (error) {
          console.error('Erro na requisição:', error);
          throw error;
      }
    }

    async getRating(questionId: number): Promise<number>{
      const userSession = this.auth.getUserSession()
      try{
        const response = await fetch(`${this.baseUrl}/rating/${questionId}`, {
          headers:{
            "Authorization": `Bearer ${userSession?.accessToken}`
          }
        });

        if (!response.ok) {
          console.error(`Erro na resposta: ${response.status} ${response.statusText}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: number = await response.json();
        return data;
      }
      catch(error){
        console.error('Erro na requisição:', error);
          throw error;
      }
    }

    async saveNewVersion(dados: Question , id: number): Promise<any> {
        const userSession = this.auth.getUserSession()

        try{
          const response = await fetch(`${this.baseUrl}/new-version/${id}`, {
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
          const data = await response.json();

          return data;
        }
        catch (error) {
          console.error('Erro na requisição:', error);
          throw error;
        }
    }

    
    async save(dados: Question): Promise<string> {
      const userSession = this.auth.getUserSession()

        try{
          const response = await fetch(`${this.baseUrl}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', "Authorization": `Bearer ${userSession?.accessToken}`
            } ,
            //
            body: JSON.stringify(dados),
          });
  
      
          if (!response.ok) {
            const errorData = await response.json(); // Tenta pegar a mensagem do backend
            throw new Error(errorData.error || 'Erro desconhecido');
          }
          const data = await response.json();

          return data;
        }
        catch (error) {
          let errorMessage = 'Erro desconhecido';

          if (error instanceof Error) {
              errorMessage = error.message;
          }
          console.error('Erro na requisição:', errorMessage);
          throw error;
        }
    }

    async updateRating(newRating: number, questionId: number): Promise<number>{
      const userSession = this.auth.getUserSession()
      console.log("ENVIAMOS ESSE RATE PRA ELES " , newRating)
      try{
        const response = await fetch(`${this.baseUrl}/update-rating/${newRating}/${questionId}` ,{ 
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json', "Authorization": `Bearer ${userSession?.accessToken}`
          }
          //body: JSON.stringify({ rating: newRating })
        });

        if(!response.ok){
          throw new Error('Erro ao atualizar o rating')
        }
        const data = await response.json();

        return data;
      }
      catch(error){
        console.error('Erro na requisição:', error);
        throw error;
      }
    }
}

// react hook -> useNomeFuncao
// Funções do tipo hook são usadas para gerar mudança de estado de um componente
export const useQuestionService = () => new QuestionService();