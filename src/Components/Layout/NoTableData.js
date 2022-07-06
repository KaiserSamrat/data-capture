import PropTypes from "prop-types"
import React from "react"

const NoTableData = ({ colSpan, children, ...props }) => {
  return (
    <React.Fragment>
      <tr>
        <td colSpan={colSpan}>
          <div {...props}>{children}</div>
        </td>
      </tr>
    </React.Fragment>
  )
}
NoTableData.propTypes = {
  colSpan: PropTypes.number,
  children: PropTypes.any,
  props: PropTypes.object,
}

export default NoTableData
