const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,   // 속성값의 유형
            required: true, // 필수 속성인지 여부
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            required: [true, "전화번호를 꼭 기입해 주세요."], // 필수 속성, 오류 메세지도 함께 지정
        },
    },
    {
        timestamps: true, // 데이터베이스에 연락처 자료를 추가하거나 수정한 시간이 자동으로 기록됩니다.
    }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;