import jwt from"jsonwebtoken";
export const secretKey = "authentication_key";
 

export function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]; 
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token,secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: "Invalid token" });
  }
}
 
