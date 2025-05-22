import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

let refreshTokens = [];
router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});
router.post("/login", (req, res) => {
  // Authenticate user first

  const { username } = req.body;
  const user = {
    name: username,
  };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

router.post("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "20s" });
};
export default router;
