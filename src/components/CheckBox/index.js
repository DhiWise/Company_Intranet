import { ErrorMessage } from "../../components/ErrorMessage";
import React from "react";
import PropTypes from "prop-types";

const variants = {
  OutlineBluegray101:
    "bg-white_A700 border-bluegray_101 border-bw083 border-solid",
  FillIndigo200: "bg-indigo_200",
  FillIndigo201: "bg-indigo_201",
};
const shapes = { RoundedBorder2: "rounded-radius25" };
const sizes = { sm: "p-[1px]", md: "p-[3px]" };

const CheckBox = React.forwardRef(
  (
    {
      inputClassName = "",
      className,
      name,
      children,
      label = "",
      errors = [],
      shape,
      variant,
      size,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <div className={className}>
          <input
            className={`${inputClassName} ${shapes[shape] || ""} ${
              variants[variant] || ""
            } ${sizes[size] || ""}`}
            ref={ref}
            type="checkbox"
            name={name}
            {...restProps}
          />
          {label}
        </div>
        <ErrorMessage errors={errors} />
        {children}
      </>
    );
  }
);

CheckBox.propTypes = {
  inputClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  shape: PropTypes.oneOf(["RoundedBorder2"]),
  variant: PropTypes.oneOf([
    "OutlineBluegray101",
    "FillIndigo200",
    "FillIndigo201",
  ]),
  size: PropTypes.oneOf(["sm", "md"]),
};
CheckBox.defaultProps = {
  inputClassName: "",
  className: "",
  name: "",
  label: "",
  shape: "RoundedBorder2",
  variant: "OutlineBluegray101",
  size: "md",
};

export { CheckBox };
