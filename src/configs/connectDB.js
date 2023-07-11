// get the client
import mysql from "mysql2/promise";

// create the connection to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Nguyenhuutri@23122001",
  database: "robomain_baotri",
});

export default pool;
