import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Col, Form, Modal, ModalBody, Row, Table, Spinner } from "reactstrap";
import { post } from "../../../helpers/api_helper";
import { toaster } from "../../../helpers/custom/toaster";
import useExcelReader from "../../../Hooks/useExcelReader";
import { addBrandData, getSingleBrand } from "../../../store/Info/actions";
import AddFileUpload from "../../Common/AddFileUpload";
import CustomInput from "../../Common/CustomInput";
import AddCardComponent from "../../Layout/AddCardComponent";
import InnerLayer from "../../Layout/InnerLayer";
import { addBrandSchema } from "../../Schemas/AddBrand.schema";
const breadcrumbItems = [
  {
    title: "Info",
    link: "#",
  },
  {
    title: "Brand",
    link: "brand",
  },
  {
    title: "Create Brand",
    link: "#",
  },
];
const breadcrumbItems2 = [
  {
    title: "Info",
    link: "#",
  },
  {
    title: "Brand",
    link: "brand",
  },
  {
    title: "Update Brand",
    link: "#",
  },
];
const initialValues = {
  name: "",
};

const AddBrand = ({ edit }) => {
  const { id } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();
  const [singleBrandData, setSingleBrandData] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const { items, readExcel } = useExcelReader();
  // console.log(`🦄 ~ file: Dashboard.js ~ line 21 ~ Dashboard ~ items`, items);
  const [results, setResults] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const toggle = () => setOpen(!open);
  const { authtoken, singleBrand, singleBrandLoading, addBrandLoading } =
    useSelector((state) => ({
      authtoken: state.Login.token,
      singleBrand: state?.InfoReducer?.singleBrand?.brand,
      addBrandLoading: state?.InfoReducer?.addBrandLoading,
      singleBrandLoading: state?.InfoReducer?.singleBrandLoading,
    }));
  console.log("addBrandLoading", addBrandLoading);
  useEffect(() => {
    if (edit) {
      dispatch(getSingleBrand(authtoken, id));
    }
  }, []);
  useEffect(() => {
    if (edit && singleBrandLoading === false) {
      const data = { ...singleBrandData };
      data.name = singleBrand?.name;

      console.log(data);
      setSingleBrandData(data);
    }
  }, [singleBrand]);
  const handleSubmit = async () => {
    setAdding(true);
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const data = {
        category: element?.category,
        brand: element.brand,
      };

      await post("/brand/createbrand", data)
        .then((response) => {
          console.log("ddddd");
          setResults((prev) => [...prev, response]);
        })
        .catch((error) => {
          console.log("error", error);
          setResults((prev) => [...prev, { status: "failed" }]);
        });

      post("/brand/createbrand", data)
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
    // Promise.all(promises).then(response =>{
    //   console.log('res', response);
    //   setResults((prev) => [...prev, response]);
    //   setAdding(false);
    //   toaster('success', 'All data upload successful');
    // }).catch((error)=>{
    //   setAdding(false);
    //   setResults((prev) => [...prev, { status: 'failed' }]);
    //   console.log('error', error);
    // }).finally(()=>{
    //   setIsDone(true);
    // })
  };

  const tableHead = items?.[0] || {};

  const onSubmit = (values) => {
    let obj = {};
    obj.name = values.name;
    console.log(obj);
    if (edit) {
      dispatch(addBrandData(obj, history, authtoken, id));
    } else {
      dispatch(addBrandData(obj, history, authtoken));
    }
  };

  const AddBrand = useFormik({
    enableReinitialize: true,
    initialValues: singleBrandData || initialValues,
    validationSchema: addBrandSchema,
    onSubmit,
  });
  return (
    <React.Fragment>
      <InnerLayer
        isMultiple
        title={edit ? "Update Brand" : "Create Brand"}
        breadcrumbItems={edit ? breadcrumbItems2 : breadcrumbItems}
      >
        <div style={{ minHeight: "100vh" }} className="position-relative">
          <Row className="mt-4">
            <Col md="6" className="mx-auto">
              {/* add User */}
              <AddCardComponent className="">
                <Form
                  className="needs-validation offset-md-2 col-md-8"
                  onSubmit={AddBrand.handleSubmit}
                >
                  <CustomInput
                    name={"name"}
                    type={"text"}
                    label={"Brand"}
                    placeholder={"Type Brand"}
                    validationType={AddBrand}
                  />
                  {addBrandLoading ? (
                    <div className="d-flex justify-content-end mt-3">
                      <Spinner className="ms-2" color="primary" />
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <input
                        type="submit"
                        value={edit ? "Update Brand" : "Add Brand"}
                        className="btn button mt-3"
                      />
                    </div>
                  )}
                </Form>
              </AddCardComponent>
              {edit ? (
                <span></span>
              ) : (
                <AddFileUpload
                  setSelectedFiles={setSelectedFiles}
                  acceptFile={
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  }
                  handleFile={(file) => {
                    readExcel(file);
                  }}
                />
              )}

              <Modal isOpen={open} toggle={toggle} size="lg">
                <ModalBody>
                  <Table className="table table-responsive">
                    <thead>
                      <tr>
                        <th>No.</th>
                        {Object.keys(tableHead)?.map((item, idx) => (
                          <th key={idx}>{item}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items?.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{item?.category}</td>
                          <td>{item?.brand}</td>
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

export default AddBrand;
