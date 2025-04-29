export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS
      sameSite: "None", // allows sending cookie cross-site (e.g. frontend on Vercel, backend on Render)
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
