import React, { useState } from "react";

import {
  Button,
  Column,
  Img,
  Input,
  List,
  Row,
  SelectBox,
  Text
} from "components";
// import { LoadingSpinner } from "../../../components/LoadingSpinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { debounce, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getEmployeesCount,
  getEmployeeselect,
  getSearchEmployeeList,
  updateEmployee
} from "service/api";
import { CloseSVG } from "../../../assets/images/index.js";
import { Line } from "../../../components";
import Base from "../../../components/Base";
import { gender } from "../../../constant";
import TableFooter from "./tableFooter.js";

// Per Page rows
const rowsPerPageOption = [
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 150, label: "150" },
];
const EmployeeListPage = () => {
  const [isOpenFilterModal, setisOpenFilterModal] = React.useState(false);
  const navigate = useNavigate();

  const [filterData, setfilterData] = React.useState(); // Set Filter Data from Modal
  const [employeeCount, setemployeeCount] = React.useState(); // Set Employees Count
  const [apiData, setapiData] = React.useState(); // Set Employees Data
  const [isLoading, setIsLoading] = useState(false); // Loading State
  // Pagination States
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(20);
  // Search data State
  const [search, setSearch] = React.useState("");

  function handleOpenFilterModal() {
    //Open Filter Modal
    setisOpenFilterModal(true);
  }
  function handleCloseFilterModal() {
    // Close FIlter Modal
    setisOpenFilterModal(false);
  }

  // get total count of employees
  const getCount = async (data) => {
    const req = data
      ? {
        params: {
          or: `(first_name.ilike.%${data}%,last_name.ilike.%${data}%,middle_name.ilike.%${data}%)`,
        },
      }
      : filterData
        ? { filterURL: filterData.join("&") }
        : {};
    !data && setIsLoading(true);
    await getEmployeesCount(req)
      .then((res) => {
        setemployeeCount(res[0]?.count);
        !data && setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };

  // to get employee data
  const callApi = async (data) => {
    const req = filterData
      ? { headers: { Range: data }, filterURL: filterData.join("&") }
      : { headers: { Range: data } };
    setIsLoading(true);
    await getEmployeeselect(req)
      .then((res) => {
        setapiData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };

  // Pagination

  // To calculate the range for pagination
  const calculateRange = (totalRows, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(totalRows / rowsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };

  // To set the range for API
  const sliceData = (page, rowsPerPage) => {
    return `${(page - 1) * rowsPerPage}-${page * rowsPerPage - 1}`;
  };

  const pagiantion = (count, rows, page) => {
    const range = calculateRange(count, rows);
    setTableRange([...range]);

    const data = sliceData(page, rowsPerPage);
    setSlice(data ? data : "");

    search ? getSearchList(search, data) : callApi(data);
  };

  // Search
  const handleSearch = (val) => {
    if (val !== "") {
      setSearch(val);
    } else {
      setSearch("");
      getCount();
    }
  };

  const debouncedAPI = React.useCallback(
    debounce(() => {
      getCount(search);
    }, 1000),
    [search]
  );

  React.useEffect(() => {
    debouncedAPI();
  }, [search]);

  // To get Search List
  function getSearchList(data, range) {
    const req = {
      params: {
        or: `(first_name.ilike.%${data}%,last_name.ilike.%${data}%,middle_name.ilike.%${data}%)`,
      },
      headers: { Range: range },
    };
    // setIsLoading(true);
    getSearchEmployeeList(req)
      .then((res) => {
        setapiData(res);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  }

  function handleNavigate1(id) {
    navigate("/admin/employeepage", { state: { id: id } });
  }

  React.useEffect(() => {
    getCount();
  }, [filterData]);

  // To Change the Employee Status
  const handleSwitchChange = (activeStatus, id) => {
    const req = { data: { id, is_active: activeStatus } };

    updateEmployee(req)
      .then((res) => {
        toast.success("Employee Status updated.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened!");
      });
  };

  const getGender = (value) => {
    const data = gender?.filter((data) => data?.value === value);
    const userGender = { ...data[0] };
    return userGender?.label;
  };

  React.useEffect(() => {
    pagiantion(employeeCount, rowsPerPage, page);
  }, [employeeCount, setTableRange, page, setSlice, rowsPerPage]);

  return (
    <Base title="Employees Details">
      <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:py-[15px] py-[18px] md:py-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
          <Row className="flex flex-row gap-[10px] md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[40%]">
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
              <Img
                src="/images/img_cut.svg"
                className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                alt="cut"
              />
              <Text
                className="font-medium  text-[15px] sm:ml-[3px] ml-[4px] sm:mt-[1px] md:mt-[2px] text-black_900"
                as="h5"
                variant="h5"
              >
                {employeeCount} Employees
              </Text>
            </Row>
            {!isEmpty(filterData) && (
              <Button
                className="font-medium lg:ml-[5px] xl:ml-[7px] 2xl:ml-[9px] 3xl:ml-[11px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[20%]"
                variant="OutlineIndigo600"
                onClick={() => setfilterData([])}
              >
                Reset Filters
              </Button>
            )}
          </Row>
          <Row className="flex flex-row gap-[10px] md:flex-wrap sm:flex-wrap items-center justify-end  w-[40%]">
            <Text
              className="font-medium text-black_901 w-[auto]"
              as="h5"
              variant="h5"
            >
              Search
            </Text>
            <Input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="font-normal not-italic p-[10] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] placeholder:text-bluegray_500 text-bluegray_500 w-[100%]"
              wrapClassName="2xl:ml-[12px] 3xl:ml-[14px] flex lg:ml-[8px] w-[max-content] xl:ml-[10px]"
              name="Group3997"
              placeholder="Search by name"
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
                      setSearch(""), getCount(), setPage(1);
                    }}
                  />
                ) : (
                  ""
                )
              }
              shape="srcRoundedBorder4"
              variant="srcFillBluegray50"
            ></Input>
          </Row>
        </Row>
        <Column className="flex flex-col items-center justify-start sm:mb-[2px] md:mb-[3px] mb-[6px] mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]">
          <Column className="bg-gray_101 border border-gray_300 border-solid flex flex-col items-center justify-start sm:p-[15px] p-[16px] md:p-[8px] w-[100%]">
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
              <Column className="flex flex-col items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[5%]">
                <Text
                  className="font-semibold text-indigo_600 w-[auto]"
                  as="h6"
                  variant="h6"
                >
                  Image
                </Text>
              </Column>
              <Column className="flex flex-col items-center md:ml-[25px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[10%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center w-[100%]">
                  <Text
                    className="font-semibold text-indigo_600"
                    as="h6"
                    variant="h6"
                  >
                    Employee Id
                  </Text>
                </Row>
              </Column>
              <Column className="flex flex-col items-center justify-center md:ml-[57px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[25%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center w-[100%]">
                  <Text
                    className=" font-semibold text-indigo_600"
                    as="h6"
                    variant="h6"
                  >
                    Full Name
                  </Text>
                </Row>
              </Column>
              <Column className="flex flex-col items-center md:ml-[49px] sm:mx-[0] sm:px-[0] py-[2px] sm:w-[100%] w-[5%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center w-[100%]">
                  <Text
                    className="font-semibold text-indigo_600"
                    as="h6"
                    variant="h6"
                  >
                    Gender
                  </Text>
                </Row>
              </Column>
              <Column className="flex flex-col items-center md:ml-[26px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[20%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-center w-[100%]">
                  <Text
                    className="font-semibold text-indigo_600"
                    as="h6"
                    variant="h6"
                  >
                    Email
                  </Text>
                </Row>
              </Column>
              <Column className="flex flex-col items-center justify-center sm:px-[0] w-[10%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center w-[100%]">
                  <Text
                    className="font-semibold text-indigo_600 text-center"
                    as="h6"
                    variant="h6"
                  >
                    Phone Number
                  </Text>
                </Row>
              </Column>
              <Column className="flex flex-col items-center justify-center sm:px-[0] w-[24%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center w-[100%]">
                  <Text
                    className="font-semibold text-indigo_600"
                    as="h6"
                    variant="h6"
                  >
                    Job Title
                  </Text>
                </Row>
              </Column>
            </Row>
          </Column>
          <Column className="flex flex-col items-center justify-start md:mt-[12px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
            {employeeCount ? (
              <List
                className="grid min-h-[auto] w-[100%]"
                orientation="vertical"
              >
                {apiData?.map((apiDataResponseEle, index) => {
                  return (
                    <React.Fragment key={`apiDataResponseEle${index}`}>
                      <Column className="flex flex-col items-center justify-center p-[10px] w-[100%]">
                        <Row className="common-pointer flex flex-row md:flex-wrap sm:flex-wrap items-center w-[100%] justify-center">
                          {apiDataResponseEle?.image?.[0]?.["200x200"] ? (
                            <Img
                              src={apiDataResponseEle?.image?.[0]?.["200x200"]}
                              className="sm:h-[24px] md:h-[31px] h-[50px] rounded-radius50 sm:w-[23px] md:w-[30px] w-[50px]"
                              alt="Image"
                            />
                          ) : (
                            <Img
                              src="/images/img_ellipse13.png"
                              className="sm:h-[24px] md:h-[31px] h-[50px] rounded-radius50 sm:w-[23px] md:w-[30px] w-[50px]"
                              alt="Image"
                            />
                          )}
                          <Text
                            className="font-normal sm:ml-[30px] md:ml-[39px] not-italic text-blue_A400 w-[10%] text-center"
                            as="h6"
                            variant="h6"
                            onClick={() =>
                              handleNavigate1(apiDataResponseEle?.id)
                            }
                          >
                            {apiDataResponseEle?.employee_number}
                          </Text>
                          <Text
                            className="font-normal sm:ml-[49px] md:ml-[64px] not-italic text-black_901 w-[25%] text-center  truncate pr-[10px]"
                            onClick={() =>
                              handleNavigate1(apiDataResponseEle?.id)
                            }
                            as="h6"
                            variant="h6"
                          >
                            {apiDataResponseEle?.first_name}{" "}
                            {apiDataResponseEle?.middle_name}{" "}
                            {apiDataResponseEle?.last_name}
                          </Text>
                          <Text
                            className="font-normal sm:ml-[36px] md:ml-[47px] not-italic text-black_901 w-[5%] text-center"
                            as="h6"
                            variant="h6"
                          >
                            {getGender(apiDataResponseEle?.gender)}
                          </Text>
                          <Text
                            className="font-normal sm:ml-[37px] md:ml-[48px] not-italic text-black_901 w-[20%] text-center truncate px-[8px]"
                            as="h6"
                            variant="h6"
                          >
                            {apiDataResponseEle?.work_email}
                          </Text>
                          <Text
                            className="font-normal sm:ml-[44px] md:ml-[57px] not-italic text-black_901 w-[10%] text-center"
                            as="h6"
                            variant="h6"
                          >
                            {apiDataResponseEle?.phone_number}
                          </Text>
                          <Text
                            className="font-normal sm:ml-[35px] md:ml-[45px] not-italic text-black_901 w-[24%] text-center truncate px-[15px]"
                            as="h6"
                            variant="h6"
                          >
                            {apiDataResponseEle?.job_title}
                          </Text>
                        </Row>
                      </Column>
                      <Line className="bg-indigo_100 h-[1px] md:mt-[10px] sm:mt-[7px] w-[100%]" />
                    </React.Fragment>
                  );
                })}
              </List>
            ) : (
              <Text
                className="font-medium text-center lg:mt-[17px] xl:mt-[21px] 2xl:mt-[24px] 3xl:mt-[28px] text-black_900 w-[auto]"
                as="h2"
                variant="h2"
              >
                No data Found
              </Text>
            )}
            {employeeCount ? (
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center md:mt-[12px] mt-[24px] sm:mt-[9px] sm:px-[0] w-[100%]">
                <Text
                  className="font-normal sm:mb-[1px] md:mb-[2px] sm:mt-[3px] md:mt-[4px] mr-[10px] text-black_901 w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  Showing
                </Text>
                <SelectBox
                  className="font-normal ml-2 not-italic p-[9px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] w-[auto]"
                  onChange={(e) => {
                    setPage(1);
                    setrowsPerPage(e);
                  }}
                  placeholder={rowsPerPage}
                  value={rowsPerPage}
                  options={rowsPerPageOption}
                  maxMenuHeight="120px"
                  name="rowsPerPage"
                  isSearchable={false}
                  isMulti={false}
                ></SelectBox>
                <TableFooter
                  className="ml-2"
                  range={tableRange}
                  slice={slice}
                  setPage={setPage}
                  page={page}
                />
              </Row>
            ) : (
              ""
            )}
          </Column>
        </Column>
      </Column>

      <ToastContainer />
    </Base>
  );
};

export default EmployeeListPage;
