import React from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

type Props = {};

const NavItem: React.FC = (props: Props) => {
  return (
    <Link href="/" className="mx-auto flex-1 rounded-md">
      <div className="flex space-x-4">
        <div className="flex flex-row items-center justify-center">
          <HomeIcon className="mr-4 h-6 w-6 text-white" />
          <p className="text-xl font-semibold text-white">Home</p>
        </div>
      </div>
    </Link>
  );
};

export default NavItem;
