const mongoose = require("mongoose");

// Mongoose 스키마 가져오기
const Schema = mongoose.Schema;

// 사용자 스키마를 만들기
const UserSchema = new Schema({
    username: {
        type: String,
        required: true, // 필수 속성으로 설정
        unique: true, // 중복할 수 없도록 설정
    },
    password: {
        type: String,
        required: true, // 필수 속성으로 설정
    },
});

// User 모델을 만들고 내보내기
module.exports = mongoose.model("User", UserSchema);