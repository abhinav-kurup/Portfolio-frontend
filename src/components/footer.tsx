import { Code, Link, Mail, ArrowUp } from "lucide-react";
import { siteConfig, socialLinks } from "@/data/site";

const iconMap: Record<string, React.ReactNode> = {
  Github: <Code size={16} />,
  Linkedin: <Link size={16} />,
  Mail: <Mail size={16} />,
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 font-mono text-xs">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 sm:px-8 sm:flex-row">
        <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
          <p className="font-bold text-white">
            © {new Date().getFullYear()} {siteConfig.name}. PORTFOLIO // V2.5
          </p>
          <p className="text-[11px] text-zinc-500">
            Engineered with Next.js 16, TypeScript & FastAPI. High-contrast monochrome architecture.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-white/10 pr-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-zinc-950 text-zinc-400 hover:border-white hover:bg-white hover:text-black transition-all"
              >
                {iconMap[link.icon] ?? null}
              </a>
            ))}
          </div>

          <a
            href="#hero"
            className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-zinc-900 px-3.5 py-1.5 font-bold text-white hover:border-white hover:bg-white hover:text-black transition-all"
            title="Return to Top"
          >
            <ArrowUp size={14} />
            <span>TOP</span>
          </a>
        </div>
      </div>
    </footer>
  );
}


