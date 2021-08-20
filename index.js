const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var tarefas = ["Primeira tarefa", "Segunda tarefa"];

app.get("/", (req, res) => {
  res.render("index", { tarefasList: tarefas });
});

app.get("/delete/:id", (req, res) => {
  tarefas = tarefas.filter((tarefa, index) => {
    return index != req.params.id;
  });
  res.redirect("/");
  res.render("index", { tarefasList: tarefas });
});

app.post("/post", (req, res) => {
  tarefas.push(req.body.tarefa);
  res.redirect("/");
  res.render("index", { tarefasList: tarefas });
});

app.get("/sobre", (req, res) => {
  res.render("sobre", {});
});

app.get("*", (req, res) => {
  res.render("index", {});
});

app.listen(3000, () => {
  console.log("Servidor rodando...");
});
