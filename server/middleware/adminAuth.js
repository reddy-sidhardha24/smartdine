const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {

  try {

    // GET TOKEN

    const authHeader =
      req.headers.authorization;

    // TOKEN MISSING

    if (!authHeader) {

      return res.status(401).json({
        message: "Access denied",
      });

    }

    // FORMAT:
    // Bearer TOKEN

    const token =
      authHeader.split(" ")[1];

    // VERIFY TOKEN

    const verified = jwt.verify(
      token,
      "smartdine_secret_key"
    );

    // SAVE ADMIN DATA

    req.admin = verified;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Invalid token",
    });

  }

};

module.exports = adminAuth;