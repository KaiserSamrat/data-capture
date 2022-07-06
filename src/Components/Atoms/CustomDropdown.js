import PropTypes from "prop-types"
import React from "react"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"

const CustomDropdown = ({
  open,
  toggle,
  dropdownClass,
  toggleClass,
  menuClass,
  item,
  children,
}) => {
  return (
    <React.Fragment>
      <div className="clearfix mt-4 mt-lg-0">
        <Dropdown isOpen={open} toggle={toggle} className={dropdownClass}>
          <DropdownToggle tag="button" className={toggleClass}>
            {children}
          </DropdownToggle>
          <DropdownMenu className={menuClass}>
            {item?.map((data, idx) => (
              <DropdownItem href="#" key={idx}>
                {data}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </React.Fragment>
  )
}
CustomDropdown.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  dropdownClass: PropTypes.string,
  toggleClass: PropTypes.string,
  menuClass: PropTypes.string,
  item: PropTypes.array,
  children: PropTypes.object,
}

export default CustomDropdown
