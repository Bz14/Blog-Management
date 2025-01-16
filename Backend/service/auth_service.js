class AuthService {
  constructor(authRepo) {
    this.authRepo = authRepo;
  }

  Signup = async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await this.authRepo.Signup(email, password);
    return user;
  };
}

module.exports = AuthService;
