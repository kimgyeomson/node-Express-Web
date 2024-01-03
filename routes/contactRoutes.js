const express = require("express");
const router = express.Router();
const cookiePaser = require("cookie-parser");
const checkLogin = require("../middlewares/checkLogin");
const { getAllContacts,
        createContact,
        getContact,
        updateContact,
        deleteContact,
        addContactForm,
      } = require("../controllers/contactController");

router.use(cookiePaser());

router.route("/").get(checkLogin, getAllContacts);

router
    .route("/add")
    .get(checkLogin, addContactForm)
    .post(checkLogin, createContact)

// 모든 연락처 가져오기, 새 연락처 추가하기
router
    .route("/:id")
    .get(checkLogin, getContact)
    .put(checkLogin, updateContact)
    .delete(checkLogin, deleteContact);

module.exports = router;