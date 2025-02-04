# Transaction-Log-Frontend

## 📌 Descrição
O **Transaction-Log-Frontend** é um SPA com princípios de Clean Arch e SOLID da aplicação de uma transação financeira, com a funcionalidade de registrar ações de um usuário para cada ação feita (CREATE, UPDATE, DELETE), permitindo também, ser visualizado em forma de histórico de ações.

## 🚀 Executar Projeto
- Requisitos:
  - `Node.js V18+`

- Clone o repositório git:
```
git clone https://github.com/RafaelNagatomo/Transaction-Log-Frontend.git
```
- Instale as dependências:
```
npm install
```
- Inicie em modo de desenvolvimento:
```
npm run dev
```
- Abra o navegador:
  - Abra o navegador com a url `http://localhost:5173`

## 🛠 Tecnologias Utilizadas

- React ⚛️ + TypeScript 🟦
- Axios 🔗
- Material UI 🎨
- Styled Components 🎨
- Moment 📆
- React Router 🚏
- Zustand ⚡
- Jest 📝

### 📡 Infra
- Docker 🐳
- Nginx 🌐

## 📂 Estrutura do Projeto
```
TransferX/
├── frontend/  # React/TypeScript
│   ├── src/
|   |   ├──__testes__/  # Testes com Jest
│   │   ├── application/  # Regras de negócio
│   │   ├── domain/  # Modelos e entidades
│   │   ├── infra/  # Configuração de API e Axios
│   │   ├── presentation/  # Componentes e rotas
│   │   └── ...
└── README.md  # Documentação
```

## 🧪 Testes
```sh
npm run test:coverage
```
---

👨‍💻 **Desenvolvido por [Rafael Nagatomo](https://github.com/RafaelNagatomo)**

