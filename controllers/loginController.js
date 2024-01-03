const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

//@desc Register Page
//@route GET /register
const getRegister = (rea, res) => {
    res.render("register");
};

//@desc Get login page
//@route GET /
const getLogin = (req, res) => {
    res.render("home");
};

//@desc Login user
//@route POST /
const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body; // 사용자 이름과 비밀번호 추출

    const user = await User.findOne({ username }); // username으로 DB조회

    if(!user) { // 일치하는 사용자가 없다면 오류 메시지 표시
        return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
    }
    // 입력된 비밀번호와 사용자의 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) { // 비밀번호가 일치하지 않으면 오류 메시지 표시
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다."});
    }

    // 사용자 ID를 기반으로 JWT 토큰 생성
    const token = jwt.sign({ id: user._id }, jwtSecret);
    //생성된 토큰을 쿠키에 저장
    res.cookie("token", token, { httpOnly: true });

    // 로그인에 성공하면 '/contacts'로 이동시킴
    res.redirect("/contacts");
});

//@desc Register user
//@route POST /register
const registerUser = asyncHandler(async (req, res) => {
    const { username, password, password2 } = req.body;
    if(password === password2) {
        // bcrypt를 사용해 비밀번호를 암호화합니다.
        const hashedPassword = await bcrypt.hash(password, 10);
        // 사용자 이름과 암호화된 비밀번호를 사용해서 새 사용자를 만듭니다.
        const user = await User.create({ username, password: hashedPassword});
        // 성공 메시지를 출력합니다. 확인하기 위해 user도 화면에 출력합니다.
        res.status(201).json({ message: "Register successful", user });
    }
    else {
        res.send("Register Failed");
    }
});

// @desc Logout
// @route GET /logout
const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};


module.exports = { getRegister, registerUser, getLogin, loginUser, logout };