const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getSeminar, createSeminar, updateSeminar, deleteSeminar, getAllSeminars, getSeminarById } = require("../controllers/seminar")

router.param("userId", getUserById);
router.param("seminarId", getSeminarById);

router.get("/seminar/:seminarId", getSeminar);
router.post("/seminar/:userId", isSignedIn, isAdmin, createSeminar);
router.put("/seminar/:seminarId/:userId", isSignedIn, isAdmin, updateSeminar);
router.delete("/seminar/:seminarId/:userId", isSignedIn, isAdmin, deleteSeminar)
router.get("/seminars", getAllSeminars);


module.exports = router;