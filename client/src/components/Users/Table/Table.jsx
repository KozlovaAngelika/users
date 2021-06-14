import React, { useState } from "react";
import style from "./Table.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHttp } from "../../../hooks/http.hook";
import { User } from "../User/User";
export const Table = (props) => {
  const userElements = props.users.map((user) => {
    return <User user={user} key={user._id}></User>;
  });
  const [isSelectedAll, setSelecterAll] = useState(false)
  const selectAllHandler = () => {
    props.users.forEach(elem => {
      setSelecterAll(!isSelectedAll)
      elem.checked = !isSelectedAll;
    });
  }
  return (
    <Row className={style.container}>
      <Col>
        <Row className={style.tableHead}>
          <Col md={1}>
            <input type="checkbox" onChange={selectAllHandler} checked={isSelectedAll}></input>
          </Col>
          <Col md={2}>
            <span>Id</span>
          </Col>
          <Col md={2}>
            <span>Name</span>
          </Col>
          <Col md={2}>
            <span>Email</span>
          </Col>
          <Col md={2}>
            <span>Registration date</span>
          </Col>
          <Col md={2}>
            <span>Last login date</span>
          </Col>
          <Col md={1}>
            <span>Status</span>
          </Col>
        </Row>
        {userElements}
      </Col>
    </Row >
  );
};
