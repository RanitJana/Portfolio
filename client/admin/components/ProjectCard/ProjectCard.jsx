/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useState } from "react";

function ProjectCard({
  name = "",
  thumbnail = "",
  _id = "",
  description = "",
}) {
  const navigate = useNavigate();

  const [isOpenOption, setOpenOption] = useState(false);

  const getMarkdownText = () => {
    if (!description) return { __html: "" }; // Safety check

    const rawMarkup = marked(description); // Parse markdown to HTML
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup); // Sanitize the HTML

    return { __html: sanitizedMarkup }; // Return sanitized HTML
  };

  const [isDeleting, setDeleting] = useState(false);

  return (
    <div className="projectCard">
      <div className="img">
        <img src={thumbnail} alt="" />
      </div>
      <div className="content">
        <div className="title">
          <div className="name">{name}</div>
          <div className="options">
            <img
              src="/Images/icons8-more-24.png"
              alt="options"
              onClick={() => setOpenOption((prev) => !prev)}
            />
            <div className="more">
              {isOpenOption ? (
                <>
                  <button>Edit</button>
                  <button>
                    {isDeleting ? <span className="loader"></span> : "Delete"}
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          className="description"
          dangerouslySetInnerHTML={getMarkdownText()}
        />
      </div>
    </div>
  );
}

export default ProjectCard;
