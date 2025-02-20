'use server';

import { Verification } from "@/emails/Verification";
import { signIn } from "@/lib/auth";
import { resend } from "@/emails";
import { User, VerificationToken } from "@/types";
import { db } from "db";
import { users, verificationTokens } from "db/schema";
import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

//--------------------------------------------
// Auth Helpers
//--------------------------------------------
export const googleSignin = async () => {
  await signIn('google', {
    redirectTo: '/'
  });
}

export const githubSignin = async () => {
  await signIn('github', {
    redirectTo: '/'
  });
}

export const handleVerification = async (code: string, userId?: string) => {
  if (!userId) return { status: 500, message: 'Internal error user id not present' }

  const verificationToken = await getVerificationToken(userId)

  if (!verificationToken || !verificationToken.expiresAt) {
    return { status: 404, message: 'Couldnt find valid verification token, A new token hase been sent to your registered email' }
  } 

  const expiresAt = verificationToken.expiresAt
  const currentDate = new Date();
  if (expiresAt < currentDate) {
    return { status: 400, message: 'Token has expired, A new token hase been sent to your registered email' }
  }

  if (code !== verificationToken.code) {
    return { status: 400, message: 'Token is invalid, please try again' }
  }

  await verifyUser(userId)

  return { status: 200, message: 'Successs' }
}

//--------------------------------------------
// DB Helpers
//--------------------------------------------
export const doesUserExists = async (userId: string): Promise<boolean> => {
  console.log('NextAuth: fetching user')
  const [user] = await db.select().from(users).where(eq(users.userId, userId));

  if (!user) {
    console.log(`NextAuth: couldnt find existing user with id ${userId}`)
    return false;
  }

  return true
}

export const getUserById = async (userId: string): Promise<User | null> => {
  console.log('NextAuth: fetching user')
  const [user] = await db.select().from(users).where(eq(users.userId, userId));

  if (!user) {
    console.log(`NextAuth: couldnt find existing user with id ${userId}`)
    return null;
  }

  return user
}

export const getUserByEmail = async (userEmail: string): Promise<User | null> => {
  console.log('NextAuth: fetching user')
  const [user] = await db.select().from(users).where(eq(users.email, userEmail));

  if (!user) {
    console.log(`NextAuth: couldnt find existing user with email ${userEmail}`)
    return null;
  }

  return user
}

export const createUser = async (newUser: {
  id?: string | null
  name?: string | null
  email?: string | null
  image?: string | null
}): Promise<User | null> => {
  console.log('NextAuth: Creating a new user entry in the DB')
  
  const [insertedUser] = await db
    .insert(users)
    .values({
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email,
      image: newUser.image
    })
    .onConflictDoNothing()
    .returning();

  if (!insertedUser){
    console.log(`NextAuth: User with email ${newUser.email} couldnt be created`)
    return null
  }

  return insertedUser;
}

export const verifyUser = async (userId: string) => {
  await db.update(users)
    .set({ verified: true })
    .where(eq(users.userId, userId));
}

export const getVerificationToken = async (userId: string): Promise<VerificationToken | null> => {
  console.log('NextAuth: fetching existing verification token')

  const [verificationToken] = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.userId, userId));

  if (!verificationToken){
    console.log('NextAuth: couldnt find existing verification token')
    return null;
  } 

  return verificationToken
}

export const createVerificationToken = async (newToken: VerificationToken): Promise<VerificationToken | null> => {
  console.log('NextAuth: creating a verification token')
  
  const [verificationToken] = await db
    .insert(verificationTokens)
    .values({
      userId: newToken.userId,
      code: newToken.code,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Adds 24 hours
    })
    .returning();

  if (!verificationToken){
    console.log(`NextAuth: couldnt create a new verification token`)
    return null
  }

  return verificationToken;
}

export const sendVerificationRequest = async (userEmail: string): Promise<void> => {
  console.log('NextAuth: Sending the new user a veirficaiton email')
  
  const user = await getUserByEmail(userEmail);
  if (!user || !user.userId) {
    console.log('NextAuth: Issue finding user when sending verification request')
    return;
  }

  let verificationToken = await getVerificationToken(user.userId) 
  
  if (verificationToken === null) {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 21);
    verificationToken = await createVerificationToken({
      userId: user.userId,
      code: nanoid(6)
    })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'support@crosspos.co.uk',
      to: userEmail,
      subject: 'Crosspost.co.uk | Verify Account',
      react: Verification({
        firstName: user?.name as string,
        actionUrl: `${process.env.NEXTAUTH_URL}/onboarding/verify`,
        siteName: 'Crosspost.co.uk',
        verificationCode: verificationToken?.code
      }),
      headers: {
        "X-Entity-Ref-ID": new Date().getTime() + "",
      },
    });

    if (error || !data) {
      throw new Error(error?.message);
    }
  } catch (error) {
    throw new Error("Failed to send verification email.");
  }
}