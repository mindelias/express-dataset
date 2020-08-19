import db from "../Model";
var getByActor = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM actors WHERE actor_id=$1`, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};
var updateActor = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM actors WHERE actor_id=$1`, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

var checkEvent = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM events WHERE id=$1`, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export default {
  getByActor: getByActor,
  updateActor: updateActor,
  checkEvent: checkEvent,
};
