const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getRequest, createRequest, updateRequest, deleteRequest, getAllRequests, getRequestById } = require("../controllers/request")

router.param("userId", getUserById);
router.param("requestId", getRequestById);

router.get("/request/:requestId", getRequest);
router.post("/request/:userId", isSignedIn, createRequest);
router.put("/request/:requestId/:userId", isSignedIn, isAuthenticated, updateRequest);
router.delete("/request/:requestId/:userId", isSignedIn, isAuthenticated, deleteRequest)
router.get("/requests", getAllRequests);


module.exports = router;