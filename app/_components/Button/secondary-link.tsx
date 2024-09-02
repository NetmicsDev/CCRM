import clsx from "clsx";
import Link from "next/link";

export default function SecondaryLinkButton({
  link,
  text,
  width = -1,
  fontSize = "text-base",
  disabled = false,
}: {
  link: string;
  text: string;
  width?: number;
  fontSize?: "text-base" | "text-sm" | "text-lg";
  disabled?: boolean;
}) {
  return (
    <Link
      href={link}
      className={clsx(
        `rounded-sm bg-sub-1 text-grayscale-14 text-[${fontSize}px] px-4 py-2 font-semibold`,
        {
          [`w-[${width}px]`]: width !== -1,
          "pointer-events-none": disabled,
        }
      )}
    >
      {text}
    </Link>
  );
}
