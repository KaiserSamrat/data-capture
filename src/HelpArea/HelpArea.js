import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./helparea.scss";
const HelpArea = () => {
  return (
    <div>
      <Card className="help-main-card-area-card">
        Don’t Understand how it works. <Link>See tutorials</Link>
      </Card>
    </div>
  );
};

export default HelpArea;
