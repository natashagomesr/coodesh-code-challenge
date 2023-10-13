import { useSession } from "@/contexts/SessionContext";
import { getSessionEmails } from "@/services/api";
import { SessionData } from "@/types/index";
import React, { useEffect, useRef, useState } from "react";
import Image from "../../node_modules/next/image";

export interface EmailProps {
  sessionData: SessionData;
}

export default function Email() {
  const { session } = useSession();

  const textToCopy: string | undefined = session?.emailAddress;
  const textAreaRef = useRef<HTMLInputElement | null>(null);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (textAreaRef?.current) {
      textAreaRef.current.select();

      document.execCommand("copy");

      window.getSelection()?.removeAllRanges();

      setCopied(true);

      setTimeout(() => setCopied(false), 120);
    }
  };

  return (
    <>
      <div className=" container flex flex-col items-center font-extralight mt-6">
        <div className="">Your temporary email address</div>
        <div className="flex mt-3 ">
          <input
            className="border-[1px] text-xl p-4 font-semibold rounded-full text-gray-500 shadow-slate-300	shadow-sm"
            ref={textAreaRef}
            value={textToCopy}
            readOnly
          />

          <div
            className="border-[1px] text-xl p-2 cursor-pointer rounded-full ml-3  shadow-slate-300 shadow-sm"
            onClick={copyToClipboard}
          >
            <Image src="/copy.svg" alt="Copy" width="40" height="40" />
          </div>
        </div>
        {copied && <div className="text-center">Copied</div>}
      </div>
    </>
  );
}
