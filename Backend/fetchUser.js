const jwt = require("jsonwebtoken");
const privateKey = "fi9uh3fvuyw34ifugy43fci04gjche";
const fetchUser = async (req, res, next) => {
  const jwtToken = req.header("auth-token");
  if (!jwtToken) {
    return res.status(401).json({
      success:false,
      error:"Please authenticate with correct details"
    });
  }
  try {
    const result = jwt.verify(jwtToken, privateKey);
    req.user = result.user;
    next();
  } catch (err) {
    res.status(500).json({
      success:false,
      error: "Some Internal error",
    });
  }
};
module.exports = fetchUser;
