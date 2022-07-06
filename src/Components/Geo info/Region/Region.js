import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Badge, Col, Input, Row } from "reactstrap";
import { getRegion } from "../../../store/GEO/actions";
import SearchInput from "../../Atoms/SearchInput";
import CardComponent from "../../Layout/CardComponent";
import CustomTable from "../../Layout/CustomTable";
import InnerLayer from "../../Layout/InnerLayer";
import NoTableData from "../../Layout/NoTableData";

const tableHead = ["No.", "Region", "Status", "Action"];
const tableHead2 = ["No.", "Region", "Status"];
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

const Region = ({ history }) => {
  let dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [value, setValue] = useState("");
  const { regionData, loading, authtoken, role, regionLoading } = useSelector(
    (state) => ({
      regionData: state.GeoReducer.regionData,
      regionLoading: state.GeoReducer.regionLoading,
      authtoken: state.Login.token,
      role: state.Login.userrole,
    })
  );
  console.log("regionData", regionData);
  let totalPageNumber = Math.ceil(regionData?.length / pageRange);
  console.log("totalPageNumber", totalPageNumber);
  useEffect(() => {
    dispatch(getRegion(authtoken, currentPage, pageRange, value));
  }, [currentPage, pageRange, value]);
  const handlePageRange = (e) => {
    setPageRange(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value !== "") {
        console.log("value", value);
        dispatch(getRegion(authtoken, currentPage, pageRange, value));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);
  return (
    <React.Fragment>
      <InnerLayer
        title="Region "
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"Geo Information"}
        subTitle={"Region List"}
        onAddHandler={() => history.push("/region/add-region")}
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
                      placeholder="Search Region"
                    />
                  </div>
                </Col>
                <Col className="" md={2}>
                  <Input type="select" onChange={handlePageRange}>
                    {/* <option defaultValue>Select...</option> */}
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Input>
                </Col>
              </div>
            </Row>

            <Row>
              <CustomTable
                paginationClass="paginationContainer text-right"
                data={regionData?.region}
                pageNo={totalPageNumber}
                tableHead={role === "SUPERADMIN" ? tableHead : tableHead2}
                setCurrentPage={setCurrentPage}
                isPagination
              >
                {regionLoading ? (
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
                ) : regionData?.region?.length > 0 ? (
                  regionData?.region?.map((data, idx) => (
                    <tr>
                      <th scope="row" style={{ paddingLeft: "25px" }}>
                        {idx + 1}
                      </th>

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
                                  `/region/update-region/${data?._id}`
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

              {/* )} */}
            </Row>
          </CardComponent>
        </Row>
      </InnerLayer>
    </React.Fragment>
  );
};

Region.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Region);
