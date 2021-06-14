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
  const [isSelectedAll, setSelectedAll] = useState(false)
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
    setSelectedAll(false);
  };
  const blockUsersHandler = async () => {
    const usersForBlock = getCheckedUsers();
    await request("/api/auth/users", "LOCK", usersForBlock);
    getUsers();
    setSelectedAll(false);
  }
  const unblockUsersHandler = async () => {
    const usersForUnblock = getCheckedUsers();
    await request("/api/auth/users", "UNLOCK", usersForUnblock);
    getUsers();
    setSelectedAll(false);
  }
  return (
    <Container className={style.users}>
      <ControlPanel deleteUsers={deleteUsersHandler} blockUsersHandler={blockUsersHandler} unblockUsersHandler={unblockUsersHandler} loading={loading}></ControlPanel>
      <Table users={users ? users : []} isSelectedAll={isSelectedAll} setSelecterAll={setSelectedAll}></Table>
    </Container>
  );
};
