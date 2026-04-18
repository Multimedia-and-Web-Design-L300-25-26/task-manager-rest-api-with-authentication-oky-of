import jwt from "jsonwebtoken";
import User from "../models/User.js";


// 1. Extract token from Authorization header
// 2. Verify token
// 3. Find user
// 4. Attach user to req.user
// 5. Call next()
// 6. If invalid → return 401

const authMiddleware = async (req, res, next) => {
  //  implement here
try {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "user not authenticated" });
  }

  //{"Authentication ": "Bearer hbhhbff"}

  const actualToken = token.split(" ")[1];

  const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
  req.user= user;

  next();
} catch (error) {
  res.status(401).json({ message: "invalid token" });
}
  
};

export default authMiddleware;