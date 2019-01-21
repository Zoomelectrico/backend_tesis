const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

router.get("/user/:email", userController.getUserByEmail);

router.post(
  "/userCreate",
  userController.validateUser,
  userController.createUser,
  passport.authenticate("signin"),
  authController.login
);

router.post("/login", passport.authenticate("signin"), authController.login);

router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ success: true, user: req.user });
  }
);

module.exports = router;
