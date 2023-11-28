
# NAWAITER - API
O Nawaiter API é uma API que facilita a integração com dashboard e futuramente com front end do garcom/mesa. Ele possui endpoints e métodos para acessar e interagir com os recursos e funcionalidades do aplicativo. Por exemplo, CRUD para usuário, produtos, categorias, pedidos e histórico de pedidos.




## Front end do Nawaiter

Integre a API do Nawaiter ao front-end:

[NAWAITER-DASHBOARD](https://github.com/nivaldoandrade/nawaiter-frontend-reactjs)






## Requisitos

- [Node.js*](https://nodejs.org/en);
- [Postgresql**](https://www.postgresql.org/);
- [Docker**](docker.com).

##### *Versão do node >= 18.12.0.
##### *Você pode utilizar o PostgreSQL tanto através de um container Docker quanto por meio de uma instalação nativa.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/nivaldoandrade/nawaiter-api-nodejs
```

Entre no diretório do projeto

```bash
  cd nawaiter-api-nodejs
```

Instale as dependências

```bash
  yarn
  ou
  npm install
```

Crie .env.local

```bash
 cp .env.example .env.local
```
Se o ambiente não for Linux/Mac, basta duplicar o arquivo **.env.example** e renomeá-lo para **.env.local**.

[Configuração do .ENV](#variáveis-de-ambiente)


Rodar o Docker Componse do PostgreSQL

```bash
  docker-compose up -d
```

Rodar as migrations

```bash
  yarn prisma migrate dev
  ou
  npx prisma migrate dev
```

Inicie o servidor

```bash
  yarn dev
  ou
  npm run dev
```
Por padrão, a api será iniciada na url http://localhost:3333

Usuário Admin padrão

```JSON
  usuário: admin
  senha: 12345678
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env:

`PORT` Porta na qual o servidor será executado.

`JWT_SECRET` Chave secreta utilizada para a assinatura dos tokens JWT para autenticação.

`HOSTNAME_DB` Endereço do host do banco de dados PostgreSQL.

`PORT_BD` Porta do banco de dados PostgreSQL.

`NAME_BD` Nome do banco de dados PostgreSQL.

`USERNAME_BD` Nome de usuário para autenticação no PostgreSQL.

`PASSWORD_BD` Senha associada ao nome de usuário para autenticação no PostgreSQL.

Claro, no arquivo **.env.example** você pode encontrar exemplos de valores para as variáveis de ambiente utilizadas no projeto.
## Documentação da API

### Usuário(User)

| Método | Url                | Descrição                             | Exemplo do request body válido |
| ------ | ------------------ | ------------------------------------- | ------------------------------ |
| GET    | /users/page={page} | Obter todos os usuários com paginação |                                |
| GET    | /users/{id}        | Obter um usuário pelo id              |                                |
| GET    | /me                | Obter um usuário pelo accessToken     |                                |
| POST   | /users             | Criar um usuário                      | [JSON](#create-user---users)   |
| PUT    | /users/{id}        | Atualizar um usuário pelo id          | [JSON](#update-user---usersid) |
| DELETE | /users/{id}        | Deletar um usuário pelo id            |                                |
| POST   | /signin            | Realizar login com usuário e senha    | [JSON](#login-user---signin)   |

### Mesa(Table)

| Método | Url                 | Descrição                                  | Exemplo do request body válido      |
| ------ | ------------------- | ------------------------------------------ | ----------------------------------- |
| GET    | /tables/page={page} | Obter todas as mesas com paginação         |                                     |
| GET    | /tables/{id}        | Obter uma mesa pelo id                     |                                     |
| POST   | /tables             | Criar uma mesa                             | [JSON](#create-table---tables)      |
| PUT    | /tables/{id}        | Atualizar uma mesa pelo id                 | [JSON](#update-table---tablesid)    |
| DELETE | /tables/{id}        | Deletar uma mesa pelo id                   |                                     |
| POST   | /tables/signin      | Realizar login da mesa com usuário e senha | [JSON](#login-table---tablessignin) |

### Categoria(Category)

| Método | Url                       | Descrição                                    | Exemplo do request body válido          |
| ------ | ------------------------- | -------------------------------------------- | --------------------------------------- |
| GET    | /categories?page={page}   | Obter todas as categorias com paginação      |                                         |
| GET    | /categories/{id}          | Obter uma categoria pelo id                  |                                         |
| GET    | /categories/{id}/products | Obter todos os produtos pelo id da categoria |                                         |
| POST   | /categories               | Criar uma categoria                          | [JSON](#create-category---categories)   |
| PUT    | /categories/{id}          | Atualizar uma categoria pelo id              | [JSON](#uptade-category---categoriesid) |
| DELETE | /categories/{id}          | Deletar uma categoria pelo id                |                                         |  |

### Produto(Product)

| Método | Url                   | Descrição                             | Exemplo do request body válido       |
| ------ | --------------------- | ------------------------------------- | ------------------------------------ |
| GET    | /products?page={page} | Obter todos os produtos com paginação |                                      |
| GET    | /products/{id}        | Obter um produto pelo id              |                                      |
| POST   | /products             | Criar um produto                      | [JSON](#create-product---products)   |
| PUT    | /products/{id}        | Atualizar um produto pelo id          | [JSON](#update-product---productsid) |
| DELETE | /products/{id}        | Deletar um produto pelo id            |                                      |  |

### Pedido(Order)   Create Order by Table -> /orders/table

| Método | Url                 | Descrição                            | Exemplo do request body válido                 |
| ------ | ------------------- | ------------------------------------ | ---------------------------------------------- |
| GET    | /orders?page={page} | Obter todos os pedidos com paginação |                                                |
| GET    | /orders/{id}        | Obter um pedido pelo id              |                                                |
| POST   | /orders/table       | Criar um pedido pela mesa            | [JSON](#create-order-by-table---orderstable)   |
| POST   | /orders/waiter      | Criar um pedido pelo garçom          | [JSON](#create-order-by-waiter---orderswaiter) |

### Item de pedido(OrderItem)

| Método | Url                                 | Descrição                                                    | Exemplo do request body válido |
| ------ | ----------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| GET    | /orderitems                         | Obter todos os itens de pedido                               |                                |
| GET    | /orderitems/{id}                    | Obter um item de pedido                                      |                                |
| PATCH  | /orderitems/{id}/in-production      | Atualizar um item de pedido para o status IN_PRODUCTION      |                                |
| PATCH  | /orderitems/{id}/done               | Atualizar um item de pedido para o status DONE               |                                |
| PATCH  | /orderitems/{id}/delivered-to-table | Atualizar um item de pedido para o status DELIVERED_TO_TABLE |                                |
| PATCH  | /orderitems/{id}/cancel             | Atualizar um item de pedido para o status CANCEL             |                                |


### Pedido Finalizado(Completed Order)

| Método | Url                          | Descrição                                       | Exemplo do request body válido |
| ------ | ---------------------------- | ----------------------------------------------- | ------------------------------ |
| GET    | /completedorders?page={page} | Obter todos os pedidos finalizado com paginação |                                |
| GET    | /completedorders/{id}        | Obter um pedido finalizado pelo id              |                                |
| POST   | /completedorders/{ID}        | Criar uma pedido finalizado pelo id             |                                |  |

## Exemplo do request body válido

##### Create User -> /users

```json
{
	"name": "admin",
	"username": "admin",
	"password": "12345678",
	"role": "admin"
}
```

##### Update User -> /users/{id}

```JSON
{
	"name": "garcom",
	"username": "garcom",
	"password": "12345678",
	"role": "garcom"
}
```
OBS: **password** pode ser null se caso não queria alterar a senha.
##### Login User -> /signin

```JSON
{
	"username": "admin",
	"password": "12345678"
}
```

##### Create Table -> /tables

```json
{
	"name": "Mesa 1",
	"username": "mesa1",
	"password": "12345678"
}
```

##### Update Table -> /tables/{id}

```JSON
{
	"name": "Mesa 1",
	"username": "mesa1",
	"password": "12345678"
}
```
OBS: **password** pode ser null se caso não queria alterar a senha.

##### Login Table -> /tables/signin

```JSON
{
	"username": "mesa2",
	"password": "12345678"
}
```

##### Create Category -> /categories

```JSON
{
	"name": "Sobremesa",
	"icon": "🍫"
}
```

##### Uptade Category -> /categories/{id}

```JSON
{
	"name": "Sobremesa",
	"icon": "🍫"
}
```

##### Create Product -> /products
###### **NECESSÁRIO ADICIONAR O *CONTENT-TYPE: MULTIPART/FORM-DATA* NO HEADER DA REQUISIÇÃO.**

```JSON
{
	"name": "Suco de Laranja 300ml ",
	"description": "Descrição do suco de laranja",
	"imagePath": "suco-de-laranja.png",
	"price": 40,
	"ingredients": [{"name": "laranja", "icon": "🍊"},{"name": "água", "icon": "💧"}],
	"category": "id-category"
}
```
OBS: **description e ingredients** são opcionais.

##### Update Product -> /products/{id}
###### **NECESSÁRIO ADICIONAR O *CONTENT-TYPE: MULTIPART/FORM-DATA* NO HEADER DA REQUISIÇÃO.**

```JSON
{
	"name": "Suco de Laranja 300ml ",
	"description": "Descrição do suco de laranja",
	"imagePath": "suco-de-laranja.png",
	"price": 40,
	"ingredients": [{"name": "laranja", "icon": "🍊"},{"name": "água", "icon": "💧"}],
	"category": "id-category"
}
```
OBS: **description e ingredients** são opcionais e o **imagePath** pode ser formato string ou arquivo. Se caso não queria alterar a imagem é só retornar o nome da imagem no imagePath.

##### Create Order by Table -> /orders/table

```JSON
{
	"items":[
		{"productId": "6066f771-4530-4cba-a190-acfc0923d0e2", "quantity": 3},
		{"productId": "add9eee4-724b-42f1-9e55-d40fc91fcde4", "quantity": 1, "observation": 'Só gelo"}
	]
}
```
OBS: **observation** é opcional.

##### Create Order by Waiter -> /orders/waiter

```JSON
{
	"tableId": "6da998d6-df98-45b1-87b7-202f8dfc1011",
	"items":[
		{"productId": "cc4f901f-d438-4da7-a991-5f51c09d3bc3", "quantity": 2, "observation": "Sem cebola"},
		{"productId": "d2aa732f-ac07-4ae9-ba86-9484a74e05a5", "quantity": 2}
	]
}
```
OBS: **observation** é opcional.
## Insomnia
Se caso preferir, utilize o [insomnia](https://insomnia.rest/) para realizar as chamadas no endpoints.

#### Importar projeto para Insomnia
Tutorial de como importar projeto para o insomnia no [Importing and exporting data.](https://docs.insomnia.rest/insomnia/import-export-data)
Download da collection dentro da pasta [apiClient.](apiClient/)
## Stack utilizada

- Node >= 18.12.0;
- Prisma;
- Bcryptjs;
- Class-transformer;
- Class-validator;
- Dayjs;
- Express;
- Jsonwebtoken;
- Multer;
- Socket IO;
- Tsyringe.

