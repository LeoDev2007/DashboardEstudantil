DashboardEstudantil

React

📝 Descrição
O DashboardEstudantil é uma aplicação web moderna e intuitiva, construída com React, projetada para capacitar estudantes com um hub centralizado para gerenciar sua vida acadêmica. Com uma interface limpa e responsiva, o dashboard permite que os usuários acompanhem de forma eficiente horários, tarefas e progresso educacional, tornando a experiência de aprendizado mais produtiva e organizada.

✨ Funcionalidades
🕸️ Web

🛠️ Stack Tecnológica
⚛️ React

📦 Principais Dependências

@chakra-ui/react: ^3.32.0

@emotion/react: ^11.14.0

@emotion/styled: ^11.14.1

framer-motion: ^12.34.0

next-themes: ^0.4.6

react: ^19.2.0

react-dom: ^19.2.0

react-hook-form: ^7.71.1

react-icons: ^5.6.0

react-markdown: ^10.1.0

react-router-dom: ^7.13.0

🚀 Comandos para Rodar

dev: npm run dev

build: npm run build

lint: npm run lint

preview: npm run preview

📁 Estrutura do Projeto

```
eslint.config.js
index.html
package.json
vite.config.js
public/
    vite.svg
src/
    App.jsx
    Articles/
        biologia.md
        filosofia.md
        fisica.md
        geografia.md
        historia.md
        ingles.md
        matematica.md
        portugues.md
        quimica.md
        redacao.md
        sociologia.md
    Contexts/
        AuthContext.jsx
        ScheduleContext.jsx
    RootLayout.jsx
    assets/
        react.svg
    components/
        DashboardStatics.jsx
        DeleteDialog.jsx
        Drawner.jsx
        Header.jsx
        LoginForm.jsx
        RegisterForm.jsx
        ScreenLoading.jsx
        ToggleTheme.jsx
        ui/
            color-mode.jsx
            password-input.jsx
            provider.jsx
            toaster.jsx
            tooltip.jsx
    data/
        DataSubjects.jsx
    index.css
    main.jsx
    pages/
        AppLayout.jsx
        AuthPage.jsx
        CreateScheduleForm.jsx
        Dashboard.jsx
        Lesson.jsx
        Profile.jsx
    routes/
        RouteGuard.jsx
        router.jsx
    styles/
        Auth.module.css
        AuthPage.module.css
        CreateScheduleForm.module.css
        Dashboard.module.css
        DashboardStatics.module.css
        DeleteDialog.module.css
        Drawer.module.css
        Header.module.css
        Lesson.module.css
        Profile.module.css
```

🛠️ Configuração para Desenvolvimento

Instalar Node.js (v18+ recomendado)

Instalar dependências: npm install ou yarn install

Iniciar servidor de desenvolvimento: npm run dev (ver scripts no package.json)

👥 Contribuindo
Contribuições são bem-vindas! Veja como você pode ajudar:

Faça um fork do repositório

Clone seu fork:

git clone https://github.com/LeoDev2007/DashboardEstudantil.git

Crie uma nova branch:

git checkout -b feature/sua-feature

Faça commit das alterações:

git commit -am 'Adiciona alguma feature'

Envie para sua branch:

git push origin feature/sua-feature

Abra um pull request

⚠️ Certifique-se de que seu código siga as diretrizes de estilo do projeto e inclua testes, quando aplicável.
