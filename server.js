import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
import urlRoutes from './routes/urlRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());


app.use('/', urlRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

