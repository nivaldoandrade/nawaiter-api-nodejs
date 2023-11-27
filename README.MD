# <p style="margin-top: 16px" align="center">API V2.0 - NAWAITER </p>

NAWAITER API é uma API que facilita a integração do NAWAITER APP com outros sistemas e serviços.Ela possui endpoints e métodos para acessar e interagir com os recursos e funcionalidades do aplicativo. Por exemplo, CRUD para usuário, produtos, categorias, pedidos e histórico de pedidos.

## **Requisitos**

---

Você irá precisar:

- [Node.js](https://nodejs.org/en);
- [Docker](docker.com);

## **Passo a Passo**

---


```bash
## Clonar o repositório
git clone https://github.com/nivaldoandrade/nawaiter-api

## Acessar a pasta nawaiter-api
cd nawaiter-api/

## Mudar para branch v2.0
git checkout v2.0

## Instalar as libs
yarn

## Rodar o Docker Componse do PostgreSQL
docker-compose up -d

## Rodar as migrations
yarn prisma migrate dev

## Iniciando a API
yarn dev

##Usuário Admin padrão
usuário: admin
senha: 1234567
```
