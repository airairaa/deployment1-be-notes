import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./routes/AuthRoute.js";
import NotesRoute from "./routes/NotesRoute.js";
import sequelize from './config/Database.js';

sequelize.authenticate()
  .then(() => console.log('✅ Connected to Supabase PostgreSQL successfully.'))
  .catch(err => console.error('❌ Connection error:', err));



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Daftarkan route dengan prefix /api
app.use("/api/auth", AuthRoute);
app.use("/api", NotesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
