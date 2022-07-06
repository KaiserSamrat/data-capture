import Pagination from "components/Common/Pagination"
import PropTypes from "prop-types"
import React from "react"
import { Input, Table } from "reactstrap"

const CustomTable = ({
  data,
  pageNo,
  tableHead,
  setCurrentPage,
  paginationClass,
  isPagination,
  isCheckbox,
  handleAllSelect,
  reInitialize,
  disableCheckbox,
  children,
}) => {
  return (
    <React.Fragment>
      <div className="table-responsive">
        <Table className="table table-hover mb-0 table-centered">
          <thead className="table-light">
            <tr>
              {isCheckbox ? (
                <th>
                  <Input
                    type={"checkbox"}
                    size={"sm"}
                    name="all"
                    className="tableCheckBox"
                    onChange={handleAllSelect}
                    disabled={disableCheckbox}
                  />
                </th>
              ) : null}
              {tableHead.map((data, idx) =>
                data == "Action" ? (
                  <th key={idx} style={{ width: "118px" }}>
                    {data}
                  </th>
                ) : (
                  <th key={idx}>{data}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </Table>
        {isPagination && data?.length !== 0 ? (
          <Pagination
            parentClass={`${paginationClass} py-3`}
            reInitialize={reInitialize}
            page={pageNo}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </div>
    </React.Fragment>
  )
}

CustomTable.propTypes = {
  data: PropTypes.array,
  pageNo: PropTypes.number,
  children: PropTypes.any,
  tableHead: PropTypes.array,
  setCurrentPage: PropTypes.func,
  paginationClass: PropTypes.string,
  isPagination: PropTypes.bool,
  isCheckbox: PropTypes.bool,
  handleAllSelect: PropTypes.func,
  reInitialize: PropTypes.bool,
  disableCheckbox: PropTypes.bool,
}

export default CustomTable
