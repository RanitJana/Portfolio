/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import "./AdminProjects.css";

function AdminProjects({ project = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="adminProjects">
      <h2>Projects</h2>
      <div className="table-wrapper">
        {project && project.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Deployed</th>
                <th>Update</th>
                <th>Visit</th>
              </tr>
            </thead>
            <tbody>
              {project?.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.name}</td>
                    <td>{value.link != "" ? "Yes" : "No"}</td>
                    <td>
                      <button>Update</button>
                    </td>
                    <td>
                      <button onClick={() => window.open(value.link, "_blank")}>
                        {
                          value.link != "" ?
                            "Visit" :
                            "Not deployed"
                            }
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="noProject">
            <span>No project is found</span>
            <button onClick={() => navigate(`/admin/${id}/project/create`)}>
              Add a project!
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
export default AdminProjects;
