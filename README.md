# bootcamp-gostack-desafio-01

| Nome | Resumo | 
|:------------:|:---------| 
| Desafio 01 Bootcamp    | Aplicação **REST API** feita do zero utilizando Express em **NodeJS** - Conceitos do NodeJS. |

# Descrição do Desafio

Crie uma aplicação do zero utilizando Express.

Essa aplicação será utilizada para armazenar projetos e suas tarefas.

## Rotas

- `POST /projects`: A rota deve receber `id` e `title` dentro corpo de cadastrar um novo projeto dentro de um array no seguinte formato: `{ id: "1", title: 'Novo projeto', tasks: [] }`; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com àspas duplas.

- `GET /projects`: Rota que lista todos projetos e suas tarefas;

- `PUT /projects/:id`: A rota deve alterar apenas o título do projeto com o `id` presente nos parâmetros da rota;

- `DELETE /projects/:id`: A rota deve deletar o projeto com o `id` presente nos parâmetros da rota;

- `POST /projects/:id/tasks`: A rota deve receber um campo `title` e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do `id` presente nos parâmetros da rota;

### Exemplo

Se eu chamar a rota `POST /projects` repassando `{ id: 1, title: 'Novo projeto' }` e a rota `POST /projects/1/tasks` com `{ title: 'Nova tarefa' }`, meu array de projetos deve ficar assim:

```js
[
  {
    id: "1",
    title: 'Novo projeto',
    tasks: ['Nova tarefa']
  }
]
```

## Middlewares

- Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL que verifica se o projeto com aquele ID existe. Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;

- Crie um middleware global chamado em todas requisições que imprime (`console.log`) uma contagem de quantas requisições foram feitas na aplicação até então;

## Observações

- No desafio original era necessário fornecer o ID para criar um novo projeto. 
  Porém, achei melhor que o código criasse o ID automaticamente. Sendo assim, na rota `POST /projects` só é necessário fornecer `{ title: 'Nome do Projeto' }`
- Adicionei tb uma rota "home" descrevendo o desafio e o total de requisicoes

[![github](http://ap.imagensbrasil.org/images/2018/12/10/github-logo-1.png) ](http://www.github.com/luiztim)
[![linkedin](http://ap.imagensbrasil.org/images/2018/12/10/linkedin-1.png)](https://www.linkedin.com/in/luiz-tim-73154012a/)
