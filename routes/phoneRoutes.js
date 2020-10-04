import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;
const router = express.Router();

//retornar todos os contatos
router.get('/', async (req, res) => {
  const data = JSON.parse(await readFile('models/phonelist.json'));
  res.send(data.phones);
});

export default router;
