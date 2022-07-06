import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Col,
  Form,
  Row,
  Modal,
  ModalBody,
  Table,
  Spinner,
  Label,
} from "reactstrap";

import { addProduct, getSingleProduct } from "../../store/Product/actions";

import CustomInput from "../Common/CustomInput";
import AddCardComponent from "../Layout/AddCardComponent";
import InnerLayer from "../Layout/InnerLayer";
import { addProductSchema } from "../Schemas/AddProduct.schema";
import AddFileUpload from "../Common/AddFileUpload";
import { post } from "../../helpers/api_helper";
import useExcelReader from "../../Hooks/useExcelReader";
import { toaster } from "../../helpers/custom/toaster";
import { useParams } from "react-router-dom";
import Select from "react-select";
const breadcrumbItems = [
  {
    title: "Product",
    link: "#",
  },
  {
    title: "Product List",
    link: "Product",
  },
  {
    title: "Create Product",
    link: "#",
  },
];
const breadcrumbItems2 = [
  {
    title: "Product",
    link: "#",
  },
  {
    title: "Product List",
    link: "Product",
  },
  {
    title: "Update Product",
    link: "#",
  },
];
const initialValues = {
  name: "",
  brand: "",
  category: "",
  specification: "",
  unitPrice: "",
  productId: "",
};

