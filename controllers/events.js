const db = require("../database/sqlite");
const getAllEvents = (callback) => {
  // const sql = "select id, type, created_at from event";
  const sql = `SELECT *
    FROM ((event
    INNER JOIN actor ON event.actor_id = actor.id)
    INNER JOIN repo ON event.actor_id = repo.actor_id); ORDER by event.id ASC`
  const sql2 = `SELECT id, login, avatar_url FROM actor WHERE id = ?`;
  const sql3 = `SELECT id, name, url FROM repo WHERE actor_id = ?`;
  // const params2 = [actor_id];
  const params = [];
  let data;
  db.all(sql, params, (err, rows) => {
    if (err) {
      callback(err, rows);
    }
    console.log(rows);
    let data = [];
    rows.map((res) => {
      data.push({
        id: res.event_id,
        type: res.type,
        actor: {
          id: res.actor_id,
          login: res.login,
          avatar_url: res.avatar_url,
        },
        repo: {
          id: res.id,
          name: res.name,
          url: res.url,
        },
        created_at: res.created_at,
      });
    });
     callback(err, data);
    // db.get(sql2, params2, (err2, row2) => {
    //   db.get(sql3, params2, (err3, row3) => {
    //     if (err) {
    //       callback(err, rows);
    //     }
    //     // const data = rows.map((item) => {
    //     //   if (item.actor_id == row2.id || item.actor_id == row3.actor_id) {
    //     //     return { ...item, actor: row2, repo: row3 };
    //     //   }
    //     // });
    //     console.log(row);
    //     callback(err, rows);
    //   });
    // });
  });
};

const addEvent = async (data, callback) => {
  	const sqlact = "INSERT INTO actor (login, avatar_url, id) VALUES (?,?,?)";
    const paramsact = [data.actor.login, data.actor.avatar_url, data.actor.id];
  const sql = "INSERT INTO event (type, actor_id, id, created_at) VALUES (?,?,?,?)";
  const sql1 = "INSERT INTO repo (name, url, actor_id, event_id, id) VALUES (?,?,?,?,?)";
  const sql2 = `SELECT id, login, avatar_url FROM actor  WHERE id = ?`;
  const sql3 = `SELECT id, name, url, event_id FROM repo WHERE actor_id = ?`;
  const params = [data.type, data.actor.id, data.id, data.created_at];
  const params1 = [data.repo.name, data.repo.url, data.actor.id, data.id, data.repo.id];
  const params2 = [data.actor.id];
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
  db.run(sqlact, paramsact, function (err, row) {
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
              created_at: data.created_at,
            };
            callback(err1, eventData);
          }
        });
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
  const sql = `DELETE FROM event`;
  const params = [];
  db.run(sql, params, (err, row) => {
    if (err) {
      callback(err);
    }
    callback(err, row);
  });
   db.run(`DELETE FROM actor`, (err) => {
     if (err) {
       callback(err);
     } else {
       callback(err);
     }
   });
   db.run(`DELETE FROM repo`, (err) => {
     if (err) {
      callback(err);
     } else {
       callback(err);
     }
   });
};

module.exports = {
  getAllEvents: getAllEvents,
  addEvent: addEvent,
  getByActor: getByActor,
  eraseEvents: eraseEvents,
};
