require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas!'))
  .catch(err => console.error('❌ Erro ao conectar no Mongo:', err));

const InscricaoSchema = new mongoose.Schema({
  nome: String,
  email: String,
  aula: String,
  data: { type: Date, default: Date.now }
});
const Inscricao = mongoose.model('Inscricao', InscricaoSchema);

const CoreografiaSchema = new mongoose.Schema({
  nomeCoreografia: String,
  coreografo: String,
  descricao: String,
  email: String,
  videoLink: String,
  caminhoMusica: String,
  data: { type: Date, default: Date.now }
});
const Coreografia = mongoose.model('Coreografia', CoreografiaSchema);

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, 'musica-' + Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/api/inscrever', async (req, res) => {
  try {
    const novaInscricao = new Inscricao(req.body);
    await novaInscricao.save();
    
    console.log('Inscrição salva:', novaInscricao);
    res.status(201).json({ mensagem: 'Sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao salvar inscrição' });
  }
});

app.get('/api/inscricoes', async (req, res) => {
  try {
    const lista = await Inscricao.find();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar dados' });
  }
});

app.delete('/api/inscricoes/:id', async (req, res) => {
  try {
    await Inscricao.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensagem: 'Removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar' });
  }
});

app.post('/api/submeter-coreografia', upload.single('musica'), async (req, res) => {
  if (!req.file) return res.status(400).json({ mensagem: 'Faltou a música!' });

  try {
    const novaCoreografia = new Coreografia({
      ...req.body,
      caminhoMusica: req.file.path
    });
    
    await novaCoreografia.save();
    
    console.log('Coreografia salva:', novaCoreografia.nomeCoreografia);
    res.status(201).json({ mensagem: 'Coreografia recebida!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao salvar coreografia' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});