import { Navbar } from "./Navbar";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "@/i18n/routing";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm transition-shadow">
      <div className="container max-w-[1100px] mx-auto flex h-20 items-center justify-between px-6">
        {/* Right side: Logo (in RTL context, first item is Right) */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="font-bold text-3xl tracking-tight text-primary font-sans"
          >
            مناع للإلكترونيات
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex flex-none justify-center">
          <Navbar />
        </div>

        {/* Left side: Actions & Mobile Menu */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
