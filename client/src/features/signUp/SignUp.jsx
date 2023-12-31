import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Cloudinary } from "@cloudinary/url-gen";

function SignUp() {
  //   const MAX_LENGTH = 255;
  //   const maximumReached =(character, maxLength)=>{return character.length >= maxLength};
  //   const numRemaining =(character, maxLength)=>{return maxLength - character.length};
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarLink, setAvatarLink] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isSignedUp) {
      navigate("/sign-in");
    }
  }, [isSignedUp]);
  const cld = new Cloudinary({ cloud: { cloudName: "cloudinarynora" } });
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
    const formData = new FormData();
    formData.append("file", avatar);
    formData.append("upload_preset", "upload_token"); // name of upload token fromp cloudinary (settings --> upload)
    // console.log(formData);
    // https://api.cloudinary.com/v1_1/:cloud_name/:action
    const cloudImage = () => {
      fetch("https://api.cloudinary.com/v1_1/cloudinarynora/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              avatar: data.url,
            }),
            headers: {
              "Content-Type": "application/json",
              // "token":
            },
          })
            .then((response) => {
              console.log(response);
              if (response.ok) {
                return response.json();
              } else {
                notify(`Server error ${response.status}`, "error");
              }
            })
            .then((data) => {
              if (data.status === 201) {
                setIsSignedUp(true);
                notify(data.message, "success");
              } else if (data.status === 400) {
                notify(data.message, "error");
              } else {
                notify(data.error, "error");
              }
            });
        });
    };

    const postUser = async () => {
      const sendUser = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          avatar: avatarLink,
        }),
        headers: {
          "Content-Type": "application/json",
          // "token":
        },
      });
      if (sendUser.status === 200) {
        const body = await sendUser.json();
        if (body.status === 201) {
          setIsSignedUp(true);
          notify(body.message, "success");
        } else if (body.status === 400) {
          notify(body.message, "error");
        } else {
          notify(body.error, "error");
        }
      } else {
        notify(`Server error ${sendUser.status}`, "error");
      }
    };

    cloudImage();
    // postUser();
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
      {avatarLink}
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
          <Label style={{ margin: "0px" }} for="firstName">
            First name
          </Label>
          <Input
            name="firstName"
            type="text"
            value={firstName}
            // placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
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
          <Label style={{ margin: "0px" }} for="lastName">
            Last name
          </Label>
          <Input
            className="text-input"
            name="lastName"
            type="text"
            value={lastName}
            // placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
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
          <Label style={{ margin: "0px" }} for="email">
            Email
          </Label>
          <Input
            className="text-input"
            name="email"
            type="email"
            value={email}
            // placeholder="Email"
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
            // placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
          <Label style={{ margin: "0px" }} for="password2"></Label>
          <Input
            className="text-input"
            name="password2"
            type="password"
            value={password2}
            placeholder="Repeat your password"
            onChange={(e) => setPassword2(e.target.value)}
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
          <Label style={{ margin: "0px" }} for="avatar"></Label>
          <Input
            className="text-input"
            name="avatar"
            type="file"
            placeholder="Choose your avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </FormGroup>
        <Button
          type="submit"
          style={{ width: "100%", backgroundColor: "#DBA39A", border: "none" }}
        >
          Sign up
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
