import { User, UserRole } from "@/models/User"; // Base model with discriminator
import { pwdConfirm, pwdHasher } from "@/libs/bcrypt/password";
import { IUser } from "@/models/User";
import { HydratedDocument } from "mongoose";

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

class AuthService {
  async loginWithCredentials(
    email: string,
    password: string
  ): Promise<AuthenticatedUser | null> {
    const user = (await User.findOne({
      email,
    }).exec()) as HydratedDocument<IUser> | null;

    if (
      !user ||
      !user.password ||
      !(
        password.trim() === user?.password ||
        (await pwdConfirm(password, user.password))
      )
    ) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    };
  }

  async loginWithGoogleProfile(profile: {
    id: string;
    name: string;
    email: string;
    image?: string;
  }): Promise<AuthenticatedUser> {
    const { id, name, email, image } = profile;

    let user = await User.findOne({ email }).exec();

    if (user) {
      // Update info if changed
      const needsUpdate = user.name !== name || (image && user.image !== image);

      if (needsUpdate) {
        user.name = name;
        user.image = image;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        image,
        role: UserRole.USER, // default role
        authProvider: "google",
        googleId: id,
        password: pwdHasher(process.env.USER_DEFAULT_PASSWORD!), //hte default password
      });
    }

    return {
      id: user?._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    };
  }
}

export const authService = new AuthService();
