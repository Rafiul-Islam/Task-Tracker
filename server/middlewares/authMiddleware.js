import jwt from "jsonwebtoken";

function verifyUser(req, res, next) {
  const fullToken = req.headers.authorization;
  if (!fullToken) return res.status(401).send({message: 'Unauthorized.'});

  const token = fullToken.split(" ")[1];
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({message: 'Unauthorized.'});
    req.userId = decoded.userId;
    next();
  });
}

export default verifyUser;
