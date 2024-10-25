import { userService } from "@/contollers/UserService";
import { pwdConfirm } from "@/libs/bcrypt/passord";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Define the User type expected by NextAuth
interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
}

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = await userService.getOneByEmail(email);
          // if (
          //   `${email.trim()}-${password.trim()}` == "admin@gmail.com-password"
          // ) {
          //   return {
          //     id: 1, // Assuming MongoDB _id
          //     name: "Admin",
          //     email: email,
          //     image:''
          //   };
          // } else
          if (!user || !(await pwdConfirm(password, user.password!))) {
            return null;
          }
          // Fetch the user by email

          // Check if user exists and password is correct
          if (!user || !(await pwdConfirm(password, user.password!))) {
            return null;
          }

          // Return an object that matches the expected AuthUser type
          return {
            id: user._id, // Assuming MongoDB _id
            name: user.name,
            email: user.email,
            image: user.image, // optional
          } as AuthUser;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }:any) {
      if (user && session) {
        // Add custom session logic, like checking for user roles
        session.user.id = user.id;
      }
      return session; // Allow session to proceed
    },
    async signIn({ user, account, profile }: any) {
      try {
        if (account.provider === "google") {
          // Check if the user already exists in the database
          let existingUser = await userService.getOneByEmail(user.email);

          if (existingUser) {
            // If the user exists, update their name and image if necessary
            const updatedFields: Partial<{ name: string; image: string }> = {};
            if (user.name && user.name !== existingUser.name) {
              updatedFields.name = user.name;
            }
            if (user.image && user.image !== existingUser.image) {
              updatedFields.image = user.image;
            }

            if (Object.keys(updatedFields).length > 0) {
              await userService.update(
                existingUser._id as string,
                updatedFields
              );
            }
          } else {
            // If user doesn't exist, register a new user
            existingUser = await userService.create({
              name: user.name!,
              email: user.email!,
              image: user.image,
              role: "user", // Assign default role
              authProvider: "google",
              googleId: user.id
            });
          }

          // Continue the sign-in process
          return true;
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Returning false will reject the sign-in
      }
    },
  },
};

export default authConfig;
