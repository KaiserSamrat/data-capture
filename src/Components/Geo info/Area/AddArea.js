import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Col, Form, Row, Spinner } from "reactstrap";
import {
  addAreaData,
  getRegion,
  getSingleArea,
} from "../../../store/GEO/actions";
import AddFileUpload from "../../Common/AddFileUpload";
import CustomInput from "../../Common/CustomInput";
import AddCardComponent from "../../Layout/AddCardComponent";
import InnerLayer from "../../Layout/InnerLayer";
import { addAreaSchema } from "../../Schemas/AddArea.schema";
const breadcrumbItems = [
  {
    title: "Geo",
    link: "#",
  },
  {
    title: "Area",
    link: "area",
  },
  {
    title: "Create Area",
    link: "#",
  },
];

const breadcrumbItems2 = [
  {
    title: "Geo",
    link: "#",
  },
  {
    title: "Area",
    link: "area",
  },
  {
    title: "Update Area",
    link: "#",
  },
];
const initialValues = {
  region: "",
  name: "",
};

const AddArea = ({ edit }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [singleAreaData, setSingleAreaData] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [region, setRegion] = useState("");
  const {
    regionData,
    loading,
    authtoken,
    areaData,
    singleArea,
    singleAreaLoading,
    addAreaLoading,
  } = useSelector((state) => ({
    regionData: state.GeoReducer.regionData,
    singleArea: state.GeoReducer?.singleArea?.data?.singlearea,
    singleAreaLoading: state.GeoReducer.singleAreaLoading,
    areaData: state.GeoReducer.areaData,
    authtoken: state.Login.token,
    addAreaLoading: state.GeoReducer.addAreaLoading,
  }));
  console.log("addAreaLoading", addAreaLoading);
  useEffect(() => {
    dispatch(getRegion(authtoken, 0, 0));
  }, []);
  useEffect(() => {
    if (edit) {
      dispatch(getSingleArea(authtoken, id));
    }
  }, []);
  useEffect(() => {
    if (edit && singleAreaLoading === false) {
      const data = { ...singleAreaData };
      data.name = singleArea?.name;
      data.region = singleArea?.region?._id;

      console.log(data);
      setSingleAreaData(data);
    }
  }, [singleArea]);

  const onSubmit = (values) => {
    console.log("values", values);
    // event.preventDefault()
    let obj = {};
    obj.name = values.name;
    obj.region = values.region;
    console.log("line 53", obj);
    if (edit) {
      dispatch(addAreaData(obj, history, authtoken, id));
    } else {
      dispatch(addAreaData(obj, history, authtoken));
    }
  };

  const addArea = useFormik({
    enableReinitialize: true,
    initialValues: singleAreaData || initialValues,
    validationSchema: addAreaSchema,
    onSubmit,
  });
  const handleRegion = (value) => {
    console.log(value._id);
    setRegion(value._id);
  };
  return (
    <React.Fragment>
      <InnerLayer
        isMultiple
        title={edit ? "Update Area" : "Create Area"}
        breadcrumbItems={edit ? breadcrumbItems2 : breadcrumbItems}
      >
        <div style={{ minHeight: "100vh" }} className="position-relative">
          <Row className="mt-4">
            <Col md="6" className="mx-auto">
              {/* add User */}
              <AddCardComponent className="">
                <Form
                  className="needs-validation offset-md-2 col-md-8"
                  onSubmit={addArea.handleSubmit}
                >
                  <CustomInput
                    name={"region"}
                    type={"select"}
                    label={"Select region"}
                    validationType={addArea}
                  >
                    <option defaultValue>Select region...</option>
                    {regionData?.length > 0 ? (
                      regionData?.region?.map((data, idx) => (
                        <option value={data._id} key={idx}>
                          {data.name}
                        </option>
                      ))
                    ) : (
                      <span></span>
                    )}
                  </CustomInput>
                  <CustomInput
                    name={"name"}
                    type={"text"}
                    label={"Area"}
                    placeholder={"Type Area"}
                    validationType={addArea}
                  />
                  {addAreaLoading ? (
                    <div className="d-flex justify-content-end mt-3">
                      <Spinner className="ms-2" color="primary" />
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end mt-3">
                      <input
                        type="submit"
                        value={edit ? "Update Area" : "Add Area"}
                        className="btn button mt-3"
                      />
                    </div>
                  )}
                </Form>
              </AddCardComponent>
              <AddFileUpload setSelectedFiles={setSelectedFiles} />
            </Col>
          </Row>
        </div>
      </InnerLayer>
    </React.Fragment>
  );
};

export default AddArea;
