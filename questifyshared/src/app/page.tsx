'use client'

import { useAuth } from "@/resources/user/authentication.service";
import InicialPage from "./inicial/page";
import LoginPage from "./login/page";

export default function Home() {

  const auth = useAuth();
  const user = auth.getUserSession();

  if(!user){
    return(<LoginPage></LoginPage>)
  }
  else{
    return(<InicialPage></InicialPage>)
  }
}
