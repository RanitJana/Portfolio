/* eslint-disable react-hooks/exhaustive-deps */
import "./ProjectCreate.css";
import { handleProject } from "../../../src/utils/Apis.js";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toastContext } from "../../../src/Index.jsx";

function ProjectCreate() {
  const { id } = useParams();
  const { toast } = useContext(toastContext);

  const [idLoading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(null);

  const getProjects = useCallback(async () => {
    try {
      setLoading(true);
      let response = await handleProject(id);
      setProjectData(response);
    } catch (err) {
      toast.error(err.message || "Please try to refresh the page again");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects, id]);

  if (idLoading || !projectData) return <AdminSkeleton />;

  return (
    <div className="projectCreate">
      <div className="top">
        <h2>Projects</h2>
        <button>Add</button>
      </div>
      <div className="bottom">
        {projectData && projectData.length > 0
          ? projectData.map((val) => (
              <ProjectCard
                key={val._id}
                _id={val._id}
                description={val.description}
                name={val.name}
                thumbnail={val.thumbnail}
              />
            ))
          : "No project is found"}
      </div>
    </div>
  );
}

export default ProjectCreate;
