import React from 'react'
import { useSelector} from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log(user)
  return (
    <div><h2>Profile</h2><div>{user.firstName}</div></div>
  )
}

export default Profile