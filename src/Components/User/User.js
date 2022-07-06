import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { get } from "../../helpers/api_helper";
import { getUsers } from "../../store/User/actions";
import SearchInput from "../Atoms/SearchInput";
import CardComponent from "../Layout/CardComponent";
import CustomTable from "../Layout/CustomTable";
import InnerLayer from "../Layout/InnerLayer";
import NoTableData from "../Layout/NoTableData";
const tableHead = [
  "No.",
  "Employee ID",
  "Name",

  "Phone",
  "Role",
  "Hub Name",
  "Status",
  "Action",
];
const tableHead2 = [
  "No.",
  "Employee ID",
  "Name",

  "Phone",
  "Role",
  "Hub Name",
  "Status",
];
const HUbType = [
  {
    name: "Super Admin",
    _id: 2,
    value: "SUPERADMIN",
  },
  {
    name: "Central warehouse",
    _id: 1,
    value: "CENTRALWAREHOUSE",
  },
  {
    name: "Distribution Hub",
    _id: 2,
    value: "HUB",
  },
  {
    name: "BP",
    _id: 2,
    value: "USER",
  },
  {
    name: "Mock Admin",
    _id: 2,
    value: "ADMIN",
  },
  {
    name: "MAPLD",
    _id: 2,
    value: "VIEWADMIN",
  },
];

