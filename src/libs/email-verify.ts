// emailVerification.ts

// import verifier from 'email-verify';
const  verifier =  require('email-verify')

type VerifyCallback = (err: Error | null, info: any) => boolean;

const verifyEmail = (email: string, callback: VerifyCallback): boolean  => {
  return verifier.verify(email, callback);
};

export { verifyEmail };
