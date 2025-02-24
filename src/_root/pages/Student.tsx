import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Student = () => {
  const navigate = useNavigate();

  return (
    <>
      <h4>StudentPage</h4>

      <Button onClick={() => navigate("/course-selection")}>Registration</Button>
    </>
  );
};

export default Student;
