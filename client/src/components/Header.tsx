import { FC } from "react";
import { DarkModeToggle } from "./shared/DarkModeToggle";
import UserPopover from "./shared/UserPopover";

interface HeaderProps {
  user:string
 }

const Header: FC<HeaderProps> = ({ user}) => {
  return (
    <header className=" fixed top-0 flex w-full flex-row items-start justify-between">
      <div></div>
      <div className="flex flex-row items-center gap-4">
        <div>
          <DarkModeToggle />
        </div>
        <UserPopover user={user} />
      </div>
    </header>
  );
};

export default Header;
