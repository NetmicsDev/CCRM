import clsx from "clsx";
import Link from "next/link";
import { buttonStyles } from ".";

export default function LinkButton({
  link,
  text,
  height = "medium",
  color = "primary",
  disabled = false,
  className,
}: {
  link: string;
  text: string;
  width?: number;
  height?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={link}
      className={clsx(
        "flex justify-center items-center rounded-sm text-grayscale-14 px-4 py-2 text-base font-normal",
        buttonStyles.height[height],
        disabled
          ? "bg-grayscale-7 pointer-events-none"
          : buttonStyles.color[color],
        className
      )}
    >
      {text}
    </Link>
  );
}
