class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  Signup = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.Signup(email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = AuthController;
