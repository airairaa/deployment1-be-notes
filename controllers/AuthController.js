import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";


// Register
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Semua field wajib diisi." });
    }

    const userExist = await User.findOne({ where: { email } });
    if (userExist) return res.status(400).json({ msg: "Email sudah terdaftar" });

    const usernameExist = await User.findOne({ where: { username } });
    if (usernameExist) return res.status(400).json({ msg: "Username sudah digunakan" });

    await User.create({ username, email, password });
    res.status(201).json({ msg: "User berhasil didaftarkan" });

  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server", error: error.message });
  }
};



// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Email dan password wajib diisi." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.warn(`⚠️ Login gagal: user dengan email '${email}' tidak ditemukan.`);
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.warn(`⚠️ Password salah untuk email '${email}'.`);
      return res.status(400).json({ msg: "Password salah" });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log(`✅ Login berhasil untuk user '${user.username}'`);
    res.json({ accessToken });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server", error: error.message });
  }
};

