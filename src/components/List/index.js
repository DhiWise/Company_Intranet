import React from "react";

export const List = ({ children, className, ...restProps }) => {
  return (
    <div className={`${className}`} {...restProps}>
      {children}
    </div>
  );
};
