import React from "react";
import ModalProvider from "react-modal";

import { Button, Column, Img, Row, Text } from "components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteSpacebookingideq19, deleteSpacebookinginviteesbookingideq19
} from "service/api";

const ViewBookingRemoveModal = (props) => {

  function deleteSpaceInvitees() {
    const req = { params: { booking_id: `eq.${props.id}` } };
    deleteSpacebookinginviteesbookingideq19(req)
      .then((res) => {
        deleteSpaceBooking();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function deleteSpaceBooking() {
    const req = { params: { id: `eq.${props.id}` } };

    deleteSpacebookingideq19(req)
      .then((res) => {
        toast.success("Deleted successfully!");
        props.onRequestClose();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error Deleting, please retry!");
      });
  }
  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className=" !w-[35%] sm:w-[100%] flex-col flex items-center justify-center"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%] items-center justify-center"
        {...props}
      >
        <div className="max-h-[97vh] overflow-y-auto w-[100%]">
          <Column className="bg-white_A700 flex flex-col items-center justify-start sm:pb-[15px] md:pb-[16px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 flex flex-col items-center justify-end sm:p-[15px] p-[16px] md:p-[8px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between mt-[2px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
                <Text
                  className="flex-grow font-bold sm:mt-[1px] md:mt-[2px] text-black_900"
                  as="h5"
                  variant="h5"
                >
                  Remove Booking
                </Text>
                <Img
                  src="/images/img_arrowright_gray_900.svg"
                  className="common-pointer flex-shrink-0 sm:h-[10px] md:h-[13px] md:w-[12px] w-[24px] sm:w-[9px]"
                  onClick={props.onRequestClose}
                  alt="arrowright"
                />
              </Row>
            </Column>
            <Column className="flex flex-col items-center justify-start sm:mt-[15px] md:mt-[20px] mt-[30px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[100%]">
              <Text
                className="font-medium text-black_900 w-[auto]"
                as="h5"
                variant="h5"
              >
                Are you sure you want to remove Booking?
              </Text>
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mt-[12px] md:mt-[16px] mt-[32px] pb-[20px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[100%]">
                <Button
                  className="common-pointer cursor-pointer font-medium text-[16px] text-center text-white_A700 w-[30%]"
                  onClick={props.onRequestClose}
                >
                  Keep
                </Button>
                <Button
                  className="common-pointer cursor-pointer font-medium sm:ml-[11px] md:ml-[15px] ml-[30px] text-[16px] text-center text-indigo_600 w-[30%]"
                  onClick={() => {
                    deleteSpaceInvitees();
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

export default ViewBookingRemoveModal;
