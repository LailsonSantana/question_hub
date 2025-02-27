'use client'

import { useAuth } from '@/resources/user/authentication.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import Logo from './Logo';

interface TemplateProps{
    children: React.ReactNode
}

export const Template: React.FC<TemplateProps> = (props: TemplateProps) => {

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null; // Isso evita o erro de "hydration" até que o componente seja montado no cliente
    }
    return (
        <>
          <div className="min-h-screen flex flex-col bg-backgroundColor">
            <Header />
      
            <div className="container mx-auto mt-4 sm:mt-8 py-4 sm:px-4 md:px-8 lg:px-16 flex-grow overflow-y-auto">
              {props.children}
            </div>
      
            <Footer />
      
            <ToastContainer
              position={window.innerWidth < 768 ? "top-center" : "top-right"}
              autoClose={8000}
              hideProgressBar={false}
              draggable={false}
              closeOnClick
              pauseOnHover
              theme="light"
              icon={false}
            />
          </div>
        </>
    )
}

interface RenderIfProps{
    condition?: boolean;
    children?: React.ReactNode;
}

export const RenderIf: React.FC<RenderIfProps> = ({condition = true , children}) => {

    if(condition){
        return children;
    }
    return null;
}

const Header: React.FC = () => {

    const auth = useAuth();
    const user = auth.getUserSession();
    const router = useRouter();

    function logout(){
        auth.invalidadeSession();
        router.push('/login')
    }
    <RenderIf condition={!!user}>
        <div className='flex-items-center'>
            <div className='relative'>
                <span className='w-64 py-3 px-6 text-md'>
                    Olá {user?.name}
                </span>

                <span className='w-64 py-3 px-6 text-sm'>
                    <a href='#' onClick={logout}>
                        Sair
                    </a>
                </span>
            </div>
        </div>
    </RenderIf>

    return(
        <header className="bg-backgroundHeaderAndFooter text-white py-3" > 
            <div className="container mx-auto flex justify-between items-center px-4">
            
                <Link href='/inicial'>
                    <h1 className="text-3xl font-bold">Question Hub</h1>
                </Link>
                
            </div>
        </header>
    )
}

const Footer: React.FC = () => {
    return(
        <footer className="bg-backgroundHeaderAndFooter text-white py-4 mt-8 ">
            <div className="container mx-auto text-center">
                © 2025 Lailson Santana . Este projeto está licenciado sob a MIT License.
            </div>
        </footer>
    )
}
