import Link from "next/link";
import type { ComponentProps } from "react";

import { type ButtonVariant, buttonStyles } from "./button-styles";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonStyles(variant, className)} {...props} />;
}