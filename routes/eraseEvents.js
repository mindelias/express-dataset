var express = require("express");
var router = express.Router();
import eventController from "../controllers/events";

// Route related to delete events
router.delete("/", async (req, res, next) => {
  try {
    const deleteEvent = await eventController.eraseEvents();
    return res.status(200).json({
      success: true,
      message: "Events deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
