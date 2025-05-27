import { Sequelize } from "sequelize";

// Supabase PostgreSQL connection string
const DB_URL = "postgresql://postgres.ukeljmnyhmndfijinjlj:abcdefghijk@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

const db = new Sequelize(DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default db;