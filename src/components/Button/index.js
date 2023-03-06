import React from "react";
import PropTypes from "prop-types";

const shapes = {
  RoundedBorder8: "rounded-radius8",
  RoundedBorder12: "rounded-radius12",
  RoundedBorder4: "rounded-radius4",
  icbRoundedBorder8: "rounded-radius8",
  icbRoundedBorder4: "rounded-radius4",
};
const variants = {
  FillIndigo600: "bg-indigo_600 text-white_A700",
  OutlineIndigo600: "border border-indigo_600 border-solid text-indigo_600",
  OutlineGray501: "border border-gray_501 border-solid text-gray_501",
  FillDeeporangeA200: "bg-deep_orange_A200 text-white_A700",
  FillGray302: "bg-gray_302 text-gray_502",
  OutlineIndigo600_1:
    "bg-indigo_600_0a border border-indigo_600 border-solid text-indigo_600",
  FillBluegray50: "bg-bluegray_50",
  OutlineBluegray102:
    "bg-white_A700 border border-bluegray_102 border-solid text-bluegray_700",
  icbOutlineIndigo600: "border border-indigo_600 border-solid",
  icbOutlineBluegray5003d: "bg-white_A700 shadow-bs",
  icbFillIndigo100: "bg-indigo_100",
  icbFillIndigo201: "bg-indigo_201",
  icbFillIndigo600: "bg-indigo_600",
};
const sizes = {
  sm: "sm:p-[3px] md:p-[4px] p-[8px]",
  md: "p-[13px] sm:p-[5px] md:p-[6px]",
  lg: "p-[16px] md:p-[8px] sm:px-[15px] sm:py-[6px]",
  xl: "p-[19px] md:p-[9px] sm:px-[15px] sm:py-[7px]",
  smIcn: "p-[4px]",
  mdIcn: "p-[10px] sm:p-[3px] md:p-[5px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant,
  size,
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${shapes[shape] || ""} ${
        variants[variant] || ""
      } ${sizes[size] || ""} `}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf([
    "RoundedBorder8",
    "RoundedBorder12",
    "RoundedBorder4",
    "icbRoundedBorder8",
    "icbRoundedBorder4",
  ]),
  variant: PropTypes.oneOf([
    "FillIndigo600",
    "OutlineIndigo600",
    "OutlineGray501",
    "FillDeeporangeA200",
    "FillGray302",
    "OutlineIndigo600_1",
    "FillBluegray50",
    "OutlineBluegray102",
    "icbOutlineIndigo600",
    "icbOutlineBluegray5003d",
    "icbFillIndigo100",
    "icbFillIndigo201",
    "icbFillIndigo600",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "smIcn", "mdIcn"]),
};
Button.defaultProps = {
  className: "",
  shape: "RoundedBorder8",
  variant: "FillIndigo600",
  size: "md",
};

export { Button };
