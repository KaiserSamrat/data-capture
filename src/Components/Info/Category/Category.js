import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { get } from "../../../helpers/api_helper";
import { getCategory } from "../../../store/Info/actions";
import SearchInput from "../../Atoms/SearchInput";
import CardComponent from "../../Layout/CardComponent";
import CustomTable from "../../Layout/CustomTable";
import InnerLayer from "../../Layout/InnerLayer";
import NoTableData from "../../Layout/NoTableData";
const tableHead = ["No.", "Category", "Status", "Action"];
const tableHead2 = ["No.", "Category", "Status"];
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

const Category = ({ history }) => {
  let dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [value, setValue] = useState("");
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { categoryData, loading, authtoken, areaData, role, categoryLoading } =
    useSelector((state) => ({
      categoryData: state.InfoReducer.categoryData,
      categoryLoading: state.InfoReducer.categoryLoading,
      authtoken: state.Login.token,
      role: state.Login.userrole,
    }));
  let totalPageNumber = Math.ceil(categoryData?.length / pageRange);

  useEffect(() => {
    dispatch(getCategory(authtoken, currentPage, pageRange, value));
  }, [currentPage, pageRange, value]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value !== "") {
        dispatch(getCategory(authtoken, currentPage, pageRange, value));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);
  const handlePageRange = (e) => {
    setPageRange(e.target.value);
  };
  const handleExcel = async () => {
    setLoadingExcel(true);
    let categoryList = [];

    let totalPage = Math.ceil(categoryData?.length / 3);
    console.log("fff", totalPage);
    for (let i = 0; i < totalPage; i++) {
      console.log("hello");

      await get(`/category/${3}/${i + 1}?name=${value || ""}`, {
        headers: { Authorization: `Bearer ${authtoken}` },
      })
        .then((response) => {
          console.log("response", response);

          response?.category.forEach((category, index) => {
            let data = {};
            data.CategoryName = category?.name;

            categoryList.push(data);
          });
        })
        .catch((error) => {
          console.log("kkkk");
          // setResults((prev) => [...prev]);
        });
    }

    downloadxls(categoryList);
  };

  const downloadxls = (data) => {
    console.log(XLSX.version);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "Category List.xlsx");
    setLoadingExcel(false);
  };

  return (
    <React.Fragment>
      <InnerLayer
        title="Category List"
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"Geo Information"}
        subTitle={"Category List"}
        onAddHandler={() => history.push("/category/add-category")}
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
              title="Category List"
              headerSearchOption="yes"
            /> */}

            {/* table */}
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
                      placeholder="Search Category"
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
                data={categoryData?.category}
                pageNo={totalPageNumber}
                tableHead={role === "SUPERADMIN" ? tableHead : tableHead2}
                setCurrentPage={setCurrentPage}
                isPagination
              >
                {categoryLoading ? (
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
                ) : categoryData?.category?.length > 0 ? (
                  categoryData?.category?.map((data, idx) => (
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
                                  `/category/update-category/${data?._id}`
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

Category.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Category);
