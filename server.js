const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const port = 3000;

const SECRET_KEY = 'sua_chave_secreta';

// Configura a pasta 'public' para servir arquivos estáticos
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/generate-token', (req, res) => { 
  const { username } = req.body; 
  if (!username) { 
    return res.status(400).json({ message: 'Nome de usuário é necessário' }); 
  } 
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' }); 
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
