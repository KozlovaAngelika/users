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
  const getCheckedUsers = () => {
    return users
      .filter((user) => user.checked === true)
      .map((user) => {
        return user._id;
      });
  }
  const deleteUsersHandler = async () => {
    const usersIdForDelete = getCheckedUsers();
    await request("/api/auth/users", "DELETE", usersIdForDelete);
    getUsers();
  };
  const blockUsersHandler = async () => {
    const usersForBlock = getCheckedUsers();
    await request("/api/auth/users/block", "POST", usersForBlock);
    getUsers();
  }
  const unblockUsersHandler = async () => {
    const usersForUnblock = getCheckedUsers();
    await request("/api/auth/users/unblock", "POST", usersForUnblock);
    getUsers();
  }
  return (
    <Container className={style.users}>
      <ControlPanel deleteUsers={deleteUsersHandler} blockUsersHandler={blockUsersHandler} unblockUsersHandler={unblockUsersHandler}></ControlPanel>
      <Table users={users ? users : []}></Table>
    </Container>
  );
};
