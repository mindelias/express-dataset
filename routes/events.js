var express = require("express");
var router = express.Router();
const eventData = require("../controllers/events");
const db = require("../database/sqlite");

// Routes related to event

router.get("/", (req, res, next) => {
  try {
    const actor_id = req.token.id
    function callBack(err, rows) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({ message: "success", data: rows });
    }
    return eventData.getAllEvents(callBack, actor_id);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
router.get("/actors/:id", (req, res, next) => {
  const params = req.params.id
  try {
    function callBack(err, rows={}) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({ message: "success", data: rows });
    }
    eventData.getByActor(params, callBack);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", async (req, res, next) => {
  var errors = [];
  const actor_id = req.token.id;
  if (!req.body.type) {
    errors.push("event type is not specified!");
  }
  if (!req.body.name) {
    errors.push("repo name is not specified!");
  }
  if (!req.body.url) {
    errors.push("repo url is not specified!");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }

  try {
    function callBack(err, rows = {}) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({ message: "success", data: rows });
    }
    return eventData.addEvent(req.body, callBack, actor_id);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete("/", (req, res, next) => {
  const params = req.params.id;
  try {
    function callBack(err, rows) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({ message: "successfully deleted", data: rows });
    }
    return eventData.eraseEvents(params, callBack);
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
