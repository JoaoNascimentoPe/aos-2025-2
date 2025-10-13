import jwt from "jsonwebtoken";

const SECRET = process.env.MY_SECRET || "secretodev";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado!" });
  }
}
