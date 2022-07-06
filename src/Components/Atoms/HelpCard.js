import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import CardComponent from "../Layout/CardComponent";

const HelpCard = ({ link }) => {
  return (
    <React.Fragment>
      <CardComponent>
        <span>
          Don’t Understand how it works.{" "}
          <Link
            to={link}
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
          >
            See tutorials
          </Link>
        </span>
      </CardComponent>
    </React.Fragment>
  );
};

HelpCard.propTypes = {
  link: PropTypes.string,
};
export default HelpCard;
