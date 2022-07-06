import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Col, Form, Modal, ModalBody, Row, Table, Spinner, Label } from "reactstrap";
import { post } from "../../../helpers/api_helper";
import { toaster } from "../../../helpers/custom/toaster";
import useExcelReader from "../../../Hooks/useExcelReader";
import { getSingleDistribution } from "../../../store/Distribution Hub/actions.js";
import { addPartner, getSinglePartner } from "../../../store/Info/actions";
import AddFileUpload from "../../Common/AddFileUpload";
import CustomInput from "../../Common/CustomInput";
import AddCardComponent from "../../Layout/AddCardComponent";
import InnerLayer from "../../Layout/InnerLayer";
import { AddPartnerSchema } from "../../Schemas/AddPartnerSchema";
import { getArea, getRegion, getTerritory } from "../../../store/GEO/actions";
import Select from "react-select";
const breadcrumbItems = [
  {
    title: "Partner",
    link: "#",
  },
  {
    title: "Create Partner",
    link: "hub",
  },
];
const breadcrumbItems2 = [
  {
    title: "Partner",
    link: "#",
  },
  {
    title: "Update Partner",
    link: "hub",
  },
];
const initialValues = {
  hubId: "",
  outletName: "",
  ownerName: "",
  partnerCode: "",
  email: "",
  phoneNumber: "",
  alternativePhoneNumber: "",
  address: "",
  point: "",
  route: "",
  region: "",
  area: "",
  territory: "",
  category: "",
};

