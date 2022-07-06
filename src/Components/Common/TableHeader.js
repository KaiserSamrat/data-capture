import PropTypes from "prop-types";
import React from "react";
import { Input, Row } from "reactstrap";
import SearchInput from "../Atoms/SearchInput";

const TableHeader = ({
  handleSearchFilter,
  handleSelectFilter,
  handleSelectFilterFromDate,
  handleSelectFilterToDate,
  selectValue,
  data,
  isMultiple,
  isMultiple2,
  isMultiple3,
  handleSelectFilter2,
  handleSelectFilter3,
  selectValue2,
  selectValue3,
  data2,
  data3,
  title,
  headerSearchOption,
  headerButtonOption,
  handleExcel,
  isLoading,
  selectPlaceholderTitle,
  selectPlaceholderTitle3,
  searchPlaceholder,
  isDateFrom,
  isDateTo,
}) => {
  return (
    <React.Fragment>
      <Row className="mb-3 table-header-padding">
        <div
          className={`d-flex d-flex-blockCustom ${
            title ? "justify-content-between " : "justify-content-end"
          }`}
        >
          {title ? <h6></h6> : null}
          {headerSearchOption ? (
            <>
              <div className="d-flex d-flex-blockCustom align-items-center">
                {headerButtonOption ? (
                  <div className="me-4 justify-content-end custom-bottom-margin">
                    <button
                      className="btn btn-success btn-lg"
                      disabled={isLoading}
                      onClick={handleExcel}
                    >
                      {isLoading ? "Downloading..." : "Download"}
                    </button>
                  </div>
                ) : null}
                <div className="search-box me-2 d-flex justify-content-end custom-bottom-margin">
                  <SearchInput
                    className="userSearchBar form-control search-width2"
                    style={{ width: "200px" }}
                    onChange={handleSearchFilter}
                    placeholder={searchPlaceholder}
                  />
                </div>

                {isMultiple ? (
                  <Input
                    type="select"
                    className="me-2 custom-bottom-margin"
                    onChange={handleSelectFilter2}
                    value={selectValue2}
                  >
                    <option defaultValue>{selectPlaceholderTitle}</option>
                    {data2.map((data, idx) => (
                      <option key={idx} value={data}>
                        {data}
                      </option>
                    ))}
                  </Input>
                ) : null}
                {isMultiple3 ? (
                  <Input
                    type="select"
                    className="me-2 custom-bottom-margin"
                    onChange={handleSelectFilter3}
                    value={selectValue3}
                  >
                    <option defaultValue>{selectPlaceholderTitle3}</option>
                    <option value="All" key="All">
                      All
                    </option>
                    {data3.map((data, idx) => (
                      <option key={idx} value={data._id}>
                        {data.name}
                      </option>
                    ))}
                  </Input>
                ) : null}

                <Input
                  type="select"
                  onChange={handleSelectFilter}
                  value={selectValue}
                  className="search-width2"
                  style={{ width: "200px" }}
                >
                  {/* <option defaultValue>Select...</option> */}
                  {data.map((data, idx) => (
                    <option key={idx} value={data}>
                      {data}
                    </option>
                  ))}
                </Input>
              </div>
            </>
          ) : null}
        </div>
      </Row>
    </React.Fragment>
  );
};
TableHeader.propTypes = {
  title: PropTypes.string,
  headerSearchOption: PropTypes.string,
  headerButtonOption: PropTypes.string,
  selectValue: PropTypes.number,
  handleSearchFilter: PropTypes.func,
  handleSelectFilter: PropTypes.func,
  handleSelectFilterFromDate: PropTypes.func,
  handleSelectFilterToDate: PropTypes.func,
  data: PropTypes.array,
  selectValue2: PropTypes.string,
  selectValue3: PropTypes.string,
  handleSelectFilter2: PropTypes.func,
  handleSelectFilter3: PropTypes.func,
  handleExcel: PropTypes.func,
  data2: PropTypes.array,
  data3: PropTypes.array,
  isMultiple: PropTypes.bool,
  isMultiple2: PropTypes.bool,
  isMultiple3: PropTypes.bool,
  selectPlaceholderTitle: PropTypes.string,
  selectPlaceholderTitle3: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  isLoading: PropTypes.bool,
  isDateTo: PropTypes.bool,
  isDateFrom: PropTypes.bool,
};

export default TableHeader;
