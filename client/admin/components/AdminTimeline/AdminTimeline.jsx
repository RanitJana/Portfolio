/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import "./AdminTimeline.css";

function AdminTimeline({ timeline = [] }) {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="adminTimeline">
      <div className="heading">
        <h2>Timeline</h2>
        <button>Manage Timeline</button>
      </div>
      <div className="table-wrapper">
        {timeline && timeline.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {timeline?.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.title}</td>
                    <td>{value.from}</td>
                    <td>{value.to}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="noTimeline">
            <span>No Timeline is found</span>
            <button onClick={() => navigate(`/admin/${id}/timeline/create`)}>
              Add Timeline!
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
export default AdminTimeline;
