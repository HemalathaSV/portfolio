import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Cpu } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between pointer-events-auto">
        {/* Logo - kept at top left */}
        <Link href="/" className="flex items-center gap-2 group pointer-events-auto">
          <div className="relative w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg overflow-hidden group-hover:bg-primary/20 transition-colors">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">Hemalatha S V</span>
        </Link>

        {/* Desktop Nav - Vertical on Right */}
        <nav className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-2 z-50 pointer-events-auto">
          {links.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href} className="group flex items-center gap-4 py-2">
                <span className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0",
                  isActive ? "text-primary opacity-100 translate-x-0" : "text-muted-foreground"
                )}>
                  {link.label}
                </span>
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-primary scale-150 shadow-[0_0_12px_rgba(var(--primary),0.8)]"
                    : "bg-white/20 group-hover:bg-primary/50"
                )} />
              </Link>
            );
          })}
          <div className="w-px h-8 bg-white/10 my-2 self-end mr-[3px]" />
          <a
            href="/resume.pdf"
            download="Resume_Hemalatha.pdf"
            className="group flex items-center gap-4 py-2"
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 text-muted-foreground">
              Resume
            </span>
            <div className="w-2 h-2 rounded-full bg-primary/80 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border p-4 shadow-2xl pointer-events-auto"
        >
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-xl transition-colors text-sm font-medium",
                  location === link.href
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
