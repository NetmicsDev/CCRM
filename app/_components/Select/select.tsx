"use client";

import clsx from "clsx";
import Icon from "../Icon";

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  label?: string;
  placeholder?: string;
  options: {
    value: string;
    text: string;
  }[];
}

const Select = ({
  placeholder,
  options,
  defaultValue,
  className,
  name,
  ...props
}: SelectProps) => {
  const onClickIcon = () => {
    console.log(name, document.getElementById(name ?? ""));
    name &&
      (document.getElementById(name) as HTMLSelectElement | null)?.showPicker();
  };
  return (
    <div className="flex flex-col relative">
      <select
        id={name}
        name={name}
        defaultValue={placeholder}
        className={clsx(
          "appearance-none h-14 p-4 border border-1 border-grayscale-11 rounded-sm outline-none",
          // "focus:border-sub-2 focus-visible:border-sub-2",
          "disabled:text-grayscale-9 disabled:bg-grayscale-13 disabled:border-none",
          className
        )}
        {...props}
      >
        <option disabled>{placeholder ?? ""}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <Icon
        type="down"
        className="w-5 h-5 absolute fill-grayscale-8 right-4 top-1/2 -translate-y-1/2"
        onClick={onClickIcon}
      />
    </div>
  );
};

export default Select;
