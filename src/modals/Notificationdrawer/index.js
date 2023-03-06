import React from "react";
import ModalProvider from "react-modal";

import { Button, Img, Line, List, Text } from "components";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { getNotificationselect, readNotification } from "service/api";
import useCurrentUser from "../../hooks/useCurrentUser";

const NotificationdrawerModal = (props) => {
  const { userData } = useCurrentUser();
  const navigate = useNavigate();
  const [apiData, setapiData] = React.useState();

  React.useEffect(() => {
    callApi();
  }, []);

  function updateViewStatus(data) {
    const req = {
      params: { id: `eq.${data?.id}` },
      data: { is_viewed: true },
    };

    readNotification(req)
      .then((res) => {
        {
          data?.notification_type === 1 ? navigate("/bookings") :
            navigate("/votehere", { state: { id: data?.response_id, applicantID: data?.applicant_id } });
        }
        props?.onRequestClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApi() {
    const req = { params: { employe_id: `eq.${userData?.id}`, select: "*" } };

    getNotificationselect(req)
      .then((res) => {
        setapiData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleNavigate(data) {
    updateViewStatus(data);
  }


  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className=" flex-col flex outline-none justify-start items-end place-content-end w-[97%]"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%]"
        {...props}
      >
        <div className="overflow-y-auto w-[20rem]">
          <div className="bg-white_A700 flex flex-col items-center justify-start max-w-[320px]  ml-[auto] mr-[auto] sm:mt-[14px] md:mt-[18px] mt-[50px] sm:pb-[15px] md:pb-[22px] pb-[43px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 shadow-bs1 w-[20rem]">
            <Text
              className="bg-gray_101 font-bold sm:p-[15px] md:pl-[12px] pl-[24px] md:pr-[18px] pr-[35px] md:py-[10px] py-[21px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] text-black_901 w-[20rem]"
              as="h4"
              variant="h4"
            >
              Notification
            </Text>
            <List
              className="sm:gap-[10px] md:gap-[13px] gap-[26.75px] grid min-h-[auto] mt-[18px] sm:mt-[7px] md:mt-[9px] w-[100%]"
              orientation="vertical"
            >
              <React.Fragment key={`apiDataResponseEle`}>
                <div className="flex flex-col justify-start items-center w-[100%]">
                  {!isEmpty(apiData) ? apiData?.map((apiDataResponseEle, index) => {
                    return (
                      <div className="flex flex-col font-outfit items-center justify-start mt-[15px] sm:mt-[5px] md:mt-[7px] w-[100%]">
                        {apiDataResponseEle?.notification_type === 1 ? (
                          <div
                            className=" common-pointer flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]"
                            onClick={() => handleNavigate(apiDataResponseEle)}
                          >
                            <Button
                              className="flex !cursor-default sm:h-[16px] md:h-[20px] h-[38px] items-center justify-center my-[14px] sm:my-[5px] md:my-[7px] rounded-radius50 sm:w-[15px] md:w-[19px] ml-[12px] w-[38px]"
                              size="mdIcn"
                              variant="icbFillBluegray50"
                            >
                              <Img
                                src="images/img_user_38X38.svg"
                                className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                                alt="user"
                              />
                            </Button>
                            <div className="flex flex-col sm:mx-[0] sm:px-[0] sm:w-[100%] w-[81%]">
                              <Text
                                className={`${apiDataResponseEle?.is_viewed
                                  ? "text-gray_600"
                                  : "text-black_902 font-semibold"
                                  } leading-[20.00px] md:leading-[normal] sm:leading-[normal] tracking-ls014 md:tracking-ls1 sm:tracking-ls1 w-[100%]`}
                                as="h5"
                                variant="h5"
                              >
                                You have been invited for an event.
                              </Text>
                              <div className="flex flex-row md:flex-wrap sm:flex-wrap font-inter items-start sm:mt-[3px] md:mt-[4px] mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[70%]">
                                <Img
                                  src="images/img_clock_17X18.svg"
                                  className="flex-shrink-0 max-w-[100%] w-[12%]"
                                  alt="clock"
                                />
                                <Text
                                  className="flex-grow ml-[4px] mt-[3px] not-italic text-gray_502 tracking-ls012 md:tracking-ls1 sm:tracking-ls1"
                                  as="h6"
                                  variant="h6"
                                >
                                  {dayjs(
                                    apiDataResponseEle?.["created_at"]
                                  ).format("DD/MM/YYYY h:mm a")}
                                </Text>
                              </div>
                            </div>
                          </div>) :
                          (<div
                            className=" common-pointer flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]"
                            onClick={() => handleNavigate(apiDataResponseEle)}
                          >
                            <Button
                              className="flex !cursor-default sm:h-[16px] md:h-[20px] h-[38px] items-center justify-center my-[14px] sm:my-[5px] md:my-[7px] rounded-radius50 sm:w-[15px] md:w-[19px] ml-[12px] w-[38px]"
                              size="mdIcn"
                              variant="icbFillBluegray50"
                            >
                              <Img
                                src="images/img_user_38X38.svg"
                                className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                                alt="user"
                              />
                            </Button>
                            <div className="flex flex-col sm:mx-[0] sm:px-[0] sm:w-[100%] w-[81%]">
                              <Text
                                className={`${apiDataResponseEle?.is_viewed
                                  ? "text-gray_600"
                                  : "text-black_902 font-semibold"
                                  } leading-[20.00px] md:leading-[normal] sm:leading-[normal] tracking-ls014 md:tracking-ls1 sm:tracking-ls1 w-[100%]`}
                                as="h5"
                                variant="h5"
                              >
                                Review this XYZ.
                              </Text>
                              <div className="flex flex-row md:flex-wrap sm:flex-wrap font-inter items-start sm:mt-[3px] md:mt-[4px] mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[70%]">
                                <Img
                                  src="images/img_clock_17X18.svg"
                                  className="flex-shrink-0 max-w-[100%] w-[12%]"
                                  alt="clock"
                                />
                                <Text
                                  className="flex-grow ml-[4px] mt-[3px] not-italic text-gray_502 tracking-ls012 md:tracking-ls1 sm:tracking-ls1"
                                  as="h6"
                                  variant="h6"
                                >
                                  {dayjs(
                                    apiDataResponseEle?.["created_at"]
                                  ).format("DD/MM/YYYY h:mm a")}
                                </Text>
                              </div>
                            </div>
                          </div>)
                        }
                        < Line className="bg-gray_300 h-[1.5px] mt-[12px] sm:mt-[4px] md:mt-[6px] w-[100%]" />
                      </div>
                    );
                  }) : "All notifications are clear."}
                </div>
              </React.Fragment>
            </List>
          </div>
        </div>
      </ModalProvider>
    </>
  );
};

export default NotificationdrawerModal;
