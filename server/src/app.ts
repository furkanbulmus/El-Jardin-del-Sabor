import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import menuRouter from './routes/Menu';
import authRouter from './routes/auth';
import protectedRouter from './routes/testProtected';


dotenv.config();

const app = express();
const uri = process.env.MONGODB_URI!;

app.use(cors());
app.use(express.json());
app.use('/api/menu', menuRouter);
app.use('/api/auth', authRouter);
app.use('/api', protectedRouter);

mongoose.connect(uri)
  .then(() => console.log('MongoDB bağlantısı başarılı!'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

app.get("/", (_req, res) => {
  res.send("API çalışıyor!");
});

export default app;
