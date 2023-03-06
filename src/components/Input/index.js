import { ErrorMessage } from "../../components/ErrorMessage";
import React from "react";
import PropTypes from "prop-types";

const variants = {
  FillBluegray50: "bg-bluegray_50",
  FillGray200: "bg-gray_200",
  FillGray101: "bg-gray_101",
  FillIndigo600: "bg-indigo_600",
  OutlineGray300: "bg-gray_101 border border-gray_300 border-solid",
  srcFillBluegray50: "bg-bluegray_50",
};
const shapes = {
  RoundedBorder8: "rounded-radius8",
  RoundedBorder12: "rounded-radius12",
  RoundedBorder4: "rounded-radius4",
  srcRoundedBorder4: "rounded-radius4",
};
const sizes = {
  sm: "p-[13px] sm:p-[5px] md:p-[6px]",
  md: "sm:pb-[13px] md:pb-[18px] pb-[35px] pt-[14px] sm:pt-[5px] md:pt-[7px] px-[14px] sm:px-[5px] md:px-[7px]",
  lg: "p-[15px] sm:p-[5px] md:p-[7px]",
  xl: "pb-[12px] sm:pb-[4px] md:pb-[6px] pt-[17px] sm:pt-[6px] md:pt-[8px] px-[12px] sm:px-[4px] md:px-[6px]",
  "2xl": "md:p-[10px] p-[20px] sm:px-[15px] sm:py-[7px]",
  "3xl": "md:pb-[11px] pb-[22px] sm:pb-[8px]",
  "4xl": "pb-[17px] sm:pb-[6px] md:pb-[8px]",
  smSrc:
    "sm:pb-[3px] md:pb-[4px] pb-[9px] pt-[15px] sm:pt-[5px] md:pt-[7px] sm:px-[3px] md:px-[4px] px-[9px]",
};

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name,
      placeholder,
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      shape,
      variant,
      size,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <div
          className={`${wrapClassName} ${shapes[shape] || ""} ${
            variants[variant] || ""
          } ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    );
  }
);

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf([
    "RoundedBorder8",
    "RoundedBorder12",
    "RoundedBorder4",
    "srcRoundedBorder4",
  ]),
  variant: PropTypes.oneOf([
    "FillBluegray50",
    "FillGray200",
    "FillGray101",
    "FillIndigo600",
    "OutlineGray300",
    "srcFillBluegray50",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "smSrc"]),
};
Input.defaultProps = {
  wrapClassName: "",
  className: "",
  name: "",
  placeholder: "",
  type: "text",
  shape: "",
  variant: "",
  size: "",
};

export { Input };
