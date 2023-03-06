import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import styles from "./TableFooter.module.css";

const TableFooter = ({ className, range, setPage, page, slice }) => {
  useEffect(() => {
    if (isEmpty(slice) && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={`${className}`}>
      {range?.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${page === el ? styles.activeButton : styles.inactiveButton
            }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
