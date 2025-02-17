import AdministradorPage from '@/app/administrador/page';
import InicialPage from '@/app/inicial/page';
import Login from '@/app/login/pag';
import { useAuth } from '@/resources/user/authentication.service';
import { jwtDecode } from 'jwt-decode';

interface AuthenticatedPageProps {
    children: React.ReactNode
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({
    children
}) => {

    const auth = useAuth();
    const decodedToken: any = jwtDecode(auth.getUserSession()?.accessToken!);
    const role = decodedToken.role;

    if(!auth.isSessionValid()){
        return <Login />
    }

    //if(role == "STUDENT"){
        //return <InicialPage></InicialPage>
    //}

    //if(role=="ADMIN"){
        //return <AdministradorPage></AdministradorPage>

    //}

    return (
        <>
            {children}
        </>
    )
}