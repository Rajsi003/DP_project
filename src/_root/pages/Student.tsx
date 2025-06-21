import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import the custom sidebar
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// AvatarDemo function
export function AvatarDemo() {
  return (
    <div style={styles.avatarContainer}>
      <Avatar style={styles.avatar}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback style={styles.avatarFallback}>CN</AvatarFallback> {/* Larger and styled fallback */}
      </Avatar>
      <h3 style={styles.welcomeMessage}>Welcome back, Rajsi!</h3>
    </div>
  );
}

const Student = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", backgroundColor: "#000", color: "#fff", height: "100vh" }}>
      <Sidebar style={{ backgroundColor: "#000" }} /> {/* Sidebar with dark gray background */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "#272727" }}>
        <AvatarDemo /> {/* AvatarDemo with message and avatar */}
      </div>
    </div>
  );
};

export default Student;

// CSS-in-JS styles for centering and enhancing the avatar and message
const styles = {
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    height: "100vh", // Make the container full height
    color: "#fff", // White text color for contrast
    padding: "20px", // Add padding for spacing
  },
  avatar: {
    width: "120px", // Increased width for larger avatar
    height: "120px", // Increased height for larger avatar
  },
  avatarFallback: {
    fontSize: "56px", // Increased font size for larger fallback text
    color: "#000", 
    backgroundColor: "#fff", 
    borderRadius: "50%", 
    width: "100%", 
    height: "100%", // Styled fallback to make it bigger
  },
  welcomeMessage: {
    marginTop: "30px", // Add spacing between avatar and message
    fontSize: "35px", // Increase font size for emphasis
    fontWeight: "bold", // Make the text bold
    color: "#fff", // White text color
    textAlign: "center", // Ensure the message is centered below the avatar
    letterSpacing: "2px", // Add spacing for a modern touch
  },
};
