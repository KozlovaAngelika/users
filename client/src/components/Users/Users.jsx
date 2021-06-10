import React, { useState, useCallback, useEffect } from "react";
import { ControlPanel } from "./ControlPanel/ControlPanel";
import style from "./Users.module.scss";
import { Table } from "./Table/Table";
import { useHttp } from "../../hooks/http.hook";
export const Users = () => {
  const [users, setUsers] = useState([]);
  const { loading, request, error, clearError } = useHttp();
  const getUsers = async () => {
    const data = await request("/api/auth/users");
    setUsers([{}, {}, {}]);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={style.users}>
      <ControlPanel></ControlPanel>
      <Table users={users}></Table>
    </div>
  );
};
