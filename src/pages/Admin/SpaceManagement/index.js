import React from "react";

import { Button, Column, Grid, Img, Input, Row, Text } from "components";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { getSpaceselect } from "service/api";
import { CloseSVG } from "../../../assets/images/index.js";
import Base from "../../../components/Base";
import { SUPABSE_CREDS } from "../../../constant/index.js";
import { AddSpaceModal } from "../../../modals/AddSpace";
import { EditSpaceModal } from "../../../modals/EditSpace";
import { RemoveSpaceModal } from "../../../modals/RemoveSpaceModal";

const SpaceManagementPage = () => {
  const [spaceData, setSpaceData] = React.useState();
  const [open, setOpen] = React.useState(); // undefined is nothing open
  const [isOpenRemoveSpaceModal, setRemoveSpaceModal] = React.useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = React.useState();
  const [isOpenAddSpaceModal, setAddSpaceModal] = React.useState(false);
  const [isOpenEditSpaceModal, setEditSpaceModal] = React.useState(false);
  const [id, setId] = React.useState();
  const toggle = (id) => setOpen(open === id ? undefined : id); // close if currently open

  const handleSearch = (val) => {
    if (val !== "") {
      setSearch(val);
      getSearchList(search);
    } else {
      setSearch("");
      getSpace();
    }
  };
  function getSearchList(data) {
    const req = {
      params: {
        or: `(space_name.ilike.%${data}%)`,
      },
    };

    getSpaceselect(req)
      .then((res) => {
        setSpaceData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getSpace() {
    const req = {};

    getSpaceselect(req)
      .then((res) => {
        setSpaceData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleOpenAddSpaceModal() {
    setAddSpaceModal(true);
  }

  function handleCloseAddSpaceModal() {
    setAddSpaceModal(false);
    getSpace();
  }

  function handleOpenEditSpaceModal(id) {
    setEditSpaceModal(true);
    setId(id);
  }

  function handleNavigate1(id) {
    navigate("/admin/bookspacedaily", { state: { id: id } });
  }

  function handleCloseEditSpaceModal() {
    setEditSpaceModal(false);
    getSpace();
  }
  function handleOpenRemoveSpaceModal(id) {
    setRemoveSpaceModal(true);
    setId(id);
  }
  function handleCloseRemoveSpaceModal() {
    setRemoveSpaceModal(false);
    getSpace();
  }
  React.useEffect(() => {
    getSpace();
    localStorage.removeItem("todayFilter");
    localStorage.removeItem("tomoFilter");
    localStorage.removeItem("customFilter");
  }, []);

  React.useEffect(() => {
    if (isOpenAddSpaceModal) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "static";
    }
  }, [isOpenAddSpaceModal]);

  React.useEffect(() => {
    if (isOpenEditSpaceModal) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "static";
    }
  }, [isOpenEditSpaceModal]);

  return (
    <Base title="Space Management">
      <Column className="bg-white_A700 justify-start sm:mt-[12px] md:mt-[16px] lg:mt-[17px] xl:mt-[21px] 2xl:mt-[24px] 3xl:mt-[28px] xl:p-[12px] 2xl:p-[13px] 3xl:p-[16px] lg:p-[9px] sm:mx-[0] sm:p-[15px] rounded-radius8 p-[18px] my-[32px] w-[97%]">
        <Row className="flex items-center justify-between rounded-radius8 w-[auto] p-[2%]">
          <Text
            className="font-medium text-black_901 w-[auto]"
            as="h3"
            variant="h3"
          >
            My Space
          </Text>
          <Row className="items-center justify-center lg:ml-[393px] xl:ml-[491px] 2xl:ml-[553px] 3xl:ml-[663px] w-[75%] pl-[620px]">

            <Input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="font-normal not-italic p-[0] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] placeholder:text-bluegray_500 text-bluegray_500 pl-[10px] w-[100%]"
              wrapClassName="2xl:ml-[12px] 3xl:ml-[14px] flex lg:ml-[8px] w-[auto] pt-[10px] pb-[10px] xl:ml-[10px]"
              name="Group3997"
              placeholder="Search by name.."
              prefix={
                <Img
                  src="/images/img_search_16X16.svg"
                  className="cursor-pointer ml-[2px] lg:w-[8px] lg:h-[9px] lg:mr-[9px] xl:w-[10px] xl:h-[11px] xl:mr-[12px] 2xl:w-[12px] 2xl:h-[13px] 2xl:mr-[13px] 3xl:w-[14px] 3xl:h-[15px] 3xl:mr-[16px] my-[auto]"
                  alt="search"
                />
              }
              suffix={
                search?.length > 0 ? (
                  <CloseSVG
                    color="#757e8a"
                    className="cursor-pointer lg:w-[8px] lg:h-[9px] lg:ml-[5px] lg:mr-[11px] xl:w-[10px] xl:h-[11px] xl:ml-[6px] xl:mr-[14px] 2xl:w-[12px] 2xl:h-[13px] 2xl:ml-[7px] 2xl:mr-[16px] 3xl:w-[14px] 3xl:h-[15px] 3xl:ml-[9px] 3xl:mr-[19px] my-[auto]"
                    onClick={() => {
                      setSearch("");
                      getSpace();
                    }}
                  />
                ) : (
                  ""
                )
              }
              shape="srcRoundedBorder4"
              size="smSrc"
              variant="srcFillBluegray50"
            ></Input>
          </Row>
          <Button
            className="flex items-center justify-center min-w-[11%] p-[10px] text-center w-[max-content]"
            onClick={handleOpenAddSpaceModal}
            leftIcon={
              <Img
                src="/images/img_plus.svg"
                className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                alt="plus"
              />
            }
          >
            <div className="common-pointer bg-transparent cursor-pointer font-medium text-[14px] text-white_A700">
              Create Space
            </div>
          </Button>
        </Row>
        <Grid
          className="grid grid-cols-3 gap-3 sm:gap-[11px] md:gap-[15px] sm:mb-[26px] md:mb-[34px] sm:mt-[19px] md:mt-[25px]  sm:w-[100%] p-[2%]"

        >
          {spaceData?.map((apiDataResponseEle, index) => {
            return (
              <React.Fragment key={`apiDataResponseEle${index}`}>
                <Row className="items-center justify-between xl:my-[10px] 2xl:my-[11px] 3xl:my-[13px] lg:my-[8px] w-[auto] h-[100%] m-[10px]">
                  <Column className="bg-white_A700 items-center sm:mx-[0] sm:p-[15px] xl:p-[10px] 2xl:p-[12px] 3xl:p-[14px] lg:p-[8px] md:p-[8px] rounded-radius12 shadow-md  sm:w-[100%] w-[100%] ">
                    <Column className="items-center justify-start sm:px-[0] w-[100%] h-[50%]  p-[10px]">
                      <Column className="backdrop-opacity-[0.5] h-[50%] border border-indigo-700 border-solid bg-indigo_700 items-center justify-start rounded-radius8 w-[100%]">
                        <Column
                          className="bg-cover bg-repeat items-end justify-start h-48 lg:p-[4px] xl:p-[5px] 2xl:p-[6px] 3xl:p-[7px] sm:p-[3px] md:p-[4px] rounded-radius8 w-[100%]"
                          style={{
                            backgroundImage:
                              "url(" +
                              `${SUPABSE_CREDS.COMMON_URL}storage/v1/object/public/${apiDataResponseEle?.image_url}` +
                              ")",
                          }}
                        ></Column>
                      </Column>
                    </Column>
                    <Column className="justify-start lg:mt-[11px] xl:mt-[14px] 2xl:mt-[15px] 3xl:mt-[18px] sm:mt-[6px] md:mt-[8px] sm:px-[0] w-[100%] pr-[10px] pl-[10px] pb-[10px] overflow-y-auto">
                      <Row className="flex flex-row justify-between items-center w-[100%] relative">
                        <Text
                          className="font-normal text-black_900 w-[90%]"
                          as="h4"
                          variant="h4"
                        >
                          {apiDataResponseEle?.["space_name"]}
                        </Text>
                        <Img
                          src="/images/img_overflowmenu.svg"
                          className="common-pointer"
                          alt="edit"
                          onClick={() => toggle(apiDataResponseEle?.id)}
                        />
                        {open === apiDataResponseEle?.id && (
                          <Dropdown className="absolute left-[-20%] -top-0">
                            <Dropdown.Menu className="" show={toggle}>
                              <Dropdown.Item
                                onClick={() =>
                                  handleNavigate1(apiDataResponseEle?.id)
                                }
                              >
                                View
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleOpenEditSpaceModal(
                                    apiDataResponseEle?.id
                                  )
                                }
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleOpenRemoveSpaceModal(
                                    apiDataResponseEle?.id
                                  )
                                }
                              >
                                Remove
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      </Row>
                      <Row className="flex items-center xl:mt-[10px] 2xl:mt-[12px] 3xl:mt-[14px] lg:mt-[8px] sm:mt-[6px] md:mt-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%] mt-[5px] w-[100%]">
                        <Img
                          src="/images/img_location_24X24.svg"
                          className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[20px] sm:w-[9px]"
                          alt="location"
                        />
                        <Text
                          className="flex-grow font-medium sm:mt-[1px] md:mt-[2px] ml-[5px] text-bluegray_500"
                          as="h5"
                          variant="h5"
                        >
                          {apiDataResponseEle?.location}
                        </Text>
                      </Row>
                      <Text
                        className="font-thin leading-[20.00px] md:leading-[normal] sm:leading-[normal] mt-[10px] sm:mt-[6px] md:mt-[8px] not-italic text-bluegray_500 w-[100%] text-justify h-[50px]"
                        as="h6"
                        variant="h6"
                      >
                        {apiDataResponseEle?.description}
                      </Text>
                    </Column>
                  </Column>
                </Row>
              </React.Fragment>
            );
          })}
        </Grid>
      </Column>

      {isOpenRemoveSpaceModal ? (
        <RemoveSpaceModal
          isOpen={isOpenRemoveSpaceModal}
          onRequestClose={handleCloseRemoveSpaceModal}
          id={id}
        />
      ) : null}
      {isOpenAddSpaceModal ? (
        <AddSpaceModal
          isOpen={isOpenAddSpaceModal}
          onRequestClose={handleCloseAddSpaceModal}
        />
      ) : null}
      {isOpenAddSpaceModal ? (
        <AddSpaceModal
          isOpen={isOpenAddSpaceModal}
          onRequestClose={handleCloseAddSpaceModal}
        />
      ) : null}
      {isOpenEditSpaceModal ? (
        <EditSpaceModal
          isOpen={isOpenEditSpaceModal}
          onRequestClose={handleCloseEditSpaceModal}
          id={id}
        />
      ) : null}
    </Base>
  );
};

export default SpaceManagementPage;
