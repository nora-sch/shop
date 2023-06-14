import React, { useState } from "react";

function SignUp() {
  //   const MAX_LENGTH = 255;
  //   const maximumReached =(character, maxLength)=>{return character.length >= maxLength};
  //   const numRemaining =(character, maxLength)=>{return maxLength - character.length};
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert('A form was submitted: ' + this.state);

    // fetch('http://localhost:5000/users', {
    //     method: 'POST',
    //     // We convert the React state to JSON and send it as the POST body
    //     body: JSON.stringify(this.state)
    // }).then(function(response) {
    //     console.log(response)
    //     return response.json();
    // });
  };
  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
    }
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          className="text-input"
          name="email"
          type="text"
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          className="text-input"
          name="password"
          type="text"
          value={password}
          onChange={handleChange}
        />
        <label htmlFor="password2">Repeat password</label>
        <input
          className="text-input"
          name="password2"
          type="text"
          value={password2}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
