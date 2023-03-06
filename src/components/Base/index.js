import { Column, Footer, Header, Row, UserHeader } from "components";
import Sidebar from "components/Sidebar";
import React from "react";

const Base = ({ title = "", children, headerType = 1 }) => {
  return (
    <>
      <Column className=" flex flex-col font-inter items-center justify-start w-[100%] h-screen">
        <Row className="flex flex-row w-[100%] h-[100%]">
          <Sidebar className="w-[15%]" />
          <Column className="flex flex-col justify-start items-center w-[85%] h-auto">
            {headerType == 1 ? (
              <Header className="h-[2%] mt-[10px]">{title}</Header>
            ) : (
              <UserHeader className="h-[2%] mt-[10px]">{title}</UserHeader>
            )}
            <Column className=" flex flex-col items-center justify-start rounded-radius8 sm:w-[100%] w-[100%] overflow-y-auto h-screen">
              {children}
            </Column>
            <Footer className="w-[100%] h-[8%]" />
          </Column>
        </Row>
      </Column>
    </>
  );
};
export default Base;
