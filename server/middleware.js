import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "key", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    req.userId = userInfo.id;
    next();
  });
};
