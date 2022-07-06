import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbDashboard from "../../Breadcrumb/BreadcrumbDashboard";
import { getTopBanner, storeDashboardData } from "../../store/Dashboard/action";
import "./dashboard.scss";
import BpDelivery from "./DashboardCharts/BpDelivery";
import Brands from "./DashboardCharts/Brands";
import Category from "./DashboardCharts/Category";
import Error from "./DashboardCharts/Error";
import GiftDisbursement from "./DashboardCharts/GiftDisbursement";
import LeadTime from "./DashboardCharts/LeadTime";
import Partners from "./DashboardCharts/Partners";
import box from "./img/box.svg";
import documentText from "./img/document-text.svg";
import house from "./img/house.svg";
import profileUser from "./img/profile-user.svg";
import truckFast from "./img/truck-fast.svg";
import truck from "./img/truck.svg";
import { toast } from "react-toastify";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const { startDateRange, endDateRange, authtoken, topBanner } = useSelector(
    (state) => ({
      authtoken: state.Login.token,
      startDateRange: state.DashboardReducer.startDateRange,
      endDateRange: state.DashboardReducer.endDateRange,
      topBanner: state.DashboardReducer.topBanner,
    })
  );
  console.log('topBanner', topBanner);
  const handleStartDate = (e) => {

    setStartDate(e.target.value);
    const  compareStartDay = moment(e.target.value).diff(moment(endDate), 'days');
    console.log("compareStartDay", compareStartDay);
    if(compareStartDay<0){
      
      dispatch(
        storeDashboardData(
          "startDateRange",
          moment(e.target.value).format("YYYY-MM-DD")
        )
      );
      dispatch(
        storeDashboardData(
          "endDateRange",
          moment(endDate).format("YYYY-MM-DD")
        )
      );
    }
    else{
      toast("Start date can not be Larger than End date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  
  };
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    const  compareEndDay = moment(e.target.value).diff(moment(startDate), 'days');
    if(compareEndDay>-1){
      dispatch(
        storeDashboardData(
          "startDateRange",
          moment(startDate).format("YYYY-MM-DD")
        )
      );
      dispatch(
        storeDashboardData(
          "endDateRange",
          moment(e.target.value).format("YYYY-MM-DD")
        )
      );
    }
    else{
      toast("End date can not be smaller than From date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    
 
  };

  useEffect(() => {
    dispatch(getTopBanner(authtoken, startDateRange, endDateRange));
  }, [startDateRange, endDateRange]);

  return (
    <Container fluid>
      <BreadcrumbDashboard leftTitle="Dashboard" />

      <div className="dashboard-body-top-content-header mt-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex display_unset justify-content-between text-center">
              <div>
                <div className="d-flex justify-content-center">
                  <img src={profileUser} alt="Icon" />
                  <p className="mt-3 ms-2 header-text-color responsive-font-size">
                    Partners
                  </p>
                </div>
                <h6>{topBanner?.data?.partners}</h6>
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <img src={box} alt="Icon" />
                  <p className="mt-3 ms-2 header-text-color responsive-font-size">
                    Gifts
                  </p>
                </div>
                <h6>{topBanner?.data?.gifts}</h6>
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <img src={documentText} alt="Icon" />
                  <p className="mt-3 ms-2 header-text-color responsive-font-size">
                    Category
                  </p>
                </div>
                <h6>{topBanner?.data?.category}</h6>
              </div>
              {/* <div>
                <div className="d-flex justify-content-center">
                  <img src={people} alt="Icon" />
                  <p className="mt-3 ms-2 header-text-color">BP</p>
                </div>
                <h6>60</h6>
              </div> */}
              <div>
                <div className="d-flex justify-content-center">
                  <img src={house} alt="Icon" />
                  <p className="mt-3 ms-2 header-text-color responsive-font-size">
                    Hub
                  </p>
                </div>
                <h6>{topBanner?.data?.hub}</h6>
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <img src={truckFast} alt="Icon" />
                  <p className="mt-3 ms-2 header-text-color responsive-font-size">
                    Avg. Delivery
                  </p>
                </div>
                <h6>{topBanner?.data?.averageDelivery}</h6>
              </div>{" "}
              <div>
                <div className="d-flex justify-content-center">
                  <img src={truck} alt="Icon" />
                  <p className="mt-3 ms-2 header-text-color responsive-font-size">
                    Total Delivery
                  </p>
                </div>
                <h6>{topBanner?.data?.totalDelivery}</h6>
              </div>{" "}
              {/* <div>
                <button className="yguhbjkgdfbnrytfvgbi">
                  <i className="bx bxs-cog align-middle me-1"></i> Setting
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 date_search_area">
              <Form className="form-horizontal-form-wrap">
                <Form.Group className="form-data-filtering custom-bottom-margin">
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={handleStartDate}
                  />
                </Form.Group>
                <Form.Group className="form-data-filtering">
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={handleEndDate}
                  />
                </Form.Group>
              </Form>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-data-all-information-bottom-content mb-5">
        <Row>
          <Col lg={6}>
            <GiftDisbursement />
          </Col>
          <Col lg={6}>
            <BpDelivery />
          </Col>

          <Col lg={4}>
            <Category />
          </Col>
          <Col lg={4}>
            <Brands />
          </Col>
          <Col lg={4}>
            <Partners />
          </Col>
          <Col lg={4}>
          <Error />
          </Col>
          <Col lg={4}>
            
            <LeadTime />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Dashboard;
