'use client'

import { useNotification } from "@/components/notification";
import { Template } from "@/components/Template";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { formScheme, formValidationScheme, LoginForm } from "../formulario/formScheme";
import { AccessToken, Credentials } from "@/resources/user/user.resource";
import { InputText } from "@/components/input";
import { useAuth } from "@/resources/user/authentication.service";

export default function LoginPage() {

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: formValidationScheme,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginForm){
        
        const credentials: Credentials = { email: values.email, password: values.password }
        try {
            const accessToken: AccessToken = await auth.authenticate(credentials);
            auth.initSession(accessToken);
            router.push("/inicial")
        } catch(error: any){
            const message = error?.message;
            notification.notify(message, "error")
        } 
    }

    return (
        <Template>
            <section className="flex justify-center w-11/12 m-auto">
                {/* Seção de informações */}
                <div className="flex-1 bg-buttonColor rounded-l-md p-8 shadow-md border-r border-gray-300">
                    {/*<h1 className="font-bold text-2xl mb-4 text-white">Bem-vindo ao Questify Shared</h1>
                    <p className="text-lg mb-6 text-white">
                        Questify é uma plataforma de elaboração de questões objetivas que visa viabilizar a construção
                        de conhecimento em um ambiente autosustentável e colaborativo. Crie sua conta e comece agora mesmo!
                    </p>*/}
                    <div className="items-center">
                        <img src="/assets/login.png"  alt="Imagem ilustrativa" className="w-fullobject-cover rounded-md" />
                    </div>
                    
                </div>

                {/* Seção de login */}
                <div className="flex-1 flex items-center justify-center bg-containerColor rounded-r-md p-8 shadow-md">
                    <div className="w-3/4">
                        <h1 className="text-[rgb(77,68,130)] text-center font-bold text-3xl mb-16">User Login</h1>
                        
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

                            <div className="flex items-start justify-center mb-6 mt-2">

                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
                                    <a href="#" className="text-blue-600 hover:underline">Esqueceu a senha ?</a>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Template>
    );
}
