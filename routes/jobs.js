const { getAllJobs, postJob, deleteJob, updateJob } = require("../controllers/jobs");
const { Router } = require("express");

const router = Router();

router.get("/", getAllJobs);
router.post("/", postJob);
router.delete("/:id", deleteJob);
router.patch("/:id", updateJob);

module.exports = router
