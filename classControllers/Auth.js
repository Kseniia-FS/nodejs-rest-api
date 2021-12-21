const { login, register, logout, sendEmail } = require("../services/auth");

class Auth {
  async signup(req, res) {
    const { email, password } = req.body;
    const newUser = await register(email, password);
    const message = {
      to: email,
      subject: "Please verify your email",
      html: `Please <a href="http://localhost:5050/api/users/verify/${newUser.verificationToken}">clik here</a> to verify your email`,
    };

    await sendEmail(message);

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const user = await login(email, password);

    res.json({
      status: "success",
      data: {
        token: user.token,
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  }

  async signout(req, res) {
    const { id } = req.user;
    await logout(id);

    res.status(204).json({ message: "You are loged out!" });
  }
}

module.exports = Auth;
