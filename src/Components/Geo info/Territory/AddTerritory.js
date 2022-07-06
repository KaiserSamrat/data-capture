import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Col, Form, Modal, ModalBody, Row, Table, Spinner } from "reactstrap";
import { post } from "../../../helpers/api_helper";
import { toaster } from "../../../helpers/custom/toaster";
import useExcelReader from "../../../Hooks/useExcelReader";
import {
  addTerritoryData,
  getArea,
  getRegion,
  getSingleTerritory,
} from "../../../store/GEO/actions";
import AddFileUpload from "../../Common/AddFileUpload";
import CustomInput from "../../Common/CustomInput";
import AddCardComponent from "../../Layout/AddCardComponent";
import InnerLayer from "../../Layout/InnerLayer";
import { addTerritorySchema } from "../../Schemas/AddTerritory.schema";

const breadcrumbItems = [
  {
    title: "Geo",
    link: "#",
  },
  {
    title: "Territory",
    link: "geo/territory",
  },
  {
    title: "Create Territory",
    link: "#",
  },
];
const breadcrumbItems2 = [
  {
    title: "Geo",
    link: "#",
  },
  {
    title: "Territory",
    link: "geo/territory",
  },
  {
    title: "Update Territory",
    link: "#",
  },
];
const initialValues = {
  area: "",
  name: "",
};

const AddTerritory = ({ edit }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [singleTerritoryData, setSingleTerritoryData] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const { items, readExcel } = useExcelReader();
  console.log(`🦄 ~ file: Dashboard.js ~ line 21 ~ Dashboard ~ items`, items);
  const [results, setResults] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const toggle = () => setOpen(!open);

  const {
    regionData,
    loading,
    authtoken,
    areaData,
    singleTerritoryLoading,
    singleTerritory,
    addTerritoryLoading,
  } = useSelector((state) => ({
    regionData: state.GeoReducer.regionData,
    areaData: state.GeoReducer.areaData,
    singleTerritory: state.GeoReducer.singleTerritory?.territory,
    singleTerritoryLoading: state.GeoReducer.singleTerritoryLoading,
    addTerritoryLoading: state.GeoReducer.addTerritoryLoading,
    authtoken: state.Login.token,
  }));
  console.log("singleTerritory", singleTerritory);
  useEffect(() => {
    dispatch(getRegion(authtoken, 0, 0));
  }, []);
  useEffect(() => {
    dispatch(getArea(authtoken, 0, 0, "All", ""));
  }, []);
  useEffect(() => {
    if (edit) {
      dispatch(getSingleTerritory(authtoken, id));
    }
  }, []);
  useEffect(() => {
    if (edit && singleTerritoryLoading === false) {
      const data = { ...singleTerritoryData };
      data.name = singleTerritory?.name;
      data.area = singleTerritory?.area?._id;

      console.log(data);
      setSingleTerritoryData(data);
    }
  }, [singleTerritory]);
  const onSubmit = (values) => {
    console.log("values", values);
    // event.preventDefault()
    let obj = {};
    obj.name = values.name;
    obj.area = values.area;
    console.log("line 53", obj);
    if (edit) {
      dispatch(addTerritoryData(obj, history, authtoken, id));
    } else {
      dispatch(addTerritoryData(obj, history, authtoken));
    }
  };
  const handleSubmit = async () => {
    setAdding(true);
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const data = {
        Area: element?.Area,
        Territory: element.Territory,
        Region: element.Region,
      };

      await post("/territory/geo-excel", data)
        .then((response) => {
          console.log("ddddd");
          setResults((prev) => [...prev, response]);
        })
        .catch((error) => {
          console.log("error", error);
          setResults((prev) => [...prev, { status: "failed" }]);
        });

      post("/territory/geo-excel", data)
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
  const AddTerritory = useFormik({
    enableReinitialize: true,
    initialValues: singleTerritoryData || initialValues,
    validationSchema: addTerritorySchema,
    onSubmit,
  });
  return (
    <React.Fragment>
      <InnerLayer
        isMultiple
        title={edit ? "Update  Territory" : "Create Territory"}
        breadcrumbItems={edit ? breadcrumbItems2 : breadcrumbItems}
      >
        <div style={{ minHeight: "100vh" }} className="position-relative">
          <Row className="mt-4">
            <Col md="6" className="mx-auto">
              {/* add User */}
              <AddCardComponent className="">
                <Form
                  className="needs-validation offset-md-2 col-md-8"
                  onSubmit={AddTerritory.handleSubmit}
                >
                  {/* <CustomInput
                    name={"region"}
                    type={"select"}
                    label={"Select region"}
                    validationType={AddTerritory}
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
                  </CustomInput> */}
                  <CustomInput
                    name={"area"}
                    type={"select"}
                    label={"Select Area"}
                    validationType={AddTerritory}
                  >
                    <option defaultValue>Select Area...</option>
                    {areaData?.data?.length > 0 ? (
                      areaData?.data?.area?.map((data, idx) => (
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
                    label={"Territory"}
                    placeholder={"Type Territory"}
                    validationType={AddTerritory}
                  />
                  {addTerritoryLoading ? (
                    <div className="d-flex justify-content-end mt-3">
                      <Spinner className="ms-2" color="primary" />
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <input
                        type="submit"
                        value={edit ? "Update Territory" : "Add Territory"}
                        className="btn button mt-3"
                      />
                    </div>
                  )}
                </Form>
              </AddCardComponent>
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
                          <td>{item?.Region}</td>
                          <td>{item?.Area}</td>
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
              ) : null}
            </Col>
          </Row>
        </div>
      </InnerLayer>
    </React.Fragment>
  );
};

export default AddTerritory;
