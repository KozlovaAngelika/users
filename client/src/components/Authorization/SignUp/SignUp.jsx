import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHttp } from "../../../hooks/http.hook";
import style from "./SignUp.module.scss";
import { useHistory } from "react-router-dom";
import { Notice } from "../Notice/Notice";
import { sha3_256 } from "js-sha3";


export const SignUp = () => {
  const history = useHistory();
  const { loading, request, error } = useHttp();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const signUpHandler = async (event) => {
    try {
      form.password = sha3_256(form.password);
      await request("/api/auth/register", "POST", { ...form });
      history.push("/sign_in");
    } catch (e) {
      setShow(true);
    }
  };
  return (
    <Container className={style.container}>
      <Row>
        <Col>
          <Form className={style.form}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={changeHandler}
              />
            </Form.Group>
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
                onClick={signUpHandler}
                disabled={loading}
              >
                Sign up
              </Button>
              <div>
                <NavLink to="./sign_in">Sign in</NavLink>
              </div>
            </div>
          </Form>
          <Notice error={error} show={show} setShow={setShow}></Notice>
        </Col>
      </Row>
    </Container>
  );
};
