"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  compact?: boolean;
  variant?: "header" | "footer" | "dark" | "light";
}

export function Logo({ compact = false, variant = "header" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative h-11 w-11 flex-shrink-0">
        <Image
          src="/logo/toc-viet-lab-mark.svg"
          alt="Tóc Việt Lab"
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      {!compact && (
        <div className="flex flex-col">
          <div className={`text-lg font-extrabold tracking-tight transition-colors ${isLight ? "text-gold" : "text-gold"}`}>
            Tóc Việt Lab
          </div>
          <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isLight ? "text-muted" : "text-muted"}`}>
            KIẾN THỨC · KỸ THUẬT · TƯ DUY
          </div>
        </div>
      )}
    </Link>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src="/logo/toc-viet-lab-logo.svg"
        alt="Tóc Việt Lab"
        width={280}
        height={60}
        className="h-auto w-auto max-w-[200px] md:max-w-[240px]"
        priority
      />
    </Link>
  );
}
