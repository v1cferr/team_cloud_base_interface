# Frontend - Sistema de Gerenciamento de Projetos de Automação Residencial

Software front-end desenvolvido em **TypeScript + Angular 17** para simples gerenciamento de projetos de automação residencial.

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
  - Download: <https://nodejs.org/en/download>
  - Para verificar a versão: `node --version`
- **npm** (geralmente vem com Node.js)
  - Para verificar a versão: `npm --version`
- **Angular CLI** (opcional, mas recomendado)
  - Instalação: `npm install -g @angular/cli`
  - Para verificar a versão: `ng version`

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd team_cloud_base_interface
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o backend (obrigatório)

Este frontend **requer** que o backend API esteja rodando:

- Certifique-se de que o projeto `team_cloud_base_api` esteja executando em `http://localhost:8080`
- PostgreSQL deve estar configurado e rodando
- API documentation disponível em: `http://localhost:8080/swagger-ui/index.html`

## 🏃‍♂️ Executando o Projeto

### Servidor de Desenvolvimento

```bash
npm start
# ou
ng serve
# ou para abrir automaticamente no navegador
ng serve --open
```

A aplicação estará disponível em: **<http://localhost:4200/>**

### Build de Produção

```bash
npm run build
# ou
ng build
```

Os arquivos de build serão gerados em `dist/test-front-app/`

### Build de Desenvolvimento com Watch

```bash
npm run watch
# ou
ng build --watch --configuration development
```

## 🧪 Testes

### Executar testes unitários

```bash
npm test
# ou
ng test
```

## 🛠️ Comandos Úteis de Desenvolvimento

### Gerar novos componentes/serviços

```bash
ng generate component nome-do-componente
ng generate service nome-do-servico
ng generate module nome-do-modulo
```

## 🏗️ Estrutura do Projeto

```bash
src/
├── app/
│   ├── app.component.*          # Componente raiz
│   ├── projects/                # Componente de listagem de projetos
│   ├── project-detail/          # Componente de detalhes do projeto
│   ├── project.service.ts       # Serviço de API
│   ├── project.ts              # Interface do modelo Project
│   └── app.module.ts           # Módulo principal
├── assets/                     # Arquivos estáticos
├── index.html                  # Página HTML principal
└── main.ts                     # Ponto de entrada da aplicação
```

## 🔗 Integração com Backend

- **URL Base da API**: `http://localhost:8080/projects`
- **Operações disponíveis**: GET, POST, PUT, DELETE
- **Formato**: JSON
- **Headers**: `Content-Type: application/json`

## 💻 Ambiente de Desenvolvimento

### VS Code (recomendado)

Extensões recomendadas:

- Angular Language Service
- TypeScript Hero
- Prettier - Code formatter

### Configurações incluídas

- Tarefas de build e teste configuradas (`.vscode/tasks.json`)
- Configurações de debug para Chrome (`.vscode/launch.json`)
- Extensões recomendadas (`.vscode/extensions.json`)

## ⚙️ Configurações Técnicas

- **Angular**: 17.3.0
- **TypeScript**: 5.4.2
- **Target**: ES2022
- **Modo Strict**: Habilitado
- **Testes**: Jasmine + Karma

## 🐛 Solução de Problemas

### Erro de conexão com API

- Verifique se o backend está rodando em `http://localhost:8080`
- Confirme se o PostgreSQL está ativo e configurado
- Teste a API diretamente via Swagger UI

### Problemas de dependências

```bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Problemas de CORS

Certifique-se de que o backend está configurado para aceitar requisições do `http://localhost:4200`

## 📝 Notas Adicionais

- Projeto configurado em **português**
- Utiliza arquitetura NgModule tradicional (não standalone components)
- Interface simples de CRUD sem sistema de rotas
- Comunicação em tempo real com backend via RxJS Observables
