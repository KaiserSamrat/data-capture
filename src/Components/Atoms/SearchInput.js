import React from "react";

const SearchInput = ({ ...props }) => {
  return (
    <React.Fragment>
      <div className="position-relative">
        <input type="text" {...props} />
        <i className="bx bx-search-alt search-icon" />
      </div>
    </React.Fragment>
  );
};

export default SearchInput;
