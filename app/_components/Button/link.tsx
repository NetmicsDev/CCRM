import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { buttonStyles } from ".";

export interface LinkButtonProps extends LinkProps {
  title: string;
  height?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  className?: string;
}

export default function LinkButton({
  href,
  as,
  title,
  height = "medium",
  color = "primary",
  disabled = false,
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      as={as}
      className={clsx(
        "flex justify-center items-center rounded-sm text-grayscale-14 px-4 py-2 text-base font-normal",
        buttonStyles.height[height],
        disabled
          ? "bg-grayscale-7 pointer-events-none shadow-none"
          : buttonStyles.color[color],
        className
      )}
    >
      {title}
    </Link>
  );
}
