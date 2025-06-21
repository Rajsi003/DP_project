// import React from "react";
// import { useNavigate } from "react-router-dom";

// // Sidebar Component
// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Logic to handle logout (e.g., clear auth tokens, user data, etc.)
//     localStorage.removeItem("authToken"); // Clear auth token from localStorage (example)
//     navigate("/login"); // Redirect to the login page
//   };

//   return (
//     <div style={styles.sidebar}>
//       <h2 style={styles.title}>Student   Dashboard   </h2>
//       <div style={styles.menu}>
//         <div style={styles.menuItem} onClick={() => navigate("/result")}>
//           <span style={styles.menuText}>Result</span>
//         </div>
//         <div style={styles.menuItem} onClick={() => navigate("/calendar")}>
//           <span style={styles.menuText}>Calendar</span>
//         </div>
//         <div
//           style={styles.menuItem}
//           onClick={() => navigate("/registered-courses")}
//         >
//           <span style={styles.menuText}>Courses</span>
//         </div>
//         <div
//           style={styles.menuItem}
//           onClick={() => navigate("/course-selection")}
//         >
//           <span style={styles.menuText}>Course Pre-Registration</span>
//         </div>
//         <div
//           style={styles.menuItem}
//           onClick={() => navigate("/thanku")}
//         >
//           <span style={styles.menuText}>Courses Summary</span>
//         </div>
//         <div
//           style={styles.menuItem}
//           onClick={() => navigate("/course-registration")}
//         >
//           <span style={styles.menuText}>Courses Registration</span>
//         </div>

//         <div style={styles.menuItem} onClick={handleLogout}>
//           <span style={styles.menuText}>Logout</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // CSS-in-JS styles for the sidebar
// const styles = {
//   sidebar: {
//     width: "250px",
//     height: "100vh",
//     backgroundColor: "black",
//     color: "white",
//     paddingTop: "20px",
//     paddingLeft: "10px",
//   },
//   title: {
//     color: "white",
//     textAlign: "center",
//     fontSize: "24px",
//     marginBottom: "30px", // Increased space below the title
//   },
//   menu: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   menuItem: {
//     padding: "10px 0",
//     cursor: "pointer",
//     borderBottom: "1px solid #444", // Optional for separating items
//   },
//   menuText: {
//     fontSize: "18px",
//     color: "white",
//   },
// };

// export default Sidebar;
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const menuItems = [
    { label: "Result", path: "/result" },
    { label: "Calendar", path: "/calendar" },
    { label: "Courses", path: "/registered-courses" },
    { label: "Course Pre-Registration", path: "/course-selection" },
    { label: "Courses Summary", path: "/thanku" },
    { label: "Course Registration", path: "/course-registration" },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Student Dashboard</h2>

      <div style={styles.menu}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            style={styles.menuItem}
            onClick={() => navigate(item.path)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#222")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <span style={styles.menuText}>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={styles.logoutWrapper}>
        <div
          style={{ ...styles.menuItem }}
          onClick={handleLogout}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#222")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <span style={{ ...styles.menuText, color: "#ff4d4d" }}>Logout</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#000",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Push logout to bottom
    padding: "20px 10px",
    boxShadow: "2px 0 8px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    marginBottom: "40px",
    fontWeight: "bold",
    borderBottom: "1px solid #444",
    paddingBottom: "10px",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "0", // to maintain borders between items
  },
  menuItem: {
    padding: "12px 16px",
    cursor: "pointer",
    borderBottom: "1px solid #444",
    transition: "background-color 0.3s ease",
  },
  menuText: {
    fontSize: "16px",
    color: "white",
  },
  logoutWrapper: {
    borderTop: "1px solid #444",
    marginTop: "20px",
  },
};

export default Sidebar;
