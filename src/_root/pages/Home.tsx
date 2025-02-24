import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <h4>HomePage</h4>
      <Button onClick={() => navigate("/login")}>Login</Button>
    </>
  );
};

export default Home;
