const express = require("express");
const actorsControl = require("../controllers/actors");
const router = express.Router();

// Routes related to actor.

router.get("/", (req, res, next) => {
  try {
    function callBack(err, rows) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({ message: "success", data: rows });
    }
    actorsControl.getAllActors(callBack);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/streak", (req, res, next) => {
   res.status(200).json({})
});
router.put("/", (req, res, next) => {
    var errors = [];
  if (!req.body.login) {
    errors.push("No login specified");
  }
  if (!req.body.avatar_url) {
    errors.push("No url specified");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  try {
    function callBack(err, rows = {}) {
      if (err) {
        return res.status(200).json({ message: "success", data: rows });
        if (
          err.message ==
          "SQLITE_CONSTRAINT: UNIQUE constraint failed: actor.login"
        ) {
          return res.status(400).json({ error: "login code already exist" });
        }
        return res.status(400).json({ error: err.message });
      }
    }
    actorsControl.updateActor(req.body, callBack);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
