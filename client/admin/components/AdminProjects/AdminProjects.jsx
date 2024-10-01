/* eslint-disable react/prop-types */
import "./AdminProjects.css";

function AdminProjects({ project = [] }) {
  return (
    <div className="adminProjects">
      <h2>Projects</h2>
      <div className="table-wrapper">
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
                    <button>Visit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminProjects;
