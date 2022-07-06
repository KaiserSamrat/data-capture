import React from "react";
import { Table } from "react-bootstrap";

const IssueListFixTable = () => {
  return (
    <div>
      <h6 className="mb-3">Top Pending Issues by Support Officer</h6>
      <Table striped bordered hover>
        <thead style={{ background: "#FFEEE1" }}>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Email</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default IssueListFixTable;
