'use client'

import { useNotification } from "@/components/notification";
import { Template } from "@/components/Template";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { formScheme, formValidationScheme, LoginForm } from "../formulario/formScheme";
import { AccessToken, Credentials } from "@/resources/user/user.resource";
import { useAuth } from "@/resources/user/authentication.service";
import { useEffect, useState } from "react";
import Titulo from "@/components/inicial/Titulo";
import { InputText } from "@/components/input/InputText";

export default function LoginPage() {


    const auth = useAuth();
    const token = auth.getUserSession()?.accessToken;

    useEffect(() => {
        if(token){
            router.push("/inicial");
        }
    },[token])

    const notification = useNotification();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: formValidationScheme,
        onSubmit: onSubmit
    });

    
    // Se o usuário estiver logado e tentar voltar para tela de login ele será redirecionado
    // Para tela inicial

    async function onSubmit(values: LoginForm){
        setLoading(true)
        const credentials: Credentials = { email: values.email, password: values.password }
        try {
            const accessToken: AccessToken = await auth.authenticate(credentials);
            auth.initSession(accessToken);
            
            router.push("/inicial")
            setLoading(false)
            setTimeout(() => {
                notification.notify("LOGIN EFETUADO COM SUCESSO","success")
            }, 600);
            
        } catch(error: any){
            setLoading(false)
            const message = error?.message;
            notification.notify(message, "error")
        } 
    }

    return (
        
        <Template loading={loading}>
            <section className="flex justify-center w-11/12 m-auto">

                <div className="hidden lg:flex flex-1 bg-buttonColor rounded-l-md p-8 shadow-md border-r border-gray-300">
                    <img src="/assets/login.png"  alt="Imagem ilustrativa" className="w-fullobject-cover" />
                </div>

                {/* Seção de login */}
                <div className="flex-1 flex items-center justify-center bg-containerColor rounded-r-md p-8 shadow-md">
                    <div className="w-3/4">
                    <Titulo titulo="User Login"/>
                        
                        <form onSubmit={handleSubmit}>
                            
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <InputText 
                                        id='email'
                                        value={values.email}
                                        onChange={handleChange} 
                                        placeholder="nome@email.com"
                                        />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                                <InputText
                                       type="password"
                                       id='password'
                                       value={values.password}
                                       onChange={handleChange}
                                       placeholder="•••••••••" />
                            </div>

                            <button type="submit" className="text-white bg-[#7D6ED4] hover:bg-titllecolor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5">
                                Entrar
                            </button>

                            <div className="flex justify-center mb-6 mt-2">
                                <a href="#" className="text-blue-600 hover:underline text-sm">Esqueceu a senha ?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Template>
        
    );
}
