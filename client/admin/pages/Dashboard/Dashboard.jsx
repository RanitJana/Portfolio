import "./Dashboard.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { Outlet } from "react-router-dom";
import ProfileWelcome from "../../components/ProfileWelcome/ProfileWelcome.jsx";
import { useContext } from "react";
import { UserContext } from "../../Admin.jsx";

function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div className="dashBoard">
      <NavBar />
      <div className="right">
        <ProfileWelcome avatar={user?.avatar} fullName={user?.fullName} />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
