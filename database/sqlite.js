const sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);

    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS event (
            id INTEGER PRIMARY KEY UNIQUE,
            type text,
            actor_id INTEGER,
            created_at datetime,
            FOREIGN KEY(actor_id) REFERENCES actor(id) 
            )`,
      (err) => {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS actor (
            id INTEGER PRIMARY KEY,
            login text,
            avatar_url text,
            created_at datetime default current_timestamp
            )`,
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Table actor exist");
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS repo (
            id INTEGER PRIMARY KEY,
            name text,
            url text,
            actor_id INTEGER,
            event_id INTEGER,
            FOREIGN KEY(actor_id) REFERENCES actor(id),
            FOREIGN KEY(event_id) REFERENCES event(id)
            )`,
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Table repo exist");
      }
    );
  }

});
// db.run(`DROP TABLE event`);
// db.run(`DROP TABLE repo`);
// db.run(`DROP TABLE actor`);
module.exports = db;

// db.run(
//   `CREATE TABLE actor (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         login text,
//          email text UNIQUE,
//        avatar_url text,
//         CONSTRAINT event_id UNIQUE (id)
//         )`,
//   (err) => {
//     if (err) {
//       // Table already created
//     } else {
//       // Table just created, creating some rows
//       var insert =
//         "INSERT INTO user (name, email, password) VALUES (?,?,?)";
//       db.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
//       db.run(insert, ["user", "user@example.com", md5("user123456")]);
//     }
//   }
// );
