'use client'

import { Template } from "@/components/Template";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { formScheme, formValidationScheme, LoginForm } from "../formulario/formScheme";
import { User } from "@/resources/user/user.resource";
import { useNotification } from "@/components/notification";
import { InputContext } from "@/components/input/InputContext";
import { useAuth } from "@/resources/user/authentication.service";
import Titulo from "@/components/inicial/Titulo";
import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import Button from "@/components/button/Button";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { InputText } from "@/components/input/InputText";
import { useContextService } from "@/resources/contextgpt/context.service";
import RadioButton from "@/components/button/RadioButton";
  
export default function AdministradorPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [context, setContext] = useState("");
  const auth = useAuth();
  const contextService = useContextService();
  //const decodedToken: any = jwtDecode(auth.getUserSession()?.accessToken!);
  const token = auth.getUserSession()?.accessToken;
  const notification = useNotification();
  const router = useRouter();

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
    initialValues: formScheme,
    validationSchema: formValidationScheme,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    setHasMounted(true);

    if (!token) {
      console.error("Nenhum token encontrado. Redirecionando...");
      router.push("/inicial"); // Redireciona se não houver token
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken.role !== "ADMIN") {
        console.warn("Usuário não autorizado. Redirecionando...");
        router.push("/inicial");
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      router.push("/inicial"); // Redireciona se o token for inválido
    }
  }, [token, router]);

  if (!hasMounted) {
    return null;
  }

  async function onSubmit(values: LoginForm) {
    const user: User = {
      email: values.email,
      name: values.name,
      password: values.password,
      role: values.role,
    };
    console.log("O ENVIO FOI REALIZADO");
    try {
      await auth.save(user);
      notification.notify("Usuário cadastrado com sucesso!", "success");
      resetForm();
    } catch (error: any) {
      const message = error?.message;
      notification.notify(message, "error");
    }
  }

  async function defineContext(){
    contextService.saveContext(context)
    notification.notify("Contexto definido com sucesso!", "success");
    setContext("")
  }

  return (
    
      <Template>
          <section className="container flex flex-col md:flex-row gap-12 w-full max-w-6xl p-4 m-auto">
            {/* Seção do formulário de cadastro de usuário */}
            <div className="flex-1 bg-containerColor shadow-lg rounded-lg p-8 border border-gray-300 content-evenly">
              <Titulo titulo="Cadasto de Usuário" />
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <InputText
                    type="name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Digite o nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <InputText
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Digite o email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <InputText
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Digite a senha"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Tipo de Usuário
                  </label>
                  <select
                      id="role"
                      name="role"
                      value={values.role}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      >
                      <option value="student">Aluno</option>
                      <option value="teacher">Professor</option>
                  </select>
                </div>
                <div className="mt-8">
                <Button type="submit" label="Adicionar" color="bg-[#5F53A0] hover:bg-[#362975]"/>
                </div>

              </form>
            </div>

            {/* Divisória visível */}
            <div className="hidden md:block border-l border-gray-300 mx-6"></div>

            {/* Seção de definição de contexto */}
            <div className="w-full flex-1 bg-containerColor shadow-lg rounded-lg p-8 border border-gray-300">
              <Titulo titulo="Definição de Contexto" />
              <InputContext context={context} setContext={setContext}/>
              
              <div className="flex flex-col items-center mt-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Selecione o modelo de IA que será usado.
                </label>
              </div>
              <div className="flex flex-col items-center mt-4 mb-8">
                <RadioButton />
              </div>
              
                <Button label="Definir" type="submit" onClick={defineContext} color="bg-[#5F53A0] hover:bg-[#362975]" />

            </div>
          </section>

      </Template>
    
  );
}
