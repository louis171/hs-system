import React from "react";
import { XMarkIcon, Bars2Icon } from "@heroicons/react/24/solid";

interface INavDrawer {
  setNavbarActive: (value: boolean) => void;
  navbarActive: boolean;
  children: React.ReactNode;
}

const NavDrawer: React.FC<INavDrawer> = ({
  children,
  navbarActive,
  setNavbarActive,
}) => {
  return (
    <main
      className={
        "fixed inset-0 z-10 transform overflow-hidden bg-[#000] bg-opacity-25" +
        (navbarActive ? " translate-x-0" : " translate-x-full")
      }
    >
      <section
        className={
          "absolute right-0 h-full w-full max-w-md transform bg-[#090e19] shadow-xl" +
          (navbarActive ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative flex h-full w-full max-w-md flex-col space-y-4 overflow-y-scroll p-2">
          <header className="flex items-center justify-between p-2 text-lg font-bold text-white">
            <h2 className="text-xl font-bold text-white">HS System</h2>
            <button
              className="rounded-md p-2 text-gray-700 outline-none"
              onClick={() => setNavbarActive(!navbarActive)}
            >
              {navbarActive ? (
                <XMarkIcon className="h-8 w-8 text-white" />
              ) : (
                <Bars2Icon className="h-8 w-8 text-white" />
              )}
            </button>
          </header>
          <div className="flex w-full flex-wrap gap-4">{children}</div>
        </article>
      </section>
      <section
        className=" h-full w-screen cursor-pointer "
        onClick={() => {
          setNavbarActive(false);
        }}
      ></section>
    </main>
  );
};

export default NavDrawer;
