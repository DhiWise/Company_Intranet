import React from "react";

export const Column = ({ children, className, ...restProps }) => {
  return (
    <div className={`${className} common-column`} {...restProps}>
      {children}
    </div>
  );
};
