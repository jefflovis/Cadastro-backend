const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, "clientes.json");

// Garante que o arquivo existe
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// Rota de cadastro via POST
app.post("/cadastrar", (req, res) => {
  const novoCliente = req.body;

  const dados = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  dados.push(novoCliente);
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));

  res.json({ mensagem: "Cliente cadastrado com sucesso!" });
});

// Rota GET para visualizar todos os clientes (opcional)
app.get("/clientes", (req, res) => {
  const dados = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(dados);
});

app.get("/", (req, res) => {
  res.send("API de cadastro de clientes está rodando ✅");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
