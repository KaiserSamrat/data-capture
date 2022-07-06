import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"

const CustomCard = ({ className, children, title }) => {
  const [singlebtn, setSinglebtn] = useState(false)
  return (
    <React.Fragment>
      <Card className={className}>
        <CardBody>
          <div className="d-flex justify-content-between mb-2 align-content-center">
            <p className="font-size-14">{title}</p>
            <Dropdown
              isOpen={singlebtn}
              toggle={() => setSinglebtn(!singlebtn)}
            >
              <DropdownToggle className="btn button btn-sm" caret>
                Total
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div>{children}</div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
CustomCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
}

export default CustomCard
