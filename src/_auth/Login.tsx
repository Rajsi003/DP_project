import React from 'react'

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
    <div>Login Form</div>
    <div>email:</div>
    <div>passsword:</div>
    <Button onClick={() => navigate("/student")}>Submit</Button>
    {/* add condition for navigating to office */}
    </>
  )
}

export default Login