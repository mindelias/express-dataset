const tokenizer = require("./services/tokenizer");
const db = require("../database/sqlite");

const getAllActors = (callback) => {
  const sql = "select id, login, avatar_url from actor";
  const seql = `SELECT actor.id, actor.login, actor.avatar_url, (select count(*) from event where (actor.id = event.actor_id)) as event_count FROM event LEFT JOIN actor ON actor.id = event.actor_id  GROUP BY event.actor_id ORDER BY count(event_count) DESC, event.created_at DESC, actor.login DESC`;
  const params = [];
  let data;
  db.all(seql, params, (err, rows) => {
    if (err) {
      callback(err, rows);
    }
    let data = [];
    rows.map((res) => {
      data.push({
        id: res.id,
        login: res.login,
        avatar_url: res.avatar_url,
      });
    });
    callback(err, data);
  });
};

const updateActor = async (data, callback) => {
  const sql = `UPDATE actor
            SET avatar_url = ?
            WHERE id = ?`;
  const params = [data.avatar_url, data.id];
  db.get(`SELECT * FROM actor WHERE id= ?`, [data.id], (err, row) => {
    db.run(sql, params, function (err, rows) {
      if (err) {
        callback(err);
      }
      if (!row) {
        callback(err, (row = []));
      } else {
        console.log(row);
        console.log(rows);
        console.log(`Row(s) updated: ${this.changes}`);
        callback(err, row);
      }
    });
  });
};
// const updateActor = (id, avatar_url) => {
//   return new Promise((resolve, reject) => {
//     db.run(
//       `UPDATE actors SET avatar_url=$1 WHERE id=$2`,
//       [avatar_url, id],
//       (err) => {
//         if (err) {
//           throw err;
//           reject(err);
//         } else {
//           resolve("done");
//         }
//       }
//     );
//     // db.close();
//   });
// };

// const checkEvent = (id, callback) => {
//   return new Promise((resolve, reject) => {
//     db.get(`SELECT * FROM actor WHERE id= ?`, [id], (err, row) => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log(row);
//         resolve(row);
//       }
//     });
//   });
// };
const checkEvent = (id, callback) => {
  return db.get(`SELECT * FROM actor WHERE id= ?`, [id], (err, row) => {
    if (err) {
      reject(err);
    } else {
      console.log(row);
      return row;
    }
  });
};

var getStreak = () => {};

module.exports = {
  updateActor: updateActor,
  getAllActors: getAllActors,
  getStreak: getStreak,
  checkEvent: checkEvent,
};
