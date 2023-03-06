import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Column, Img, Row, Text } from "components";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useDispatch } from "react-redux";
import { USER_TYPE } from "../../constant";
import useCurrentUser from "../../hooks/useCurrentUser";
import { logout } from "../../reducers/authReducer";

const Sidebar = (props) => {
  const navigateTo = useNavigate();
  const { userType } = useCurrentUser();
  const dispatch = useDispatch();
  const location = useLocation();
  function handleNavigate1(type) {
    if (type === USER_TYPE.Admin) {
      navigateTo("/admin/dashboard");
    }
    if (type === USER_TYPE.User) {
      navigateTo("/dashboard");
    }
  }

  return (
    <>
      <aside className={props.className}>
        <div className="h-screen">
          <Column className=" bg-white_A700 flex flex-col items-center justify-start sm:mb-[11px] md:mb-[15px] md:mt-[12px] sm:mt-[9px] sm:w-[100%] w-[100%] mb-[32px] h-[100%]">
            <Row onClick={() => handleNavigate1(userType)} className="flex flex-row mt-3 md:flex-wrap sm:flex-wrap items-center justify-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[73%]">
              <Img
                src="/images/img_settings.svg"
                className="flex-shrink-0 sm:h-[13px] md:h-[17px] h-[32px] max-w-[100%] sm:w-[12px] md:w-[16px] w-[32px]"
                alt="settings"
              />
              <Text className="flex-grow font-inter font-normal ml-[13px] sm:ml-[5px] md:ml-[6px] my-[1px] not-italic sm:text-[20px] md:text-[22px] text-[24px] text-indigo_600">
                {userType === USER_TYPE?.Admin ? "Admin" : "Employees"}
              </Text>
            </Row>
            <Column className="flex flex-col justify-between md:mt-[12px] mt-[13px] sm:mt-[9px] w-[100%] h-[100%] rounded-b-radius8">
              {/* <Line className="bg-bluegray_100 h-[1px] w-[100%]" /> */}
              <Column className="flex flex-col justify-between md:mt-[12px] mt-[13px] sm:mt-[9px] w-[100%] h-[95%] rounded-b-radius8 overflow-y-auto">
                <Navigation
                  activeItemId={location.pathname}
                  onSelect={({ itemId }) => {
                    navigateTo(itemId);
                  }}
                  items={
                    userType === USER_TYPE?.Admin
                      ? [
                        {
                          title: "Dashboard",
                          itemId: "/admin/dashboard",
                          elemBefore: () => (
                            <Img
                              src="/images/img_objectscolumn_24X24.svg"
                              className="objectscolumn"
                              alt="objectscolumn"
                            />
                          ),
                        },
                        {
                          title: "Invitation",
                          itemId: "/admin/invitation",
                          elemBefore: () => (
                            <Img
                              src="/images/img_mail.svg"
                              className="objectscolumn"
                              alt="mail"
                            />
                          ),
                        },
                        {
                          title: "Employee Directory",
                          // itemId: "/employeelist",
                          elemBefore: () => (
                            <Img
                              src="/images/img_upload.svg"
                              className="objectscolumn"
                              alt="computer"
                            />
                          ),
                          subNav: [
                            {
                              title: "Employees",
                              itemId: "/admin/employeelist",
                              elemBefore: () => (
                                <Img
                                  src="/images/img_user_24X24.svg"
                                  className="objectscolumn"
                                  alt="employeelist"
                                />
                              ),
                            },
                          ],
                        },
                        {
                          title: "Documents",
                          itemId: "/admin/documents",
                          // Optional
                          elemBefore: () => (
                            <Img
                              src="/images/img_file.svg"
                              className="objectscolumn"
                              alt="file"
                            />
                          ),
                        },
                        {
                          title: "Space Management",
                          itemId: "/admin/spacemanagement",
                          // Optional
                          elemBefore: () => (
                            <Img
                              src="/images/img_volume.svg"
                              className="objectscolumn"
                              alt="volume"
                            />
                          ),
                        },
                        {
                          title: "Tool Settings",
                          itemId: "/admin/toolsettings",
                          // Optional
                          elemBefore: () => (
                            <Img
                              src="/images/img_settings_24X24.svg"
                              className="objectscolumn"
                              alt="settings One"
                            />
                          ),
                        },
                        {
                          title: "Resource Data",
                          itemId: "/admin/resourcedata",
                          // Optional
                          elemBefore: () => (
                            <Img
                              src="/images/img_clock.svg"
                              className="objectscolumn"
                              alt="settings One"
                            />
                          ),
                        },
                        {
                          title: "ATS",
                          itemId: "/admin/ats",
                          // Optional
                          elemBefore: () => (
                            <Img
                              src="/images/Vector.png"
                              className="objectscolumn"
                              alt="ATS"
                            />
                          ),
                        },
                      ]
                      : [
                        {
                          title: "Dashboard",
                          itemId: "/dashboard",
                          elemBefore: () => (
                            <Img
                              src="/images/img_objectscolumn_24X24.svg"
                              className="objectscolumn"
                              alt="objectscolumn"
                            />
                          ),
                        },
                        {
                          title: "Documents",
                          itemId: "/documents",
                          // Optional
                          elemBefore: () => (
                            <Img
                              src="/images/img_file.svg"
                              className="objectscolumn"
                              alt="file"
                            />
                          ),
                        },
                        {
                          title: "Space Management",
                          itemId: "/spacemanagement",
                          // Optional
                          elemBefore: () => (
                            <Img
                              src="/images/img_volume.svg"
                              className="objectscolumn"
                              alt="volume"
                            />
                          ),
                        },
                        {
                          title: "Bookings",
                          itemId: "/bookings",
                          // Optional
                          elemBefore: () => (
                            <Img
                              src="/images/img_volume.svg"
                              className="objectscolumn"
                              alt="volume"
                            />
                          ),
                        },
                        {
                          title: "Votes",
                          itemId: "/votes",
                          // Optional
                          elemBefore: () => (
                            <Img
                              src="/images/Vector.png"
                              className="objectscolumn"
                              alt="settings One"
                            />
                          ),
                        },
                      ]
                  }
                />
              </Column>
              <Row
                onClick={() => {
                  dispatch(logout()), navigateTo("/");
                }}
                className="common-pointer bg-gray_101 h-[5%] flex flex-row items-center justify-between lg:mt-[248px] xl:mt-[310px] 2xl:mt-[348px] 3xl:mt-[418px] lg:p-[5px] xl:p-[15px] 2xl:p-[7px] 3xl:p-[9px] rounded-radius8 w-[90%] m-[10px]"
              >
                <Text className="Logout2 ml-[20px]">Logout</Text>
                <Img
                  src="/images/img_question.svg"
                  className="settings_One mr-[10px]"
                  alt="question"
                />
              </Row>
            </Column>
          </Column>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
