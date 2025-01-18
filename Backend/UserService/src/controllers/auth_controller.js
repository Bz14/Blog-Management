class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  Signup = async (req, res) => {
    try {
      const { email, password } = req.body;
      const message = await this.authService.Signup(email, password);
      res.status(201).json({ message: message });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  Verify = async (req, res) => {
    try {
      const { email, otp } = req.body;
      const message = await this.authService.Verify(email, otp);
      res.status(200).json({ message: message });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.Login(email, password);
      res.status(200).json({ access_token: token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = AuthController;
