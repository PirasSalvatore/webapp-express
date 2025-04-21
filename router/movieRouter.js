const express = require("express")
const router = express.Router()

const moviesController = require("../controllers/movieController")

//index (read)
router.get("/", moviesController.index)

//show (read)
router.get("/:id", moviesController.show)

//store (create)
router.post("/:id/review", moviesController.store)

//update (update)
router.put("/:id", moviesController.update)

//partial update (update)
router.patch("/:id", moviesController.modify)

//delete (delete)
router.delete("/:id", moviesController.destroy)

module.exports = router