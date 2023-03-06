import React from "react";
const variantClasses = {
  h1: "font-bold sm:text-[32px] md:text-[34px] text-[36px]",
  h2: "sm:text-[20px] md:text-[22px] text-[24px]",
  h3: "text-[20px]",
  h4: "text-[18px]",
  h5: "text-[16px]",
  h6: "text-[14px]",
  body1: "font-medium text-[12.33px]",
  body2: "text-[10px]",
};
const Text = ({ children, className, variant, as, ...restProps }) => {
  const Component = as || "span";
  return (
    <Component
      className={`${className} ${variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
