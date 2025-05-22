import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const posts = [
  {
    username: "John",
    title: "Post 1",
  },
  {
    username: "Kyle",
    title: "Post 2",
  },
];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("tpken", token, authHeader);

  if (!token) {
    res.status(401).json({
      message: "User is unauthorized",
    });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
    if (err) {
      res.status(403).json({
        message: "User is forbidden",
      });
    }
    console.log("user", user);
    req.user = user;
    next();
  });
};

router.get("/", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

export default router;
