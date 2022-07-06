import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import { getArea, getRegion } from "../../../store/GEO/actions";
import SearchInput from "../../Atoms/SearchInput";
import CardComponent from "../../Layout/CardComponent";
import CustomTable from "../../Layout/CustomTable";
import InnerLayer from "../../Layout/InnerLayer";
import NoTableData from "../../Layout/NoTableData";
const tableHead = ["No.", "Region", "Area", "Status", "Action"];
const tableHead2 = ["No.", "Region", "Area", "Status"];

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

const Area = ({ history }) => {
  let dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [region, setRegion] = useState("All");
  const [value, setValue] = useState("");
  const { regionData, loading, authtoken, areaData, role, areaLoading } =
    useSelector((state) => ({
      regionData: state.GeoReducer.regionData,
      areaData: state.GeoReducer.areaData,
      areaLoading: state.GeoReducer.areaLoading,
      authtoken: state.Login.token,
      role: state.Login.userrole,
    }));
  let totalPageNumber = Math.ceil(areaData?.data?.length / pageRange);
  useEffect(() => {
    dispatch(getArea(authtoken, currentPage, pageRange, region, value));
  }, [currentPage, pageRange, region, value]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value !== "") {
        console.log("value", value);
        dispatch(getArea(authtoken, currentPage, pageRange, region, value));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    dispatch(getRegion(authtoken, 0, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegion = (value) => {
    if (value) {
      setRegion(value?._id);
    } else {
      setRegion("All");
    }
  };
  const handleRange = (e) => {
    setPageRange(e.target.value);
  };

  return (
    <React.Fragment>
      <InnerLayer
        title="Area List"
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"Geo Information"}
        subTitle={"Area List"}
        onAddHandler={() => history.push("/area/add-area")}
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
                      placeholder="Search Area"
                    />
                  </div>
                </Col>
                <Col
                  className="me-2 custom-bottom-margin responsive-margin"
                  md={3}
                >
                  <Select
                    name="region"
                    className="mb-2"
                    classNamePrefix="select2-selection"
                    placeholder="Select Region"
                    cacheOptions
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.value}
                    isClearable
                    options={regionData?.region}
                    onChange={handleRegion}
                  />
                </Col>

                <Col className="me-2 responsive-margin" md={2}>
                  <Input type="select" onChange={(e) => handleRange(e)}>
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
                data={areaData?.area}
                pageNo={totalPageNumber}
                tableHead={role === "SUPERADMIN" ? tableHead : tableHead2}
                setCurrentPage={setCurrentPage}
                isPagination
              >
                {areaLoading ? (
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
                ) : areaData?.data?.area?.length > 0 ? (
                  areaData?.data?.area.map((data, idx) => (
                    <tr>
                      <th scope="row" style={{ paddingLeft: "25px" }}>
                        {idx + 1}
                      </th>
                      <td>{data?.region?.name}</td>
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
                                history.push(`/area/update-area/${data?._id}`)
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
        </Row>
      </InnerLayer>
    </React.Fragment>
  );
};

Area.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Area);
