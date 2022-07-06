import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import "./dashboard.scss";
import Acquisition from "./DashboardCharts/Acquisition";
import ConnectionTillDate from "./DashboardCharts/ConnectionTillDate";
import ConnectorDeploymentStatus from "./DashboardCharts/ConnectorDeploymentStatus";
import Demo from "./DashboardCharts/Demo";
import DemonstrationTillDate from "./DashboardCharts/DemonstrationTillDate";
import InformationCollection from "./DashboardCharts/InformationCollection";
const Dashboard = () => {
  return (
    <Container fluid>
      <Breadcrumb
        leftTitle="Dashboard"
        rightTitle="Dashboard"
        pageTitle="Product List"
      />
      <div className="dashboard-body-top-content-header">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between text-center">
              <div>
                <p>Total Revenue</p>
                <h6>10,00,000000</h6>
              </div>
              <div>
                <p>Total Project</p>
                <h6>760</h6>
              </div>
              <div>
                <p>Total Connection</p>
                <h6>60</h6>
              </div>
              <div>
                <p>Total Demonstration</p>
                <h6>60</h6>
              </div>
              <div>
                <p>Total Acquisition</p>
                <h6>60</h6>
              </div>
              <div>
                <p>Total Info Collection</p>
                <h6>60</h6>
              </div>{" "}
              <div>
                <p>Total Areas</p>
                <h6>60</h6>
              </div>{" "}
              <div>
                <p>Total Territories</p>
                <h6>60</h6>
              </div>
              <div>
                <button className="yguhbjkgdfbnrytfvgbi">
                  <i className="bx bxs-cog align-middle me-1"></i> Setting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-data-chart-area-wrap">
        <Row>
          <Col lg={8}>
            <div className="single-chart-data">
              {/* <SurveyOverview /> */}
              <Demo />
            </div>
          </Col>
          <Col lg={4}>
            <div className="dashboard-right-content">
              <Row>
                <Col lg={6}>
                  <div className="dashboard-right-single-content">
                    <h6>Income till date</h6>
                    <div className="dashboard-right-single-content-inner-bottom">
                      <span>BDT</span>
                      <h4>10,000</h4>
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="dashboard-right-single-content">
                    <h6>Burning</h6>
                    <div className="dashboard-right-single-content-inner-bottom">
                      <span>BDT</span>
                      <h4>60,204</h4>
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="dashboard-right-single-content">
                    <h6>Pot Value of acquired institutes</h6>
                    <div className="dashboard-right-single-content-inner-bottom">
                      <span>BDT</span>
                      <h4>8,600,000</h4>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <div className="dashboard-data-all-information-bottom-content">
        <Row>
          <Col lg={4}>
            <div className="single-chart-data">
              <ConnectionTillDate />
            </div>
          </Col>
          <Col lg={4}>
            <div className="single-chart-data">
              <DemonstrationTillDate />
            </div>
          </Col>
          <Col lg={4}>
            <div className="single-chart-data">
              <Acquisition />
            </div>
          </Col>
          <Col lg={4}>
            <div className="single-chart-data">
              <InformationCollection />
            </div>
          </Col>
          <Col lg={4}>
            <div className="single-chart-data">
              <ConnectorDeploymentStatus />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Dashboard;
