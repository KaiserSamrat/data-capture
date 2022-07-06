import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Col, Form, Row, Spinner } from "reactstrap";
import { addRegion, getSingleRegion } from "../../../store/GEO/actions";
import AddFileUpload from "../../Common/AddFileUpload";
import CustomInput from "../../Common/CustomInput";
import AddCardComponent from "../../Layout/AddCardComponent";
import InnerLayer from "../../Layout/InnerLayer";
import { addRegionSchema } from "../../Schemas/AddRegion.schema";
const breadcrumbItems = [
  {
    title: "Geo",
    link: "#",
  },
  {
    title: "Region",
    link: "region",
  },
  {
    title: "Create Region",
    link: "#",
  },
];
const breadcrumbItems2 = [
  {
    title: "Geo",
    link: "#",
  },
  {
    title: "Region",
    link: "region",
  },
  {
    title: "Update Region",
    link: "#",
  },
];
const initialValues = {
  name: "",
};

const AddRegion = ({ edit }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [singleRegionData, setSingleRegionData] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const { authtoken, singleRegion, singleRegionLoading, addRegionLoading } =
    useSelector((state) => ({
      authtoken: state.Login.token,
      singleRegion: state.GeoReducer.singleRegion?.singleregion,
      singleRegionLoading: state.GeoReducer.singleRegionLoading,
      addRegionLoading: state.GeoReducer.addRegionLoading,
    }));

  console.log("addRegionLoading", addRegionLoading);
  const onSubmit = (values) => {
    console.log("values", values);
    // event.preventDefault()
    let obj = {};
    obj.name = values.name;
    console.log(obj);
    if (edit) {
      dispatch(addRegion(obj, history, authtoken, id));
    } else {
      dispatch(addRegion(obj, history, authtoken));
    }
  };
  useEffect(() => {
    if (edit) {
      dispatch(getSingleRegion(authtoken, id));
    }
  }, []);
  useEffect(() => {
    if (edit && singleRegionLoading === false) {
      const data = { ...singleRegionData };
      data.name = singleRegion?.name;

      console.log(data);
      setSingleRegionData(data);
    }
  }, [singleRegion]);
  const AddRegion = useFormik({
    enableReinitialize: true,
    initialValues: singleRegionData || initialValues,
    validationSchema: addRegionSchema,
    onSubmit,
  });
  return (
    <React.Fragment>
      <InnerLayer
        isMultiple
        title={edit ? "Update Region" : "Create Region"}
        breadcrumbItems={edit ? breadcrumbItems2 : breadcrumbItems}
      >
        <div style={{ minHeight: "100vh" }} className="position-relative">
          <Row className="mt-4">
            <Col md="6" className="mx-auto">
              {/* add User */}
              <AddCardComponent className="">
                <Form
                  className="needs-validation offset-md-2 col-md-8"
                  onSubmit={AddRegion.handleSubmit}
                >
                  <CustomInput
                    name={"name"}
                    type={"text"}
                    label={"Region"}
                    placeholder={"Type Region"}
                    validationType={AddRegion}
                  />
                  {addRegionLoading ? (
                    <div className="d-flex justify-content-end mt-3">
                      <Spinner className="ms-2" color="primary" />
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <input
                        type="submit"
                        value={edit ? "Update Region" : "Add Region"}
                        className="btn button mt-3"
                      />
                    </div>
                  )}
                </Form>
              </AddCardComponent>
              {/* <AddFileUpload setSelectedFiles={setSelectedFiles} /> */}
            </Col>
          </Row>
        </div>
      </InnerLayer>
    </React.Fragment>
  );
};

export default AddRegion;
