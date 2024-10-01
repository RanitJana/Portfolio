import "./Project.css";
import { useEffect, useState, useContext } from "react";
import { handleSingleProject } from "../utils/Apis.js";
import {
  useSearchParams,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { toastContext } from "../Index.jsx";
import VerifyLoading from "../../admin/components/VerifyLoading/VerifyLoading.jsx";

import "devicon/devicon.min.css";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function ProjectPage() {
  const [params] = useSearchParams();
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const { toast } = useContext(toastContext);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let id = params.get("id");
      if (!id) return window.history.back();

      let val = await handleSingleProject(id);

      if (!val.success) return toast.error(val.message);

      setData(val.data);
      setLoading(false);
    })();
  }, [params]);

  const getMarkdownText = () => {
    if (!data || !data.description) return { __html: "" }; // Safety check

    const rawMarkup = marked(data.description); // Parse markdown to HTML
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup); // Sanitize the HTML

    return { __html: sanitizedMarkup }; // Return sanitized HTML
  };
  if (isLoading) return <VerifyLoading />;
  return (
    <div className="singleProject">
      <span onClick={() => navigate(`/${id}`)}>Back</span>
      <h1>{data.name}</h1>
      <img src={data.thumbnail} alt="" title={data.name} />
      <div className="preview" dangerouslySetInnerHTML={getMarkdownText()} />
      {/* <p>{data.description}</p> */}
      <div className="tech">
        <p>Technologies used:</p>
        <ul>
          {data.tech.split(",").map((val, index) => {
            return (
              <li key={index}>
                {
                  <i
                    className={`devicon-${val.trim()}-plain-wordmark devicon-${val.trim()}-original-wordmark devicon-${val.trim()}-line-wordmark devicon-${val.trim()}-wordmark devicon-${val.trim()}-plain devicon-${val.trim()}-original devicon-${val.trim()}-line devicon-${val.trim()}`}
                    style={{ fontSize: 35 }}
                  ></i>
                }
              </li>
            );
          })}
        </ul>
      </div>
      <h3>Repository and deployment link:</h3>
      <div className="githubLink">
        <Link to={data.github} target="_blank">
          <i className="devicon-github-original" style={{ fontSize: 25 }}></i>
          Go to GitHub repository
        </Link>
      </div>
      <div className="deploymentLink">
        <Link to={data.link} target="_blank">
          <img src="/Images/external-link.png" alt="" />
          {data.link ? "Visit website" : "Not deployed"}
        </Link>
      </div>
    </div>
  );
}
