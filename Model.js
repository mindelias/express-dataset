const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./express-dataset.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

export default db;
