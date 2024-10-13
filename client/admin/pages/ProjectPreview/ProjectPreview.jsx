/* eslint-disable react-hooks/exhaustive-deps */
import "./ProjectPreview.css";
import { handleProject } from "../../../src/utils/Apis.js";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastContext } from "../../../src/Index.jsx";

function ProjectPreview() {
  const { id } = useParams();
  const { toast } = useContext(toastContext);
  const navigate = useNavigate();
  const [isDeleted, setDeleted] = useState(false);

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
  }, [isDeleted]);

  useEffect(() => {
    getProjects();
  }, [getProjects, id]);

  if (idLoading || !projectData) return <AdminSkeleton />;

  return (
    <div className="projectPreview">
      <div className="top">
        <h2>Projects</h2>
        <button
          onClick={() => navigate(`/admin/${id}/project/manage/add`)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
          }}
        >
          <img
            src="/Images/icons8-add-100.png"
            alt=""
            width={20}
            style={{ filter: "invert(100%)" }}
          />
          <span>Add</span>
        </button>
      </div>
      <div className="bottom">
        {projectData && projectData.length > 0 ? (
          projectData.map((val) => (
            <ProjectCard
              key={val._id}
              _id={val._id}
              description={val.description}
              name={val.name}
              thumbnail={val.thumbnail}
              toast={toast}
              setDeleted={setDeleted}
            />
          ))
        ) : (
          <div className="noProjectIsFound">
            <span>No Project is found</span>
            <button
              onClick={() => navigate(`/admin/${id}/project/manage/add`)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.25rem",
              }}
            >
              <img
                src="/Images/icons8-add-100.png"
                alt=""
                width={20}
                style={{ filter: "invert(100%)" }}
              />
              <span>Add</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPreview;
