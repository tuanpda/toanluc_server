const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { pool } = require("../database/dbinfo");
const jwt = require("jsonwebtoken");
const verifyToken = require("../services/verify-token");
const multer = require("multer");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    /* Nhớ sửa đường dẫn khi deploy lên máy chủ */
    //cb(null, "E:\\PROJECT\\docthuBhxh\\client\\static\\avatar");
    cb(null, "E:\\PROJECT\\TINHLUONGCONGDOAN\\client\\static\\avatar");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.patch("/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM phongban WHERE _id = @_id`);
    let phongban = result.recordset[0];
    if (phongban) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("maphong", req.body.maphong)
        .input("tenphong", req.body.tenphong)
        .input("ghichu", req.body.ghichu)
        .input("updatedAt", req.body.updatedAt)
        .query(
          `UPDATE phongban SET 
              maphong = @maphong, 
              tenphong = @tenphong,
              ghichu = @ghichu,
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

// Tạo bảng đơn giá công
router.post("/createtabledgc", async (req, res) => {
  try {
    // console.log(req.body[0].tbl)
    await pool.connect();
    const result = await pool.request().query(` CREATE TABLE ${
      req.body[req.body.length - 1].tbl
    }(
        [_id] [int] IDENTITY(1,1) NOT NULL,
        [nc] [nvarchar](255) NULL,
        [khsp] [nvarchar](255) NULL,
        [dinhmuc] [nvarchar](255) NULL,
        [dongia] [nvarchar](255) NULL,
        [lydo] [nvarchar](MAX) NULL,
        [nhom] [nvarchar](255) NULL,
        [dinhmuc8h] [nvarchar](255) NULL,
        [diengiai] [nvarchar](255) NULL,
        [tensp] [nvarchar](255) NULL,
        [createdAt] [datetime] NULL,
        [createdBy] [nvarchar](255) NULL,
        [tname] [nvarchar](455) NULL
      ) `);

    const tb = req.body;
    res.json(tb);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Ghi dữ liệu phiên bản đơn giá công
router.post("/adddongialuong", async (req, res) => {
  try {
    // console.log(req.body.tname)
    tableName = req.body.tname;
    const result = await pool
      .request()
      .input("nc", req.body.nc)
      .input("khsp", req.body.khsp)
      .input("dinhmuc", req.body.dinhmuc)
      .input("dongia", req.body.dongia)
      .input("lydo", req.body.lydo)
      .input("nhom", req.body.nhom)
      .input("dinhmuc8h", req.body.dinhmuc8h)
      .input("diengiai", req.body.diengiai)
      .input("tensp", req.body.tensp)
      .input("createdAt", req.body.createdAt)
      .input("createdBy", req.body.createdBy)
      .input("tname", req.body.tname).query(`
                      INSERT INTO ${tableName} (nc, khsp, dinhmuc, dongia, lydo, nhom, dinhmuc8h, diengiai, tensp, createdAt, createdBy, tname) 
                      VALUES (@nc, @khsp, @dinhmuc, @dongia, @lydo, @nhom, @dinhmuc8h, @diengiai, @tensp, @createdAt, @createdBy, @tname);
                  `);

    const tb = req.body;
    res.json(tb);
  } catch (error) {
    res.status(500).json(error);
  }
});

// thêm nguyên công
router.post("/addnguyencong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.body.mapx)
      .input("mavt", req.body.mavt)
      .input("tenvt", req.body.tenvt)
      .input("nhomsp", req.body.nhomsp)
      .input("diengiai", req.body.diengiai)
      .input("nhomluong", req.body.nhomluong).query(`
                      INSERT INTO dmnc (mapx, mavt, tenvt, nhomsp, diengiai, nhomluong) 
                      VALUES (@mapx, @mavt, @tenvt, @nhomsp, @diengiai, @nhomluong);
                  `);
    const nc = req.body;
    res.json(nc);
  } catch (error) {
    res.status(500).json(error);
  }
});

// thêm nguyên công
router.post("/adddongiacong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("PX", req.body.PX)
      .input("congdoan", req.body.congdoan)
      .input("khsp", req.body.khsp)
      .input("dongia", req.body.dongia)
      .input("ghichu", req.body.ghichu).query(`
                      INSERT INTO dongiacong (PX, congdoan, khsp, dongia, ghichu) 
                      VALUES (@PX, @congdoan, @khsp, @dongia, @ghichu);
                  `);
    const nc = req.body;
    res.json(nc);
  } catch (error) {
    res.status(500).json(error);
  }
});

// add phiên bản lương
router.post("/addversion", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("version", req.body.version)
      .input("ghichu", req.body.ghichu)
      .input("createdAt", req.body.createdAt)
      .input("createdBy", req.body.createdBy).query(`
                      INSERT INTO dsversion (version, ghichu, createdAt, createdBy) 
                      VALUES (@version, @ghichu, @createdAt, @createdBy);
                  `);
    const bophan = req.body;
    res.json(bophan);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all danh mục nguyên công
router.get("/getallnguyencong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().query(`SELECT * FROM dmnc`);
    const nc = result.recordset;

    res.json(nc);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all danh mục đơn giá công
router.get("/getalldongiacong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().query(`SELECT * FROM dongiacong`);
    const dgc = result.recordset;

    res.json(dgc);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all danh mục đơn giá công theo px
router.get("/getalldongiacongwithpx", async (req, res) => {
  try {
    await pool.connect();

    const result = await pool
      .request()
      .input("PX", req.query.PX)
      .query(`SELECT * FROM dongiacong where PX=@PX`);
    const dgc = result.recordset;

    res.json(dgc);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all vision
router.get("/getversion", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().query(`select * from dsversion`);
    const cn = result.recordset;

    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get dm đơn giá công
router.post("/chonphienban", async (req, res) => {
  try {
    // console.log(req.body[0].tbl)
    // console.log(req.body.length)
    await pool.connect();
    const result = await pool
      .request()
      .input("khsp", req.query.khsp)
      .query(
        `SELECT * FROM ${req.body[req.body.length - 1].tbl} where khsp=@khsp`
      );
    const phongban = result.recordset;

    res.json(phongban);
    // console.log(phongban);
  } catch (error) {
    res.status(500).json(error);
  }
});

// lọc danh mục sản phẩm từ bảng danh mục nguyên công
router.get("/filterfulldmnc", async (req, res) => {
  try {
    const mapxList = req.query.mapx;
    const strpx = "'" + mapxList.join("','") + "'";
    // console.log(strpx);
    const masp = req.query.masp;
    // console.log(masp);
    const nhomsp = req.query.nhomsp;
    // console.log(nhomsp);

    await pool.connect();
    const result = await pool
      .request()
      .query(
        `select * from dmnc where mapx in (${strpx}) and mavt='${masp}' and nhomsp='${nhomsp}'`
      );
    const data = result.recordset;
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// cập nhật nguyên công
router.patch("/nc/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM dmnc WHERE _id = @_id`);
    let phongban = result.recordset[0];
    if (phongban) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("mapx", req.body.mapx)
        .input("mavt", req.body.mavt)
        .input("tenvt", req.body.tenvt)
        .input("nhomsp", req.body.nhomsp)
        .input("diengiai", req.body.diengiai)
        .input("nhomluong", req.body.nhomluong)
        .query(
          `UPDATE dmnc SET 
              mapx = @mapx, 
              mavt = @mavt,
              tenvt = @tenvt,
              nhomsp = @nhomsp,
              diengiai = @diengiai,
              nhomluong = @nhomluong
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

// cập nhật đơn giá công
router.patch("/dongiacong/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM dongiacong WHERE _id = @_id`);
    let phongban = result.recordset[0];
    if (phongban) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("PX", req.body.PX)
        .input("congdoan", req.body.congdoan)
        .input("khsp", req.body.khsp)
        .input("dongia", req.body.dongia)
        .input("ghichu", req.body.ghichu)
        .query(
          `UPDATE dongiacong SET 
              PX = @PX, 
              congdoan = @congdoan,
              khsp = @khsp,
              dongia = @dongia,
              ghichu = @ghichu
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

// get công nhân by mapx
router.get("/getcongnhanbymapx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .query(`select * from congnhan where mapx=@mapx`);
    const phongban = result.recordset;

    res.json(phongban);
    // console.log(phongban);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete api by id
router.delete("/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM dmnc WHERE _id = @_id`);
    let nc = result.recordset.length ? result.recordset[0] : null;
    if (nc) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(`DELETE FROM dmnc WHERE _id = @_id;`);
      res.json(nc);
    } else {
      res.status(404).json({
        message: "not found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete đơn giá công
router.delete("/dongiacong/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM dongiacong WHERE _id = @_id`);
    let nc = result.recordset.length ? result.recordset[0] : null;
    if (nc) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(`DELETE FROM dongiacong WHERE _id = @_id;`);
      res.json(nc);
    } else {
      res.status(404).json({
        message: "not found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete phiên bản lương
router.delete("/version/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM dsversion WHERE _id = @_id`);
    let pb = result.recordset.length ? result.recordset[0] : null;
    if (pb) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(`DELETE FROM dsversion WHERE _id = @_id;`);
      res.json(pb);
    } else {
      res.status(404).json({
        message: "Không tìm thấy phiên bản lương này",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
