import React from 'react';

interface LoginProps{
    toggleUserState: () => void;
}

const Login: React.FC<LoginProps> = ({ toggleUserState }) => {
    return (
        <section className="w-1/2 h-full flex items-center justify-center bg-containerColor rounded-r-md p-8 shadow-md">
            <div className="w-3/4">
                <h1 className="text-center font-bold text-2xl mb-6">Login</h1>
                
                <form>
                    <div className="grid gap-6">

                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="nome@email.com" required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
                    </div>

                    <button type="submit" className="text-white bg-gray-100 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5">
                        Entrar
                    </button>

                    <div className="flex items-start mt-4">
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
                            Não possui uma conta ?  

                            <span> </span>

                            <a href="#" onClick={(e) => {e.preventDefault();
                                    toggleUserState();
                                }} 
                                className="text-blue-600 hover:underline">
                                Inscreva-se
                            </a>.
                        </label>
                    </div>
                </form>
            </div>
        </section>
    );
};
  
export default Login;