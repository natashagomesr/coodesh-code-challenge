import React from "react";
import Image from "../../node_modules/next/image";

function Header() {
  return (
    <div className=" bg-yellow-200 w-full h-20 sticky top-0 flex justify-center bg">
      <Image src="/logo.svg" alt="Logo" width="70" height="70" />
    </div>
  );
}

export default Header;
