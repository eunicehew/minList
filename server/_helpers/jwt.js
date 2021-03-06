const expressJwt = require("express-jwt");
const userRoutes = require("../controller/userController");
require("dotenv").config();

module.exports = jwt;

function jwt() {
  const secret = process.env.secret;
  return expressJwt({ secret, isRevoked,
   }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
      "/users/register",
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userRoutes.getById(payload.sub);
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }
  done();
}
