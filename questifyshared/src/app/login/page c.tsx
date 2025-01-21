'use client';

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

    // Configuração do Formik
    const formik = useFormik<LoginForm>({
        
        initialValues: formScheme, // Valores iniciais do formulário
        validationSchema: formValidationScheme, // Validação com schema do Formik
        onSubmit: async (values) => {
            // Função de envio do formulário
            console.log("Valores enviados:", values);''
            const credentials: Credentials = { email: values.email, password: values.password };
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                router.push("/inicial");
            } catch (error: any) {
                const message = error?.message || "Erro desconhecido.";
                notification.notify(message, "error");
            }
        },
    });

    return (
        <Template>
            <div className="flex items-center justify-center h-[650px]">
                {/* Seção de informações */}
                <div className="w-2/5 h-full bg-titllecolor rounded-l-md p-8 shadow-md border-r border-gray-300">
                    <div className="items-center">
                        <img 
                            src="https://cdn.dribbble.com/userupload/10846737/file/original-7ee25fe929f1d993a2716f984ff0d86c.jpg?resize=1024x768&vertical=center" 
                            alt="Imagem ilustrativa" 
                            className="w-full h-92 object-cover rounded-md" 
                        />
                    </div>
                </div>

                {/* Seção de login */}
                <section className="w-1/2 h-full flex items-center justify-center bg-containerColor rounded-r-md p-8 shadow-md">
                    <div className="w-3/4">
                        <h1 className="text-center font-bold text-2xl mb-6">LOGIN</h1>
                        
                        {/* Formulário */}
                        <form onSubmit={formik.handleSubmit}>
                            {/* Campo de Email */}
                            <div className="mb-6">
                                <label 
                                    htmlFor="email" 
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Email
                                </label>
                                <input 
                                    id="email"
                                    name="email" // Adicionando o "name" para o Formik funcionar
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} // Marca o campo como visitado
                                    value={formik.values.email}
                                    className={`bg-gray-50 border ${
                                        formik.touched.email && formik.errors.email 
                                            ? 'border-red-500' 
                                            : 'border-gray-300'
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    placeholder="nome@email.com"
                                    required
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                                )}
                            </div>

                            {/* Campo de Senha */}
                            <div className="mb-6">
                                <label 
                                    htmlFor="password" 
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Senha
                                </label>
                                <input 
                                    id="password"
                                    name="password" // Adicionando o "name" para o Formik funcionar
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} // Marca o campo como visitado
                                    value={formik.values.password}
                                    className={`bg-gray-50 border ${
                                        formik.touched.password && formik.errors.password 
                                            ? 'border-red-500' 
                                            : 'border-gray-300'
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    placeholder="•••••••••"
                                    required
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                                )}
                            </div>

                            {/* Botão de envio */}
                            <button 
                                type="submit" 
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5"
                            >
                                Entrar
                            </button>

                            <div className="flex items-start justify-center mb-6 mt-2">
                                <label 
                                    htmlFor="remember" 
                                    className="ml-2 text-sm font-medium text-gray-900"
                                >
                                    <a href="#" className="text-blue-600 hover:underline">Esqueceu a senha?</a>
                                </label>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </Template>
    );
}

