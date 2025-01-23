'use client'

import { Template } from "@/components/Template";
import { useAuth } from "@/resources";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { formScheme, formValidationScheme, LoginForm } from "../formulario/formScheme";
import { User } from "@/resources/user/user.resource";
import { useNotification } from "@/components/notification";
import { InputText } from "@/components/input";
import InputComment from "@/components/questao/display/InputComment";
import { InputContext } from "@/components/input/InputContext";
import Titulo from "@/components/inicial/Titulo";

export default function AdministradorPage() {

  const [hasMounted, setHasMounted] = useState(false);
  const auth = useAuth();
  const notification = useNotification();
  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
          initialValues: formScheme,
          validationSchema: formValidationScheme,
          onSubmit: onSubmit
  });

  useEffect(() => {
          setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null; 
  }

  async function onSubmit(values: LoginForm){

    const user: User = { email: values.email, name: values.name, password: values.password , role: values.role }
    console.log("O ENVIO FOI REALIZADO")
      try {
        await auth.save(user);
        notification.notify("Success on saving user!", "success");
        resetForm();
      } catch(error: any){
        const message = error?.message;
        notification.notify(message, "error")
      }  
  }

  return (
    <Template>
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Titulo titulo="Administrador"></Titulo>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <InputText type="name" id="name" value={values.name} onChange={handleChange}
                         placeholder="Digite o nome completo" />

            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <InputText type="email" id="email" value={values.email} onChange={handleChange}
                         placeholder="Digite o email" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
             <InputText type="password" id="password" value={values.password} onChange={handleChange}
                         placeholder="Digite a senha" />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
              <select
                id="role"
                name="role"
                value={values.role}
                onChange={(e) => {
                  handleChange(e);
                  console.log("Novo valor selecionado:", e.target.value);
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="student">Aluno</option>
                <option value="teacher">Professor</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Adicionar 
            </button>
          </form>
        </div>
      </section>

      <section>

        {/*Seção para definição de contexto*/}
        <InputContext></InputContext>
      </section>

      {/*Seção que permite ver o atual contexto*/}
      <section>

      </section>
    </Template>
  );
}
