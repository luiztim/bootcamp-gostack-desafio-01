const express = require("express");

const server = express();

const port = 3000;

server.use(express.json());

const projetos = [];

var theID = 0;

var requestCount = 0;

//verifica se já existe projeto com o título proposto
//antes de fazer o cadastro
function checkForExistingProjectByTitle(req, res, next) {
  const { title } = req.body;

  const project = projetos.find(p => p.title === title);

  if (project) {
    return res
      .status(400)
      .json({ error: `Oops !! Project '${title}' already exists !!` });
  }

  return next();
}

//verifica se o ID do projeto existe
function checkForExistingProjectByID(req, res, next) {
  const { id } = req.params;

  const project = projetos.find(p => p.id == id);

  if (!project) {
    return res
      .status(400)
      .json({ error: `Oops !! Project ID#'${id}' does not exists !!` });
  }

  return next();
}

server.use((req, res, next) => {
  requestCount++;
  console.log(`Requisições totais: ${requestCount}`);
  return next();
});

server.get("/", (req, res) => {
  res.send(
    "<p><h1>Desafio 01. Conceitos do NodeJS</h1></p>" +
      "<p>Crie uma aplicação do zero utilizando Express.</p>" +
      "<p>Essa aplicação será utilizada para armazenar projetos e suas tarefas.</p>" +
      "<p><h2>Rotas</h2></p>" +
      "<ul><li>" +
      "<p><code>POST /projects</code>: Cria um novo projeto. Formato do body: " +
      "<code>{title: 'nomeDoProjeto'}</code></li></p>" +
      "<i>Obs.: no desafio proposto, é preciso fornecer o ID como parâmetro do body.<br>" +
      "Porém, achei melhor que o código crie o ID automaticamente ;-)</i>" +
      "<li><p><code>GET /projects</code>: Rota que lista todos projetos e suas tarefas;</li></p>" +
      "<li><p><code>PUT /projects/:id</code>: A rota altera apenas o título do projeto com o " +
      "<code>id</code> presente nos parâmetros da rota</li></p>" +
      "<li><p><code>DELETE /projects/:id</code>: A rota deve deletar o projeto com o " +
      "<code>id</code> presente nos parâmetros da rota</li></p>" +
      "<li><p><code>POST /projects/:id/tasks</code>: A rota deve receber um campo " +
      "<code>title</code> e armazenar uma nova tarefa no array de tarefas de um projeto " +
      "específico escolhido através do <code>id</code> presente nos parâmetros da rota</li></p>" +
      "</ul>" +
      "<p><h3>Total de Requisicoes: " +
      requestCount +
      "</h3></p>"
  );
});

//Rota para cadastrar novos projetos --> body {"title": "nomeDoProjeto"}
server.post("/projects", checkForExistingProjectByTitle, (req, res) => {
  // no desafio proposto, o usuario fornece o ID como parâmetro do body.
  // Porém, achei melhor que o código crie o ID automaticamente,
  // deixando para o usuario, apenas a preocupação de fornecer
  // um nome (titulo) para o projeto

  theID++;

  var id = theID;

  const { title } = req.body;

  const tempProject = {
    id,
    title,
    tasks: []
  };

  projetos.push(tempProject);

  return res.json(projetos);
});

//Rota para adicionar tarefas nos projetos --> body {"title": "tarefa"}
server.post("/projects/:id/tasks", checkForExistingProjectByID, (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const project = projetos.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projetos);
});

//altera Titulo de Projeto existente
server.put(
  "/projects/:id",
  checkForExistingProjectByID,
  checkForExistingProjectByTitle,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projetos.find(p => p.id == id);

    project.title = title;

    return res.json(projetos);
  }
);

// apaga o registro
server.delete("/projects/:id", checkForExistingProjectByID, (req, res) => {
  const { id } = req.params;
  const project = projetos.find(p => p.id == id);

  projetos.splice(project, 1);

  return res.send();
});

//retorna todos os projetos
server.get("/projects", (req, res) => {
  if (projetos.length > 0) return res.json(projetos);
  return res.status(200).json({ warning: "There is no project to show" });
});

if (server.listen(port)) {
  console.log("Escutando na port: " + port);
}
