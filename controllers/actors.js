import db from "../Model";

var getAllActors = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT actors.actor_id, actors.login, actors.avatar_url, (select count(*) from events where (actors.actor_id = events.actor_id)) as event_count FROM events LEFT JOIN actors ON actors.actor_id = events.actor_id  GROUP BY events.actor_id ORDER BY count(event_count) DESC, events.created_at DESC, actors.login DESC
`,
      (err, row) => {
        if (err) {
          throw err;
          reject(err);
        } else {
          console.log(row.length);
          let data = [];
          row.map((res) => {
            data.push({
              id: res.actor_id,
              login: res.login,
              avatar_url: res.avatar_url,
            });
          });
          resolve(data);
        }
      }
    );
    // db.close();
  });
};

var updateActor = (id, avatar_url) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE actors SET avatar_url=$1 WHERE actor_id=$2`,
      [avatar_url, id],
      (err) => {
        if (err) {
          throw err;
          reject(err);
        } else {
          resolve("done");
        }
      }
    );
    // db.close();
  });
};

var getStreak = () => {};

export default {
  updateActor: updateActor,
  getAllActors: getAllActors,
  getStreak: getStreak,
};
