const userService = require('../services/userService');

class UserController {
  async register(req, res) {
    const { email, name, password } = req.body;

    try {
      const user = await userService.registerUser(email, name, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();