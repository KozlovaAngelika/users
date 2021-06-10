import React from "react";
import { ControlPanel } from "./ControlPanel/ControlPanel";
import style from "./Users.module.scss";
import { Table } from "./Table/Table";
export const Users = () => {
  return (
    <div className={style.users}>
      <ControlPanel></ControlPanel>
      <Table></Table>
    </div>
  );
};
