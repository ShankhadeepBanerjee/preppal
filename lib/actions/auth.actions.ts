"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { auth as clientAuth } from "@/firebase/client";

const ONE_WEEK_IN_MS = 60 * 60 * 24 * 7 * 1000;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userDocRef = db.collection("users").doc(uid);
    const userDocSnap = await userDocRef.get();
    if (userDocSnap.exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    await userDocRef.set({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "User signed up successfully, please sign in.",
    };
  } catch (error) {
    console.error("Error during sign up:", error);

    const firebaseError = error as { code?: string };
    if (firebaseError.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "Email is already in use. Please try another email.",
      };
    }

    return {
      success: false,
      message: "An error occurred during sign up. Please try again later.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  try {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK_IN_MS,
    });
    cookieStore.set("session", sessionCookie, {
      maxAge: ONE_WEEK_IN_MS,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return {
      success: true,
      sessionCookie,
    };
  } catch (error) {
    console.error("Error creating session cookie:", error);
    return {
      success: false,
      message: "Failed to create session cookie.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Please check your email or sign up.",
      };
    }

    await setSessionCookie(idToken);
  } catch (error) {
    console.error("Error during sign in:", error);
    const firebaseError = error as { code?: string };
    if (firebaseError.code === "auth/user-not-found") {
      return {
        success: false,
        message: "User not found. Please check your email or sign up.",
      };
    } else if (firebaseError.code === "auth/wrong-password") {
      return {
        success: false,
        message: "Incorrect password. Please try again.",
      };
    } else {
      return {
        success: false,
        message: "An error occurred during sign in. Please try again later.",
      };
    }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return null;
    }

    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}

export async function signOut() {
  try {
    const cookieStore = await cookies();

    // Sign out from Firebase client-side
    await clientAuth.signOut();

    // Clear the session cookie
    cookieStore.delete("session");

    return {
      success: true,
      message: "Signed out successfully",
    };
  } catch (error) {
    console.error("Error during sign out:", error);
    return {
      success: false,
      message: "An error occurred during sign out. Please try again later.",
    };
  }
}
