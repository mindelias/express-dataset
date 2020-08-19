import db from "../Model";

const actors = `
CREATE TABLE IF NOT EXISTS actors (
  actor_id INTEGER,
  login INTEGER NOT NULL,
  avatar_url TEXT NOT NULL
);`;

const events = `CREATE TABLE IF NOT EXISTS events (
  id INTEGER UNIQUE,
  type TEXT NOT NULL,
  created_at  TIMESTAMP NOT NULL,
  actor_id INTEGER NOT NULL,
  repo_id INTEGER NOT NULL,
  FOREIGN KEY (actor_id) REFERENCES actors (actor_id),
  FOREIGN KEY (repo_id) REFERENCES repo (repo_id) 
);`;

const repo = `CREATE TABLE IF NOT EXISTS repo (
  repo_id INTEGER,
  name TEXT NOT NULL,
  url TEXT NOT NULL
);
`;
const createDatabaseTables = async () => {
  db.serialize(() => {
    // Queries scheduled here will be serialized.
    db.run(actors)
      .run(repo)
      .run(events, (err) => {
        if (err) {
          throw err;
        }
        console.log("Tables created");
      });
  });
};

createDatabaseTables();
