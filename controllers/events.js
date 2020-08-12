const db = require("../database/sqlite");
const getAllEvents = (callback, actor_id=6) => {
  const sql = "select id, type, created_at from event";
  const sql2 = `SELECT id, login, avatar_url FROM actor WHERE id = ?`;
  const sql3 = `SELECT id, name, url FROM repo WHERE actor_id = ?`;
  const params2 = [actor_id];
  const params = [];
  let data;
  db.all(sql, params, (err, rows) => {
    db.get(sql2, params2, (err2, row2) => {
      db.get(sql3, params2, (err3, row3) => {
        if (err) {
          callback(err, rows);
        }
        const data = rows.map((item) => {
          if (item.actor_id == row2.id || item.actor_id == row3.actor_id) {
            return { ...item, actor: row2, repo: row3 };
          }
        });
        console.log(data);
        callback(err, data);
      });
    });
  });
};

const addEvent = async (data, callback, actor_id) => {
  const sql = "INSERT INTO event (type, actor_id) VALUES (?,?)";
  const sql1 = "INSERT INTO repo (name, url, actor_id) VALUES (?,?,?)";
  const sql2 = `SELECT id, login, avatar_url FROM actor  WHERE id = ?`;
  const sql3 = `SELECT id, name, url FROM repo WHERE actor_id = ?`;
  const params = [data.type, actor_id];
  const params1 = [data.name, data.url, actor_id];
  const params2 = [actor_id];
  let actor;
  console.log(params);
  // save data in to repo table
  db.run(sql1, params1, function (err, rows) {
    if (err) {
      callback(err);
    } else {
      console.log(this.lastID);
    }
  });
  // save data in to event table
  db.run(sql, params, function (err1, row1) {
    db.get(sql2, params2, (err2, row2) => {
      db.get(sql3, params2, (err3, row3) => {
        if (err1 || err2 || err3) {
          callback(err1) || callback(err2) || callback(err3);
        } else {
          console.log(actor);
          const eventData = {
            id: this.lastID,
            type: data.type,
            actor: row2,
            repo: row3,
            created_at: row3.created_at,
          };
          callback(err1, eventData);
        }
      });
    });
  });
};

const getByActor = (id, callback) => {
  const sql = "SELECT * FROM event WHERE actor_id = ?";
  const sql2 = `SELECT id, login, avatar_url FROM actor WHERE id = ?`;
  const sql3 = `SELECT id, name, url FROM repo WHERE actor_id = ?`;
  const params = [id];
  db.get(sql, params, (err, row) => {
    db.get(sql2, params, (err2, row2) => {
      db.get(sql3, params, (err3, row3) => {
        if (err) {
          callback(err);
        }

        const eventData = {
          id: row.id,
          type: row.type,
          actor: row2,
          repo: row3,
          created_at: row.created_at,
        };
        console.log(eventData);
        callback(err, eventData);
      });
    });
  });
};

const eraseEvents = (callback) => {
  const sql = `DELETE * FROM event`;
  const params = [];
  db.run(sql, params, (err, row) => {
    if (err) {
      callback(err, row);
    }
    callback(err, row);
  });
};

module.exports = {
  getAllEvents: getAllEvents,
  addEvent: addEvent,
  getByActor: getByActor,
  eraseEvents: eraseEvents,
};
