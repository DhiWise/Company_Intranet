import React from "react";
import { useNavigate } from "react-router-dom";
import { postCountapplicantstechnologywise } from "service/api";
import { Column, Grid, List, Row, Text } from "../../../components";
import Base from "../../../components/Base";

const ATSPage = () => {
  const [apiData1, setapiData1] = React.useState();
  const navigate = useNavigate();
  React.useEffect(() => {
    callApi1();
  }, []);

  function handleNavigate1(jobTitle) {
    navigate("/admin/atsflutter", { state: { job: jobTitle } });
  }

  function callApi1() {
    const req = {};

    postCountapplicantstechnologywise(req)
      .then((res) => {
        setapiData1(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  return (
    <Base title="ATS">
      <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] rounded-radius8 sm:w-[100%] w-[97%]">

        <Column className="bg-white_A700  flex flex-col mt-[32px] items-center justify-center sm:px-[20px] md:px-[40px] rounded-radius8 md:w-[100%] sm:w-[100%] w-[97%]">
          <Text
            className="text-black_900 text-center w-[auto] font-medium"
            as="h2"
            variant="h2"
          >
            Welcome to ATS
          </Text>
          <Column className="flex flex-col w-[70%] justify-center items-center mt-[32px]">
            <Row className="flex flex-row w-[100%] justify-start items-center">
              <Text
                className="font-medium text-black_900 text-center"
                as="h4"
                variant="h4"
              >
                Technologies
              </Text>
            </Row>
            <Row className="flex flex-row w-[100%] justify-center items-center mt-[24px]">
              <List
                className="flex-col gap-[24px] grid md:grid-cols-1 sm:grid-cols-1 items-center mb-[25px] w-[100%]"
                orientation="vertical"
              >
                <div className="flex flex-col items-center justify-start w-[100%]">
                  <Grid className="gap-[30px] grid md:grid-cols-1 sm:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-[100%]">
                    {apiData1?.map((apiData1ResponseEle, index) => {
                      return (
                        <React.Fragment key={`apiData1ResponseEle${index}`}>
                          <div
                            onClick={() =>
                              handleNavigate1(apiData1ResponseEle?.job_title)
                            }
                            className="common-pointer bg-white_A700 border border-bluegray_102 border-solid flex flex-col items-center justify-center p-[24px] sm:px-[20px] rounded-radius12 w-[100%]"
                          >
                            <Text
                              className="text-gray_700 text-center w-[100%] text-ellipsis"
                              as="h5"
                              variant="h5"
                            >
                              {apiData1ResponseEle?.["job_title"]}
                            </Text>
                            <Column className="bg-indigo_50 border border-indigo_600 border-solid h-[100px] justify-center sm:px-[20px] rounded-radius50 text-center text-gray_900 w-[100px] mt-[32px] content-center">
                              <Text
                                className=" text-gray_900 py-[34px]"
                                as="h2"
                                variant="h2"
                              >
                                {apiData1ResponseEle?.total}
                              </Text>
                            </Column>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </Grid>
                </div>
              </List>
            </Row>
          </Column>
        </Column>
      </Column>
    </Base>
  );
};

export default ATSPage;
