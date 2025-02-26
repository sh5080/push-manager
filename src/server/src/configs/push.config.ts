import { envConfig } from "@push-manager/shared";
import { ServiceAccount } from "firebase-admin";

const { firebase, apns, oneSignal } = envConfig.push;
const { projectId, privateKeyId, privateKey, clientEmail, clientId } = firebase;
const { keyId, teamId, privateKey: apnsPrivateKey, bundleId } = apns;

export const pushConfig = {
  fcm: {
    serviceAccount: {
      type: "service_account",
      project_id: projectId,
      private_key_id: privateKeyId,
      private_key: privateKey,
      client_email: clientEmail,
      client_id: clientId,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-st20m%40lge-membership.iam.gserviceaccount.com",
    } as ServiceAccount,
  },
  apns: {
    keyId,
    teamId,
    privateKey: apnsPrivateKey,
    bundleId,
  },
  oneSignal: { appId: oneSignal.appId, apiKey: oneSignal.apiKey },
};
