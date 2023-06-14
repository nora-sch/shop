import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/profile");
    }
  }, [isSignedIn]);

  const notify = (msg, type) => {
    switch (type) {
      case "success":
        toast.success(msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          theme: "colored",
          className: "toast-success",
        });
        break;
      case "error":
        toast.error(msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          theme: "colored",
          className: "toast-error",
        });
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const getUser = async () => {
      const sendLogin = await fetch("/api/users/signin", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
          // "token":
        },
      });
      if (sendLogin.status === 200) {
        notify(`Hello, ${firstName}!`, "success");
        setIsSignedIn(true);
      } else {
        notify("Check your login information or sign up!", "error");
      }
    };
    getUser();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        style={{
          width: "25%",
          backgroundColor: "#F0DBDB",
          padding: "1rem",
          borderRadius: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Label style={{ margin: "0px" }} for="email">
            Email
          </Label>
          <Input
            className="text-input"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Label style={{ margin: "0px" }} for="password">
            Password
          </Label>
          <Input
            className="text-input"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button
          type="submit"
          style={{ width: "100%", backgroundColor: "#DBA39A", border: "none" }}
        > Sign in
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;
