import { Sequelize } from "sequelize";


const sequelize = new Sequelize('tugas2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false, // optional, untuk mematikan log query
});

export default sequelize;
