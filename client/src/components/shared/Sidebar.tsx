"use client";

import { usePathname } from "next/navigation";
import { adminLinks } from "../dashboard/constants";
import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Sidebar = () => {
  const pathName = usePathname();
  const links =[
    {
      name:"Pending",
      path:"/pending",
      icon:"?"
    },
    {
      name:"In progress",
      path:"/in-progress",
      icon:"?"

    },
  ]
  return (
    <div className="w-60 space-y-8 rounded-lg bg-background px-2 py-6 shadow">
      <div className="flex flex-row items-center justify-center gap-1">
        <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="font-mono text-2xl font-black uppercase tracking-wider text-tertiary">
          Quantum
        </h1>
      </div>
      <nav className="space-y-2 text-sm">
        <div className="space-y-4">
            <ul className="space-y-2">

              <div className="space-y-2">
                {links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.path}
                      className={cn(
                        "flex items-center gap-4 rounded px-4 py-2 font-medium transition-all hover:bg-background-strong hover:text-[#8b5cf6]",
                        {
                          "bg-background-strong text-[#8b5cf6]":
                            pathName === link.path,
                        }
                      )}
                    >
                      {/* <link.icon size={18} /> */}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
        
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
