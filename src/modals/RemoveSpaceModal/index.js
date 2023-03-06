import React from "react";
import ModalProvider from "react-modal";

import { Button, Column, Img, Row, Text } from "components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteSpacebookingideq19, deleteSpacebookinginviteesbookingideq19, deleteSpaceideq24, deleteSpaceresourcespaceideq24
} from "service/api";

const RemoveSpaceModal = (props) => {

  function deleteBooking() {
    const req = { params: { space_id: `eq.${props.id}` } };
    deleteSpacebookingideq19(req)
      .then(() => {
        delSpace();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error Deleting, please retry!");
      });
  }

  function deleteSpaceBookingInvitees() {
    const req = { params: { space_id: `eq.${props.id}` } };
    deleteSpacebookinginviteesbookingideq19(req)
      .then(() => {
        deleteBooking();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error Deleting, please retry!");
      });
  }

  function delSpace() {
    const req = { params: { id: `eq.${props.id}` } };
    deleteSpaceideq24(req)
      .then((res) => {
        toast.success("Deleted successfully!");
        props.onRequestClose();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error Deleting, please retry!");
      });
  }

  function deleteSpaceResource() {
    const req = { params: { space_id: `eq.${props.id}` } };
    deleteSpaceresourcespaceideq24(req)
      .then((res) => {
        deleteSpaceBookingInvitees();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className=" !w-[34%] sm:w-[100%] flex-col flex"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%] items-center justify-center"
        {...props}
      >
        <div className=" max-h-[97vh] overflow-y-auto">
          <Column className="bg-white_A700 flex flex-col items-center justify-center max-w-[644px] ml-[auto] mr-[auto] md:pb-[15px] sm:pb-[15px] pb-[30px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 flex flex-col items-center justify-start sm:p-[15px] p-[18px] md:p-[9px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                <Text className="rowuploadfile" as="h5" variant="h5">
                  Remove Space
                </Text>
                <Img
                  src="/images/img_arrowright_24X24.svg"
                  className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                  onClick={props.onRequestClose}
                  alt="arrowright"
                />
              </Row>
            </Column>
            <Column className="flex flex-col items-center justify-center lg:mb-[17px] xl:mb-[21px] 2xl:mb-[24px] 3xl:mb-[28px] lg:mt-[20px] xl:mt-[26px] 2xl:mt-[29px] 3xl:mt-[35px] rounded-radius8 w-[70%]">
              <Text
                className="font-medium mt-[30px] sm:mt-[6px] md:mt-[8px] text-black_900 w-[fit-content]"
                as="h5"
                variant="h5"
              >
                Are you sure you want to remove this Space?
              </Text>
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center md:ml-[26px] md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[67%]">
                <Button
                  className="cursor-pointer font-medium min-w-[44%] text-[16px] text-center text-white_A700 w-[max-content]"
                  onClick={props.onRequestClose}
                >
                  Keep
                </Button>
                <Button
                  className="cursor-pointer font-medium min-w-[44%] sm:ml-[11px] md:ml-[15px] ml-[30px] text-[16px] text-center text-indigo_600 w-[max-content]"
                  onClick={() => {
                    deleteSpaceResource();
                  }}
                  variant="OutlineIndigo600"
                >
                  Remove
                </Button>
              </Row>
            </Column>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer />
    </>
  );
};

export { RemoveSpaceModal };
