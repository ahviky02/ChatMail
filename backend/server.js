import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './lib/db.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
