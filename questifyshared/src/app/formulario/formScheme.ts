import * as Yup from 'yup';

export interface LoginForm {
  name?:string;
  email?:string;
  password?:string
}



// Corrigido o campo 'enunciado' para 'statement'
export const formValidationScheme = Yup.object().shape({
  name: Yup.string().trim().required('É obrigatório incluir este campo!'),
  email: Yup.string().trim().required('É obrigatório incluir este campo!'),
  password: Yup.string().trim().required('É obrigatório incluir este campo!'),
});

export const formScheme : LoginForm = {email:'' , name:'', password:''}
