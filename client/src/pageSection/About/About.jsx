/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { globalContext } from "../../App.jsx";
import "./About.css";

function About() {
  const { user, sectionRef, isUserLoading } = useContext(globalContext);

  return (
    <div
      className="aboutSection"
      ref={(el) => (sectionRef.current.aboutRef = el)}
    >
      <h1>About me</h1>
      <p>Allow me to introduce myself</p>
      <div className="info">
        <div className="myImg">
          <div className="shapeImage">
            <img src={user?.avatar || "/Images/developer_5813665.png"} alt="" />
          </div>
        </div>
        <div className="selfDetails">{user?.aboutMe}</div>
      </div>
    </div>
  );
}

export default About;
