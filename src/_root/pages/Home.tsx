import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat" 
         style={{
           backgroundImage: 'url("https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=1600&dpr=2&q=80")',
         }}>
      
      {/* Overlay (optional for dimming image) */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div> */}

      {/* Content on top of image */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white">
        
        {/* Login Button */}
        <div className="absolute top-4 right-4">
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-wide uppercase text-black text-center">
          CAMPUSSCHEDULER
        </h1>

        {/* Optional Subheading */}
        <p className="mt-4 text-lg text-black text-center">
          Organize your campus schedule with ease and clarity.
        </p>
      </div>
    </div>
  );
};

export default Home;
