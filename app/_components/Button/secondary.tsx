"use client";

import clsx from "clsx";

export default function SecondaryButton({
  text,
  width = -1,
  fontSize = "text-base",
  disabled = false,
  onClick = () => {},
}: {
  text: string;
  width?: number;
  fontSize?: "text-base" | "text-sm" | "text-lg";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        `rounded-sm bg-sub-1 text-grayscale-14 text-[${fontSize}px] px-4 py-2 font-semibold`,
        {
          [`w-${width}px`]: width !== -1,
          "pointer-events-none": disabled,
        }
      )}
    >
      {text}
    </div>
  );
}
