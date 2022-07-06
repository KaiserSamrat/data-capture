import PropTypes from "prop-types"
import React from "react"
import { FormFeedback, FormGroup, Input, Label } from "reactstrap"

const CustomInput = ({
  label,
  name,
  type,
  placeholder,
  validationType,
  handleChange,
  ...rest
}) => {
  return (
    <React.Fragment>
      <FormGroup className={label ? "mb-3" : ""}>
        {label ? (
          <Label for={name} className="form-label">
            {label}
          </Label>
        ) : null}
        <Input
          name={name}
          id={name}
          placeholder={placeholder}
          type={type}
          onChange={(e)=>{
            validationType.handleChange(e)
            handleChange && handleChange(e)
          }}
          onBlur={validationType.handleBlur}
          value={validationType?.values[name]}
          invalid={
            validationType.touched[name] && validationType.errors[name]
              ? true
              : false
          }
          {...rest}
        />
        {validationType?.touched[name] &&
        validationType?.errors[name] !== "" ? (
          <FormFeedback type="invalid">
            {validationType?.errors[name]}
          </FormFeedback>
        ) : null}
      </FormGroup>
    </React.Fragment>
  )
}

CustomInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validationType: PropTypes.object,
  rest: PropTypes.object,
}

export default CustomInput
