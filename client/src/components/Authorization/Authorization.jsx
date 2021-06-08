import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form, Card } from "react-bootstrap";
import style from "./Authorization.module.scss";
import { NavLink } from "react-router-dom";
import img from "../../media/decorate.png";

export const Authorization = () => {
  return (
    <Container>
      <img src={img} className="image" alt="decorate img"></img>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Authorization</Card.Title>
              <Card.Text>
                You can register or log into an existing account.
              </Card.Text>
              <NavLink to="./sign_in">Sign in</NavLink>
              <NavLink to="./sign_up">Sign up</NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
