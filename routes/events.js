var express = require("express");
var router = express.Router();
const eventData = require("../controllers/events");
const db = require("../database/sqlite");

// Routes related to event

router.get("/", (req, res, next) => {
  //  return res.status(200).json([]);
  function callBack(err, rows) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(200).json(rows);
  }
  return eventData.getAllEvents(callBack);
});
router.get("/actors/:id", (req, res, next) => {
   
  const params = req.params.id;

  function callBack(err, rows = {}) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(200).json([rows]);
  }
  return eventData.getByActor(params, callBack);
});

router.post("/", async (req, res, next) => {
  function callBack(err, rows = {}) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(201).json(rows);
  }
  return eventData.addEvent(req.body, callBack);
});

module.exports = router;
