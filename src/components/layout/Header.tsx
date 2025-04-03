import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search, User } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Przycisk menu (mobile) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white"
        >
          <Menu size={24} />
        </button>

        {/* Pasek wyszukiwania */}
        <div className="hidden md:block flex-1 max-w-md ml-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <Input
              type="search"
              placeholder="Szukaj..."
              className="pl-10 h-9 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
            />
          </div>
        </div>

        {/* Akcje nagłówka */}
        <div className="flex items-center ml-auto gap-2">
          {/* Powiadomienia */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Powiadomienia</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Nowy komentarz do projektu</DropdownMenuItem>
              <DropdownMenuItem>Zaktualizowano zadanie</DropdownMenuItem>
              <DropdownMenuItem>Nowe przypomnienie</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profil użytkownika */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative rounded-full h-8 w-8 flex items-center justify-center bg-slate-100 dark:bg-slate-700"
              >
                <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Ustawienia</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Wyloguj</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
