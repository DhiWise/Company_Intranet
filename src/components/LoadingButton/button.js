import React from "react";

import { ReactComponent as Loader } from "../../assets/images/loader.svg";

const LoadingButton = ({
  onSubmit,
  text,
  loading = false,
  disabled,
  className,
}) => {
  return (
    <button
      className={`rounded-radius8 bg-indigo_600 cursor-pointer font-medium md:ml-[12px] sm:ml-[9px] text-[16px] text-center text-white_A700 p-[12px] ${
        className || "w-1/3"
      }`}
      onClick={onSubmit}
      disabled={disabled}
    >
      {!loading ? text : <Loader className="spinner" />}
    </button>
  );
};

export default LoadingButton;
