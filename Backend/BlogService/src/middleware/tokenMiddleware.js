const TokenMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const [bearer, token] = authHeader && authHeader.split(" ");

  if (bearer.toLowerCase() !== "bearer") {
    return res
      .status(401)
      .json({ message: "Bearer token is missing or invalid" });
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }

  try {
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = TokenMiddleware;
