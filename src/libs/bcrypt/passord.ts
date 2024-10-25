import bcrypt from "bcryptjs";

export function pwdHasherWithSalt(pwd: string) {
  // Define a password to hash
  const password = pwd;

  // Generate a salt
  const saltRounds = 10;
  const hashSalt = bcrypt.genSaltSync(saltRounds);

  // Hash the password with the salt
  // const hashedPassword = bcrypt.hashSync(password, hashSalt);
  const hashedPassword = bcrypt.hashSync(password);

  return {
    hashedPassword,
    hashSalt,
  };
}

export function pwdHasher(pwd: string) {
  // Generate a salt
  const saltRounds = 10;

  const hashedPassword = bcrypt.hashSync(pwd, saltRounds);

  return hashedPassword;
}

export function pwdConfirm(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);

  // Log the result to the console
}
