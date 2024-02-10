const router = require("express").Router();
const songController = require("../controllers/songs");

router.get("/", songController.getAllSongs);
router.get("/:id", songController.getOneSong);
router.post("/", songController.addSong);
router.put("/:id", songController.updateSong);
router.delete("/:id", songController.deleteSong);

module.exports = router;
