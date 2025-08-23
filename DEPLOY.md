# Deploy Configuration

## URLs de Produção

- **Frontend (Vercel)**: <https://team-cloud-base-interface.vercel.app/>
- **Backend (Render)**: <https://team-cloud-base-api.onrender.com/>

## Configuração de Environment

O projeto está configurado para usar diferentes URLs de API baseado no ambiente:

### Development

- API URL: `http://localhost:8080`
- WebSocket URL: `ws://localhost:8080/ws`

### Production  

- API URL: `https://team-cloud-base-api.onrender.com`
- WebSocket URL: `wss://team-cloud-base-api.onrender.com/ws`

## Como fazer deploy

### 1. Frontend na Vercel

1. Faça commit e push das mudanças para o repositório
2. A Vercel irá automaticamente detectar as mudanças e fazer o deploy
3. O build será feito com `npm run build:prod` que usa as configurações de produção

### 2. Backend na Render

O backend já está deployado na Render e configurado para aceitar CORS de qualquer origem.

## Arquivos de configuração importantes

- `src/environments/environment.ts` - Configurações de desenvolvimento
- `src/environments/environment.prod.ts` - Configurações de produção  
- `vercel.json` - Configuração de deploy na Vercel
- `angular.json` - Configuração de build do Angular com file replacements

## Testando a aplicação

Depois do deploy, você pode testar:

1. Acesse <https://team-cloud-base-interface.vercel.app/>
2. Faça login com: admin / admin123
3. Teste as funcionalidades de CRUD de projetos
4. Verifique se as chamadas à API estão funcionando corretamente

## Solução de problemas

Se a aplicação não estiver funcionando:

1. Verifique se o backend na Render está online: <https://team-cloud-base-api.onrender.com/actuator/health>
2. Verifique o console do navegador para erros de CORS ou rede
3. Confirme se as URLs nos arquivos de environment estão corretas
