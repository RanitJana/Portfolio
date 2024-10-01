/* eslint-disable no-unused-vars */
import "./Project.css";
import { globalContext } from "../../App.jsx";
import { useContext } from "react";
import ProjectPart from "../../components/project/ProjectPart.jsx";

function Project() {
  const { project, sectionRef, isProjectLoading } = useContext(globalContext);

  return (
    <div className="project" ref={(el) => (sectionRef.current.projectRef = el)}>
      <h1>Projects</h1>
      <div className="projectContainer">
        {project &&
          project.length > 0 &&
          project.map((value, index) => {
            return (
              <ProjectPart
                projectId={value._id}
                key={index}
                name={value.name}
                thumbnail={value.thumbnail}
                description={value.description}
              />
            );
          })}
      </div>
      {project && !project.length ? (
        <div className="noProject">
          <span>
            As a beginner, I have no coding skills or projects yet, but I’m
            excited to start learning!
          </span>
          <img src="/Images/icons8-sad-50.png" alt="" style={{}} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Project;
