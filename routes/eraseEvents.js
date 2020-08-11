var express = require('express');
var router = express.Router();

// Route related to delete events

router.delete("/", (req, res, next) => {
  const params = req.params.id;
  try {
    function callBack(err, rows) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(200)
        .json({ message: "successfully deleted", data: rows });
    }
    return eventData.eraseEvents(params, callBack);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;