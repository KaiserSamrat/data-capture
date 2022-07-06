import PropTypes from "prop-types";
import React from "react";
import CardComponent from "../../Components/Layout/CardComponent";
import Button from "../Common/Button";

const AddCard = ({ title, buttonText, onAddHandler, iconClass }) => {
  return (
    <React.Fragment>
      <CardComponent className="mini-stats-wid">
        <div className="d-flex align-items-center flex-column">
          <h4 className="h6">{title}</h4>
          <Button
            className="btn button d-flex align-items-center"
            onClick={onAddHandler}
          >
            {buttonText} <i className={iconClass}></i>
          </Button>
        </div>
      </CardComponent>
    </React.Fragment>
  );
};

AddCard.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  iconClass: PropTypes.string,
  onAddHandler: PropTypes.func,
};

export default AddCard;
