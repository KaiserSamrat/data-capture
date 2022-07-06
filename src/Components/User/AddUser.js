import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Col,
  Form,
  Modal,
  ModalBody,
  Row,
  Table,
  Label,
  Spinner,
} from "reactstrap";
import { post } from "../../helpers/api_helper";
import { toaster } from "../../helpers/custom/toaster";
import useExcelReader from "../../Hooks/useExcelReader";
import { addUser, getSingleUser } from "../../store/User/actions";
import AddFileUpload from "../Common/AddFileUpload";
import CustomInput from "../Common/CustomInput";
import AddCardComponent from "../Layout/AddCardComponent";
import InnerLayer from "../Layout/InnerLayer";
import { addUserSchema } from "../Schemas/AddUser.schema";
import Select from "react-select";
const breadcrumbItems = [
  {
    title: "User",
    link: "#",
  },
  {
    title: "User List",
    link: "user",
  },
  {
    title: "Create User",
    link: "#",
  },
];
const breadcrumbItems2 = [
  {
    title: "User",
    link: "#",
  },
  {
    title: "User List",
    link: "user",
  },
  {
    title: "Update User",
    link: "#",
  },
];
const initialValues = {
  name: "",
  employeeId: "",
  password: "",
  passwordConfirm: "",
  role: "",
  warehouse: "",
  phoneNumber: "",
};
const roleType = [
  {
    name: "Super Admin",
    _id: 2,
    value: "SUPERADMIN",
  },
  {
    name: "Mock Admin",
    _id: 2,
    value: "ADMIN",
  },
  {
    name: "Central warehouse",
    _id: 2,
    value: "CENTRALWAREHOUSE",
  },
  {
    name: "Hub",
    _id: 1,
    value: "HUB",
  },

  {
    name: "BP",
    _id: 2,
    value: "USER",
  },
  {
    name: "MAPLD",
    _id: 2,
    value: "VIEWADMIN",
  },
];
const HUbType = [
  {
    name: "Central warehouse",
    _id: 1,
    value: "Central",
  },
  {
    name: "Distribution Hub",
    _id: 2,
    value: "Hub",
  },
];

