import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { useReactToPrint } from "react-to-print";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { get } from "../../helpers/api_helper";

import { getFilteringProduct } from "../../store/Product/actions";
import SearchInput from "../Atoms/SearchInput";
import CardComponent from "../Layout/CardComponent";
import CustomTable from "../Layout/CustomTable";
import InnerLayer from "../Layout/InnerLayer";
import NoTableData from "../Layout/NoTableData";
const tableHead = [
  "No.",
  "Product Name",
  "ID",
  "Category",
  "Brand",
  "Specification",
  "Status",
  "Action",
];

const tableHead2 = [
  "No.",
  "Product Name",
  "ID",
  "Category",
  "Brand",
  "Specification",
  "Status",
];
const data = [10, 50, 100, 200];
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

const Product = ({ history }) => {
  let dispatch = useDispatch();
  var componentRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [value, setValue] = useState("");
  const [loadingExcel, setLoadingExcel] = useState(false);
  const {
    distributionHubData,
    loading,
    authtoken,
    filteredProduct,
    productLoading,
    inventoryOperation,
    categoryData,
    brandData,
    role,
    products,
    filteredProductLoading,
  } = useSelector((state) => ({
    filteredProduct: state.ProductReducer.filteredProduct,
    productLoading: state.ProductReducer.productLoading,
    filteredProductLoading: state.ProductReducer.filteredProductLoading,
    categoryData: state.InfoReducer.categoryData,
    products: state.ProductReducer.products,
    brandData: state.InfoReducer.brandData,
    authtoken: state.Login.token,
    role: state.Login.userrole,
  }));
  console.log("filteredProduct", filteredProduct);
 
  let totalPageNo = filteredProduct?.data?.page;
  console.log("totalPageNo", totalPageNo);

  useEffect(() => {
    dispatch(
      getFilteringProduct(
        authtoken,
        pageRange,
        currentPage,
        brand,
        category,
        value
      )
    );
  }, [brand, category, pageRange, value, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value !== "") {
        console.log("value", value);
        dispatch(
          getFilteringProduct(
            authtoken,
            pageRange,
            currentPage,
            brand,
            category,
            value
          )
        );
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  const handleCategory = (value) => {
    if (value) {
      setCategory(value?._id);
    } else {
      setCategory("");
    }
  };
  const handleBrand = (value) => {
    if (value) {
      setBrand(value._id);
    } else {
      setBrand("");
    }
  };
  const handlePageRange = (e) => {
    setPageRange(e.target.value);
  };
  let totalPageNumber = Math.ceil(
    filteredProduct?.data?.totalProducts?.length / pageRange
  );

  const handleExcel = async () => {
    setLoadingExcel(true);
    let productData = [];
    let totalPage = Math.ceil(filteredProduct?.data?.totalProducts?.length / 5);
    for (let i = 0; i < totalPage; i++) {
      console.log("hello");

      await get(
        `product/get-all-product-paging?limit=${5}&pageNo=${i + 1}&brand=${
          brand || ""
        }&category=${category || ""}&productName=${""}`,
        { headers: { Authorization: `Bearer ${authtoken}` } }
      )
        .then((response) => {
          console.log("response", response);

          response?.totalProducts.forEach((product, index) => {
            let data = {};
            data.ProductName = product?.name;
            data.ProductId = product?.productId;
            data.Category = product?.category?.name;
            data.Brand = product?.brand?.name;
            data.UnitPrice = product?.unitPrice;
           

            productData.push(data);
          });
        })
        .catch((error) => {
          console.log("kkkk");
          // setResults((prev) => [...prev]);
        });
    }

    downloadxls(productData);
  };

  const downloadxls = (data) => {
    console.log(XLSX.version);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "Product List.xlsx");
    setLoadingExcel(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <React.Fragment>
      <InnerLayer
        title="Product List"
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"Product"}
        subTitle={"Product List"}
        onAddHandler={() => history.push("/product/add-product")}
        buttonText="Create New"
        isButton={role === "SUPERADMIN" ? true : false}
      >
        <Row>
          <CardComponent className="user_table_card" ref={componentRef}>
            {/* <TableHeader
              handleSearchFilter={() => {}}
              //   handleSelectFilter={e => {
              //     setDataRange(e.target.value)
              //   }}
              handleSelectFilter={(e) => {
                setPageRange(e.target.value);
              }}
              data={[20, 50, 100]}
              handleSelectFilter2={() => {}}
              data2={[]}
              data3={[]}
              //   selectValue={dataRange}
              title="User List"
              headerSearchOption="yes"
              isMultiple
              isMultiple3
              selectPlaceholderTitle="Select Category"
              selectPlaceholderTitle3="Select Brand"
            /> */}

            {/* table */}

            <Row className="mb-2 table-header-padding">
              <div className="d-flex d-flex-blockCustom justify-content-end">
                <Col className="responsive-margin" md={2} ms="1">
                  <div className="search-box me-2 d-flex justify-content-end justify-content-start">
                    <SearchInput
                      className="userSearchBar form-control search-width2"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search Product"
                    />
                  </div>
                </Col>
                <Col className="mb-3 me-2 responsive-margin" sm="12" md="2">
                  <Select
                    name="category"
                    className="mb-2"
                    classNamePrefix="select2-selection"
                    placeholder="Select Category"
                    cacheOptions
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.value}
                    isClearable
                    options={categoryData?.category}
                    onChange={handleCategory}
                  />
                </Col>
                <Col className="mb-3 me-2 responsive-margin" sm="12" md="2">
                  <Select
                    name="brand"
                    className="mb-2"
                    classNamePrefix="select2-selection"
                    placeholder="Select Brand"
                    cacheOptions
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.value}
                    isClearable
                    options={brandData?.data?.brand}
                    onChange={handleBrand}
                  />
                </Col>

                <Col
                  className="custom-bottom-margin me-2 responsive-margin"
                  md={2}
                >
                  <Input
                    type="select"
                    onChange={handlePageRange}
                    // value={selectValue}
                  >
                    {/* <option defaultValue>Select...</option> */}
                    {data.map((data, idx) => (
                      <option key={idx} value={data}>
                        {data}
                      </option>
                    ))}
                  </Input>
                </Col>
              </div>
            </Row>
            <Row>
              <CustomTable
                paginationClass="paginationContainer text-right"
                data={filteredProduct?.data?.totalProducts}
                pageNo={totalPageNo}
                tableHead={role === "SUPERADMIN" ? tableHead : tableHead2}
                setCurrentPage={setCurrentPage}
                isPagination
              >
                {filteredProductLoading ? (
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
                ) : filteredProduct?.data?.totalProducts?.length > 0 ? (
                  filteredProduct?.data?.totalProducts.map((data, idx) => (
                    <tr>
                      <th scope="row" style={{ paddingLeft: "25px" }}>
                        {idx + 1}
                      </th>
                      <td>{data?.name}</td>
                      <td>{data?.productId}</td>
                      <td>{data?.category?.name}</td>
                      <td>{data?.brand?.name}</td>
                      {data?.specification ? (
                        <td>{data?.specification?.slice(0, 50) + "..."}</td>
                      ) : (
                        <td></td>
                      )}

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
                                  `/product/update-product/${data?._id}`
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
          {/* <button onClick={handlePrint}>Print this out!</button> */}
        </Row>
      </InnerLayer>
    </React.Fragment>
  );
};

Product.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Product);
