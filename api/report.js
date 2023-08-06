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
        "select * from luongthang where thang=@thang and nam=@nam and mato=@mato order by cast(sttchon as int)"
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
        "select * from luongthang where thang=@thang and nam=@nam and mapb=@mapb order by cast(sttchon as int)"
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

// execl data
router.get("/execldatawithto", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mato", req.query.mato)
      .query("select * from luongcongnhan where mato=@mato");
    const data = result.recordset;

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/execldatawithtime", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("tungay", req.query.tungay)
      .input("denngay", req.query.denngay)
      .query(
        "SELECT * FROM luongcongnhan where ngaythuchien BETWEEN @tungay AND @denngay"
      );
    const data = result.recordset;

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// execl data
// router.get("/execldatawithtimeandxuong", async (req, res) => {
//   try {
//     await pool.connect();
//     const result = await pool
//       .request()
//       .input("mapx", req.query.mapx)
//       .input("tungay", req.query.tungay)
//       .input("denngay", req.query.denngay)
//       .query("SELECT * FROM luongcongnhan where mapx=@mapx and year(stopday_losx) = @nam and month(stopday_losx) = @thang");
//     const data = result.recordset;

//     res.json(data);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// cập nhật lại mã lô nhà máy sai trong công nhật
// lấy ds _id_losx
router.get("/getidlsx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query("SELECT distinct(_id_losx) FROM congnhat");
    const data = result.recordset;

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// lấy ds malonhamay
router.get("/getmalonhamay", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.query._id)
      .query("SELECT malonhamay FROM losanxuat where _id=@_id");
    const data = result.recordset;

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// cập nhật lại
router.patch("/updatemalonhamaycongnhat/:_id_losx", async (req, res) => {
  try {
    // console.log(req.body);
    await pool.connect();
    const result = await pool
      .request()
      .input("_id_losx", req.params._id_losx)
      .query(`SELECT * FROM congnhat WHERE _id_losx = @_id_losx`);
    let congnhat = result.recordset[0];
    if (congnhat) {
      await pool
        .request()
        .input("_id_losx", req.params._id_losx)
        .input("malonhamay", req.body.malonhamay)
        .query(
          `UPDATE congnhat SET 
              malonhamay = @malonhamay
              WHERE _id_losx = @_id_losx;`
        );
      res.json({
        success: true,
        message: "Update success !",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/execldatawithtimeandto", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mato", req.query.mato)
      .input("tungay", req.query.tungay)
      .input("denngay", req.query.denngay)
      .query(
        "SELECT * FROM luongcongnhan where mato=@mato and ngaythuchien BETWEEN @tungay AND @denngay"
      );
    const data = result.recordset;

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// execl data công nhật
router.get("/execldatawithphanxuongcongnhat", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .query("select * from congnhat where mapx=@mapx");
    const data = result.recordset;

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// execl data
router.get("/execldatawithtimecongnhat", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("tungay", req.query.tungay)
      .input("denngay", req.query.denngay)
      .query(
        "SELECT * FROM congnhat where ngaythuchien BETWEEN @tungay AND @denngay"
      );
    const data = result.recordset;

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// execl data
router.get("/execldatawithtimeandxuongcongnhat", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .input("tungay", req.query.tungay)
      .input("denngay", req.query.denngay)
      .query(
        "SELECT * FROM congnhat where mapx=@mapx and ngaythuchien BETWEEN @tungay AND @denngay"
      );
    const data = result.recordset;

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
