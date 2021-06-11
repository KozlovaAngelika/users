import React from "react";
import style from "./User.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const User = (props) => {
  return (
    <Row className={style.user} checked={false}>
      <Col md={1} className={style.choose}>
        <input type="checkbox"></input>
      </Col>
      <Col md={2}>{props.id}</Col>
      <Col md={2}>{props.name}</Col>
      <Col md={3}>{props.email}</Col>
      <Col md={2} className={style.registrationDate}>
        {props.registrationDate}
      </Col>
      <Col md={2} className={style.lastLoginDate}>
        {props.lastLoginDate ? props.lastLoginDate : "-"}
      </Col>
    </Row>
  );
};
