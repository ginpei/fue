import * as admin from "firebase-admin";

let app: admin.app.App | null = null;

export function getFirestore(app = getApp()): admin.firestore.Firestore {
  const db = app.firestore();
  return db;
}

function getApp(): admin.app.App {
  if (!app) {
    app = admin.initializeApp();
  }

  return app;
}
