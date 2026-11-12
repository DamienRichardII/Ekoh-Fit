import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "gold" | "outline" | "outline-dark" | "navy" | "ghost";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold uppercase tracking-wide transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";
const variants: Record<Variant, string> = {
  gold: "bg-gold text-navy hover:bg-gold-light hover:shadow-lift",
  outline: "border-2 border-gold text-gold hover:bg-gold hover:text-navy",
  "outline-dark": "border-2 border-navy text-navy hover:bg-navy hover:text-offwhite",
  navy: "bg-navy text-offwhite hover:bg-navy-700",
  ghost: "text-navy hover:bg-navy/5",
};

interface Common { variant?: Variant; className?: string; children: ReactNode }
type LinkProps = Common & { href: string; onClick?: () => void };
type BtnProps = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export function Button(props: LinkProps | BtnProps) {
  const { variant = "gold", className, children } = props;
  const cls = cn(base, variants[variant], className);
  if (props.href !== undefined) {
    return <Link href={props.href} className={cls} onClick={props.onClick}>{children}</Link>;
  }
  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } = props;
  void _v; void _c; void _ch; void _h;
  return <button type="button" {...rest} className={cls}>{children}</button>;
}
