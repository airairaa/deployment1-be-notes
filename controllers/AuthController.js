import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";


// Register
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) return res.status(400).json({ msg: "Email sudah terdaftar" });

    const usernameExist = await User.findOne({ where: { username } });
    if (usernameExist) return res.status(400).json({ msg: "Username sudah digunakan" });

    // Hapus hashing manual, biarkan hook model yang meng-hash
    await User.create({ username, email, password });

    res.status(201).json({ msg: "User berhasil didaftarkan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// Login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    console.log("Password dari request:", req.body.password);
    console.log("Password hash dari DB:", user.password);

    const match = await bcrypt.compare(req.body.password, user.password);
    console.log("Hasil bcrypt.compare:", match);


    if (!match) return res.status(400).json({ msg: "Password salah" });

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
