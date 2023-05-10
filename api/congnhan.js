const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { pool } = require("../database/dbinfo");
const jwt = require("jsonwebtoken");
const verifyToken = require("../services/verify-token");
const multer = require("multer");

// báo cáo quân số
router.get("/baocaoquanso", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("ngaychamcong", req.query.ngaychamcong)
      .execute("baocaoquanso");

    const bcqs = result.recordset;
    res.json(bcqs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// xem lai bao cao quan so
router.get("/xemlaibaocaoquanso", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("ngaychamcong", req.query.ngaychamcong)
      .query("select * from chamcongphanxuong where ngaychamcong=@ngaychamcong");

    const bcqs = result.recordset;
    res.json(bcqs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// xem ngày chấm công và mapx đã tồn tại
router.get("/showngaychamcongandmapx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("ngaychamcong", req.query.ngaychamcong)
      .input("mapx", req.query.mapx)
      .query("select * from chamcong where ngaychamcong=@ngaychamcong and mapx=@mapx");

    const bcqs = result.recordset;
    res.json(bcqs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// show ma cong nhan tai phanxuong
router.get("/showmacninpx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .query("select macn from congnhan where mapx=@mapx order by macn");
    const bcqs = result.recordset;
    res.json(bcqs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// show ma cong nhan tai to
router.get("/showmacninto", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mato", req.query.mato)
      .query("select macn from congnhan where mato=@mato order by macn");
    const bcqs = result.recordset;
    res.json(bcqs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// chi tiet quan so
router.get("/detailquansowithdonvi", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("ngaychamcong", req.query.ngaychamcong)
      .input("mapx", req.query.mapx)
      .query(
        "select * from chamcong where ngaychamcong=@ngaychamcong and mapx=@mapx order by machamcong"
      );
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// chi tiet quan so tai to
router.get("/detailquansowithdonvito", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("ngaychamcong", req.query.ngaychamcong)
      .input("mato", req.query.mato)
      .query(
        "select * from chamcong where ngaychamcong=@ngaychamcong and mato=@mato order by machamcong"
      );
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// bao cao thang theo phan xuong
router.get("/baocaothangtheopx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .input("startDate", req.query.startDate)
      .input("endDate", req.query.endDate)
      .query(
        "select * from chamcong where mapx=@mapx and ngaychamcong BETWEEN @startDate AND @endDate"
      );
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// báo cáo tổng hợp từng phân xưởng
router.get("/baocaotonghoptheophanxuong", async (req, res) => {
  try {
    // console.log(req.body);
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .input("tungay", req.query.tungay)
      .input("denngay", req.query.denngay)
      .execute('baocaochamcongtheopx')
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// báo cáo tổng hợp từng tổ
router.get("/baocaotonghoptheoto", async (req, res) => {
  try {
    // console.log(req.body);
    await pool.connect();
    const result = await pool
      .request()
      .input("mato", req.query.mato)
      .input("tungay", req.query.tungay)
      .input("denngay", req.query.denngay)
      .execute('baocaochamcongtheoto')
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// bao cao thang theo to
router.get("/baocaothangtheoto", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mato", req.query.mato)
      .input("startDate", req.query.startDate)
      .input("endDate", req.query.endDate)
      .query(
        "select * from chamcong where mato=@mato and ngaychamcong BETWEEN @startDate AND @endDate"
      );
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// báo cáo chấm công theo phân xưởng
router.get("/baocaochamcongthangphanxuong", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .input("startDate", req.query.startDate)
      .input("endDate", req.query.endDate)
      .execute('bangchamcongthang_phanxuong')
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// báo cáo chấm công theo tổ
router.get("/baocaochamcongthangto", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mato", req.query.mato)
      .input("startDate", req.query.startDate)
      .input("endDate", req.query.endDate)
      .execute('bangchamcongthang_to')
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// all cong nhan
router.get("/allcongnhan", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query("select * from congnhan order by _id");
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// all cong nhan with px
router.get("/allcongnhanpx", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mapx", req.query.mapx)
      .query("select * from congnhan where mapx=@mapx order by sttchon");
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// all cong nhan with ma to
router.get("/allcongnhanto", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mato", req.query.mato)
      .query("select * from congnhan where mato=@mato order by sttchon");
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// distinct ngaychamcong
router.get("/getngaychamcongonsv", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("mato", req.query.mato)
      .query("select distinct(ngaychamcong) from chamcong");
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all bien ban vi pham
router.get("/getallvipham", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .query("select * from hosovipham order by ngayxuphat desc");
    const cn = result.recordset;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }
});

// report luong
router.post("/addcongnhan", async (req, res) => {
  // if (req.file) {
  //   let linkAvatar;
  //   const file = req.file;
  //   if (!file) {
  //     anhdd = req.body.anhdd;
  //   } else {
  //     // Đổi đường dẫn khi deploy lên máy chủ
  //     linkAvatar = `http://localhost/avatar/${req.file.filename}`;
  //   }

  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("macn", req.body.macn)
      .input("tencn", req.body.tencn)
      .input("mapx", req.body.mapx)
      .input("tenpx", req.body.tenpx)
      .input("sdt", req.body.sdt)
      .input("diachi", req.body.diachi)
      .input("cccd", req.body.cccd)
      .input("mato", req.body.mato)
      .input("tento", req.body.tento)
      .input("chucvu", req.body.chucvu)
      .input("luongcb", req.body.luongcb)
      .input("nguoilienhe", req.body.nguoilienhe)
      .input("sotknh", req.body.sotknh)
      .input("tennh", req.body.tennh)
      .input("ghichu", req.body.ghichu)
      .input("createdAt", req.body.createdAt)
      .input("createdBy", req.body.createdBy).query(`
                        INSERT INTO congnhan (macn, tencn, mapx, tenpx, sdt, diachi, cccd, mato, tento, chucvu, luongcb, nguoilienhe, sotknh, tennh, ghichu, createdAt, createdBy) 
                        VALUES (@macn, @tencn, @mapx, @tenpx, @sdt, @diachi, @cccd, @mato, @tento, @chucvu, @luongcb, @nguoilienhe, @sotknh, @tennh, @ghichu, @createdAt, @createdBy);
                    `);
    const cn = req.body;
    res.json(cn);
  } catch (error) {
    res.status(500).json(error);
  }

  // } else {
  //   console.log("File not found !");
  // }
});

// add chấm công
router.post("/addchamcong", async (req, res) => {
  try {
    await pool.connect();
    await pool
      .request()
      .input("macn", req.body.macn)
      .input("tencn", req.body.tencn)
      .input("mapx", req.body.mapx)
      .input("tenpx", req.body.tenpx)
      .input("mato", req.body.mato)
      .input("tento", req.body.tento)
      .input("sttchon", req.body.sttchon)
      .input("machamcong", req.body.machamcong)
      .input("chamcong", req.body.chamcong)
      .input("diengiai", req.body.diengiai)
      .input("ghichu", req.body.ghichu)
      .input("ngaychamcong", req.body.ngaychamcong)
      .input("tuanchamcong", req.body.tuanchamcong)
      .input("createdAt", req.body.createdAt)
      .input("createdBy", req.body.createdBy).query(`
                        INSERT INTO chamcong (macn, tencn, mapx, tenpx, mato, tento, sttchon, machamcong, chamcong, diengiai, ghichu, ngaychamcong, tuanchamcong, createdAt, createdBy) 
                        VALUES (@macn, @tencn, @mapx, @tenpx, @mato, @tento, @sttchon, @machamcong, @chamcong, @diengiai, @ghichu, @ngaychamcong, @tuanchamcong, @createdAt, @createdBy);
                    `);
    res.status(200).json({
      success: true,
      message: "Chấm công thành công !",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// add chấm công phân xưởng
router.post("/addchamcongphanxuong", async (req, res) => {
  try {
    await pool.connect();
    await pool
      .request()
      .input("ngaychamcong", req.body.ngaychamcong)
      .input("mapx", req.body.mapx)
      .input("tenpx", req.body.tenpx)
      .input("mato", req.body.mato)
      .input("tento", req.body.tento)
      .input("tongnguoi", req.body.tongnguoi)
      .input("ca1hc", req.body.ca1hc)
      .input("ca23", req.body.ca23)
      .input("nghip", req.body.nghip)
      .input("nghim", req.body.nghim)
      .input("nghik", req.body.nghik)
      .input("nghix", req.body.nghix)
      .input("nghil", req.body.nghil)
      .input("tongnghi", req.body.tongnghi)
      .input("ghichu", req.body.ghichu)
      .input("createdAt", req.body.createdAt)
      .input("createdBy", req.body.createdBy).query(`
                        INSERT INTO chamcongphanxuong (ngaychamcong, mapx, tenpx, mato, tento, tongnguoi, ca1hc, ca23, nghip, nghim, nghik, nghix, nghil, tongnghi, ghichu, createdAt, createdBy) 
                        VALUES (@ngaychamcong, @mapx, @tenpx, @mato, @tento, @tongnguoi, @ca1hc, @ca23, @nghip, @nghim, @nghik, @nghix, @nghil, @tongnghi, @ghichu, @createdAt, @createdBy);
                    `);
    res.status(200).json({
      success: true,
      message: "Chấm công thành công !",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// add vi pham
router.post("/lapbienbanvipham", async (req, res) => {
  try {
    await pool.connect();
    await pool
      .request()
      .input("ngayxuphat", req.body.ngayxuphat)
      .input("soqd", req.body.soqd)
      .input("mapx", req.body.mapx)
      .input("tenpx", req.body.tenpx)
      .input("mato", req.body.mato)
      .input("tento", req.body.tento)
      .input("macn", req.body.macn)
      .input("tencn", req.body.tencn)
      .input("chucvu", req.body.chucvu)
      .input("sdt", req.body.sdt)
      .input("diachi", req.body.diachi)
      .input("cccd", req.body.cccd)
      .input("noidung", req.body.noidung)
      .input("maloaivp", req.body.maloaivp)
      .input("loaivp", req.body.loaivp)
      .input("mamucdovp", req.body.mamucdovp)
      .input("mucdovp", req.body.mucdovp)
      .input("mamucdokl", req.body.mamucdokl)
      .input("mucdokl", req.body.mucdokl)
      .input("nguoikiemtra", req.body.nguoikiemtra)
      .input("ghichu", req.body.ghichu)
      .input("createdAt", req.body.createdAt)
      .input("createdBy", req.body.createdBy).query(`
                        INSERT INTO hosovipham (soqd,	ngayxuphat,	mapx,	tenpx,	mato,	tento,	macn,	tencn,	chucvu,	sdt,	diachi,	cccd,	noidung, maloaivp,	loaivp,	mamucdovp, mucdovp, mamucdokl, mucdokl, nguoikiemtra,	ghichu,createdAt, createdBy) 
                        VALUES (@soqd,	@ngayxuphat,	@mapx,	@tenpx,	@mato,	@tento,	@macn,	@tencn,	@chucvu,	@sdt,	@diachi,	@cccd,	@noidung, @maloaivp,	@loaivp,	@mamucdovp, @mucdovp, @mamucdokl, @mucdokl, @nguoikiemtra, @ghichu,	@createdAt, @createdBy);
                    `);
    res.status(200).json({
      success: true,
      message: "Lap bien ban thanh cong !",
    });
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
      .query(`SELECT * FROM congnhan WHERE _id = @_id`);
    const congnhan = result.recordset.length ? result.recordset[0] : null;
    //const t = result.recordset[0].madonvi
    if (congnhan) {
      res.json(congnhan);
    } else {
      res.status(404).json({
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM congnhan WHERE _id = @_id`);
    let congnhan = result.recordset[0];
    if (congnhan) {
      await pool
        .request()
        .input("_id", req.params._id)
        .input("macn", req.body.macn)
        .input("tencn", req.body.tencn)
        .input("mapx", req.body.mapx)
        .input("tenpx", req.body.tenpx)
        .input("sdt", req.body.sdt)
        .input("diachi", req.body.diachi)
        .input("cccd", req.body.cccd)
        .input("mato", req.body.mato)
        .input("tento", req.body.tento)
        .input("chucvu", req.body.chucvu)
        .input("luongcb", req.body.luongcb)
        .input("nguoilienhe", req.body.nguoilienhe)
        .input("sotknh", req.body.sotknh)
        .input("tennh", req.body.tennh)
        .input("ghichu", req.body.ghichu)
        .input("updatedAt", req.body.updatedAt)
        .query(
          `UPDATE congnhan SET 
                macn = @macn, 
                tencn = @tencn,
                mapx = @mapx, 
                tenpx = @tenpx,
                sdt = @sdt,
                diachi = @diachi,
                cccd = @cccd,
                mato = @mato,
                tento = @tento,
                chucvu = @chucvu,
                luongcb = @luongcb,
                nguoilienhe = @nguoilienhe,
                sotknh = @sotknh,
                tennh = @tennh,
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

// delete công nhan
router.delete("/:_id", async (req, res) => {
  try {
    await pool.connect();
    const result = await pool
      .request()
      .input("_id", req.params._id)
      .query(`SELECT * FROM congnhan WHERE _id = @_id`);
    let cn = result.recordset.length ? result.recordset[0] : null;
    if (cn) {
      await pool
        .request()
        .input("_id", req.params._id)
        .query(`DELETE FROM congnhan WHERE _id = @_id;`);
      res.json(cn);
    } else {
      res.status(404).json({
        message: "Không tìm thấy",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
