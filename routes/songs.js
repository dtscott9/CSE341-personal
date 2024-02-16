const router = require("express").Router();
const songController = require("../controllers/songs");
const validation = require('../middleware/validation');

router.get("/", songController.getAllSongs);
router.get("/:id", songController.getOneSong);
router.post("/", validation.saveSong, songController.addSong);
router.put("/:id", validation.saveSong, songController.updateSong);
router.delete("/:id", songController.deleteSong);

module.exports = router;
