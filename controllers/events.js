import db from "../Model";

const getAllEvents = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT DISTINCT *
    FROM ((events
    INNER JOIN actors ON events.actor_id = actors.actor_id)
    INNER JOIN repo ON events.repo_id = repo.repo_id); ORDER by events.id ASC`,
      function (err, row) {
        if (err) {
          reject(err);
        } else {
          let data = [];
          row.map((res) => {
            data.push({
              id: res.id,
              type: res.type,
              actor: {
                id: res.actor_id,
                login: res.login,
                avatar_url: res.avatar_url,
              },
              repo: {
                id: res.repo_id,
                name: res.name,
                url: res.url,
              },
              created_at: res.created_at,
            });
          });
          resolve(data);
        }
      }
    );
  });
};

var addEvent = (event) => {
  const { id, type, repo, actor, created_at } = event;
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `INSERT INTO actors(actor_id, login, avatar_url ) VALUES($1, $2, $3)`,
        [actor.id, actor.login, actor.avatar_url],
        function (err) {
          if (err) {
            throw err;
            reject(err);
          }
        }
      )
        .run(
          `INSERT INTO repo(repo_id, name, url ) VALUES($1, $2, $3)`,
          [repo.id, repo.name, repo.url],
          function (err) {
            if (err) {
              reject(err);
            }
          }
        )
        .run(
          `INSERT INTO events(id, type, created_at, actor_id, repo_id) VALUES($1, $2, $3, $4, $5)`,
          [id, type, created_at, actor.id, repo.id],
          (err) => {
            if (err) {
              throw err;
              reject(err);
            }
          }
        );
    });
    resolve(true);
  });
};

var getByActor = (id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT DISTINCT *
      FROM ((events
      INNER JOIN actors ON events.actor_id = actors.actor_id)
      INNER JOIN repo ON events.repo_id = repo.repo_id) WHERE events.actor_id = $1 ORDER by events.id ASC`,
      [id],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          let data = [];
          row.map((res) => {
            data.push({
              id: res.id,
              type: res.type,
              actor: {
                id: res.actor_id,
                login: res.login,
                avatar_url: res.avatar_url,
              },
              repo: {
                id: res.repo_id,
                name: res.name,
                url: res.url,
              },
              created_at: res.created_at,
            });
          });
          resolve(data);
        }
      }
    );
  });
};

var eraseEvents = () => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM actors`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
    db.run(`DELETE FROM repo`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
    db.run(`DELETE FROM events`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

export default {
  getAllEvents: getAllEvents,
  addEvent: addEvent,
  getByActor: getByActor,
  eraseEvents: eraseEvents,
};
