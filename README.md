# 📌 Plataforma Question Hub  

Question Hub é uma plataforma web criada como parte do meu projeto de 
conclusão de curso, a ideia principal é permitir que alunos criem suas próprias questões
objetivas como forma de exercitar a construção de conhecimento e colaborar para 
a criação de um banco de dados com os mais diversos estilos de questões.
  

## 🚀 Tecnologias Utilizadas 
- ⚙️ **Back-end**: Java e Spring Boot. 
- 🖥️ **Front-end**: React, Tailwind CSS, Next e Material UI.
- 🛠️ **Outros**: Docker e PostgresSQL.

## 💡 Funcionalidades principais

### 👤 Autenticação de usuários
- Login com senhas criptografadas 
- Geração de token JWT 

### 🎓 Questões
- Possibilidade de criar questões informando o enunciado e cinco alternativas  
- Possiblidade de vizualizar todas a questões criadas
- Possibilidade de responder as questões disponíveis
- Possibilidade de avaliar e comentar as questões disponíveis

### 🖧 Estrutura do Backend
```txt
src/
 ├── main/
 │   ├── java/com/example/questifysharedapi/
 │   │   ├── config/                → Configuração
 │   │   ├── controller/            → Tratamento de requisições
 │   │   ├── dto/                   → Objetos DTO
 │   │   ├── exception/             → Exceções personalizadas
 │   │   ├── mapper/                → Mapeamento de objetos
 │   │   ├── model/                 → Entidades da aplicação
 │   │   ├── repository/            → Camada de persistência
 │   │   ├── service/               → Lógica da aplicação
 │   │   └── QuestifysharedapiApplication.java
 │   └── resources/
 │       ├── application.yml
 │       └── schema.sql (opcional)
 └── test/                          → Testes unitários
```

### 🖧 Estrutura do Frontend
```txt
src/
 ├── app/
 │   │   ├── administrador/        → Módulo da página do administrador
 │   │   ├── ajuda/                → Módulo da página de ajuda
 │   │   ├── avaliacoes/           → Módulo da página de avaliações
 │   │   ├── contato/              → Módulo da página de contato
 │   │   ├── formulario/           → Módulo da página de criação de questões
 │   │   ├── inicial/              → Módulo da página inicial
 │   │   ├── login/                → Módulo da página de login
 │   │   ├── questoes/             → Módulo da página de questões
 │   │   ├── questoes.criadas/     → Módulo da página de questões criadas
 │   │   ├── sobre/                → Módulo da página sobre
 ├── components/
 │   │   ├── about/ 
 │   │   ├── button/              → Componentes do tipo button
 │   │   ├── feedback/ 
 │   │   ├── formulario/ 
 │   │   ├── inicial/ 
 │   │   ├── input/ 
 │   │   ├── notification/
 │   │   ├── questao/
 ├── resources/
 │   │   ├── classification/ 
 │   │   ├── comment/ 
 │   │   ├── contextgpt/ 
 │   │   ├── question/
 │   │   ├── user/
 ```

 
## 📦 Mais informações  
```bash
git clone https://github.com/LailsonSantana/question_hub.git
📝 Licença
Este projeto está sob a licença MIT.
