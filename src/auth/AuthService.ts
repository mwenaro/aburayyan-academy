import { User } from "@/models/User"; // Base model with discriminator
import { pwdConfirm } from "@/libs/bcrypt/passord";
import { IUser } from "@/models/User";
import { HydratedDocument } from "mongoose";

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

class AuthService {
  async loginWithCredentials(
    email: string,
    password: string
  ): Promise<AuthenticatedUser | null> {
    const user = (await User.findOne({
      email,
    }).exec()) as HydratedDocument<IUser> | null;
    console.log({ password, pwd: user?.password });
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
        role: "user", // default role
        authProvider: "google",
        googleId: id,
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
