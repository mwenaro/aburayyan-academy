import { IUser, User } from "@/models/User";
import { Controller } from "./Controller";
import { pwdHasher } from "@/libs/bcrypt/passord";

class UserService extends Controller<IUser> {
  constructor() {
    super(User); // Pass the User model to the base Controller class
  }

  // Method to get a user by email
  async getOneByEmail(email: string) {
    return await this.model.findOne({ email });
  }

  // Method to register a new user
  async register(userData: {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    image?: string;
    authProvider: "credentials" | "google";
  }) {
    try {
      const { name, email, password, googleId, image, authProvider } = userData;

      // Check if the user already exists by email
      const existingUser = await this.getOneByEmail(email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash the password if registering via credentials
      let hashedPassword = undefined;
      if (authProvider === "credentials" && password) {
        hashedPassword = pwdHasher(password);
      }
      const user: any = {
        name,
        email,
        password: hashedPassword,
        googleId,
        authProvider,
      };
      if (image) user.image = image;
      // Create new user object
      const newUser = new this.model();

      // Save the new user to the database
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error: any) {
      console.error(`Error in register: ${error.message}`);
      throw error;
    }
  }
}

// Export an instance of the UserService
export const userService = new UserService();
