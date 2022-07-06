import PropTypes from "prop-types"
import React from "react"
import { Modal, ModalBody } from "reactstrap"

const CustomModal = ({
  open,
  toggle,
  modalMain,
  modalBody,
  children,
  size,
}) => {
  return (
    <React.Fragment>
      <Modal isOpen={open} toggle={toggle} size={size} className={modalMain}>
        <ModalBody className={modalBody}>{children}</ModalBody>
      </Modal>
    </React.Fragment>
  )
}

CustomModal.propTypes = {
  modalMain: PropTypes.string,
  modalBody: PropTypes.string,
  open: PropTypes.bool,
  toggle: PropTypes.func,
  children: PropTypes.any,
  size: PropTypes.string,
}

export default CustomModal
