import { useSession } from "@/contexts/SessionContext";

import { Email } from "@/types/index";
import React, { useEffect, useState } from "react";
import EmailList from "./EmailList";

function Inbox({ emails }) {
  console.log(emails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  return (
    <div className="flex mt-10 lg:flex-row flex-col container max-h-[300px] lg:max-h-[550px] w-full">
      <div className="lg:w-1/3 p-4 lg:border-r  border-b flex lg:flex-col overflow-auto w-full">
        <EmailList emails={emails} onEmailSelect={handleEmailSelect} />
      </div>

      <div className="lg:w-2/3 p-4">
        {selectedEmail ? (
          <div>
            <div className="text-xl font-bold">
              {selectedEmail.headerSubject}
            </div>
            <div className="text-gray-600">{selectedEmail.fromAddr}</div>
            <div>{selectedEmail.text}</div>
          </div>
        ) : (
          <div className=" font-extralight text-lg text-center">
            Selecione um e-mail para exibir
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;
