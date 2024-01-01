const express = require("express");
const router = express.Router();
const { getAllContacts,
        createContact,
        getContact,
        updateContact,
        deleteContact,
      } = require("../controllers/contactController");

// 모든 연락처 가져오기, 새 연락처 추가하기
router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;