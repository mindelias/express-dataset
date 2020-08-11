const tokenizer = require("../controllers/services/tokenizer");
const verify = tokenizer.verify;

const auth = (req, res, next) => {
  let tokenToVerify;
  const signature = req.header("Authorization");
  const content = signature ? signature.split(" ") : false;

  if (content && content.length === 2 && content[0] === "Bearer") {
    tokenToVerify = content[1];
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.body.token;
  }

  if (tokenToVerify) {
    return verify(tokenToVerify, (err, thisToken) => {
      if (err) {
        return res.status(401).json({
          error: "Invalid Token",
        });
      }
      req.token = thisToken;
      return next();
    });
  }

  return res.status(401).json({
    error: "No Authorization found",
  });
};

module.exports = auth;
