export const generateToken = (newUser, message, statusCode, res) => {
  const token = newUser.generateJsonWebToken();
  const { password, ...user } = newUser._doc;
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({ success: true, message, user });
};
