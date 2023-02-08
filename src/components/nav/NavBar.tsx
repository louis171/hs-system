import Link from "next/link";
import React, { useState } from "react";

import Bars2Icon from "@heroicons/react/24/solid/Bars2Icon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";

export interface INavbar {
  navbarActive: boolean;
  setNavbarActive: (value: boolean) => void;
}

const Navbar: React.FC<INavbar> = ({ navbarActive, setNavbarActive }) => {
  const [activeIdx, setActiveIdx] = useState(-1);

  const MENU_LIST: { text: string; href: string }[] = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/about" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-slate-900 text-white shadow">
        <nav className="w-full">
          <div className="mx-auto justify-between px-4">
            <div className="flex w-full items-center justify-between py-3">
              <a href="/">
                <h2 className="text-2xl font-bold">HS System</h2>
              </a>
              <button
                className="rounded-md p-2 text-white outline-none"
                onClick={() => setNavbarActive(!navbarActive)}
              >
                {navbarActive ? (
                  <XMarkIcon className="h-8 w-8" />
                ) : (
                  <Bars2Icon className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
