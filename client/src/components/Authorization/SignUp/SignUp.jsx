import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form, Toast } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHttp } from "../../../hooks/http.hook";
import style from "./SignUp.module.scss";
import { useHistory } from "react-router-dom";
import { Error } from "mongoose";

export const SignUp = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { loading, request, error, clearError } = useHttp();
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
      const data = await request("/api/auth/register", "POST", { ...form });
      history.push("/sign_in");
      setShow(true);
    } catch (e) {
      setShow(true);
      clearError();
    }
  };
  return (
    <Container>
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
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={4000}
            autohide
          >
            <Toast.Header>{error ? "Error" : "Message"}</Toast.Header>
            <Toast.Body>
              {error
                ? `${error}`
                : "Registration completed successfully.Please sign in"}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
};
