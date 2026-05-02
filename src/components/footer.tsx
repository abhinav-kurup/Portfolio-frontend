import { Code, Link, Mail } from "lucide-react";
import { siteConfig, socialLinks } from "@/data/site";

const iconMap: Record<string, React.ReactNode> = {
  Github: <Code size={18} />,
  Linkedin: <Link size={18} />,
  Mail: <Mail size={18} />,
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &
          FastAPI.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {iconMap[link.icon] ?? null}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
