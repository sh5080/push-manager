import * as admin from "firebase-admin";
import { pushConfig } from "./push.config";

export const initFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(pushConfig.fcm.serviceAccount),
    });
  }
  return admin;
};
