const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.Authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.APP_KEY);
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw "Invalid user ID";
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error("Invalid request!"),
//     });
//   }
// };

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.APP_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.statuys(400).send("Invalid token");
  }
};
