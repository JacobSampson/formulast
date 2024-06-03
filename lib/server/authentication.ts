import admin from 'firebase-admin';

let _firestore: FirebaseFirestore.Firestore;
if (!admin.apps.length) {
  const projectId = process.env?.FIREBASE_PROJECT_ID;
  const privateKey = (process.env?.FIREBASE_PRIVATE_KEY ?? '').replace(
    /\\n/g,
    '\n'
  );
  const clientEmail = process.env?.FIREBASE_CLIENT_EMAIL;

  if (projectId && privateKey && clientEmail) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        privateKey,
        clientEmail,
      }),
    });
    _firestore = admin.firestore();
  } else {
    _firestore = undefined;
  }
}

export const firestore = _firestore;
