import { useAuth } from "../user/authentication.service";

class ContextService{
    baseURL : string = process.env.NEXT_PUBLIC_API_URL + '/api/users';
    auth = useAuth();

    async saveContext(context : string) : Promise<void>{
      console.log("ESTAMOS ENVIANDO :", context)
        const userSession = this.auth.getUserSession()
        try{
            const response = await fetch(`${this.baseURL}/setContext`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', "Authorization": `Bearer ${userSession?.accessToken}`
              } ,
              //
              body: JSON.stringify(context),
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
}

export const useContextService = () => new ContextService();