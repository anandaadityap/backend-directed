import { Sequelize } from "sequelize";

const db = new Sequelize("directed", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
