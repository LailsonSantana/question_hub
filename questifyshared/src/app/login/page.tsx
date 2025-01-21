'use client'

import { useNotification } from "@/components/notification";
import { Template } from "@/components/Template";
import { useAuth } from "@/resources";
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import { formScheme, formValidationScheme, LoginForm } from "../formulario/formScheme";
import { AccessToken, Credentials } from "@/resources/user/user.resource";

export default function LoginPage() {

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
        initialValues: formScheme,
        //validationSchema: formValidationScheme,
        onSubmit: onSubmit
    });


    async function onSubmit(values: LoginForm){
        
        console.log("Valores enviados:", values);
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
            <div className="flex items-center justify-center h-[650px]">
                {/* Seção de informações */}
                <div className="w-2/5 h-full bg-titllecolor rounded-l-md p-8 shadow-md border-r border-gray-300">
                    {/*<h1 className="font-bold text-2xl mb-4 text-white">Bem-vindo ao Questify Shared</h1>
                    <p className="text-lg mb-6 text-white">
                        Questify é uma plataforma de elaboração de questões objetivas que visa viabilizar a construção
                        de conhecimento em um ambiente autosustentável e colaborativo. Crie sua conta e comece agora mesmo!
                    </p>*/}
                    <div className="items-center">
                        <img src="https://cdn.dribbble.com/userupload/10846737/file/original-7ee25fe929f1d993a2716f984ff0d86c.jpg?resize=1024x768&vertical=center" alt="Imagem ilustrativa" className="w-full h-92 object-cover rounded-md" />
                    </div>
                    
                </div>

                {/* Seção de cadastro */}
                <section className="w-1/2 h-full flex items-center justify-center bg-containerColor rounded-r-md p-8 shadow-md">
                    <div className="w-3/4">
                        <h1 className="text-center font-bold text-2xl mb-6">LOGIN</h1>
                        
                        <form onSubmit={handleSubmit}>
                            
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input name="email" onChange={handleChange} value={values.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="nome@email.com" required />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                                <input name="password" onChange={handleChange} value={values.password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
                            </div>


                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5">
                                Entrar
                            </button>

                            <div className="flex items-start justify-center mb-6 mt-2">

                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
                                    <a href="#" className="text-blue-600 hover:underline">Esqueceu a senha ?</a>
                                </label>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </Template>
    );
}
