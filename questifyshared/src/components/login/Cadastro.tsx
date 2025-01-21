import React from 'react';

interface CadastroProps{

}

const Cadastro: React.FC<CadastroProps> = () => {
    return (
        <section className="w-1/2 h-full flex items-center justify-center bg-containerColor rounded-r-md p-8 shadow-md">
            <div className="w-3/4">
                <h1 className="text-center font-bold text-2xl mb-6">Cadastre-se</h1>
                
                <form>
                    <div className="grid gap-6 mb-6">
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nome" required />
                        </div>

                        <div>
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Sobrenome</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Sobrenome" required />
                        </div>

                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="nome@email.com" required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirme a senha</label>
                        <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
                    </div>

                    <div className="flex items-start mb-6">
                        <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />

                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
                            Eu concordo com os <a href="#" className="text-blue-600 hover:underline">termos e condições</a>.
                        </label>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5">
                        Cadastrar
                    </button>
                </form>
            </div>
        </section>
    );
};
  
export default Cadastro;