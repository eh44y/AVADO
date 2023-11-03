import React, { Fragment } from "react";
import SideNavigation from "./SideNavigation";
import { Col, Container, Row } from "react-bootstrap";
import ClubWrap from "./ClubWrap";
import ClubItemNavigation from "./ClubItemNavigation";
import { Outlet } from "react-router-dom";

const ClubLayout = (props) => {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col xs={2}>
            <SideNavigation />
          </Col>
          <Col xs={10}>
            <ClubItemNavigation />
            <Outlet />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}; // clubLayOut

export default ClubLayout;
