var express = require("express");
var router = express.Router();
import actorsController from "../controllers/actors";
import eventValidator from "../middleware/validation";

// Routes related to actor.
router.get("/", async (req, res, next) => {
  try {
    const allActors = await actorsController.getAllActors();
    return res.status(200).json(allActors);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.put(
  "/",
  async (req, res, next) => {
    console.log(req.body.id);
    const { id } = req.body;
    const actorCheck = await eventValidator.updateActor(id);
    if (!actorCheck) {
      return res.status(404).json({
        success: false,
        message: `Actor with id:${id} not found`,
      });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const { id, avatar_url } = req.body;
      console.log("updatedActor");
      const updatedActor = await actorsController.updateActor(id, avatar_url);
      console.log(updatedActor);
      return res.status(200).json({
        success: true,
        data: "updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

router.get("/streak", async (req, res, next) => {
  try {
    const allActors = await actorsController.getAllActors();
    return res.status(200).json(allActors);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
