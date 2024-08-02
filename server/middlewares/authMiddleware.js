import jwt from "jsonwebtoken";

function verifyUser(req, res, next) {
  const fullToken = req.headers.authorization;
  if (!fullToken) return res.status(401).send({ message: "Unauthorized." });

  const token = fullToken.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized." });
    req.userId = decoded.userId;
    next();
  });
}

export default verifyUser;
