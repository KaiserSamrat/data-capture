import React from "react";
import { Card } from "react-bootstrap";
// import { Card, CardBody } from "reactstrap";
const ConnectorDeploymentStatus = () => {
  return (
    <>
      <Card className="brandanalytic">
        <Card.Body>
          <div className="chart-title-top-content">
            <h4 className="card-title">Connector deployment status</h4>
            {/* <p>See All</p> */}
          </div>

          <div>
            <div>
              <div className="connector-deployment-status">
                <div>
                  <p>Target</p>
                  <h6>8</h6>
                </div>{" "}
                <div>
                  <p>Target</p>
                  <h6>8</h6>
                </div>{" "}
                <div>
                  <p>Target</p>
                  <h6>8</h6>
                </div>
              </div>
              <div className="connector-deployment-status-bottom-yhbcknxlziugyvbh">
                <div className="connector-deployment-status-bottom ">
                  <div>
                    <b>Target</b>
                  </div>
                  <div>
                    <b>Target</b>
                  </div>
                </div>
                <div className="connector-deployment-status-bottom">
                  <div>
                    <p>Khulna</p>
                  </div>
                  <div>
                    <p>Deployed but terminated</p>
                  </div>
                </div>{" "}
                <div className="connector-deployment-status-bottom">
                  <div>
                    <p>Barishal</p>
                  </div>
                  <div>
                    <p>Deployed but terminated</p>
                  </div>
                </div>{" "}
                <div className="connector-deployment-status-bottom">
                  <div>
                    <p>Sylhet</p>
                  </div>
                  <div>
                    <p>Selected but rejected at last moment </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default ConnectorDeploymentStatus;
