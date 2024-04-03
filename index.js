const bodyParse = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const verifyToken = require("./services/verify-token");

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.use("/api", verifyToken);

app.get("/", (req, res) => {
  res.send("<h1>🤖 API SQLSERVER from NODEJS TL.JSC</h1>");
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
app.use("/api/online", require("./api/online"));

app.listen(process.env.PORT, () => {
  console.log(
    `Server started running on ${process.env.PORT}`
  );
});
