import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [jwt, setJwt] = useLocalState("", "jwt");
  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };
    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt");
      })
      .then(([body, headers]) => {
        localStorage.setItem(
          "jwt",
          JSON.stringify(headers.get("authorization"))
        );
        window.location.href = "/";
      })
      .catch((message) => {
        alert(message);
      });
  }
  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fs-4">Username</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                placeholder="Type in your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
          >
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={() => sendLoginRequest()}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
