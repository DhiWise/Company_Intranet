import { Img } from "components";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import NotificationdrawerModal from "../../modals/Notificationdrawer";
import { getNotifications } from "../../service/api";
import "./notification.css";

const NotificationIcon = ({
  className,
  children,
  prefix,
  suffix,
  ...restProps
}) => {
  const { userData } = useCurrentUser();
  const navigate = useNavigate();

  const [userNotification, setuserNotification] = React.useState();
  const [unreadNotification, setunreadNotification] = React.useState();
  const [isOpenNotificationdrawerModal, setNotificationdrawerModal] =
    React.useState(false);

  React.useEffect(() => {
    getUserNotification();
  }, [userData]);

  function getUserNotification() {
    const req = { params: { employe_id: `eq.${userData?.id}`, select: "*" } };

    getNotifications(req)
      .then((res) => {
        setuserNotification(res);
        const unreadData = res?.filter((dt) => {
          return dt?.is_viewed === false;
        });
        setunreadNotification(unreadData);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleOpenNotificationdrawerModal() {
    setNotificationdrawerModal(true);
  }
  function handleCloseNotificationdrawerModal() {
    setNotificationdrawerModal(false);
  }
  function handleNavigate1(id) {
    navigate("/myProfile", { state: { id: id } });
  }

  return (
    <div>
      <div className="notificationIcon">
        {unreadNotification?.length > 0 ? (
          <div className="notificationNum">{unreadNotification?.length}</div>
        ) : null}

        <Img
          src="images/bell.png"
          className="common-pointer sm:h-[17px] md:h-[22px] h-[25px] mr-[7px] sm:mr-[5px] md:mr-[6px] rounded-radius50 sm:w-[16px] md:w-[21px] w-[25px] r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
          onClick={handleOpenNotificationdrawerModal}
          alt="user"
        />
        {!window.location.pathname.includes('/myProfile') && <Img
          src={userData?.image ? userData?.image?.[0]?.['200x200'] : "/images/user.png"}
          className="common-pointer sm:h-[17px] md:h-[22px] h-[25px] mr-[7px] sm:mr-[5px] md:mr-[6px] rounded-radius50 sm:w-[16px] md:w-[21px] w-[25px] r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
          onClick={() => handleNavigate1(userData?.id)}
          alt="user"
        />}
      </div>
      {isOpenNotificationdrawerModal ? (
        <NotificationdrawerModal
          isOpen={isOpenNotificationdrawerModal}
          onRequestClose={handleCloseNotificationdrawerModal}
        />
      ) : null}
    </div>
  );
};

export { NotificationIcon };
