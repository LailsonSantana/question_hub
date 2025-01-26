import { useAuth } from "../user/authentication.service";
import { Classification } from "./classification.resource";

class ClassificationService{

    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/api/classifications";
    auth = useAuth();

    async saveClassification(dados: Classification): Promise<String>{

        const userSession = this.auth.getUserSession()
        console.table(dados)

        const response = await fetch(`${this.baseUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', "Authorization": `Bearer ${userSession?.accessToken}`
          } ,

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

    async getClassification(userId: number , questionId: number): Promise<String>{

      const userSession = this.auth.getUserSession()
      const response = await fetch(`${this.baseUrl}/${questionId}/${userId}`, {
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
}


export const useClassificationService = () => new ClassificationService();