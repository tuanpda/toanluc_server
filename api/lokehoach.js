const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { pool } = require("../database/dbinfo");
const jwt = require("jsonwebtoken");
const verifyToken = require("../services/verify-token");
const multer = require("multer");
const readXlsxFile = require("read-excel-file/node");
const {
  ConnectionPool,
  Table,
  NVarChar,
  NChar,
  Int,
  rows,
  Date,
  DateTime,
  Bit,
} = require("mssql");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    /* Nhớ sửa đường dẫn khi deploy lên máy chủ */
    //cb(null, "E:\\PROJECT\\docthuBhxh\\client\\static\\avatar");
    cb(null, "D:\\CODE\\PROJECT\\server\\filesupload");
  },
  filename: function (req, file, cb) {
    cb(null, "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

// cập nhật kế hoạch NHÀ MÁY
router.patch("/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM lokehoach WHERE _id = @_id`);
    let lokehoach = result.recordset[0];
    if (lokehoach) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("makhpx", req.body.makhpx)
        .input("soluong", req.body.soluong)
        .input("ngaybd", req.body.ngaybd)
        .input("ngaykt", req.body.ngaykt)
        .input("updatedAt", req.body.updatedAt)
        .query(
          `UPDATE lokehoach SET 
                        makhpx = @makhpx, 
                        soluong = @soluong,
                        ngaybd = @ngaybd, 
                        ngaykt = @ngaykt,
                        updatedAt = @updatedAt
                        WHERE _id = @_id;`
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

// cập nhật kế hoạch NĂM
router.patch("/kehoachnam/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM kehoach WHERE _id = @_id`);
    let lokehoach = result.recordset[0];
    if (lokehoach) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("tgbatdau", req.body.tgbatdau)
        .input("tgketthuc", req.body.tgketthuc)
        .input("soluong", req.body.soluong)
        .input("soluongmuavup1", req.body.soluongmuavup1)
        .input("soluongmuavup2", req.body.soluongmuavup2)
        .input("soluongmuavup3", req.body.soluongmuavup3)
        .input("updatedAt", req.body.updatedAt)
        .query(
          `UPDATE kehoach SET 
                        tgbatdau = @makhpx, 
                        tgketthuc = @soluong,
                        soluong = @ngaybd, 
                        soluongmuavup1 = @ngaykt,
                        soluongmuavup2 = @soluongmuavup2,
                        soluongmuavup3 = @soluongmuavup3,
                        updatedAt = @updatedAt
                        WHERE _id = @_id;`
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

// cập nhật lo kế hoạch tại phân xưởng tại chức năng lapkehoachlophanxuong
router.patch("/lokehoachphanxuong/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM lokehoachphanxuong WHERE _id = @_id`);
    let lokehoach = result.recordset[0];
    if (lokehoach) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("makhpx", req.body.makhpx)
        .input("soluongkhpx", req.body.soluongkhpx)
        .input("ngaybdkhpx", req.body.ngaybdkhpx)
        .input("ngayktkhpx", req.body.ngayktkhpx)
        .input("updatedAt", req.body.updatedAt)
        .input("congsuat", req.body.congsuat)
        .input("songay", req.body.songay)
        .input("may", req.body.may)
        .query(
          `UPDATE lokehoachphanxuong SET 
                        makhpx = @makhpx, 
                        soluongkhpx = @soluongkhpx,
                        ngaybdkhpx = @ngaybdkhpx, 
                        ngayktkhpx = @ngayktkhpx,
                        updatedAt = @updatedAt,
                        congsuat = @congsuat,
                        songay = @songay,
                        may = @may
                        WHERE _id = @_id;`
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

// cập nhật lo kế hoạch tại phân xưởng tại chức năng dangkylokhphanxuong
router.patch("/updatelokehoachpx/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM lokehoachphanxuong WHERE _id = @_id`);
    let lokehoach = result.recordset[0];
    if (lokehoach) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("makhpx", req.body.makhpx)
        .input("soluongkhpx", req.body.soluongkhpx)
        .input("ngaybdkhpx", req.body.ngaybdkhpx)
        .input("ngayktkhpx", req.body.ngayktkhpx)
        .input("ttqt", req.body.ttqt)
        .input("updatedAt", req.body.updatedAt)
        .query(
          `UPDATE lokehoachphanxuong SET 
                        makhpx = @makhpx, 
                        soluongkhpx = @soluongkhpx,
                        ngaybdkhpx = @ngaybdkhpx, 
                        ngayktkhpx = @ngayktkhpx,
                        ttqt = @ttqt,
                        updatedAt = @updatedAt
                        WHERE _id = @_id;`
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

// cập nhật lo kế hoạch tại phân xưởng tại chức năng dangkylokhphanxuong
router.patch("/updatelokehoachpxatdangkylodesanxuat/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM lokehoachphanxuong WHERE _id = @_id`);
    let lokehoach = result.recordset[0];
    if (lokehoach) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("status", req.body.status)
        .input("updatedAt", req.body.updatedAt)
        .query(
          `UPDATE lokehoachphanxuong SET 
                        status = @status, 
                        updatedAt = @updatedAt
                        WHERE _id = @_id;`
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

// cập nhật kế hoạch nhà máy anchor
router.patch("/kehoach/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM kehoach WHERE _id = @_id`);
    let kehoach = result.recordset[0];
    if (kehoach) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("tgbatdau", req.body.tgbatdau)
        .input("tgketthuc", req.body.tgketthuc)
        .input("soluongmuavup1", req.body.soluongmuavup1)
        .input("soluongmuavup2", req.body.soluongmuavup2)
        .input("soluongmuavup3", req.body.soluongmuavup3)
        .input("soluong", req.body.soluong)
        .input("slthang1", req.body.slthang1)
        .input("slthang2", req.body.slthang2)
        .input("slthang3", req.body.slthang3)
        .input("slthang4", req.body.slthang4)
        .input("slthang5", req.body.slthang5)
        .input("slthang6", req.body.slthang6)
        .input("slthang7", req.body.slthang7)
        .input("slthang8", req.body.slthang8)
        .input("slthang9", req.body.slthang9)
        .input("slthang10", req.body.slthang10)
        .input("slthang11", req.body.slthang11)
        .input("slthang12", req.body.slthang12)
        .input("updatedAt", req.body.updatedAt)
        .query(
          `UPDATE kehoach SET 
                        tgbatdau = @tgbatdau,
                        tgketthuc = @tgketthuc,
                        soluongmuavup1 = @soluongmuavup1, 
                        soluongmuavup2 = @soluongmuavup2,
                        soluongmuavup3 = @soluongmuavup3,
                        soluong = @soluong,
                        slthang1 = @slthang1,
                        slthang2 = @slthang2,
                        slthang3 = @slthang3,
                        slthang4 = @slthang4,
                        slthang5 = @slthang5,
                        slthang6 = @slthang6,
                        slthang7 = @slthang7,
                        slthang8 = @slthang8,
                        slthang9 = @slthang9,
                        slthang10 = @slthang10,
                        slthang11 = @slthang11,
                        slthang12 = @slthang12,                        
                        updatedAt = @updatedAt
                        WHERE _id = @_id;`
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

router.patch("/phieulo/:makh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.params.makh)
      .query(`SELECT * FROM lokehoach WHERE makh = @makh`);
    let lokehoach = result.recordset[0];
    if (lokehoach) {
      await pool
        .request()
        .input("makh", req.params.makh)
        .input("tgbatdau", req.body.tgbatdau)
        .input("tgketthuc", req.body.tgketthuc)
        .input("soluong", req.body.soluong)
        .input("updatedAt", req.body.updatedAt)
        .input("status", req.body.status)
        .query(
          `UPDATE kehoach SET 
                        tgbatdau = @tgbatdau, 
                        tgketthuc = @tgketthuc,
                        soluong = @soluong,
                        updatedAt = @updatedAt,
                        status = @status
                        WHERE makh = @makh;`
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

// update lô sản xuất
router.patch("/losanxuat/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM losanxuat WHERE _id = @_id`);
    let lokehoach = result.recordset[0];
    if (lokehoach) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("makh", req.body.makh)
        .input("makhpx", req.body.makhpx)
        .input("malosx", req.body.malosx)
        .input("mapx", req.body.mapx)
        .input("tenpx", req.body.tenpx)
        .input("mato", req.body.mato)
        .input("tento", req.body.tento)
        .input("masp", req.body.masp)
        .input("tensp", req.body.tensp)
        .input("soluong", req.body.soluong)
        .input("nhomluong", req.body.nhomluong)
        .input("soluonglsx", req.body.soluonglsx)
        .input("soluongkhsx", req.body.soluongkhsx)
        .input("ngaybd", req.body.ngaybd)
        .input("ngaykt", req.body.ngaykt)
        .input("updatedAt", req.body.updatedAt)
        .input("status", req.body.status)
        .input("datinhluong", req.body.datinhluong)
        .input("stopday_losx", req.body.stopday_losx)
        .query(
          `UPDATE losanxuat SET 
                        makh = @makh, 
                        makhpx = @makhpx,
                        malosx = @malosx,
                        mapx = @mapx,
                        tenpx = @tenpx, 
                        mato = @mato,
                        tento = @tento,
                        masp = @masp,
                        tensp = @tensp, 
                        soluong = @soluong,
                        nhomluong = @nhomluong,
                        soluonglsx = @soluonglsx,
                        soluongkhsx = @soluongkhsx, 
                        ngaybd = @ngaybd,
                        ngaykt = @ngaykt,
                        updatedAt = @updatedAt,
                        datinhluong = @datinhluong,
                        stopday_losx = @stopday_losx,
                        status = @status
                        WHERE _id = @_id;`
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

router.post("/addkehoach", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.body.makh)
      .input("mota", req.body.mota)
      .input("soluong", req.body.soluong)
      .input("tgbatdau", req.body.tgbatdau)
      .input("tgketthuc", req.body.tgketthuc)
      .input("ghichu", req.body.ghichu)
      .input("createdAt", req.body.createdAt)
      .input("createdBy", req.body.createdBy)
      .input("status", req.body.status).query(`
                      INSERT INTO kehoach (makh, mota, soluong, tgbatdau, tgketthuc, ghichu, createdAt, createdBy, status) 
                      VALUES (@makh, @mota, @soluong, @tgbatdau, @tgketthuc, @ghichu, @createdAt, @createdBy, @status);
                  `);
    const kehoach = req.body;
    res.json(kehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all data phong ban
router.get("/alllokehoach", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`SELECT * FROM kehoach order by makh`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all data lokehoach where makh
router.get("/getallkehoachpx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .query(`SELECT * FROM lokehoach where makh=@makh order by makhpx`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all lo ke hoạch phân xưởng
router.get("/showlokehoachpx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("malonhamay", req.query.malonhamay)
      .query(
        `SELECT * FROM lokehoachphanxuong where malonhamay=@malonhamay order by ttqt`
      );
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// tìm dữ liệu lô nhà máy theo nhóm sp
router.get("/searchnhomsp", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("nhomsp", req.query.nhomsp)
      .query(`SELECT * FROM lokehoach where nhomsp=@nhomsp order by makhpx`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// tìm dữ liệu lô kế hoạch phân xưởng theo nhóm sp
router.get("/searchnhomsplokhpx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("nhomsp", req.query.nhomsp)
      .query(
        `SELECT * FROM lokehoachphanxuong where nhomsp=@nhomsp order by makh`
      );
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// tìm dữ liệu lô kế hoạch phân xưởng theo sp
router.get("/searchsplokhpx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("maspkhpx", req.query.maspkhpx)
      .query(
        `SELECT * FROM lokehoachphanxuong where maspkhpx=@maspkhpx order by makh`
      );
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// tìm dữ liệu lô kế hoạch phân xưởng theo trước ngày kết thúc
router.get("/searchlokhpxtheongaykt", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("ngayktkhpx", req.query.ngayktkhpx)
      .query(
        `select * from lokehoachphanxuong where ngayktkhpx <= @ngayktkhpx order by ngayktkhpx, makh`
      );
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// tìm dữ liệu lô nhà máy theo sp
router.get("/searchsanpham", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("masp", req.query.masp)
      .query(`SELECT * FROM lokehoach where masp=@masp order by makhpx`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// tìm dữ liệu lô nhà máy theo sp và nhóm sp
router.get("/searchsanphamandnhomsp", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("masp", req.query.masp)
      .input("nhomsp", req.query.nhomsp)
      .query(
        `SELECT * FROM lokehoach where masp=@masp and nhomsp=@nhomsp order by makhpx`
      );
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// tìm dữ liệu lô nhà máy theo ngày kết thúc
router.get("/searchtimekt", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("ngaykt", req.query.ngaykt)
      .query(`SELECT * FROM lokehoach where ngaykt<=@ngaykt order by makhpx`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// tìm dữ liệu lô kế hoạch năm theo ngày kết thúc
router.get("/searchtimektkhn", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("tgketthuc", req.query.tgketthuc)
      .query(
        `SELECT * FROM kehoach where tgketthuc <= @tgketthuc order by makh`
      );
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all mã lô sản xuất
router.get("/getallmalsx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .query(`SELECT * FROM losanxuat where mapx=@mapx`);
    const lsx = result.recordset;

    res.json(lsx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one mã lô kế hoạch
router.get("/getonemakh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .input("makh", req.query.makh)
      .query(`SELECT * FROM lokehoach where mapx=@mapx and makh=@makh`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all Kế hoạch năm
router.get("/getkehoach", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`SELECT * FROM kehoach order by _id`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all phan xưởng tham gia sản xuất
router.get("/allphanxuonginkh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .query(`SELECT * FROM lokehoach where makh=@makh`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all mã lô nhà máy
router.get("/alllonhamay", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`SELECT * FROM lokehoach order by makhpx, ngaykt`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all mã lô kế hoạch phân xưởng
router.get("/alllokehoachphanxuong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`SELECT * FROM lokehoachphanxuong order by makhpx`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// kiểm tra xem có công đoạn phát sinh tại 1 lô sản xuất nào đó chưa
router.get("/checkcongdoaninlsx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .input("makhpx", req.query.makhpx)
      .input("mapx", req.query.mapx)
      .input("malosx", req.query.malosx)
      .query(
        `select * from luongcongnhan where makh=@makh and makhpx=@makhpx and mapx=@mapx and malosx=@malosx`
      );
    const lokehoach = result.recordset;
    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all các đơn vị có tham gia trong kế hoạch sản xuất
router.get("/allphanxuonginlkh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .query(`select mapx, tenpx from lokehoach where makh=@makh`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// lấy xưởng trong khi tạo lô sản xuất tương ứng với xưởng đó
router.get("/phanxuonglsx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .input("makhpx", req.query.makhpx)
      .input("mapx", req.query.mapx)
      .query(
        `select mapx, tenpx from lokehoach where makh=@makh and makhpx=@makhpx and mapx=@mapx`
      );
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get nhóm lương của phân xưởng đúc
router.get("/getnhomluongpxd", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`select * from dmnc where mapx='PXD'`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get nhóm lương các phân xưởng còn lại
router.get("/getnhomluong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .query(`select * from dmnc where mapx=@mapx`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get mã kế hoạch phân xưởng với mã kế hoạch và mã phân xưởng
router.get("/getmakhpx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .input("mapx", req.query.mapx)
      .query(`select makhpx from lokehoach where makh=@makh and mapx=@mapx`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get mã sản phẩm trong kế hoạch
router.get("/getmaspinkh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .query(`select masp, tensp from kehoach where makh=@makh`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get mã nhóm lương dựa vào mã sp và mã phân xưởng
router.get("/getnhomluongtheompx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .input("mavt", req.query.mavt)
      .query(`select * from dmnc where mapx=@mapx and mavt=@mavt`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one mã lô kế hoạch
router.get("/searchmkh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .query(`select * from kehoach where makh=@makh`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get số mã lô kế hoạch
router.get("/getlokh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`select distinct(makh) from lokehoach`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get mã kế hoạch trong bảng kế hoạch
router.get("/malokh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().query(`select makh from kehoach`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get số mã lô kế hoạch in losanxuat
router.get("/getlokhinlsx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`select distinct(makh) from losanxuat`);
    const lokehoach = result.recordset;

    res.json(lokehoach);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get số mã lô sản xuất
router.get("/getlosx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().query(`select malosx from losanxuat`);
    const losx = result.recordset;

    res.json(losx);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get số mã lô sản xuất
router.get("/losanxuattaipx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .input("makhpx", req.query.makhpx)
      .input("mapx", req.query.mapx)
      .query(
        `select * from losanxuat where makh=@makh and makhpx=@makhpx and mapx=@mapx order by malosx`
      );
    const losx = result.recordset;

    res.json(losx);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get ma lo co trong bang luongcongnhan
router.get("/getlosxinluongcongnhan", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .input("makhpx", req.query.makhpx)
      .input("mapx", req.query.mapx)
      .query(`select * from losanxuat where makh=@makh and makhpx=@makhpx and mapx=@mapx
      and malosx in (select malosx from luongcongnhan where makh=@makh and makhpx=@makhpx and mapx=@mapx)`);
    const losx = result.recordset;

    res.json(losx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all tên phân xưởng from mã sản lô kế hoạch
router.get("/getallpxinmalkh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .input("nhomsp", req.query.nhomsp)
      .query(
        `select * from lokehoach where makh=@makh and nhomsp=@nhomsp order by mapx`
      );
    const tenpx = result.recordset;

    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get mã kế hoạch theo mã
router.get("/getallkhmuavu", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .query(`select * from kehoach where makh=@makh order by makh`);
    const tenpx = result.recordset;

    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all lô kế hoạch phân xưởng sắp xếp theo mã phân xưởng
router.get("/getallkehoachphanxuong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`select * from lokehoachphanxuong order by mapx`);
    const tenpx = result.recordset;

    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all lô kế hoạch phân xưởng where mã phân xưởng and trong tháng cần chọn và xếp theo ngày kết thúc
router.get("/getallkehoachpxwithpxorderbyngaykt", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .input("ngaybdkhpx", req.query.ngaybdkhpx)
      .input("ngayktkhpx", req.query.ngayktkhpx)
      .query(
        `select * from lokehoachphanxuong where mapx=@mapx and ngayktkhpx between @ngaybdkhpx and @ngayktkhpx order by ngayktkhpx, makhpx`
      );
    const tenpx = result.recordset;

    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all lô kế hoạch phân xưởng where mã phân xưởng
router.get("/getallkehoachpxwithmapx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .query(
        `select * from lokehoachphanxuong where mapx=@mapx order by ngayktkhpx, makhpx`
      );
    const tenpx = result.recordset;

    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// search malo sx
router.get("/searchlsx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("malosx", req.query.malosx)
      .query(`select * from losanxuat where malosx=@malosx`);
    const tenpx = result.recordset;

    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all lô sản xuất trong 1 kế hoạch phân xưởng
router.get("/getalllsxinkhpx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .input("makhpx", req.query.makhpx)
      .input("mapx", req.query.mapx)
      .query(
        `select * from losanxuat where makh=@makh and makhpx=@makhpx and mapx=@mapx order by ngaykt`
      );
    const tenpx = result.recordset;

    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all các lô sản xuất trong 1 phân xưởng nào đó dựa vào mã lô kế hoạch và mã px
router.get("/getalllsxinlkh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .input("makhpx", req.query.makhpx)
      .input("mapx", req.query.mapx).query(`select * from losanxuat 
      where makh=@makh and makhpx=@makhpx and mapx=@mapx order by ngaybd`);
    const tenpx = result.recordset;
    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// test
router.get("/gettest", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().query(`select * from test 
      `);
    const tenpx = result.recordset;
    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// tìm mã kế hoạch năm xem có tồn tại trong mã lô nhà máy không?
// nếu có thì k cho xóa
router.get("/predelete_muctieunam", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .query(`select * from lokehoach where makh=@makh`);
    const losx = result.recordset;

    res.json(losx);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});
// tìm mã lô nhà máy xem  có tồn tại trong mã lô kế hoạch phân xưởng k (bảng lokehoachphanxuong)?
// nếu có thì k cho xóa
router.get("/predelete_lonhamay", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("kehoachnam", req.query.kehoachnam)
      .input("makh", req.query.makh)
      .query(
        `select * from lokehoachphanxuong where kehoachnam=@kehoachnam and makh=@makh`
      );
    const losx = result.recordset;

    res.json(losx);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});
// tìm mã lô kế hoạch phân xưởng xem  có tồn tại trong mã lô sản xuất không (bảng losanxuat)?
// nếu có thì k cho xóa
router.get("/predelete_lokehoachpx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("kehoachnam", req.query.kehoachnam)
      .input("makh", req.query.makh)
      .input("makhpx", req.query.makhpx)
      .input("mapx", req.query.mapx)
      .query(
        `select * from losanxuat where kehoachnam=@kehoachnam and makh=@makh and makhpx=@makhpx and mapx=@mapx`
      );
    const losx = result.recordset;

    res.json(losx);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all các lô sản xuất
router.get("/showalllosx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query(`select * from losanxuat order by ngaykt`);
    const tenpx = result.recordset;
    res.json(tenpx);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get kế hoạch
router.get("/getkehoachone", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.query.makh)
      .query(`select * from kehoach where makh=@makh`);
    const losx = result.recordset;

    res.json(losx);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// TÌM KẾ HOẠCH NHÀ MÁY THEO ĐIỀU KIỆN
router.get("/getlokhnm", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("nhomsp", req.query.nhomsp)
      .query(`select * from kehoach where nhomsp=@nhomsp order by makh`);
    const losx = result.recordset;

    res.json(losx);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// TÌM KẾ HOẠCH NHÀ MÁY THEO ĐIỀU KIỆN mã sản phẩm
router.get("/getlokhnmwithmasp", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("masp", req.query.masp)
      .query(`select * from kehoach where masp=@masp order by makh`);
    const losx = result.recordset;

    res.json(losx);
    //console.log(lokehoach);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get by id
router.get("/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM lokehoach WHERE _id = @_id`);
    const lokehoach = result.recordset.length ? result.recordset[0] : null;
    //const t = result.recordset[0].madonvi
    if (lokehoach) {
      res.json(lokehoach);
      //console.log(t)
    } else {
      res.status(404).json({
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete kế hoạch nhà máy
router.delete("/dellkhnhamay/:makh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.params.makh)
      .query(`SELECT * FROM kehoach WHERE makh = @makh`);
    let lokehoach = result.recordset.length ? result.recordset[0] : null;
    if (lokehoach) {
      await pool
        .request()
        .input("makh", req.params.makh)
        .query(
          `DELETE FROM kehoach WHERE makh = @makh and makh not in (select makh from lokehoach)`
        );
      res.json(lokehoach);
    } else {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

/* Import table regvssid */
router.post("/importkehoachnam", upload.single("file"), async (req, res) => {
  if (req.file) {
    //console.log(req.file);
    //console.log(req.file.path)
    let path = req.file.path;

    let rows = await readXlsxFile(path);
    rows.shift();
    //console.table(rows);
    // console.log(rows);

    const table = new Table("kehoach");
    table.create = false;

    table.columns.add("makh", NChar, { nullable: true });
    table.columns.add("masp", NChar, {
      nullable: true,
    });
    table.columns.add("tensp", NVarChar, {
      length: "max",
      nullable: true,
    });
    table.columns.add("nhomsp", NChar, { nullable: true });
    table.columns.add("soluong", NVarChar, {
      nullable: true,
    });
    table.columns.add("soluongmuavup1", NVarChar, {
      nullable: true,
    });
    table.columns.add("soluongmuavup2", NVarChar, {
      nullable: true,
    });
    table.columns.add("soluongmuavup3", NVarChar, {
      nullable: true,
    });
    table.columns.add("tgbatdau", Date, {
      nullable: true,
    });
    table.columns.add("tgketthuc", Date, {
      nullable: true,
    });
    table.columns.add("makhachhang", NVarChar, {
      nullable: true,
    });
    table.columns.add("khachhang", NVarChar, { length: "max", nullable: true });
    table.columns.add("ghichu", NVarChar, {
      length: "max",
      nullable: true,
    });
    table.columns.add("status", Bit, {
      nullable: true,
    });

    rows.forEach((row) => table.rows.add.apply(table.rows, row));

    // console.log(rows);

    // for (let j = 0; j < rows.length; j += 1) {
    //   table.rows.add(
    //     rows[j][0].trim(),
    //     rows[j][1],
    //     rows[j][2],
    //     rows[j][3],
    //     rows[j][4],
    //     rows[j][5],
    //     rows[j][6],
    //     rows[j][7],
    //     rows[j][8],
    //     rows[j][9],
    //     rows[j][10],
    //     rows[j][11],
    //     rows[j][12],
    //     rows[j][13]
    //   );
    // }

    try {
      await pool.connect();
      const results = await pool.request().bulk(table);
      console.log(`rows affected ${results.rowsAffected}`);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error,
      });
    }

    res.status(200).json({
      status: "succes",
    });
  } else {
    console.log("File not found !");
  }
});

// delete lô kế hoạch theo mã kế hoạch
router.delete("/dellokh/:makh", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("makh", req.params.makh)
      .query(`SELECT * FROM lokehoach WHERE makh = @makh`);
    let lokehoach = result.recordset.length ? result.recordset[0] : null;
    if (lokehoach) {
      await pool
        .request()
        .input("makh", req.params.makh)
        .query(
          `DELETE FROM lokehoach WHERE makh = @makh and makh not in (select makh from losanxuat)`
        );
      res.json(lokehoach);
    } else {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete lô sản xuất
router.delete("/losanxuat/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM losanxuat WHERE _id = @_id`);
    let losx = result.recordset.length ? result.recordset[0] : null;
    if (losx) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(`DELETE FROM losanxuat WHERE _id = @_id;`);
      res.json(losx);
    } else {
      res.status(404).json({
        message: "Không tìm thấy",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete luong cong đoạn
router.delete("/luongcongnhan/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM luongcongnhan WHERE _id = @_id`);
    let lcn = result.recordset.length ? result.recordset[0] : null;
    if (lcn) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(
          `DELETE FROM luongcongnhan WHERE _id = @_id and status=0 and stopday_losx='';`
        );
      res.json(lcn);
    } else {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete 1 lô sản xuất điều kiện lô chưa được chốt
router.delete("/losx/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM losanxuat WHERE _id = @_id`);
    let lcn = result.recordset.length ? result.recordset[0] : null;
    if (lcn) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(
          `DELETE FROM losanxuat WHERE _id = @_id and status=0 and stopday_losx='';`
        );
      res.json(lcn);
    } else {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete 1 kế hoạch nhà máy năm
// yêu cầu phải chưa phát sinh lô nhà máy
router.delete("/kehoachnam/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM kehoach WHERE _id = @_id`);
    let lcn = result.recordset.length ? result.recordset[0] : null;
    if (lcn) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(
          `DELETE FROM kehoach WHERE _id = @_id and status=0 and makh not in (select makh from lokehoach)`
        );
      res.json(lcn);
    } else {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete 1 kế hoạch nhà máy
// yêu cầu phải chưa phát sinh lô kế hoạch phân xưởng
router.delete("/kehoachnhamay/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM lokehoach WHERE _id = @_id`);
    let lcn = result.recordset.length ? result.recordset[0] : null;
    if (lcn) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(
          `DELETE FROM lokehoach WHERE _id = @_id and status=0 and makhpx not in (select makh from lokehoachphanxuong)`
        );
      res.json(lcn);
    } else {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete 1 kế hoạch phân xưởng
// yêu cầu phải chưa phát sinh lô sản xuất
router.delete("/kehoachphanxuong/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM lokehoachphanxuong WHERE _id = @_id`);
    let lcn = result.recordset.length ? result.recordset[0] : null;
    if (lcn) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(
          `DELETE FROM lokehoachphanxuong WHERE _id = @_id and status=0 and makh not in (select makh from losanxuat)`
        );
      res.json(lcn);
    } else {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete 1 lô kế hoạch nhà máy trong file quản lý lô sx
router.delete("/kehoachnhamaylsx/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM lokehoach WHERE _id = @_id`);
    let lcn = result.recordset.length ? result.recordset[0] : null;
    if (lcn) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(`DELETE FROM lokehoach WHERE _id = @_id and status=0`);
      res.json(lcn);
    } else {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete 1 lô kế hoạch phân xưởng
router.delete("/delkehoachphanxuong/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM lokehoachphanxuong WHERE _id = @_id`);
    let lcn = result.recordset.length ? result.recordset[0] : null;
    if (lcn) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(`DELETE FROM lokehoachphanxuong WHERE _id = @_id and status=0`);
      res.json(lcn);
    } else {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
