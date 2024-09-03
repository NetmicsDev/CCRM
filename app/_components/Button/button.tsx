"use client";

import clsx from "clsx";
import { buttonStyles } from ".";
import React from "react";

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  height?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary";
  fontSize?: "text-base" | "text-sm" | "text-lg";
  weight?:
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold";
}

export default function PrimaryButton({
  onClick,
  width = -1,
  height = "medium",
  color = "primary",
  fontSize = "text-base",
  weight = "font-normal",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-sm text-grayscale-14  px-4 py-2",
        fontSize,
        weight,
        buttonStyles.height[height],
        buttonStyles.color[color],
        "disabled:bg-grayscale-7 disabled:pointer-events-none",
        {
          [`w-[${width}px]`]: width !== -1,
        }
      )}
      onClick={onClick}
      {...props}
    >
      {props.children}
    </button>
  );
}
