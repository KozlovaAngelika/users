import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react";
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
  const deleteUsersHandler = async () => {
    const usersIdForDelete = users
      .filter((user) => user.checked === true)
      .map((user) => {
        return user._id;
      });
    await request("/api/auth/users", "DELETE", usersIdForDelete);
  };
  return (
    <Container className={style.users}>
      <ControlPanel deleteUsers={deleteUsersHandler}></ControlPanel>
      <Table users={users}></Table>
    </Container>
  );
};
