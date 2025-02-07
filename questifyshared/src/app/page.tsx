'use client'

import { useAuth } from "@/resources/user/authentication.service";
import LoginPage from "./login/page";
import InicialPage from "./inicial/page";

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
