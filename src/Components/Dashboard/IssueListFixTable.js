import React from "react";
import { Table } from "react-bootstrap";

const IssueListFixTable = () => {
  return (
    <div>
      <h6 className="mb-3">Top Pending Issues by Institute</h6>
      <Table striped bordered hover>
        <thead style={{ background: "#FFEEE1" }}>
          <tr>
            <th>SL</th>
            <th>EIIN No.</th>
            <th>Institute name</th>
            <th>Upazila</th>
            <th>SO Name</th>
            <th>Pending</th>
            <th>Solved</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default IssueListFixTable;
