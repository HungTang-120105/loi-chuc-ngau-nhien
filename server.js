const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let winners = []; // Danh sách người trúng thưởng
const maxWinners = 25; // Giới hạn số người trúng thưởng

// Cấu hình Body Parser
app.use(bodyParser.json());
app.use(express.static('public')); // Thư mục chứa frontend (HTML, CSS, JS)

// API để tham gia Blind Box
app.post('/join-blind-box', (req, res) => {
    const username = req.body.username;

    if (!username) {
        return res.status(400).json({ message: "Tên người dùng không hợp lệ!" });
    }

    // Kiểm tra nếu số người trúng thưởng đã đạt 25
    if (winners.length >= maxWinners) {
        return res.json({
            message: "Đã đạt số lượng người trúng thưởng tối đa!",
            winners: winners
        });
    }

    // Kiểm tra người dùng đã tham gia chưa
    if (winners.includes(username)) {
        return res.json({
            message: `Bạn đã tham gia rồi, ${username}! Bạn đã trúng thưởng trước đây.`,
            winners: winners
        });
    }

    // Giả sử 20% cơ hội trúng thưởng
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if (randomNumber <= 20) { // 20% trúng thưởng
        winners.push(username);
        return res.json({
            message: `Chúc mừng bạn, ${username}! Bạn đã trúng thưởng!`,
            winners: winners
        });
    } else {
        return res.json({
            message: `Rất tiếc, ${username}, bạn chưa trúng thưởng lần này.`,
            winners: winners
        });
    }
});

// Lắng nghe server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
