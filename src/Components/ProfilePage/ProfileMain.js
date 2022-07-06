import React from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Col, Row } from "reactstrap";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import officer1 from "./img/officer1.png";
import profileImage from "./img/profile.png";
import "./profile.scss";
const ProfileMain = () => {
  const [name, setName] = React.useState(false);
  const [role, setRole] = React.useState(false);
  const [showPass, setshowPass] = React.useState(false);
  const [showPass2, setshowPass2] = React.useState(false);
  const [showPass3, setshowPass3] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);
  const divisionList = [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Chittagong ", label: "Chittagong " },
    { value: "Rajshahi", label: "Rajshahi" },
    { value: "Sylhet", label: "Sylhet" },
    { value: "Khulna", label: "Khulna" },
    { value: "Barishal", label: "Barishal" },
    { value: "Rangpur", label: "Rangpur" },
    { value: "Mymensingh", label: "Mymensingh" },
  ];
  const userRole = [
    { value: "ADMIN ", label: "Admin" },
    { value: "NCO ", label: "National Coordinator " },
    { value: "RS", label: "Regional Supervisor" },
    { value: "SO", label: "Support Officer " },
  ];
  return (
    <div>
      <Modal open={name} onClose={() => setName(false)} center>
        <p>Name</p>
      </Modal>
      <Modal open={role} onClose={() => setRole(false)} center>
        <p>Name</p>
      </Modal>
      <Modal open={update} onClose={() => setUpdate(false)} center>
        <div className="add-division-popup-form">
          <div className="mb-4 text-center">
            <h3>Profile Update</h3>
          </div>
          <Form>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control type="text" placeholder="Type Full Name" />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="number" placeholder="Type Phone Number" />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Role</Form.Label>
                  <Select
                    placeholder="Select Role"
                    options={userRole}
                    isClearable
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Regional Supervisor</Form.Label>
                  <Select
                    placeholder="Select Regional Supervisor"
                    options={userRole}
                    isClearable
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Type Email</Form.Label>
                  <Form.Control type="email" placeholder="Type  Email" />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control type="text" placeholder="Type  user id" />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Division</Form.Label>
                  <Select
                    placeholder="Select Division"
                    options={divisionList}
                    isClearable
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select District</Form.Label>
                  <Select
                    placeholder="Select District"
                    options={divisionList}
                    isClearable
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Upazila</Form.Label>
                  <Select
                    placeholder="Select Upazila"
                    options={divisionList}
                    isClearable
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload user image</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3 form-password-group-show-hide">
                  <Form.Label>Type Password</Form.Label>
                  <Form.Control
                    type={showPass ? "text" : "password"}
                    placeholder="Type Password"
                  />
                  <span onClick={() => setshowPass(!showPass)}>
                    {showPass ? (
                      <span>
                        <i class="fa-solid fa-eye"></i>
                      </span>
                    ) : (
                      <span>
                        <i class="fa-solid fa-eye-slash"></i>
                      </span>
                    )}
                  </span>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3 form-password-group-show-hide">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showPass2 ? "text" : "password"}
                    placeholder="Type Confirm Password"
                  />
                  <span onClick={() => setshowPass2(!showPass2)}>
                    {showPass2 ? (
                      <span>
                        <i class="fa-solid fa-eye"></i>
                      </span>
                    ) : (
                      <span>
                        <i class="fa-solid fa-eye-slash"></i>
                      </span>
                    )}
                  </span>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Button variant="success" type="submit">
                  Profile Update
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <Modal
        open={changePassword}
        onClose={() => setChangePassword(false)}
        center
      >
        <Form>
          <Row>
            <Col lg={12}>
              <Form.Group className="mb-3 form-password-group-show-hide">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type={showPass ? "text" : "password"}
                  placeholder="Type Old Password"
                />
                <span onClick={() => setshowPass(!showPass)}>
                  {showPass ? (
                    <span>
                      <i class="fa-solid fa-eye"></i>
                    </span>
                  ) : (
                    <span>
                      <i class="fa-solid fa-eye-slash"></i>
                    </span>
                  )}
                </span>
              </Form.Group>
            </Col>
            <Col lg={12}>
              <Form.Group className="mb-3 form-password-group-show-hide">
                <Form.Label>Type New Password</Form.Label>
                <Form.Control
                  type={showPass2 ? "text" : "password"}
                  placeholder="Type New Password"
                />
                <span onClick={() => setshowPass2(!showPass2)}>
                  {showPass2 ? (
                    <span>
                      <i class="fa-solid fa-eye"></i>
                    </span>
                  ) : (
                    <span>
                      <i class="fa-solid fa-eye-slash"></i>
                    </span>
                  )}
                </span>
              </Form.Group>
            </Col>
            <Col lg={12}>
              <Form.Group className="mb-3 form-password-group-show-hide">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type={showPass3 ? "text" : "password"}
                  placeholder="Type Confirm  New Password"
                />
                <span onClick={() => setshowPass3(!showPass3)}>
                  {showPass3 ? (
                    <span>
                      <i class="fa-solid fa-eye"></i>
                    </span>
                  ) : (
                    <span>
                      <i class="fa-solid fa-eye-slash"></i>
                    </span>
                  )}
                </span>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Button variant="success" type="submit">
                Profile Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Breadcrumb
        leftTitle="Profile"
        rightTitle="Dashboard"
        pageTitle="Profile"
      />
      <Container>
        <div className="profile-inner-wrap">
          <Row>
            <Col lg={4}>
              <div className="profile-view-left-area">
                <div className="profile-picture-area">
                  <img src={profileImage} alt="profile" />
                  <div className="profile-input-image-area">
                    <label htmlFor="profileImage">+</label>
                    <input
                      type="file"
                      id="profileImage"
                      name="profile"
                      className="d-none"
                    />
                  </div>
                  <h5>Baker Hossin</h5>
                  <h6>Support Officer</h6>
                  <Link to="/profile" className="nav-link p-0 text-dark">
                    Profile
                  </Link>
                  <button className="btn" onClick={() => setUpdate(true)}>
                    Upadate Profile
                  </button>
                  <button
                    className="btn"
                    onClick={() => setChangePassword(true)}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <div className="profile-view-right-area">
                <div className="profile-single-group">
                  <span className="profile-name">Name</span>
                  <span className="profile-dec">
                    <span>:</span>Baker
                  </span>
                </div>
                <div className="profile-single-group">
                  <span className="profile-name">Phone Number</span>
                  <span className="profile-dec">
                    <span>:</span>Baker
                  </span>
                </div>
                <div className="profile-single-group">
                  <span className="profile-name">Email</span>
                  <span className="profile-dec">
                    <span>:</span>Baker
                  </span>
                </div>
                <div className="profile-single-group">
                  <span className="profile-name">User ID</span>
                  <span className="profile-dec">
                    <span>:</span>Baker
                  </span>
                </div>
                <div className="profile-single-group">
                  <span className="profile-name">Supervisor</span>
                  <span className="profile-dec">
                    <span>:</span>Baker
                  </span>
                </div>
                <div className="profile-single-group">
                  <span className="profile-name">Division</span>
                  <span className="profile-dec">
                    <span>:</span>Baker
                  </span>
                </div>
                <div className="profile-single-group">
                  <span className="profile-name">District</span>
                  <span className="profile-dec">
                    <span>:</span>Baker
                  </span>
                </div>
                <div className="profile-single-group">
                  <span className="profile-name">Upazila</span>
                  <span className="profile-dec">
                    <span>:</span> Baker
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <div className="sopport-officer-wrap">
            <div className="support-officer-item-wrap">
              <div className="mb-4">
                <h5>Support Officer</h5>
              </div>
              <Row>
                <Col lg={2}>
                  <div className="support-officer-single-item">
                    <span>
                      <img src={officer1} alt="Profile" />
                      <h5>Baker</h5>
                    </span>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="support-officer-single-item">
                    <span>
                      <img src={officer1} alt="Profile" />
                      <h5>Baker</h5>
                    </span>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="support-officer-single-item">
                    <span>
                      <img src={officer1} alt="Profile" />
                      <h5>Baker</h5>
                    </span>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="support-officer-single-item">
                    <span>
                      <img src={officer1} alt="Profile" />
                      <h5>Baker</h5>
                    </span>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="support-officer-single-item">
                    <span>
                      <img src={officer1} alt="Profile" />
                      <h5>Baker</h5>
                    </span>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="support-officer-single-item">
                    <span>
                      <img src={officer1} alt="Profile" />
                      <h5>Baker</h5>
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="sopport-officer-wrap">
            <div className="mb-3">
              <h5>Institute List</h5>
            </div>
            <Table borderless>
              <thead>
                <tr>
                  <th>Sequential Number</th>
                  <th>EIIN Number</th>
                  <th>Institute Name English</th>
                  <th>Management</th>
                  <th>Institute Type</th>
                  <th>Contact Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>254687</td>
                  <td>Oxford Missoin High School</td>
                  <td>GOVERNMENT</td>
                  <td>School</td>
                  <td>186546845125</td>
                  <td>
                    <Button
                      variant="success"
                      // onClick={() => setOpenFirst(true)}
                      className="user-set-routs-link-btn survay-page btn-sm"
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileMain;
