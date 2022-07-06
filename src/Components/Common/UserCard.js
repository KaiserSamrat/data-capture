import PropTypes from "prop-types"
import React from "react"
import { Card, CardBody } from "reactstrap"

const UserCard = ({ report, value }) => {
  return (
    <Card className="mini-stats-wid">
      <CardBody>
        <div className="d-flex">
          <div className="flex-grow-1">
            <p className="text-muted fw-medium">{report.title}</p>
            <h4 className="mb-0">{value}</h4>
          </div>
          <div className="avatar-sm rounded-circle bg_violet align-self-center mini-stat-icon">
            <span className="avatar-title rounded-circle bg_violet">
              <i className={"bx " + report.iconClass + " font-size-24"}></i>
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

UserCard.propTypes = {
  report: PropTypes.object,
  value: PropTypes.any,
}

export default UserCard
