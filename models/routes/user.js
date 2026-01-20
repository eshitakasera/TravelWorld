const express = require("express");
const router = express.Router();
const User = require("../models/models/user");
const wrapAsync = require("../models/utils/wrapAsync.js");
const ExpressError = require("../models/utils/ExpressError.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../models/middleware.js");
const reviewController = require("../models/controllers/users.js");

router
  .route("/signup")
  .get(reviewController.renderSignUpForm)
  .post(wrapAsync(reviewController.signUp));

router
  .route("/login")
  .get(reviewController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (reviewController.login)
  );
router.get("/logout", reviewController.logout);

module.exports = router;
