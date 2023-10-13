"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { SessionData } from "@/types/index";
import {
  getSessionFromLocalStorage,
  setSessionToLocalStorage,
} from "@/services/localStorageSession";

type SessionContextType = {
  session: SessionData | null;
  setSession: (session: SessionData) => void;
};

type SessionProviderProps = {
  children: ReactNode;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function useSession(): SessionContextType {
  const context = useContext(SessionContext)!;
  return context;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSessionState] = useState<SessionData>(
    getSessionFromLocalStorage()
  );

  useEffect(() => {
    setSessionToLocalStorage(session);
  }, [session]);

  const setSession = (session: SessionData) => {
    setSessionState(session);
  };

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}
