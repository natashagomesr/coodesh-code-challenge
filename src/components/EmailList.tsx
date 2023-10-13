import { TypeEmail } from "@/types/index";
import React, { useState } from "react";
import Refresher from "./Refresher";

interface EmailListProps {
  emails: TypeEmail[];
  onEmailSelect: (email: TypeEmail) => void;
}

function EmailList({ emails, onEmailSelect }: EmailListProps) {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [readEmails, setReadEmails] = useState<string[]>([]);

  const handleEmailClick = (email: TypeEmail) => {
    setSelectedEmailId(email.downloadUrl);

    if (!readEmails.includes(email.downloadUrl)) {
      setReadEmails([...readEmails, email.downloadUrl]);

      onEmailSelect(email);
    }
  };

  return (
    <div className="flex flex-col overflow-auto w-full">
      {emails.map((email, index) => (
        <div
          className={`mt-4 rounded-md border p-5 cursor-pointer hover:bg-slate-100 ${
            email.downloadUrl === selectedEmailId ? "bg-green-100" : ""
          }`}
          key={index}
          onClick={() => handleEmailClick(email)}
        >
          <div className="font-bold text-lg">{email.headerSubject}</div>
          <div className="font-light text-gray-600">
            {email.text.slice(0, 20)}
            {email.text.length > 20 ? "..." : ""}
          </div>
          {readEmails.includes(email.downloadUrl) && (
            <div className="text-green-500 rounded-xl px-2 mt-2 border-[1px] max-w-max border-green-500">
              Lido
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default EmailList;
