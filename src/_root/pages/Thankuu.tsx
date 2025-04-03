import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

const Thankuu= () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[500px] text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Course Added Successfully!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">You've successfully added course.Changes will get reflected soon</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate("/all-courses")}>Go Back</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Thankuu;
