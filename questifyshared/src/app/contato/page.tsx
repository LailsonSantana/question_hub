'use client'

import Titulo from "@/components/inicial/Titulo"
import { Template } from "@/components/Template"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function ContatoPage() {

    return(
        <Template>
            <section className="flex flex-col items-center">
                <div className="flex flex-col mb-8">
                    <Titulo titulo="Entre em contato"/>
                </div>

                <div className="flex space-x-64">
                    <span className="flex flex-col items-center">
                        <a>
                            <EmailIcon fontSize="large" />
                        </a>

                        <a className="mt-2">
                            lailsonbit@gmail.com
                        </a>
                    </span>

                    <span className="flex flex-col items-center">
                        <a href="https://linkedin.com/in/seu-usuario" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon fontSize="large" />
                        </a>
                        <a href="https://www.linkedin.com/in/lailson-santana-dev/" className="mt-2">
                            linkedin.com/in/lailson-santana-dev/
                        </a>
                    </span>

                    <span className="flex flex-col items-center">
                        <a href="https://github.com/LailsonSantana" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon fontSize="large" />
                        </a>
                        <a className="mt-2">
                            github.com/LailsonSantana
                        </a>
                    </span>
                </div>
            </section>
        </Template>
    )
}