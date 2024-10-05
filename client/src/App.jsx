/* eslint-disable react-refresh/only-export-components */
import "./constants/constant.css";
import "./App.css";
// import ParticlesComponent from "./components/Particles/Particles.jsx";
import TopScrollBar from "./components/topScrollBar/TopScrollBar.jsx";
import Mouse from "./components/Mouse/Mouse.jsx";
import HomeSkeleton from "./components/HomeSkeleton/HomeSkeleton.jsx";
import { useNavigate, useParams } from "react-router-dom";

import {
  handleUser,
  handleSkills,
  handleTimeline,
  handleProject,
} from "./utils/Apis.js";
import { useEffect, createContext, useState, useRef } from "react";

const globalContext = createContext();
export { globalContext };

import { Outlet } from "react-router-dom";

export default function App() {
  const [data, setData] = useState({
    user: null,
    skills: null,
    timeline: null,
    project: null,
  });

  const [loading, setLoading] = useState({
    isUserLoading: true,
    isSkillLoading: true,
    isTimelineLoading: true,
    isProjectLoading: true,
  });

  const sectionRef = useRef({
    timelineRef: null,
    skillRef: null,
    projectRef: null,
    descriptionRef: null,
    contactRef: null,
    aboutRef: null,
  });

  const { id } = useParams();

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllApiData = async () => {
      try {
        const [user, skills, timeline, project] = await Promise.all([
          handleUser(id),
          handleSkills(id),
          handleTimeline(id),
          handleProject(id),
        ]);

        setData(() => ({ user, skills, timeline, project }));
      } catch (error) {
        console.log(error);
        navigate("/404");
      } finally {
        setLoading(() => ({
          isUserLoading: false,
          isSkillLoading: false,
          isTimelineLoading: false,
          isProjectLoading: false,
        }));
      }
    };

    if (isValidObjectId(id) || !id) {
      getAllApiData();

      let ids = localStorage.getItem("id") || JSON.stringify({});
      ids = JSON.parse(ids);

      ids = { ...ids, [id]: id };

      localStorage.setItem("id", JSON.stringify(ids));
    } else navigate("/404");
  }, [id, navigate]);

  const value = {
    user: data.user,
    skills: data.skills,
    timeline: data.timeline,
    project: data.project,
    isProjectLoading: loading.isProjectLoading,
    isTimelineLoading: loading.isTimelineLoading,
    isUserLoading: loading.isUserLoading,
    isSkillLoading: loading.isSkillLoading,
    sectionRef,
  };

  return (
    <>
      {/* <div className="background-fix"></div> */}
      <div className="App">
        <globalContext.Provider
          value={value}
          style={{ position: "relative", minHeight: "100vh" }}
        >
          {/* <ParticlesComponent /> */}
          <TopScrollBar />
          <Mouse />
          {!loading.isUserLoading ? (
            <div style={{ position: "relative", zIndex: 1 }}>
              <Outlet />
            </div>
          ) : (
            <HomeSkeleton />
          )}
        </globalContext.Provider>
      </div>
    </>
  );
}
