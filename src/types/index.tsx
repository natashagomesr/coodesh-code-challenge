export type SessionData = {
  emailAddress: string;
  expireAt: string;
  sessionId: string;
};

export type NewEmailData = {
  introduceSession: {
    addresses: [{ address: string }];
    expiresAt: string;
    id: string;
  };
};

export type TypeEmail = {
  toAddr: string;
  text: string;
  rawSize: number;
  html: string | null;
  headerSubject: string;
  fromAddr: string;
  downloadUrl: string;
};
