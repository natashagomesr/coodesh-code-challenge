"use client";

import { NewEmailData, SessionData } from "@/types/index";

const EMAIL_KEY = "email";
const SESSION_ID_KEY = "session-id";
const EXPIRE_AT_KEY = "email-expire-at";

const isServerSide = Boolean(typeof window);

const shouldCreateEmail = (): boolean => {
  const session = getSessionFromLocalStorage();
  if (!session.emailAddress) return true;

  const localExpirationDate = localStorage.getItem(EXPIRE_AT_KEY)!;
  const expirationDate = new Date(localExpirationDate);

  return expirationDate < new Date();
};

const getSessionFromLocalStorage = (): SessionData => {
  if (isServerSide) {
    return {
      emailAddress: "",
      expireAt: "",
      sessionId: "",
    };
  }

  return {
    emailAddress: localStorage.getItem(EMAIL_KEY) ?? "",
    expireAt: localStorage.getItem(EXPIRE_AT_KEY) ?? "",
    sessionId: localStorage.getItem(SESSION_ID_KEY) ?? "",
  };
};

const setSessionToLocalStorage = (data: SessionData): void => {
  localStorage.setItem(EMAIL_KEY, data.emailAddress);
  localStorage.setItem(EXPIRE_AT_KEY, data.expireAt);
  localStorage.setItem(SESSION_ID_KEY, data.sessionId);
};

const mapSessionRequestToObject = (newEmailData: NewEmailData): SessionData => {
  const { introduceSession } = newEmailData;

  return {
    sessionId: introduceSession.id,
    expireAt: introduceSession.expiresAt,
    emailAddress: introduceSession.addresses[0].address,
  };
};

export {
  shouldCreateEmail,
  setSessionToLocalStorage,
  mapSessionRequestToObject,
  getSessionFromLocalStorage,
};
