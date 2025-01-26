class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  Signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const message = await this.authService.Signup(name, email, password);
      res.status(201).json({ message: message });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  Verify = async (req, res) => {
    try {
      const { email, otp } = req.body;
      console.log("Verify", email, otp);
      const message = await this.authService.Verify(email, otp);
      res.status(200).json({ message: message });
    } catch (error) {
      console.log("Error", error);
      res.status(400).json({ message: error.message });
    }
  };

  Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.Login(email, password);
      res.status(200).json({ accessToken: token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  ValidateUser = async (req, res) => {
    res.status(200).json({ message: "Token is valid", user: req.id });
  };

  GetUserProfile = async (req, res) => {
    try {
      const user = await this.authService.GetUserProfile(req.id);
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  UpdateUserProfile = async (req, res) => {
    try {
      const id = req.id;
      const { name, bio } = req.body;
      const message = await this.authService.UpdateUserProfile(id, name, bio);
      res.status(200).json({ message: message });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  GetSubscribers = async (req, res) => {
    try {
      const id = req.params.id;
      const subscribers = await this.authService.GetSubscribers(id);
      res.status(200).json({ subscribers: subscribers });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  GetAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      const author = await this.authService.GetAuthor(id);
      res.status(200).json({ author: author });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  SaveAuthor = async (req, res) => {
    try {
      const id = req.id;
      const authorId = req.params.authorId;
      const message = await this.authService.SaveAuthor(id, authorId);
      res.status(200).json({ message: message });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = AuthController;
