import bcrypt from "bcrypt";
import { Router } from "express";
import passport from "passport";
import { addUser, getUsers } from "../config/db.js";

const router = Router();

router.post("/login", passport.authenticate("local"));
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    addUser({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(getUsers());
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
