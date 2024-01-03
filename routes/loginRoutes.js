const express = require("express");
const router = express.Router();
const { getRegister,
        getLogin,
        loginUser,
        registerUser,
        logout,
        } = require("../controllers/loginController");

router.route("/").get(getLogin).post(loginUser);
router.route("/register").get(getRegister).post(registerUser);
router.route("/logout").get(logout);

module.exports = router;