const express = require("express");
const actorsControl = require("../controllers/actors");
const router = express.Router();

// Routes related to actor.

router.get("/", (req, res, next) => {
  //  return res.status(200).json();
  try {
    function callBack(err, rows) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json(rows);
    }
    return actorsControl.getAllActors(callBack);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
router.get("/streak", (req, res, next) => {
  res.status(200).json([
    {
      id: 1139424092,
      type: "PushEvent",
      actor: {
        id: 1087596,
        login: "jason96",
        avatar_url: "https://avatars.com/1087596",
      },
      repo: {
        id: 406290,
        name: "jason96/perferendis",
        url: "https://github.com/jason96/perferendis",
      },
      created_at: "2013-02-11 22:13:31",
    },
  ]);
});
router.put("/", async (req, res, next) => {
  const {id}= req.body
  try {
    function callBack(err, rows = {}) {
      if (err) {
        return res.status(400).json({ error: err.message });
      } else if (rows.length==0) {
         return res.status(404).json({
           success: false,
           message: `Actor with id:${id} not found`,
         });
      }
      return res.status(200).json({ body: rows });
    }
    actorsControl.updateActor(req.body, callBack);
  } catch (err) {
   return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
