const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const pageController = require("./pageController");

require("dotenv").config();

module.exports = {
  authenticate,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign({ sub: user.id }, process.env.secret);
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getById(id) {
  return await User.findById(id);
}

async function create({ username, password }) {
  if (await User.findOne({ username })) {
    throw 'Username "' + username + '" is already taken';
  } else {
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new User({ username, passwordHash });
    await user.save();
    pageController.createDefault(username);
  }
}

async function update(id, userParam) {
  const user = await User.findById(id);
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }
  Object.assign(user, userParam);
  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
