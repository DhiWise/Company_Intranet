import React from "react";
import ModalProvider from "react-modal";

import { Button, Column, Img, Row, Text } from "components";

const ConfirmSync = (props) => {
  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-[auto] !w-[35%] sm:w-[100%] flex-col flex"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%]"
        {...props}
      >
        <div className="m-[auto] max-h-[97vh] overflow-y-auto">
          <Column className="bg-white_A700 flex flex-col items-center justify-start max-w-[669px] sm:mb-[134px] md:mb-[173px] mb-[336px] ml-[auto] mr-[auto] sm:pb-[15px] md:pb-[19px] pb-[37px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 flex flex-col items-center justify-start sm:p-[15px] p-[18px] md:p-[9px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
                <Text
                  className="flex-grow font-bold text-black_900"
                  as="h5"
                  variant="h5"
                >  Sync {props?.tool} Employees
                </Text>
                <Img
                  src="/images/img_arrowright_gray_900.svg"
                  className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                  alt="arrowright"
                  onClick={props.onRequestClose}
                />
              </Row>
              <Column className="flex flex-col items-center justify-start mt-[18px] sm:mt-[7px] md:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
                <Text
                  className="font-medium mt-[15px] sm:mt-[5px] md:mt-[7px] text-black_900 w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  {props?.count} Employees found!
                </Text>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[74%]">
                  <Button onClick={props?.sync} className="cursor-pointer font-medium min-w-[44%] text-[16px] text-center text-white_A700 w-[max-content]">
                    Sync
                  </Button>
                  <Button
                    className="cursor-pointer font-medium min-w-[44%] sm:ml-[11px] md:ml-[15px] ml-[30px] text-[16px] text-center text-indigo_600 w-[max-content]"
                    variant="OutlineIndigo600"
                    onClick={props?.onRequestClose}
                  >
                    Cancel
                  </Button>
                </Row>
              </Column>
            </Column>
          </Column>
        </div>
      </ModalProvider>
    </>
  );
};

export { ConfirmSync };
