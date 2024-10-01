/* eslint-disable react/prop-types */
import "./ProfileWelcome.css";

function ProfileWelcome({ avatar, fullName }) {
  return (
    <div className="imgAndWelcome">
      <div className="img">
        <img
          src={avatar || "/Images/developer_5813665.png"}
          alt="User avatar"
        />
      </div>
      <div className="welcome">Welcome back, {fullName}</div>
    </div>
  );
}

export default ProfileWelcome;
