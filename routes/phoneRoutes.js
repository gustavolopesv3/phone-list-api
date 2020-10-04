import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;
const router = express.Router();

//retornar todos os contatos
router.get('/', async (req, res) => {
  const data = JSON.parse(await readFile('models/phonelist.json'));
  res.send(data.phones);
});

//criar novo contato
router.post('/', async (req, res) => {
  let newContact = req.body;
  const data = JSON.parse(await readFile('models/phonelist.json'));
  newContact = { id: data.nextId, ...newContact };
  data.nextId++;
  data.phones.push(newContact);
  await writeFile('models/phonelist.json', JSON.stringify(data, null, 2));
  res.send(newContact);
});

//atualizar contato
router.put('/', async (req, res) => {
  let updateContact = req.body;
  const data = JSON.parse(await readFile('models/phonelist.json'));
  const index = data.phones.findIndex((a) => a.id === updateContact.id);
  data.phones[index] = updateContact;
  await writeFile('models/phonelist.json', JSON.stringify(data, null, 2));
  res.send(updateContact);
});

export default router;
