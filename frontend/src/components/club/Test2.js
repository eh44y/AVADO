import React, { Fragment } from "react";
import { Col } from "react-bootstrap";
import ClubItemNavigation from "../Layout/ClubItemNavigation";
import { Outlet } from "react-router-dom";

const Test2 = () => {
  return (
    <Fragment>
      <Col xs={12}>
        <ClubItemNavigation />
        <Outlet />
      </Col>
    </Fragment>
  );
};

export default Test2;
