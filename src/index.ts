import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import livrosRouter from './routes/livros';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI || '';

app.use(express.json());

mongoose.connect(mongodbUri)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.get("/", (req, res) => {
    res.send("Start");
})

app.use('/livros', livrosRouter);

app.listen(PORT, () => {
    console.log("Api online na porta " + PORT);
})