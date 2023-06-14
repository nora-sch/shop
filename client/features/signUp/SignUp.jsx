import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  useEffect(() => {
    if (isSignedUp) {
      navigate("/sign-in");
    }
  }, [isSignedUp]);

  const notify = (msg, type) => {
    switch (type) {
      case "success":
        toast.success(msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          theme: "colored",
        });
        break;
      case "error":
        toast.error(msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          theme: "colored",
        });
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const postUser = async () => {
      const sendUser = await fetch("/api/users/signup", {
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
      if (sendUser.status === 200) {
        notify("You are signed up. Log in, please!", "success");
        setIsSignedUp(true);
      } else {
        notify("User insert ERROR", "error");
      }
    };
    postUser();
  };

  return (
    <div>
        <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name</label>
        <input
          //   className={maximumReached(firstName, MAX_LENGTH) ? "length-maximum-reached" : "length-ok"}
          className="text-input"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {/* <small className="remaining-characters">
          {numRemaining} remaining characters
        </small> */}
        <label htmlFor="lastName">Last name</label>
        <input
          className="text-input"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          className="text-input"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="text-input"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password2">Repeat password</label>
        <input
          className="text-input"
          name="password2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
