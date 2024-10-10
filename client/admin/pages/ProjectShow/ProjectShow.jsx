/* eslint-disable react-hooks/exhaustive-deps */
import "./ProjectShow.css";
import getMarkdownText from "../../utils/ReadmeConverter.js";
import { handleSingleProject } from "../../../src/utils/Apis.js";
import { useParams, Link } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";
import { toastContext } from "../../../src/Index.jsx";

function ProjectShow() {
  const { projectId } = useParams();

  const { toast } = useContext(toastContext);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getProject = useCallback(async () => {
    try {
      setLoading(true);

      let response = await handleSingleProject(projectId);
      if (!response || !response.data)
        throw new Error("Please try to refresh the page");
      else setData(response.data);
    } catch (error) {
      toast.error(error?.message || "Pleasr try to refresh the page");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    getProject();
  }, [getProject, projectId]);

  if (isLoading || !data) return <AdminSkeleton />;

  return (
    <div className="projectShow">
      <div className="top">
        <button onClick={() => window.history.back()}>back</button>
        <div className="name">{data.name}</div>
      </div>
      <div className="bottom">
        <div className="thumbnail">
          <img src={data.thumbnail} alt="" />
        </div>
        <div
          className="description1"
          dangerouslySetInnerHTML={getMarkdownText(data.description)}
        />
        <div className="deployments">
          <div className="githubLink">
            <Link to={data.github} target="_blank">
              <i
                className="devicon-github-original"
                style={{ fontSize: 25 }}
              ></i>
              Go to GitHub repository
            </Link>
          </div>
          <div className="deploymentLink">
            <Link to={data.link} target="_blank">
              <img
                src="/Images/external-link.png"
                alt=""
                style={{ filter: "invert(100%)" }}
              />
              {data.link ? "Visit website" : "Not deployed"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectShow;
