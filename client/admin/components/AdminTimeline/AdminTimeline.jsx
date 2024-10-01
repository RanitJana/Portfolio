/* eslint-disable react/prop-types */
import "./AdminTimeline.css";

function AdminTimeline({ timeline = [] }) {
  return (
    <div className="adminTimeline">
      <div className="heading">
        <h2>Timeline</h2>
        <button>Manage Timeline</button>
      </div>
      <div className="table-wrapper">
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
      </div>
    </div>
  );
}
export default AdminTimeline;
