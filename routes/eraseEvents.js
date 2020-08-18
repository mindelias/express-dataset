var express = require("express");
var router = express.Router();
const eventData = require("../controllers/events");

// Route related to delete events

router.delete("/", (req, res, next) => {
  // return res.status(200).json({ message: "successfully deleted"});

  function callBack(err, rows = {}) {
    if (err) {
      return res.status(400).json({ error: err.message });
    } else {
      return res
        .status(200)
        .json({ message: "successfully deleted", data: rows });
    }
  }
  return eventData.eraseEvents(callBack);
});

module.exports = router;
