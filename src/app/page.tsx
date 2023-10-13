"use client";

import { useEffect, useContext, useState } from "react";

import Header from "@/components/Header";
import Email from "@/components/MailGenerator";

import { generateNewEmail, getSessionEmails } from "@/services/api";
import {
  shouldCreateEmail,
  mapSessionRequestToObject,
} from "@/services/localStorageSession";

import { useSession } from "@/contexts/SessionContext";
import Refresher from "@/components/Refresher";
import Inbox from "@/components/Inbox";

export default function Home() {
  const { session, setSession } = useSession();
  const [sessionEmails, setSessionEmails] = useState([]);

  useEffect(() => {
    handleEmailInSession();
  }, []);

  const handleEmailInSession = async () => {
    if (shouldCreateEmail()) {
      const newEmailData = await generateNewEmail();

      const mappedSessionEmail = mapSessionRequestToObject(newEmailData);

      setSession(mappedSessionEmail);
    } else {
      fetchEmails();
    }
  };

  const fetchEmails = async () => {
    if (session?.sessionId) {
      const emailsData = await getSessionEmails(session?.sessionId);

      setSessionEmails(emailsData?.session?.mails ?? []);
    }
  };

  return (
    <>
      <Header />
      <Email />
      <Refresher fetchEmails={fetchEmails} />
      <Inbox emails={sessionEmails} />
    </>
  );
}