const AddProduct = ({ edit }) => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState({});
  const { items, readExcel } = useExcelReader();
  console.log(`🦄 ~ file: Dashboard.js ~ line 21 ~ Dashboard ~ items`, items);
  const [results, setResults] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [singleProductData, setSingleProductData] = useState(null);
  const toggle = () => setOpen(!open);
  const {
    brandData,
    categoryData,
    authtoken,
    singleProduct,
    singleProductLoading,
    addProductLoading,
  } = useSelector((state) => ({
    brandData: state.InfoReducer.brandData,
    categoryData: state.InfoReducer.categoryData,
    singleProduct: state.ProductReducer.singleProduct,
    singleProductLoading: state.ProductReducer.singleProductLoading,
    addProductLoading: state.ProductReducer.addProductLoading,
    authtoken: state.Login.token,
  }));
  console.log("addProductLoading", addProductLoading);
  useEffect(() => {
    if (edit) {
      dispatch(getSingleProduct(authtoken, id));
    }
  }, []);

  useEffect(() => {
    if (edit && singleProductLoading === false) {
      const data = { ...singleProductData };
      data.name = singleProduct?.data?.product?.name;
      data.brand = singleProduct?.data?.product?.brand;
      data.category = singleProduct?.data?.product?.category;
      data.unitPrice = singleProduct?.data?.product?.unitPrice;
      data.specification = singleProduct?.data?.product?.specification;
      data.productId = singleProduct?.data?.product?.productId;

      console.log(data);
      setSingleProductData(data);
    }
  }, [singleProduct]);
  const onSubmit = (values) => {
    let obj = {};
    obj.name = values.name;
    obj.category = values.category;
    obj.brand = values.brand;
    obj.specification = values.specification;
    obj.unitPrice = values.unitPrice;
    obj.productId = values.productId;
    console.log("line 53", obj);
    if (edit) {
      dispatch(addProduct(obj, history, authtoken, id));
    } else {
      dispatch(addProduct(obj, history, authtoken));
    }
  };
  const handleSubmit = async () => {
    setAdding(true);
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const data = {
        name: element?.Name,
        category: element.category,
        brand: element.Brand,
        specification: element.specification,
        unitPrice: element.unitPrice,
        productId: element.productId,
      };

      post("/product/product-excel", data)
        .then((response) => {
          console.log("ddddd");
          setResults((prev) => [...prev, response]);
        })
        .catch((error) => {
          console.log("error", error);
          setResults((prev) => [...prev, { status: "failed" }]);
        });

      console.log("hello");
      if (i === items.length - 1) {
        setIsDone(true);
        setAdding(false);
        toaster("success", "All data upload successful");
      }
    }
  };

  const tableHead = items?.[0] || {};
  const AddProduct = useFormik({
    enableReinitialize: true,
    initialValues: singleProductData || initialValues,
    validationSchema: addProductSchema,
    onSubmit,
  });
  return (
    <React.Fragment>
      <InnerLayer
        isMultiple
        title={edit ? "Update Product" : "Create Product"}
        breadcrumbItems={edit ? breadcrumbItems2 : breadcrumbItems}
      >
        <div style={{ minHeight: "100vh" }} className="position-relative">
          <Row className="mt-4">
            <Col md="9" className="mx-auto">
              {/* add User */}
              <AddCardComponent className="">
                <Form
                  className="needs-validation col-md-12"
                  onSubmit={AddProduct.handleSubmit}
                >
                  <Row>
                    <Col md="6 mb-2">
                      <CustomInput
                        name={"name"}
                        type={"text"}
                        label={"Product Name"}
                        placeholder={"Type product name"}
                        validationType={AddProduct}
                      />
                    </Col>

                    <Col md="6 mb-2">
                      {/* <CustomInput
                        name={"category"}
                        type={"select"}
                        label={"Select Category"}
                        validationType={AddProduct}
                      >
                        <option defaultValue>Select Category...</option>
                        {categoryData?.length > 0 ? (
                          categoryData?.category?.map((data, idx) => (
                            <option value={data._id} key={idx}>
                              {data.name}
                            </option>
                          ))
                        ) : (
                          <span></span>
                        )}
                      </CustomInput> */}
                      <Label htmlFor="formrow-firstname-Input">
                        Select Category
                      </Label>
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
                        value = {categoryData?.category?.find(data=> data?._id == AddProduct.values.category)}
                        onChange={(e) => {
                          console.log("e", e);
                          AddProduct.setFieldValue("category", e?._id || "");
                        }}
                      />
                      {AddProduct.errors.category ? (
                        <p className="text-danger">
                          {AddProduct.errors.category}
                        </p>
                      ) : null}
                    </Col>
                    <Col md="6 mb-2">
                      {/* <CustomInput
                        name={"brand"}
                        type={"select"}
                        label={"Select brand"}
                        validationType={AddProduct}
                      >
                        <option defaultValue>Select Brand...</option>
                        {brandData?.data?.length > 0 ? (
                          brandData?.data?.brand?.map((data, idx) => (
                            <option value={data._id} key={idx}>
                              {data.name}
                            </option>
                          ))
                        ) : (
                          <span></span>
                        )}
                      </CustomInput> */}
                      <Label htmlFor="formrow-firstname-Input">
                        Select Brand
                      </Label>
                      <Select
                        name="brand"
                        className="mb-2"
                        classNamePrefix="select2-selection"
                        placeholder="Select brand"
                        cacheOptions
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.value}
                        isClearable
                        options={brandData?.data?.brand}
                        value = {brandData?.data?.brand?.find(data=> data?._id == AddProduct.values.brand)}
                        onChange={(e) => {
                          console.log("e", e);
                          AddProduct.setFieldValue("brand", e?._id || "");
                        }}
                      />
                      {AddProduct.errors.brand ? (
                        <p className="text-danger">
                          {AddProduct.errors.brand}
                        </p>
                      ) : null}
                    </Col>

                    <Col md="6 mb-2">
                      <CustomInput
                        name={"unitPrice"}
                        type={"number"}
                        label={"Unit Price"}
                        placeholder={"Type..."}
                        validationType={AddProduct}
                      />
                    </Col>
                    <Col md="6 mb-2">
                      <CustomInput
                        name={"productId"}
                        type={"text"}
                        label={"Product ID"}
                        placeholder={"Type..."}
                        validationType={AddProduct}
                      />
                    </Col>
                    <Col md="6 mb-2">
                      <CustomInput
                        name={"specification"}
                        type={"textarea"}
                        label={"Specification"}
                        placeholder={"Type..."}
                        validationType={AddProduct}
                        style={{ height: "80px" }}
                      />
                    </Col>
                  </Row>
                  {addProductLoading ? (
                    <div className="d-flex justify-content-end mt-3">
                      <Spinner className="ms-2" color="primary" />
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end mt-3">
                      <input
                        type="submit"
                        value={edit ? "Update Product" : "Add Product"}
                        className="btn button "
                      />
                    </div>
                  )}
                </Form>
              </AddCardComponent>
              {/* file Upload */}
              <AddFileUpload
                setSelectedFiles={setSelectedFiles}
                acceptFile={
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
                handleFile={(file) => {
                  readExcel(file);
                }}
              />
              <Modal isOpen={open} toggle={toggle} size="lg">
                <ModalBody>
                  <Table className="table table-responsive">
                    <thead>
                      <tr>
                        {/* <th>No.</th> */}
                        {Object.keys(tableHead)?.map((item, idx) => (
                          <th key={idx}>{item}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items?.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item?.productId}</td>
                          <td>{item?.Name}</td>
                          <td>{item?.category}</td>
                          <td>{item?.Brand}</td>
                          <td>{item?.specification}</td>
                          <td>{item?.unitPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ModalBody>
              </Modal>
              {items?.length > 0 ? (
                <div>
                  <button className="btn btn-primary me-2" onClick={toggle}>
                    Preview
                  </button>
                  <button
                    disabled={adding}
                    className="btn btn-primary "
                    onClick={handleSubmit}
                  >
                    {adding ? "Submitting..." : "Submit"}
                  </button>
                </div>
              ) : null}
            </Col>
          </Row>
        </div>
      </InnerLayer>
    </React.Fragment>
  );
};

export default AddProduct;
