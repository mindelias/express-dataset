const tokenizer = require("./services/tokenizer");
const db = require('../database/sqlite')

const getAllActors = (callback) => {
  const sql = "select * from actor";
  const params = [];
  let data;
  db.all(sql, params, (err, rows) => {
    if (err) {
      callback(err, rows);
    }
    callback(err, rows);
  });
};

const updateActor = async (data, callback) => {
	const sql = "INSERT INTO actor (login, avatar_url) VALUES (?,?)";
	const params = [data.login, data.avatar_url];
  console.log(params);
  db.run(sql, params, function (err, rows) {
    if (err) {
      callback(err)
    } else {
      console.log(rows);
      const payLoad = { id: this.lastID, loggin: data.login };
      const token = tokenizer.issue(payLoad);
      const actorData = { data, token, id:this.lastID };

      callback(err, actorData);
    }
  });
  
  
};

 

var getStreak = () => {};

module.exports = {
  updateActor: updateActor,
  getAllActors: getAllActors,
  getStreak: getStreak,
};
