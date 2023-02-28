const jwt = require("jsonwebtoken");

const signAccessToken = async (sessionId) => {
  return new Promise((resolve, reject) => {
    const payload = { sessionId };
    const secret = process.env.ACCESS_TOKEN_SECRET;     
    const options = {
      expiresIn: "1h",
    };

    jwt.sign(payload, secret, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const signRefreshToken = async (sessionId) => {
  return new Promise((resolve, reject) => {
    const payload = { sessionId };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
    };

    jwt.sign(payload, secret, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

module.exports = { signAccessToken, signRefreshToken };
