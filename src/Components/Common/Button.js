import PropTypes from "prop-types"
import React from "react"

const Button = ({ className, onClick, children, ...rest }) => {
  return (
    <React.Fragment>
      <button className={className} {...rest} onClick={onClick}>
        {children}
      </button>
    </React.Fragment>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  rest: PropTypes.object,
}

export default Button
