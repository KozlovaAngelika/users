import React from "react";
import { Toast } from "react-bootstrap";

export const Notice = (props) => {
  return (
    <Toast
      onClose={() => props.setShow(false)}
      show={props.show}
      delay={4000}
      autohide
    >
      <Toast.Header>Error!</Toast.Header>
      <Toast.Body>{props.error}</Toast.Body>
    </Toast>
  );
};
