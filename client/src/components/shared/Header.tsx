import { DarkModeToggle } from "./DarkModeToggle";


const Header = () => {
  return (
    <header className="border-border fixed inset-x-0 top-0 z-10 h-fit w-full border-b py-3 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        {/* desktop */}
        <div className="hidden flex-row items-center justify-between md:flex">
          <div className="flex flex-row items-center gap-2">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};



export default Header;
