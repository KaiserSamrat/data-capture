import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { get } from "../../../helpers/api_helper";
import { getPartner } from "../../../store/Disburse/action";
import { getCategory } from "../../../store/Info/actions";
import SearchInput from "../../Atoms/SearchInput";
import CardComponent from "../../Layout/CardComponent";
import CustomTable from "../../Layout/CustomTable";
import InnerLayer from "../../Layout/InnerLayer";
import NoTableData from "../../Layout/NoTableData";
const tableHead = [
  "No.",
  "Partner",
  "Owner",
  "Partner Code",
  "Point",
  "Status",
  "Action",
];
const tableHead2 = [
  "No.",
  "Partner",
  "Owner",
  "Partner Code",
  "Point",
  "Status",
];
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

const Partner = ({ history }) => {
  let dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [value, setValue] = useState("");
  const { authtoken, partnerList, partnerListLoading, role } = useSelector(
    (state) => ({
      partnerList: state.DisburseReducer.partnerList,
      partnerListLoading: state.DisburseReducer.partnerListLoading,
      authtoken: state.Login.token,
      role: state.Login.userrole,
    })
  );
  //   let totalPageNumber = Math.ceil(categoryData?.length / pageRange)
  console.log("partnerList", partnerList);
  useEffect(() => {
    dispatch(getCategory(authtoken, currentPage, pageRange));
  }, [currentPage, pageRange]);
  useEffect(() => {
    dispatch(getPartner(authtoken, value, currentPage, pageRange));
  }, [currentPage, pageRange, value]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value !== "") {
        console.log("value", value);
        dispatch(getPartner(authtoken, value, currentPage, pageRange));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  const handleExcel = async () => {
    setLoadingExcel(true);
    let partnerData = [];

    let totalPage = Math.ceil(partnerList?.data?.page / 3);
    console.log("fff", totalPage);
    for (let i = 0; i < totalPage; i++) {
      console.log("hello");

      await get(`/partner`, {
        headers: { Authorization: `Bearer ${authtoken}` },
      })
        .then((response) => {
          console.log("response", response);

          response?.partner.forEach((partner, index) => {
            let data = {};
            data.PartnerName = partner?.outletName;
            data.ownerName = partner?.ownerName;
            data.ownerCode = partner?.partnerCode;
            data.point = partner?.point;

            partnerData.push(data);
          });
        })
        .catch((error) => {
          console.log("kkkk");
          // setResults((prev) => [...prev]);
        });
    }

    downloadxls(partnerData);
  };

  const downloadxls = (data) => {
    console.log(XLSX.version);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "Partner List.xlsx");
    setLoadingExcel(false);
  };
  const handlePageRange = (e) => {
    setPageRange(e.target.value);
  };

  console.log("partnerList", partnerList);
  return (
    <React.Fragment>
      <InnerLayer
        title="Partner List"
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"Partner"}
        subTitle={"Partner List"}
        onAddHandler={() => history.push("/partner/add-partner")}
        buttonText="Create New"
        isButton={role === "SUPERADMIN" ? true : false}
      >
        <Row>
          <CardComponent className="user_table_card">
            {/* <TableHeader
              handleSearchFilter={() => {}}
              handleSelectFilter={(e) => {
                setPageRange(e.target.value);
              }}
              data={[10, 20, 50, 100]}
              handleSelectFilter2={() => {}}
              data2={[]}
              selectValue={pageRange}
              title="Partner List"
              headerSearchOption="yes"
            /> */}
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
                      placeholder="Search Partner"
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

            {/* table */}
            <Row>
              <CustomTable
                paginationClass="paginationContainer text-right"
                data={partnerList?.data?.partner}
                pageNo={partnerList?.data?.page}
                tableHead={role === "SUPERADMIN" ? tableHead : tableHead2}
                setCurrentPage={setCurrentPage}
                isPagination
              >
                {partnerListLoading ? (
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
                ) : partnerList?.data?.partner.length > 0 ? (
                  partnerList?.data?.partner?.map((data, idx) => (
                    <tr>
                      <th scope="row" style={{ paddingLeft: "25px" }}>
                        {idx + 1}
                      </th>

                      <td>{data?.outletName}</td>
                      <td>{data?.ownerName}</td>
                      <td>{data?.partnerCode}</td>
                      <td>{data?.point}</td>

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
                                  `/partner/update-partner/${data?._id}`
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

Partner.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Partner);
