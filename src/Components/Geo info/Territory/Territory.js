import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { get } from "../../../helpers/api_helper";
import { getArea, getRegion, getTerritory } from "../../../store/GEO/actions";
import SearchInput from "../../Atoms/SearchInput";
import CardComponent from "../../Layout/CardComponent";
import CustomTable from "../../Layout/CustomTable";
import InnerLayer from "../../Layout/InnerLayer";
import NoTableData from "../../Layout/NoTableData";
const tableHead = ["No.", "Area", "Territories", "Status", "Action"];
const tableHead2 = ["No.", "Area", "Territories", "Status"];

const renderTooltipEdit = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Edit
  </Tooltip>
);
const renderTooltipView = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    View
  </Tooltip>
);

const Territory = ({ history }) => {
  let dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [area, setArea] = useState("All");
  const [region, setRegion] = useState("All");
  const [value, setValue] = useState("");
  const [loadingExcel, setLoadingExcel] = useState(false);
  const {
    territoryData,
    loading,
    authtoken,
    areaData,
    role,
    regionData,
    territoryLoading,
  } = useSelector((state) => ({
    regionData: state.GeoReducer.regionData,
    territoryData: state.GeoReducer.territoryData,
    areaData: state.GeoReducer.areaData,
    territoryLoading: state.GeoReducer.territoryLoading,
    authtoken: state.Login.token,
    role: state.Login.userrole,
  }));
  console.log("territoryData", territoryData);
  useEffect(() => {
    dispatch(getArea(authtoken, currentPage, pageRange, "All"));
  }, [currentPage, pageRange]);
  useEffect(() => {
    dispatch(getTerritory(authtoken, currentPage, pageRange, area, value));
  }, [currentPage, pageRange, area, value]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value !== "") {
        console.log("value", value);
        dispatch(getTerritory(authtoken, currentPage, pageRange, area, value));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  useEffect(() => {
    dispatch(getRegion(authtoken, 0, 0));
  }, []);
  let totalPageNumber = Math.ceil(territoryData?.length / pageRange);
  console.log("territoryData", territoryData);
  const handleRange = (e) => {
    setPageRange(e.target.value);
  };
  const handleArea = (value) => {
    if (value) {
      setArea(value?._id);
    } else {
      setArea("All");
    }
  };

  const handleRegion = (value) => {
    if (value) {
      setRegion(value?._id);
    } else {
      setRegion("All");
    }
  };

  const handleExcel = async () => {
    setLoadingExcel(true);
    let territoryList = [];
    let totalPage = territoryData.length / pageRange;
    for (let i = 0; i < totalPage; i++) {
      console.log("hello");

      await get(
        `/territory/${area}/${pageRange}/${i + 1}?name=${value || ""}`,
        {
          headers: { Authorization: `Bearer ${authtoken}` },
        }
      )
        .then((response) => {
          console.log("response", response);

          response?.territory.forEach((territory, index) => {
            let data = {};
            data.Territory = territory?.name;
            data.Area = territory?.area?.name;

            territoryList.push(data);
          });
        })
        .catch((error) => {
          console.log("kkkk");
          // setResults((prev) => [...prev]);
        });
    }

    downloadxls(territoryList);
  };

  const downloadxls = (data) => {
    console.log(XLSX.version);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "Territory List.xlsx");
    setLoadingExcel(false);
  };

  return (
    <React.Fragment>
      <InnerLayer
        title="Territory List"
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"Geo Information"}
        subTitle={"Territory List"}
        onAddHandler={() => history.push("/territory/add-territory")}
        buttonText="Create New"
        isButton={role === "SUPERADMIN" ? true : false}
      >
        <Row>
          <CardComponent className="user_table_card">
            <Row className="mb-3 table-header-padding">
              <div className="d-flex d-flex-blockCustom justify-content-end">
                <Col
                  className="me-2 responsive-margin custom-bottom-margin"
                  md={2}
                >
                  <div className="search-box d-flex justify-content-end justify-content-start">
                    <SearchInput
                      className="userSearchBar form-control search-width2"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search Territory"
                    />
                  </div>
                </Col>
                {/* <Col className="me-2" md={3}>
                  <Select
                    name="region"
                    className="mb-2"
                    classNamePrefix="select2-selection"
                    placeholder="Select Area"
                    cacheOptions
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.value}
                    isClearable
                    options={regionData?.region}
                    onChange ={handleRegion}
                  />
                </Col> */}
                <Col
                  className="me-2 responsive-margin custom-bottom-margin"
                  md={3}
                >
                  <Select
                    name="area"
                    className="mb-2"
                    classNamePrefix="select2-selection"
                    placeholder="Select Area"
                    cacheOptions
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.value}
                    isClearable
                    options={areaData?.data?.area}
                    onChange={handleArea}
                  />
                </Col>
                <Col
                  className="me-2  responsive-margin custom-bottom-margin"
                  md={2}
                >
                  <Input type="select" onChange={handleRange}>
                    {/* <option defaultValue>Select...</option> */}
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Input>
                </Col>
              </div>
            </Row>

            {/* table */}
            <Row>
              <CustomTable
                paginationClass="paginationContainer text-right"
                data={territoryData?.area}
                pageNo={totalPageNumber}
                tableHead={role === "SUPERADMIN" ? tableHead : tableHead2}
                setCurrentPage={setCurrentPage}
                isPagination
              >
                {territoryLoading ? (
                  <tr style={{ width: "100%" }}>
                    <div
                      className="text-center my-5 py-5 d-flex justify-content-center w-100 h-100"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <Spinner animation="border" variant="primary" />
                      </div>
                    </div>
                  </tr>
                ) : territoryData?.length > 0 ? (
                  territoryData?.territory?.map((data, idx) => (
                    <tr>
                      <th scope="row" style={{ paddingLeft: "25px" }}>
                        {idx + 1}
                      </th>

                      <td>{data?.area?.name}</td>
                      <td>{data?.name}</td>

                      <td>
                        <Badge
                          color="warning"
                          style={{ padding: "10px !important" }}
                        >
                          Active
                        </Badge>
                      </td>
                      {role === "SUPERADMIN" ? (
                        <td>
                          {/* <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltipView}
                        >
                          <button
                            className="btn btn-secondary btn-sm me-2"
                            style={{ borderRadius: "10px" }}
                          >
                            <i className="bx bx-show mt-1"></i>
                          </button>
                        </OverlayTrigger> */}
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipEdit}
                          >
                            <button
                              className="btn btn-outline-danger btn-sm"
                              style={{ borderRadius: "10px" }}
                              onClick={() =>
                                history.push(
                                  `/territory/update-territory/${data?._id}`
                                )
                              }
                            >
                              <i className="bx bx-edit mt-1"></i>
                            </button>
                          </OverlayTrigger>
                        </td>
                      ) : (
                        <></>
                      )}
                    </tr>
                  ))
                ) : (
                  <NoTableData
                    colSpan=""
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "300px", width: `100%` }}
                  >
                    <span>No data Available</span>
                  </NoTableData>
                )}
              </CustomTable>
              {/* table end */}
            </Row>
          </CardComponent>
          <button
            className="btn btn-info w-25 m-auto fw-bold excel_button"
            disabled={loadingExcel}
            onClick={handleExcel}
          >
            {loadingExcel ? "Downloading..." : "Download Excel"}
          </button>
        </Row>
      </InnerLayer>
    </React.Fragment>
  );
};

Territory.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Territory);
