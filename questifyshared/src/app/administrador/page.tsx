'use client'

import { Template } from "@/components/Template";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { formScheme, formValidationScheme, LoginForm } from "../formulario/formScheme";
import { User } from "@/resources/user/user.resource";
import { useNotification } from "@/components/notification";
import { InputText } from "@/components/input";
import { InputContext } from "@/components/input/InputContext";
import { useAuth } from "@/resources/user/authentication.service";
import Titulo from "@/components/inicial/Titulo";
import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import Button from "@/components/button/Button";

export default function AdministradorPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const auth = useAuth();
  const notification = useNotification();
  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
    initialValues: formScheme,
    validationSchema: formValidationScheme,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  return (
    <AuthenticatedPage>
      <Template>
          <section className="container flex flex-col md:flex-row gap-12 w-full max-w-6xl">
            {/* Seção do formulário de cadastro de usuário */}
            <div className="flex-1 items-center bg-containerColor shadow-lg rounded-lg p-8 border border-gray-300">
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
                      console.log("Novo valor selecionado:", e.target.value);
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="student">Aluno</option>
                    <option value="teacher">Professor</option>
                  </select>
                </div>

                <Button type="submit" label="Adicionar"></Button>

              </form>
            </div>

            {/* Divisória visível */}
            <div className="hidden md:block border-l border-gray-300 mx-6"></div>

            {/* Seção de definição de contexto */}
            <div className="flex-1 bg-containerColor shadow-lg rounded-lg p-8 border border-gray-300">
              <Titulo titulo="Definição de Contexto" />
              <InputContext />
            </div>
          </section>

      </Template>
    </AuthenticatedPage>
  );
}
