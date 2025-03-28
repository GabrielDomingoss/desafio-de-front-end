# 🌤 WeatherCity

## Sobre o Projeto

WeatherCity é uma aplicação desenvolvida com Next.js, React e Tailwind CSS que permite consultar e exibir informações detalhadas sobre o clima atual e previsões para diferentes cidades ao redor do mundo utilizando a API OpenWeather.

## Principais Funcionalidades

- **Listagem de Cidades:** Visualize e selecione facilmente as cidades disponíveis.
- **Detalhes do Clima:** Exibição das condições climáticas atuais, temperaturas mínima e máxima, velocidade do vento, umidade e horários do nascer e pôr do sol.
- **Previsão Detalhada:** Visualize previsões para diferentes períodos do dia, como madrugada, manhã, tarde e noite.

## Tecnologias Usadas

- **React**
- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Jest e React Testing Library** para testes
- **Axios** para comunicação com APIs externas
- **Docker**
- **Vercel**


## Pré-requisitos

- Node.js >= 18.x
- npm ou yarn

## Como executar o projeto

### Instalação

Clone o repositório:

```bash
git clone https://github.com/GabrielDomingoss/desafio-de-front-end.git
cd desafio-de-front-end/weather-city
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

### Configuração de variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com a seguinte variável:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=sua_chave_da_api
```

Obtenha sua chave da API no site oficial [OpenWeather](https://openweathermap.org/api).

### Execução local

```bash
npm run dev
# ou
npm start
# ou
yarn dev
# ou
yarn
```

A aplicação estará disponível em: `http://localhost:3000`

## Testes

Execute os testes com cobertura usando:

```bash
npm run test
# ou
yarn test:coverage
```

Para verificar a cobertura de testes:

```bash
npm run test:coverage
# ou
yarn test:coverage
```

---

## 🐳 Executar com Docker

### Pré-requisitos

- Docker instalado ([Docker Desktop](https://docs.docker.com/get-docker/))
- Docker Compose ([Docker Compose](https://docs.docker.com/compose/install/))

### Configuração Docker

**Dockerfile** já incluso no projeto:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**docker-compose.yml**:

```yaml
version: '3.9'

services:
  weather-city:
    container_name: weather-city
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_OPENWEATHER_API_KEY: ${NEXT_PUBLIC_OPENWEATHER_API_KEY}
```

### Execução Docker

1. Crie um arquivo `.env` na raiz com a variável:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=sua_chave_da_api
```

2. Execute com Docker Compose:

```bash
docker compose up --build
```

3. Acesse o projeto em:

```
http://localhost:3000
```

---

## 🌐 Acesso ao Site

A aplicação está disponível online através do Vercel, permitindo acesso rápido e fácil:

- [Acessar WeatherCity no Vercel](https://weather-city-8bh58w4kt-gabrieldomingoss-projects.vercel.app)

---

## Estrutura do Projeto

```
weather-city
├── public
├── src
│   ├── assets
│   ├── hooks
│   ├── pages
│   │   ├── city
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── services
│   ├── styles
│   ├── types
│   └── utils
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── jest.setup.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Autor

Desenvolvido por **[Gabriel Domingos](https://github.com/GabrielDomingoss)**