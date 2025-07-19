import { cert, getApps, initializeApp } from "firebase-admin/app";

import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initFirebaseAdmin = () => {
  const apps = getApps();

  if (!apps.length) {
    // Initialize Firebase Admin SDK
    const app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });

    return {
      db: getFirestore(app),
      auth: getAuth(app),
    };
  }
};

export const { db, auth } = initFirebaseAdmin() || {
  db: getFirestore(),
  auth: getAuth(),
};
