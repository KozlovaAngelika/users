import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHttp } from "../../../hooks/http.hook";
import style from "./SignUp.module.scss";
import { header } from "express-validator";

export const SignUp = () => {
  const { loading, request, error } = useHttp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {}, [error]);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const signUpHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
    } catch (e) {}
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
        </Col>
      </Row>
    </Container>
  );
};
