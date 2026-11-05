import type { ElementType, HTMLAttributes, HtmlHTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLElement> & { as?: ElementType };

export function Container({
  as: Tag = "div",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    />
  );
}
