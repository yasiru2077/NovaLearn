import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "faydro",
  database: "novalearn",
  port: 3308,
});
