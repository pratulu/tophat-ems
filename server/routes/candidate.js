const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { candidateController } = require("../controllers/candidateController");
const router = express.Router();
router.get(
  "/get-all-candidates",
  verifyToken,
  candidateController.getAllCandidates
);

router.post("/add-candidate", verifyToken, candidateController.addCandidate);

router.put(
  "/edit-candidate/:id",
  verifyToken,
  candidateController.editCandidate
);

router.delete(
  "/delete-candidate/:id",
  verifyToken,
  candidateController.deleteCandidate
);

module.exports = router;
