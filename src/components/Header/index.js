import { Img, Row, Text } from "components";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

const Header = ({ className, children, prefix, suffix, ...restProps }) => {
  const { userData } = useCurrentUser();
  const navigate = useNavigate();

  function handleNavigate1(id) {
    navigate("/admin/myProfile", { state: { id: id } });
  }

  return (

    <Row
      className={`bg-white_A700 flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:p-[11px] sm:p-[15px] p-[21px] w-[100%] ${className && className
        }`}
    >
      {!!prefix && prefix}
      {children && (
        <Text
          className="font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-black_900 w-[auto]"
          as="h3"
          variant="h3"
        >
          {children}
        </Text>
      )}
      {!!suffix && suffix}
      {!window.location.pathname.includes('/admin/myProfile') && <Img
        src={userData?.image ? userData?.image?.[0]?.['200x200'] : "/images/user.png"}
        className="common-pointer sm:h-[17px] md:h-[22px] h-[25px] mr-[7px] sm:mr-[5px] md:mr-[6px] rounded-radius50 sm:w-[16px] md:w-[21px] w-[25px] r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
        onClick={() => handleNavigate1(userData?.id)}
        alt="user"
      />}
    </Row>
  );
};

export { Header };
