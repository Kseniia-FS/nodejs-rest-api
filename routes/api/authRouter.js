const express = require("express");
const ctrlWrapper = require("../../middlewares/ctrtWrapper");
const { joiValidation, tokenValidation } = require("../../middlewares/auth");
const Auth = require("../../classControllers/Auth");

const router = express.Router();
const auth = new Auth();

router.post("/signup", joiValidation, ctrlWrapper(auth.signup));
router.post("/signin", joiValidation, ctrlWrapper(auth.signin));
router.get("/signout", tokenValidation, ctrlWrapper(auth.signout));

module.exports = router;
