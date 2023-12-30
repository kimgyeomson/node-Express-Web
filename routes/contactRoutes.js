const express = require("express");
const router = express.Router();

// 모든 연락처 가져오기, 새 연락처 추가하기
router
.route("/")
.get((req, res) => {
    res.status(200).send("Contacts Page");
})
.post((req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        return res.status(400).send("필수값이 입력되지 않았습니다.");
    }
    // res.status(201).send("Create Contacts");
});

// 개별 연락처 가져오기, 수정하기, 삭제하기
router
.route("/contacts/:id")
.get((req, res) => {
    res.status(200).send(`View Contact for ID: ${req.params.id}`);
})
.put((req, res) => {
    res.status(200).send(`Update Contact for ID: ${req.params.id}`);
})
.delete((req, res) => {
    res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
});

module.exports = router;