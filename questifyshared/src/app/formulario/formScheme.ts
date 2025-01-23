import * as Yup from 'yup';

export interface LoginForm {
  name?:string;
  role?:string;
  email:string;
  password:string
}


export const formValidationScheme = Yup.object().shape({
  name: Yup.string().trim(),
  role: Yup.string().trim(),
  email: Yup.string().trim().required('É obrigatório incluir este campo!'),
  password: Yup.string().trim().required('É obrigatório incluir este campo!'),
});

export const formScheme : LoginForm = {email:'' , password:'' , name:'' , role:'student'}
