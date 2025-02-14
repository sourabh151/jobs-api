const User = require("../models/User");
const { compareSync } = require("bcryptjs")
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");


const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const emailReg =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!emailReg.test(email)){
    throw new BadRequestError("please provide valid email");
  }
  await User.init();
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.json({ success: true, token });
}
const login = async function(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new UnauthenticatedError('no Account Associated with these credentials');
  }
  if (!compareSync(password, user.password)) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const token = user.createJWT();
  res.json({ success: true, token })
}
module.exports = { signup, login }
