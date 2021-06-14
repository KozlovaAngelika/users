import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHttp } from "../../../hooks/http.hook";
import style from "./SignIn.module.scss";
import { AuthContext } from "../../../context/AuthContext";
import { Notice } from "../Notice/Notice";
import { sha3_256 } from "js-sha3";

export const SignIn = () => {
  const auth = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const { loading, request, error } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const signInHandler = async () => {
    try {
      form.password = sha3_256(form.password);
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {
      setShow(true);
    }
  };
  return (
    <Container className={style.container}>
      <Row>
        <Col>
          <Form className={style.form}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={changeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={changeHandler}
              />
            </Form.Group>
            <div className="wr-buttons">
              <Button
                className="button"
                type="submit"
                onClick={signInHandler}
                disabled={loading}
              >
                Sign in
              </Button>
              <div>
                <NavLink to="./sign_up">Sign up</NavLink>
              </div>
            </div>
          </Form>
          <Notice error={error} show={show} setShow={setShow}></Notice>
        </Col>
      </Row>
    </Container>
  );
};
