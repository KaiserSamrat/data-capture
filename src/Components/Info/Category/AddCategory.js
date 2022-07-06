import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Col, Form, Modal, ModalBody, Row, Table, Spinner } from "reactstrap";
import { post } from "../../../helpers/api_helper";
import { toaster } from "../../../helpers/custom/toaster";
import useExcelReader from "../../../Hooks/useExcelReader";
import { addCategoryData, getSingleCategory } from "../../../store/Info/actions";
import AddFileUpload from "../../Common/AddFileUpload";
import CustomInput from "../../Common/CustomInput";
import AddCardComponent from "../../Layout/AddCardComponent";
import InnerLayer from "../../Layout/InnerLayer";
import { addCategorySchema } from "../../Schemas/AddCategory.schema";

const breadcrumbItems = [
  {
    title: "Geo",
    link: "#",
  },
  {
    title: "Category",
    link: "category",
  },
  {
    title: "Create Category",
    link: "#",
  },
];

const breadcrumbItems2 = [
  {
    title: "Geo",
    link: "#",
  },
  {
    title: "Category",
    link: "category",
  },
  {
    title: "Create Category",
    link: "#",
  },
];
const initialValues = {
  name: "",
};

const AddCategory = ({edit}) => {
  const history = useHistory();
  const { id } = useParams()
  const dispatch = useDispatch();
  const [singleCategoryData, setSingleCategoryData] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState({});
  const { items, readExcel } = useExcelReader();
  console.log(`🦄 ~ file: Dashboard.js ~ line 21 ~ Dashboard ~ items`, items);
  const [results, setResults] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const toggle = () => setOpen(!open);

  console.log(` ~ results`, results, isDone);
  const handleSubmit = async () => {
    setAdding(true);
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const data = {
        Area: element?.Area,
        Territory: element.Territory,
        Region: element.Region,
      };
      const response = await post("/territory/geo-excel/", data);
      if (response) {
        setResults((prev) => [...prev, response]);
      } else {
        setResults((prev) => [...prev, { status: "failed" }]);
      }
      if (i === items.length - 1) {
        setIsDone(true);
        setAdding(false);
        toaster("success", "All data upload successful");
      }
    }
  };

  const tableHead = items?.[0] || {};

  const { authtoken, singleCategory, singleCategoryLoading, addCategoryLoading } = useSelector((state) => ({
    authtoken: state.Login.token,
    singleCategory: state?.InfoReducer?.singleCategory?.singleCategory,
    addCategoryLoading: state?.InfoReducer?.addCategoryLoading,
    singleCategoryLoading: state?.InfoReducer?.singleCategoryLoading,
  }));
  console.log('addCategoryLoading', addCategoryLoading);
  useEffect(() => {

    if (edit) {
      dispatch(getSingleCategory(authtoken, id))
    }

  }, [])
  useEffect(() => {
    if (edit && singleCategoryLoading === false) {
      const data = { ...singleCategoryData }
      data.name = singleCategory?.name

      console.log(data);
      setSingleCategoryData(data)
    }
  }, [singleCategory])
  const onSubmit = (values) => {
    console.log("values", values);
    // event.preventDefault()
    let obj = {};
    obj.name = values.name;
    console.log(obj);
    if(edit){
      dispatch(addCategoryData(obj, history, authtoken, id));
    }
    else{
      dispatch(addCategoryData(obj, history, authtoken));
    }
    
  };

  const AddCategory = useFormik({
    enableReinitialize: true,
    initialValues: singleCategoryData || initialValues,
    validationSchema: addCategorySchema,
    onSubmit,
  });
  return (
    <React.Fragment>
      <InnerLayer
        isMultiple
        title={edit ?"Update Category": "Create Category"}
        breadcrumbItems={edit?breadcrumbItems2 : breadcrumbItems}
      >
        <div style={{ minHeight: "100vh" }} className="position-relative">
          <Row className="mt-4">
            <Col md="6" className="mx-auto">
              {/* add User */}
              <AddCardComponent className="">
                <Form
                  className="needs-validation offset-md-2 col-md-8"
                  onSubmit={AddCategory.handleSubmit}
                >
                  <CustomInput
                    name={"name"}
                    type={"text"}
                    label={"Category"}
                    placeholder={"Type Category"}
                    validationType={AddCategory}
                  />
                     {addCategoryLoading ? (
                    <div className="d-flex justify-content-end mt-3">
                      <Spinner className="ms-2" color="primary" />
                    </div>
                  ) : (

                  <div className="d-flex justify-content-end">
                    <input
                      type="submit"
                      // value={"Add Category"}
                      value={edit?'Update Category': "Add Category" }
                      className="btn button mt-3"
                    />
                  </div>
                  )}
                </Form>
              </AddCardComponent>
              {/* <AddFileUpload
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
                          <td>{item?.Area}</td>
                          <td>{item?.Region}</td>
                          <td>{item?.Territory}</td>
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
              ) : null} */}
            </Col>
          </Row>
        </div>
      </InnerLayer>
    </React.Fragment>
  );
};

export default AddCategory;
