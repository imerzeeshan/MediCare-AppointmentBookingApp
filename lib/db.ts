// lib/db.ts
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: "ADCPZ2740F@#786f", //process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
// password: "ADCPZ2740F@#786f", //process.env.DB_PASSWORD

try {
  const connection = await db.getConnection();
  console.log("✅ Database connected successfully");
  connection.release(); // important to release back to pool
} catch (error) {
  console.log("❌ Database connection failed: ", error);
  process.exit(1); // optional: stop sever if DB is essential
}