const AddPartner = ({ edit }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState({});
  const { items, readExcel } = useExcelReader();
  console.log(`🦄 ~ file: Dashboard.js ~ line 21 ~ Dashboard ~ items`, items);
  const [results, setResults] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [singlePartnerData, setSinglePartnerData] = useState(null);
  const [areaByRegion, setAreaByRegion] = useState('')
  const [territoryByArea, setTerritoyrByArea] = useState('')
  const toggle = () => setOpen(!open);
  const { singleDistribution, authtoken, singlePartner, singlePartnerLoading, regionData, areaData, territoryData, addPartnerLoading } =
    useSelector((state) => ({
      singleDistribution: state.DistributionReducer.singleDistribution,
      singlePartner: state.InfoReducer.singlePartner,
      regionData: state.GeoReducer.regionData,
      areaData: state.GeoReducer.areaData,
      territoryData: state.GeoReducer.territoryData,
      singlePartnerLoading: state.InfoReducer.singlePartnerLoading,
      addPartnerLoading: state.InfoReducer.addPartnerLoading,
      authtoken: state.Login.token,
    }));
  console.log("addPartnerLoading", addPartnerLoading);
  const onSubmit = (values) => {
    let obj = {};
    obj.hubId = values.hubId;
    obj.outletName = values.outletName;
    obj.ownerName = values.ownerName;
    obj.partnerCode = values.partnerCode;
    obj.email = values.email;
    obj.phoneNumber = values.phoneNumber;
    obj.alternativePhoneNumber = values.alternativePhoneNumber;
    obj.address = values.address;
    obj.point = values.point;
    obj.route = values.route;
    obj.area = values.area;
    obj.region = values.region;
    obj.territory = values.territory;
    obj.category =  values.category;
    // console.log('obj', obj);

    if (edit) {
      dispatch(addPartner(obj, history, authtoken, id));
    } else {
      dispatch(addPartner(obj, history, authtoken));
    }
  };
  useEffect(() => {
    if (edit) {
      dispatch(getSinglePartner(authtoken, id));
    }
  }, []);
  useEffect(() => {
    dispatch(getRegion(authtoken, 0, 0, ""));
  }, []);
  // useEffect(() => {
  //   dispatch(getArea(authtoken, 0, 0, "All", ""));
  // }, []);
  // useEffect(() => {
  //   dispatch(getTerritory(authtoken, 0, 0, "All", ""));
  // }, []);
  useEffect(() => {
    if (edit && singlePartnerLoading === false) {
      const data = { ...singlePartnerData };
      data.outletName = singlePartner?.data?.partner?.outletName;
      data.ownerName = singlePartner?.data?.partner?.ownerName;
      data.partnerCode = singlePartner?.data?.partner?.partnerCode;
      data.email = singlePartner?.data?.partner?.email;
      data.phoneNumber = singlePartner?.data?.partner?.phoneNumber;
      data.alternativePhoneNumber =
        singlePartner?.data?.partner?.alternativePhoneNumber;
      data.address = singlePartner?.data?.partner?.address;
      data.hubId = singlePartner?.data?.partner?.hubId;
      data.point = singlePartner?.data?.partner?.point;
      data.route = singlePartner?.data?.partner?.route;
      data.area = singlePartner?.data?.partner?.area;
      data.region = singlePartner?.data?.partner?.region;
      data.territory = singlePartner?.data?.partner?.territory;
      data.category = singlePartner?.data?.partner?.category;

      console.log(data);
      setSinglePartnerData(data);
    }
  }, [singlePartner]);
  useEffect(() => {
    dispatch(getSingleDistribution(authtoken, 0, 0, "Hub"));
  }, []);

  const handleSubmit = async () => {
    setAdding(true);
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const data = {
        hubId: element?.hubId,
        outletName: element?.outletName,
        ownerName: element?.ownerName,
        partnerCode: element?.partnerCode,
        email: element?.email,
        phoneNumber: element?.phoneNumber,
        alternativePhoneNumber: element?.alternativePhoneNumber,
        point: element?.point,
        address: element?.address,
        route: element?.route,
        RegionName: element?.RegionName,
        AreaName: element?.AreaName,
        TerritoryName: element?.TerritoryName,
      };
      await post("partner/createpartnerexel", data)
        .then((response) => {
          setResults((prev) => [...prev, response]);
        })
        .catch((error) => {
          setResults((prev) => [...prev, { status: "failed" }]);
        });
      if (i === items.length - 1) {
        setIsDone(true);
        setAdding(false);
        toaster("success", "All data upload successful");
      }
    }
  };
  const tableHead = items?.[0] || {};
  const AddPartner = useFormik({
    enableReinitialize: true,
    initialValues: singlePartnerData || initialValues,
    validationSchema: AddPartnerSchema,
    onSubmit,
  });

  const handleRegion = (data) =>{
    setAreaByRegion(data?._id);
    if (!!data) {
      dispatch(getArea(authtoken, 0, 0, data?._id, ""));
    } else {
      dispatch(getArea({}));
    }
  }
  const handleArea = (data) =>{
    // setAreaByRegion(data?._id);
    if (!!data) {
      dispatch(getTerritory(authtoken, 0, 0, data?._id, ""));
    } else {
      dispatch(getTerritory({}));
    }
  }
  useEffect(() => {
    if(edit){
      dispatch(getArea(authtoken, 0, 0, "All", ""));
    }
    
  }, []);

  useEffect(() => {
    if(edit){
      dispatch(getTerritory(authtoken, 0, 0, "All", ""));
    }
   
  }, []);

  return (
    <React.Fragment>
      <InnerLayer
        isMultiple
        title={edit ? "Update  Partner" : "Create Partner"}
        breadcrumbItems={edit ? breadcrumbItems2 : breadcrumbItems}
      >
        <div style={{ minHeight: "100vh" }} className="position-relative">
          <Row className="mt-4">
            <Col md="9" className="mx-auto">
              {/* add User */}
              <AddCardComponent className="">
                <Form
                  className="needs-validation col-md-12"
                  onSubmit={AddPartner.handleSubmit}
                >
                  <Row>
                    <Col md="6 mb-2">
                    <Label htmlFor="formrow-firstname-Input">
                    Select Distribution Hub
                        </Label>
                        <Select
                          name="hubId"
                          className="mb-2"
                          classNamePrefix="select2-selection"
                          placeholder="Select Distribution Hub"
                          cacheOptions
                          getOptionLabel={(e) => e.name}
                          getOptionValue={(e) => e.value}
                          isClearable
                          options={singleDistribution?.data?.Warehouse}
                          value = {singleDistribution?.data?.Warehouse?.find(data=>data._id === AddPartner.values.hubId)}
                          onChange={(e) => {
                            console.log("e", e);
                            AddPartner.setFieldValue("hubId", e?._id || "");
                          }}
                        />
                        {AddPartner.errors.hubId ? (
                          <p className="text-danger">
                            {AddPartner.errors.hubId}
                          </p>
                        ) : null}
                      {/* <CustomInput
                        name={"hubId"}
                        type={"select"}
                        label={"Select Distribution Hub"}
                        placeholder={"Select Distribution Hub"}
                        validationType={AddPartner}
                      >
                        <option defaultValue>Select Distribution...</option>
                        {singleDistribution?.data?.length > 0 ? (
                          singleDistribution?.data?.Warehouse?.map(
                            (data, idx) => (
                              <option value={data._id} key={idx}>
                                {data.name}
                              </option>
                            )
                          )
                        ) : (
                          <span></span>
                        )}
                      </CustomInput> */}
                    </Col>
                    <Col md="6 mb-2">
                      <CustomInput
                        name={"outletName"}
                        type={"text"}
                        label={"Outlet Name"}
                        placeholder={"Type Outlet Name"}
                        validationType={AddPartner}
                      />
                    </Col>

                    <Col md="6 mb-3">
                      <CustomInput
                        name={"ownerName"}
                        type={"text"}
                        label={"Owner Name"}
                        placeholder={"Type Owner Name"}
                        validationType={AddPartner}
                      />
                    </Col>
                    <Col md="6 mb-3">
                      <CustomInput
                        name={"partnerCode"}
                        type={"text"}
                        label={"Partner Code"}
                        placeholder={"Type Partner Code"}
                        validationType={AddPartner}
                      />
                    </Col>
                    <Col md="6 mb-3">
                      <CustomInput
                        name={"email"}
                        type={"text"}
                        label={"Email"}
                        placeholder={"Type email"}
                        validationType={AddPartner}
                      />
                    </Col>
                    <Col md="6 mb-2">
                      <CustomInput
                        name={"phoneNumber"}
                        type={"number"}
                        label={"Phone Number"}
                        placeholder={"Type Phone Number"}
                        validationType={AddPartner}
                      />
                    </Col>
                    <Col md="6 mb-2">
                      <CustomInput
                        name={"alternativePhoneNumber"}
                        type={"number"}
                        label={"Alternative Phone Number "}
                        placeholder={"Type Alternative Phone Number"}
                        validationType={AddPartner}
                      />
                    </Col>
                    <Col md="6 mb-3">
                      <CustomInput
                        name={"address"}
                        type={"text"}
                        label={"Address"}
                        placeholder={"Type Address"}
                        validationType={AddPartner}
                      />
                    </Col>
                    <Col md="6 mb-3">
                      <CustomInput
                        name={"point"}
                        type={"text"}
                        label={"Point"}
                        placeholder={"Type Point"}
                        validationType={AddPartner}
                      />
                    </Col>
                    <Col md="6 mb-3">
                      <CustomInput
                        name={"route"}
                        type={"text"}
                        label={"Route"}
                        placeholder={"Type Route"}
                        validationType={AddPartner}
                      />
                    </Col>
                    <Col md="6 mb-3">
                      <CustomInput
                        name={"category"}
                        type={"text"}
                        label={"Category"}
                        placeholder={"Type Category"}
                        validationType={AddPartner}
                      />
                    </Col>
                    <Col md="6 mb-3">
                      {/* <CustomInput
                        name={"region"}
                        type={"select"}
                        label={"Select region"}
                        validationType={AddPartner}
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
                        <Label htmlFor="formrow-firstname-Input">
                        Select Region
                      </Label>
                      <Select
                        name="region"
                        className="mb-2"
                        classNamePrefix="select2-selection"
                        placeholder="Select Region"
                        cacheOptions
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.value}
                        isClearable
                        options={ regionData?.region}
                        value = {regionData?.region?.find(data=> data?._id == AddPartner.values.region)}
                        onChange={(e) => {
                        
                          AddPartner.setFieldValue("region", e?._id || "");
                          handleRegion(e)
                          
                        }
                        
                      }
                      />
                      {AddPartner.errors.region ? (
                        <p className="text-danger">
                          {AddPartner.errors.region}
                        </p>
                      ) : null}
                    </Col>
                    <Col md="6 mb-3">
                    <Label htmlFor="formrow-firstname-Input">
                        Select Area
                      </Label>
                      <Select
                        name="area"
                        className="mb-2"
                        classNamePrefix="select2-selection"
                        placeholder="Select Area"
                        cacheOptions
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.value}
                        isClearable
                        options={areaData?.data?.area}
                        value = {areaData?.data?.area?.find(data=>data._id === AddPartner.values.area)}
                        onChange={(e) => {
                          AddPartner.setFieldValue("area", e?._id || "");
                          handleArea(e)
                        }}
                      />
                      {AddPartner.errors.area ? (
                        <p className="text-danger">
                          {AddPartner.errors.area}
                        </p>
                      ) : null}
                      {/* <CustomInput
                        name={"area"}
                        type={"select"}
                        label={"Select Area"}
                        validationType={AddPartner}
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
                      </CustomInput> */}
                    </Col>
                    <Col md="6 mb-3">
                      {/* <CustomInput
                        name={"territory"}
                        type={"select"}
                        label={"Select Territory"}
                        validationType={AddPartner}
                      >
                        <option defaultValue>Select Territory...</option>
                        {territoryData?.length > 0 ? (
                          territoryData?.territory?.map((data, idx) => (
                            <option value={data._id} key={idx}>
                              {data.name}
                            </option>
                          ))
                        ) : (
                          <span></span>
                        )}
                      </CustomInput> */}
                         <Label htmlFor="formrow-firstname-Input">
                        Select Territory
                      </Label>
                      <Select
                        name="territory"
                        className="mb-2"
                        classNamePrefix="select2-selection"
                        placeholder="Select Territory"
                        cacheOptions
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.value}
                        isClearable
                        options={territoryData?.territory}
                        value = {territoryData?.territory?.find(data=>data._id === AddPartner.values.territory)}
                        onChange={(e) => {
                          console.log("e", e);
                          AddPartner.setFieldValue("territory", e?._id || "");
                        }}
                      />
                      {AddPartner.errors.territory ? (
                        <p className="text-danger">
                          {AddPartner.errors.territory}
                        </p>
                      ) : null}
                    </Col>
                  </Row>
                  {addPartnerLoading ? (
                    <div className="d-flex justify-content-end mt-3">
                      <Spinner className="ms-2" color="primary" />
                    </div>
                  ) : (
                  <div className="d-flex justify-content-end mt-3">
                    <input
                      type="submit"
                      value={edit ? "Update Partner" : "Add Partner"}
                      className="btn button "
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
              <Modal isOpen={open} toggle={toggle} size="xl">
                <ModalBody>
                  <div className="table-responsive">
                    <Table className="table table-hover mb-0 table-centered table-nowrap">
                      <thead className="table-light">
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
                            <td>{item?.hubId}</td>
                            <td>{item?.outletName}</td>
                            <td>{item?.ownerName}</td>
                            <td>{item?.partnerCode}</td>
                            <td>{item?.email}</td>
                            <td>{item?.phoneNumber}</td>
                            <td>{item?.alternativePhoneNumber}</td>
                            <td>{item?.address}</td>
                            <td>{item?.point}</td>
                            <td>{item?.route}</td>
                            <td>{item?.RegionName}</td>
                            <td>{item?.AreaName}</td>
                            <td>{item?.TerritoryName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
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

export default AddPartner;
