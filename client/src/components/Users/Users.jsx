import React, { useState, useCallback, useEffect } from "react";
import { ControlPanel } from "./ControlPanel/ControlPanel";
import style from "./Users.module.scss";
import { Table } from "./Table/Table";
import { useHttp } from "../../hooks/http.hook";
import { Container } from "react-bootstrap";
export const Users = () => {
  const [users, setUsers] = useState([]);
  const { loading, request, error, clearError } = useHttp();
  const getUsers = async () => {
    const data = await request("/api/auth/users");
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container className={style.users}>
      <ControlPanel></ControlPanel>
      <Table users={users}></Table>
    </Container>
  );
};
