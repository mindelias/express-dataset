var express = require("express");
var router = express.Router();
import eventController from "../controllers/events";
import eventValidator from "../middleware/validation";

// Routes related to event
router.get("/", async (req, res, next) => {
  try {
    const events = await eventController.getAllEvents();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post(
  "/",
  async (req, res, next) => {
    const { id } = req.body;
    const eventCheck = await eventValidator.checkEvent(id);
    if (eventCheck) {
      return res.status(400).json({
        success: false,
        message: `Event with id:${id} already exist`,
      });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const newEvent = await eventController.addEvent(req.body);
      return res.status(201).json({
        success: true,
        message: "Event added succesfully",
        data: newEvent,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

router.get(
  "/actors/:actorsId",
  async (req, res, next) => {
    const { actorsId } = req.params;
    const actorCheck = await eventValidator.getByActor(actorsId);
    if (!actorCheck) {
      return res.status(404).json({
        success: false,
        message: `Actor with id:${actorsId} not found`,
      });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const { actorsId } = req.params;
      const actorsEvent = await eventController.getByActor(actorsId);
      return res.status(200).json(actorsEvent);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

module.exports = router;
