import React from "react";

export const Img = ({
  className,
  src = "defaultNoData.png",
  alt = "testImg",
  ...restProps
}) => {
  return (
    <img
      className={`${className}`}
      src={src}
      alt={alt}
      {...restProps}
      loading={"lazy"}
    />
  );
};
