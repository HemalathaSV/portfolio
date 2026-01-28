import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-8">
          {[
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Twitter, href: "https://twitter.com" },
            { icon: Mail, href: "mailto:hemalatha@example.com" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <item.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Hemalatha S V. Built with React, Three.js & AI.
        </p>
      </div>
    </footer>
  );
}
