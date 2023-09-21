const bodyParse = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

const onlineUsers = new Set();

io.on("connection", (socket) => {
  // Khi người dùng kết nối
  console.log("Người dùng đã kết nối");

  // Thêm người dùng vào danh sách trực tuyến
  onlineUsers.add(socket.id);

  // Gửi danh sách người dùng trực tuyến cho tất cả các kết nối
  io.emit("onlineUsers", Array.from(onlineUsers));

  // Khi người dùng ngắt kết nối
  socket.on("disconnect", () => {
    // Xóa người dùng ra khỏi danh sách trực tuyến
    onlineUsers.delete(socket.id);

    // Gửi danh sách người dùng trực tuyến đã cập nhật cho tất cả các kết nối
    io.emit("onlineUsers", Array.from(onlineUsers));

    console.log("Người dùng đã ngắt kết nối");
  });
});

app.get("/", (req, res) => {
  res.send("<h1>🤖 API SQLSERVER from NODEJS - TÍNH LƯƠNG CÔNG ĐOẠN</h1>");
});

app.use("/api/users", require("./api/users"));
app.use("/api/nhanvien", require("./api/nhanvien"));
app.use("/api/phongban", require("./api/phongban"));
app.use("/api/chucvu", require("./api/chucvu"));
app.use("/api/trinhdo", require("./api/trinhdo"));
app.use("/api/sanpham", require("./api/sanpham"));
app.use("/api/lokehoach", require("./api/lokehoach"));
app.use("/api/ketoan", require("./api/ketoan"));
app.use("/api/logsystem", require("./api/logsystem"));
app.use("/api/report", require("./api/report"));
app.use("/api/congnhan", require("./api/congnhan"));
app.use("/api/nguyencong", require("./api/nguyencong"));

app.listen(process.env.PORT, () => {
  console.log(
    `Server started running on ${process.env.PORT} for ${process.env.NODE_ENV}`
  );
});
