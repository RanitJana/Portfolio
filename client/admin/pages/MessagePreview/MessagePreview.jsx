import "./MessagePreview.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGetMessage } from "../../utils/Apis.js";
import AdminMessage from "../../components/AdminMessage/AdminMessage.jsx";
import AdminSkeleton from "../../components/AdminSkeleton/AdminSkeleton.jsx";

function MessagePreview() {
  const [isLoading, setLoading] = useState(true);

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  async function fetchAllMessage() {
    setLoading(true);
    let response = await handleGetMessage();
    if (response?.success) setMessage(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchAllMessage();
  }, []);

  if (isLoading) return <AdminSkeleton />;

  return (
    <div className="messagePreview">
      <div className="messagePreviewChild">
        <div className="top">
          <h2>Messages</h2>
          <button onClick={() => navigate("/admin")}>
            Return to Dashboard
          </button>
        </div>
        <div className="messages">
          {message?.length > 0 ? (
            message.map((message, index) => (
              <AdminMessage
                key={index}
                id={message._id}
                content={message.content}
                sender={message.sender}
                createdAt={message.createdAt}
                fetchAllMessage={fetchAllMessage}
              />
            ))
          ) : (
            <div className="emptyMessage">
              <img src="/Images/icons8-empty-box-100.png" alt="" width={60} />
              <p>No messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagePreview;
