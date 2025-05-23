const express = require("express");
const pool = require("../config");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// app.use(cors());
app.use(cors({
  origin: 'https://p6l7k2jx-5173.asse.devtunnels.ms', // Frontend URL
  methods: 'GET, POST, PUT, DELETE'
}));

router = express.Router();

// regis ฝั่งหมอหรออออออ
router.post("/register", async function (req, res, next) {
  const userName = req.body.userName;
  const psw = req.body.psw;
  const type = req.body.type;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const encryptedPassword = await bcrypt.hash(psw, saltRounds);
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      `insert into user (userName, psw, type, firstName, lastName) values (?, ?, ?, ?, ?)`,
      [userName, encryptedPassword, type, firstName, lastName]
    );
    conn.commit();
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

// regis ฝั่งผู้ป่วยยยยยยยยย
router.post("/register2", async function (req, res, next) {
  const userName = req.body.userName; // รับ username จาก req.body
  const psw = req.body.psw; // รับ password จาก req.body
  // เข้ารหัส password ก่อนบันทึกลงฐานข้อมูล
  const encryptedPassword = await bcrypt.hash(psw, saltRounds);
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      `UPDATE user SET psw = ? WHERE userName = ?`,
      [encryptedPassword, userName]
    );
    conn.commit();
    res.status(200).send("Password updated successfully");
  } catch (error) {
    conn.rollback();
    console.log(error);
    res.status(500).send("Error updating password");
  } finally {
    conn.release();
  }
});

// login ฝั่งหมอ
router.post("/login", async function (req, res, next) {
  let userName = req.body.userName;
  let psw = req.body.psw;
  try {
    const [row, _] = await pool.query(
      `select * from user where userName = ? and not type = 'patient'`,
      [userName]
    );
    if (row.length != 0) {
      if (await bcrypt.compare(psw, row[0].psw)) {
        res.json(row[0]);
      } else {
        res.send("ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง");
      }
    } else {
      res.send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

// login ผู้ป่วย

router.post("/login2", async function (req, res, next) {
  let userName = req.body.userName;
  let psw = req.body.psw;
  try {
    const [row, _] = await pool.query(
      `select * from user where userName = ? and type = 'patient'`,
      [userName]
    );
    if (row.length != 0) {
      if (await bcrypt.compare(psw, row[0].psw)) {
        const [patient] = await pool.query(
          `select * from patient where IDcard = ? `,
          [row[0].userName]
        );
        res.json(patient[0]);
      } else {
        res.send("ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง");
      }
    } else {
      res.send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/user/:userId", async function (req, res, next) {
  let userId = req.params.userId;
  try {
    const [row, _] = await pool.query(
      "select * from user where userId = ?",
      userId
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/user`, async function (req, res, next) {
  try {
    const [row, _] = await pool.query(`select * from user`);
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/onlyPatient`, async function (req, res, next) {
  console.log("ok");
  try {
    const [row, f] = await pool.query(
      `select * from user join patient on user.userName=Patient.IDcard where type='patient'`
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.post(`/setPassword`, async function (req, res, next) {
  const userName = req.body.userName;
  const psw = req.body.psw;
  const encryptedPassword = await bcrypt.hash(psw, saltRounds);
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(`update user set psw = ? where userName = ?`, [
      encryptedPassword,
      userName,
    ]);
    conn.commit();
    res.send("set password");
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

router.get(`/chemist`, async function (req, res, next) {
  try {
    const [row, f] = await pool.query(
      `select * from user where type='chemist'`
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

// login line เก็บ userId Line ลง database
router.post("/login34", async function (req, res, next) {
  let userName = req.body.userName;
  let UserIdLine = req.body.UserIdLine;
  let password = req.body.password;

  try {
    const [rows, _] = await pool.query(
      `SELECT * FROM user JOIN treatment ON user.userName = treatment.IDCard 
       WHERE user.userName = ? AND user.type = 'patient';`,
      [userName]
    );

    if (rows.length > 0) {
      const user = rows[0];

      // ตรวจสอบรหัสผ่านที่เข้ารหัส
      const passwordMatch = await bcrypt.compare(password, user.psw);

      if (passwordMatch) {
        // อัปเดต UserIdLine ในฐานข้อมูล
        await pool.query(
          `UPDATE user SET UserIdLine = ? WHERE userName = ?`,
          [UserIdLine, userName]
        );
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// get userIDLine by userName
router.get(`/useridline/:userName`, async function (req, res, next) {
  let userName = req.params.userName;
  try {
    const [row, f] = await pool.query(
      `select UserIdLine from user where userName = ?`, userName
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/checkUserRegis`, async function (req, res, next) {
  try {
    let userId = req.query.userId;
    let userName = req.query.userName;

    const [rows] = await pool.query(
      `SELECT UserIdLine, userName FROM user WHERE UserIdLine = ? AND userName = ?`,
      [userId, userName]
    );

    if (rows.length > 0) {
      return res.status(200).json({ message: "User found" });
    }
    return res.status(401).json({ message: "User not found" });

  } catch (error) {
    console.error(error);
  }
});

exports.router = router;
