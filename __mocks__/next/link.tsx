import { ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode;
}

export default function Link({ href, children }: LinkProps) {
  return <a href={href}>{children}</a>;
}
