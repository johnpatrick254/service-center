import { FC } from "react";
import { DarkModeToggle } from "./shared/DarkModeToggle";
import UserPopover from "./shared/UserPopover";

interface HeaderProps {
  user:string
  newMessage:any
 }

const Header: FC<HeaderProps> = ({ user,newMessage}) => {
  const handleClick =()=>{
    newMessage('');
    document.querySelector('#chat-input')?.focus()
  }
  return (
    <header className=" fixed top-0 flex w-full flex-row items-start justify-between">
      <div>
      </div>
      <div className="flex flex-row items-center gap-4">
      <div className={'p-2 rounded-sm hover:cursor-pointer bg-background'} onClick={handleClick}>
        New Message
      </div>
        <div>
          <DarkModeToggle />
        </div>
        <UserPopover user={user} />
      </div>
    </header>
  );
};

export default Header;