const HUbType1 = [
  {
    name: "Distribution Hub",
    _id: 2,
    value: "HUB",
  },
  {
    name: "BP",
    _id: 2,
    value: "USER",
  },
];
const HUbType2 = [

  {
    name: "Central warehouse",
    _id: 1,
    value: "CENTRALWAREHOUSE",
  },
  {
    name: "Distribution Hub",
    _id: 2,
    value: "HUB",
  },
  {
    name: "BP",
    _id: 2,
    value: "USER",
  },
  {
    name: "Mock Admin",
    _id: 2,
    value: "ADMIN",
  },
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

const User = ({ history }) => {
  const [userList, setUser] = useState("Central Warehouse");
  var useremployee = "";

  let dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [value, setValue] = useState("");
  const [loadingExcel, setLoadingExcel] = useState(false);
  const { users, loading, authtoken, areaData, role, getUserLoading } =
    useSelector((state) => ({
      users: state.UserReducer.users,

      getUserLoading: state.UserReducer.getUserLoading,
      areaData: state.GeoReducer.areaData,
      authtoken: state.Login.token,
      role: state.Login.userrole,
    }));
  const [roleList, setRole] = useState(role);
  let totalPageNumber = Math.ceil(users?.users?.length / pageRange);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value !== "") {
        console.log("value", value);
        dispatch(getUsers(authtoken, roleList, value, currentPage, pageRange));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);
  useEffect(() => {
    dispatch(getUsers(authtoken, roleList, value, currentPage, pageRange));
  }, [currentPage, pageRange, roleList, value]);

  const handleRole = (value) => {
    console.log("value", value);
    console.log("roleList", roleList);

    if (value) {
      setRole(value.value);
    } else {
      setRole(role);
    }
  };
  const handleRange = (e) => {
    setPageRange(e.target.value);
  };

  const handleExcel = async () => {
    setLoadingExcel(true);
    let userData = [];

    for (let i = 0; i < users?.pagenumber; i++) {
      console.log("hello");

      await get(
        `/users/get-users?currentpage=${i + 1}&useremployee=${
          value || ""
        }&role=${roleList || ""}&pageRange=${pageRange}`,
        { headers: { Authorization: `Bearer ${authtoken}` } }
      )
        .then((response) => {
          console.log("response", response);

          response?.users.forEach((user, index) => {
            let data = {};
            data.UserName = user?.name;
            data.EmployeeID = user?.employeeId;
            data.phoneNumber = user?.phoneNumber;
            data.hubName = user?.warehouse?.name;
            if (user?.role === "CENTRALWAREHOUSE") {
              data.role = "Central WareHouse";
            } else if (user?.role === "HUB") {
              data.role = "Distribution Hub";
            } else {
              data.role = user?.role;
            }
            userData.push(data);
          });
        })
        .catch((error) => {
          console.log("kkkk");
          // setResults((prev) => [...prev]);
        });
    }

    downloadxls(userData);
  };

  const downloadxls = (data) => {
    console.log(XLSX.version);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "User List.xlsx");
    setLoadingExcel(false);
  };

  return (
    <React.Fragment>
      <InnerLayer
        title="User List"
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"User"}
        subTitle={"user List"}
        onAddHandler={() => history.push("/user/add-user")}
        buttonText="Create New"
        isButton={role === "SUPERADMIN" ? true : false}
      >
        <Row>
          <CardComponent className="user_table_card">
            <Row className="mb-2 table-header-padding">
              <div className="d-flex justify-content-end">
                <Col
                  className="me-2 responsive-margin custom-bottom-margin"
                  md={2}
                >
                  <div className="search-box  d-flex justify-content-end justify-content-start">
                    <SearchInput
                      className="userSearchBar form-control search-width2"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search User ID"
                    />
                  </div>
                </Col>
                {role === "SUPERADMIN" || role === "VIEWADMIN" ? (
                  <Col
                    className="me-2 responsive-margin custom-bottom-margin"
                    md={2}
                  >
                    <Select
                      name="Warehouse"
                      className="mb-2"
                      classNamePrefix="select2-selection"
                      placeholder="Select Role"
                      cacheOptions
                      getOptionLabel={(e) => e.name}
                      getOptionValue={(e) => e.value}
                      isClearable
                      options={HUbType}
                      onChange={handleRole}
                    />
                  </Col>
                ) : role === "CENTRALWAREHOUSE" ? (
                  <Col
                    className="me-2 responsive-margin custom-bottom-margin"
                    md={2}
                  >
                    <Select
                      name="Warehouse"
                      className="mb-2"
                      classNamePrefix="select2-selection"
                      placeholder="Select Role"
                      cacheOptions
                      getOptionLabel={(e) => e.name}
                      getOptionValue={(e) => e.value}
                      isClearable
                      options={HUbType1}
                      onChange={handleRole}
                    />
                  </Col>
                ) : role === "ADMIN" ?
                
                <Col
                className="me-2 responsive-margin custom-bottom-margin"
                md={2}
              >
                <Select
                  name="Warehouse"
                  className="mb-2"
                  classNamePrefix="select2-selection"
                  placeholder="Select Role"
                  cacheOptions
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.value}
                  isClearable
                  options={HUbType2}
                  onChange={handleRole}
                />
              </Col>
                : (
                  <span></span>
                )}

                <Col
                  className="me-2 responsive-margin custom-bottom-margin"
                  md={2}
                >
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
                data={users?.users}
                pageNo={users?.pagenumber}
                tableHead={role === "SUPERADMIN" ? tableHead : tableHead2}
                setCurrentPage={setCurrentPage}
                isPagination
              >
                {getUserLoading ? (
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
                ) : users?.users?.length > 0 ? (
                  users?.users?.map((data, idx) => (
                    <tr>
                      <th scope="row" style={{ paddingLeft: "25px" }}>
                        {idx + 1}
                      </th>
                      <td>{data?.employeeId}</td>
                      <td>{data?.name}</td>

                      <td>{data?.phoneNumber}</td>
                      {data?.role === "CENTRALWAREHOUSE" ? (
                        <td>Central WareHouse</td>
                      ) : data?.role === "HUB" ? (
                        <td>Distribution Hub</td>
                      ) : data?.role === "USER" ? (
                        <td>BP</td>
                      ) : data?.role === "ADMIN" ? (
                        <td> Admin</td>
                      ) : data?.role === "VIEWADMIN" ? (
                        <td>MAPLD</td>
                      ) : (
                        <td>Super Admin</td>
                      )}

                      <td>{data?.warehouse?.name}</td>
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
                              onClick={() => {
                                history.push(`/user/edit-user/${data?._id}`);
                              }}
                              className="btn btn-outline-danger btn-sm"
                              style={{ borderRadius: "10px" }}
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
          <div className="text-center">
            <button
              className="btn btn-info m-auto w-25 fw-bold excel_button"
              disabled={loadingExcel}
              onClick={handleExcel}
            >
              {loadingExcel ? "Downloading..." : "Download Excel"}
            </button>
          </div>
        </Row>
      </InnerLayer>
    </React.Fragment>
  );
};

User.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(User);