const AddUser = ({ edit }) => {
  let dispatch = useDispatch();
  const history = useHistory();
  const [singleUserData, setSingleUserData] = useState(null);
  const { id } = useParams();
  //  const [role, setRole] = useState('Central')
  const [hubType, setHubType] = useState("Central");
  const [selectedFiles, setSelectedFiles] = useState({});
  // console.log(` ~ selectedFiles`, selectedFiles);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const {
    distributionHubData,
    loading,
    authtoken,
    addingUser,
    areaData,
    singleUser,
    singleUserLoading,
  } = useSelector((state) => ({
    distributionHubData: state.DistributionReducer.distributionHubData,
    authtoken: state.Login.token,
    addingUser: state.UserReducer.addingUser,
    singleUser: state?.UserReducer?.singleUser?.users,
    singleUserLoading: state?.UserReducer?.singleUserLoading,
  }));
   console.log("addingUser", addingUser);

  useEffect(() => {
    if (edit) {
      dispatch(getSingleUser(authtoken, id));
    }
  }, []);
  useEffect(() => {
    if (edit && singleUserLoading === false) {
      const data = { ...singleUserData };
      data.name = singleUser[0]?.name;
      data.employeeId = singleUser[0]?.employeeId;
      data.phoneNumber = singleUser[0]?.phoneNumber;
      data.role = singleUser[0]?.role;
      data.warehouse = singleUser[0]?.warehouse;
      console.log(data);
      setSingleUserData(data);
    }
  }, [singleUser]);
  const onSubmit = (values) => {
    let obj = {};
    obj.name = values.name;
    obj.employeeId = values.employeeId;
    obj.role = values.role;
    obj.phoneNumber = values.phoneNumber;
    if (hubType !== "admin") {
      obj.warehouse = values.warehouse;
    }
   obj.email = values.email
    obj.password = values.password;
    obj.passwordConfirm = values.passwordConfirm;
    if (edit) {
      dispatch(addUser(obj, history, authtoken, id));
    } else {
      dispatch(addUser(obj, history, authtoken));
    }
   
  };

  const AddUser = useFormik({
    enableReinitialize: true,
    initialValues: singleUserData || initialValues,
    validationSchema: addUserSchema,
    onSubmit,
  });

  const handleRole = (e) => {
    console.log(e.target.value);
    if (e.target.value === "CENTRALWAREHOUSE") {
      setHubType("Central");
    } else if (e.target.value === "HUB") {
      setHubType("Hub");
    } else if (e.target.value === "USER") {
      setHubType("Hub");
    } else {
      setHubType("admin");
    }
  };
  const handleHubType = (value) => {
    setHubType(value.value);
  };

  const { items, readExcel } = useExcelReader();
  // console.log(`🦄 ~ file: Dashboard.js ~ line 21 ~ Dashboard ~ items`, items);
  const [results, setResults] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const toggle = () => setOpen(!open);

  // console.log(` ~ results`, results, isDone);
  const handleSubmit = async () => {
    setAdding(true);
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const data = {
        name: element?.name,
        employeeId: element.employeeId,
        role: element.role,
      };
      await post("/users/exceluser", data)
        .then((response) => {
          setResults((prev) => [...prev, response]);
        })
        .catch((error) => {
          console.log("error", error);
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

  return (
    <React.Fragment>
      <InnerLayer
        isMultiple
        title={edit ? "Update User" : "Create User"}
        breadcrumbItems={edit ? breadcrumbItems2 : breadcrumbItems}
      >
        <div style={{ minHeight: "100vh" }} className="position-relative">
          <Row className="mt-4">
            <Col md="9" className="mx-auto">
              {/* add User */}
              <AddCardComponent className="">
                <Form
                  className="needs-validation col-md-12"
                  onSubmit={AddUser.handleSubmit}
                >
                  <Row>
                    <Col md="6 mb-2">
                      <CustomInput
                        name={"name"}
                        type={"text"}
                        label={"Employee Name"}
                        placeholder={"Type name"}
                        validationType={AddUser}
                      />
                    </Col>
                    <Col md="6 mb-2">
                      <CustomInput
                        name={"employeeId"}
                        type={"text"}
                        label={"Employee ID"}
                        placeholder={"Type Employee ID"}
                        validationType={AddUser}
                      />
                    </Col>
                    {edit ? (
                      <span></span>
                    ) : (
                      <Col md="6 mb-2">
                        <CustomInput
                          name={"email"}
                          type={"text"}
                          label={"Email"}
                          placeholder={"example@gmail.com"}
                          validationType={AddUser}
                        />
                      </Col>
                    )}

                    <Col md="6 mb-2">
                      <CustomInput
                        name={"phoneNumber"}
                        type={"text"}
                        label={"Phone no."}
                        placeholder={"Type Phone No"}
                        validationType={AddUser}
                      />
                    </Col>
                    <Col md="6 mb-2">
                      <CustomInput
                        name={"role"}
                        type={"select"}
                        label={"Select Role"}
                        validationType={AddUser}
                        handleChange={handleRole}
                      >
                        <option defaultValue>Select Role...</option>
                        {roleType.length > 0 ? (
                          roleType.map((data, idx) => (
                            <option value={data?.value} key={idx}>
                              {data.name}
                            </option>
                          ))
                        ) : (
                          <span></span>
                        )}
                      </CustomInput>
                    </Col>
              
                      
                    {edit ? (
                      <span></span>
                    ) : (
                      <Col md="6 mb-2">
                        <CustomInput
                          name={"password"}
                          type={"text"}
                          label={"Password"}
                          placeholder={"********"}
                          validationType={AddUser}
                        />
                      </Col>
                    )}
                    {edit ? (
                      <span></span>
                    ) : (
                      <Col md="6 mb-2">
                        <CustomInput
                          name={"passwordConfirm"}
                          type={"text"}
                          label={"Confirm Password"}
                          placeholder={"********"}
                          validationType={AddUser}
                        />
                      </Col>
                    )}
                  </Row>
                  {addingUser ? (
                      <div className="d-flex justify-content-end mt-3">
                        <Spinner className="ms-2" color="primary" />
                      </div>
                    ) : (
                    <div className="d-flex justify-content-end mt-3">
                      <input
                        type="submit"
                        value={edit ? "Update User" : "Add User"}
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
                          <td>{item?.name}</td>
                          <td>{item?.employeeId}</td>
                          <td>{item?.role}</td>
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

export default AddUser;
