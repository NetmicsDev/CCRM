import clsx from "clsx";
import Icon from "../Icon";
import Select from "./select";

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  label?: string;
  placeholder?: string;
  options: {
    value: string;
    text: string;
  }[];
}

const SelectField = ({
  label,
  placeholder,
  options,
  defaultValue,
  className,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col">
      {label && <label className="font-semibold mb-2">{label}</label>}
      <Select options={options} defaultValue={defaultValue} {...props} />
    </div>
  );
};

export default SelectField;
