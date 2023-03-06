import React from "react";

export const Grid = ({ children, className, ...restProps }) => {
  return (
    <div className={`${className}`} {...restProps}>
      {children}
    </div>
  );
};
