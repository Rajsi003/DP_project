import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Admin= () => {
  const navigate = useNavigate();

  return (
    <>
      <h4>AdminPage</h4>
      <Button onClick={() => navigate("/all-courses")}>Courses</Button>

    </>
  );
};

export default Admin;
