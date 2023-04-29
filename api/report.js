const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { pool } = require("../database/dbinfo");
const jwt = require("jsonwebtoken");
const verifyToken = require("../services/verify-token");
const multer = require("multer");

// report bảng lương theo tháng năm tổ
router.get("/reportluongthang_to", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("thang", req.query.thang)
      .input("nam", req.query.nam)
      .input("mato", req.query.mato)
      .query(
        "select * from luongthang where thang=@thang and nam=@nam and mato=@mato"
      );
    const rp = result.recordset;
    res.json(rp);
  } catch (error) {
    res.status(500).json(error);
  }
});

// report bảng lương theo tháng năm xưởng
router.get("/reportluongthang_px", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("thang", req.query.thang)
      .input("nam", req.query.nam)
      .input("mapb", req.query.mapb)
      .query(
        "select * from luongthang where thang=@thang and nam=@nam and mapb=@mapb"
      );
    const rp = result.recordset;
    res.json(rp);
  } catch (error) {
    res.status(500).json(error);
  }
});

// report luong
router.get("/reportsumluong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("thang", req.query.thang)
      .input("nam", req.query.nam)
      .execute("tongluong_thang_to");
    const his = result.recordset;

    res.json(his);
  } catch (error) {
    res.status(500).json(error);
  }
});

// execl data
router.get("/execldatawithphanxuong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .query("select * from luongcongnhan where mapx=@mapx");
    const data = result.recordset;

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
