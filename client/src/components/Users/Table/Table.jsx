import React, { useState } from "react";
import style from "./Table.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHttp } from "../../../hooks/http.hook";
import { User } from "../User/User";
export const Table = (props) => {
  const userElements = props.users.map((user) => {
    return <User></User>;
  });
  return <Col className={style.container}>{userElements}</Col>;
};
