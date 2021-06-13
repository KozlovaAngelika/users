import React, { useState } from "react";
import style from "./User.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const User = (props) => {
  const handlerChecked = () => {
    props.user.checked = !props.user.checked;
  };
  return (
    <Row className={style.user}>
      <Col md={1} className={style.choose}>
        <input type="checkbox" onChange={handlerChecked} checked={props.user.checked}></input>
      </Col>
      <Col md={2}>{props.user._id}</Col>
      <Col md={2}>{props.user.name}</Col>
      <Col md={2}>{props.user.email}</Col>
      <Col md={2} className={style.registrationDate}>
        {props.user.registrationDate}
      </Col>
      <Col md={2} className={style.lastLoginDate}>
        {props.user.lastLoginDate ? props.user.lastLoginDate : "-"}
      </Col>
      <Col md={1} className={style.status}>
        {props.user.isBlock ? 'block' : 'active'}
      </Col>
    </Row>
  );
};
