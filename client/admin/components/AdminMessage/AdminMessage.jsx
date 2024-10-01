/* eslint-disable react/prop-types */
import "./AdminMessage.css";
import { handleDeleteMessage } from "../../utils/Apis.js";
import { useContext, useState } from "react";
import { toastContext } from "../../../src/Index.jsx";

function AdminMessage({
  id = "",
  sender = "",
  createdAt = Date.now(),
  content = "",
  fetchAllMessage,
}) {
  const { toast } = useContext(toastContext);

  const [isClick, setClick] = useState(false);

  async function deleteMessage(id) {
    setClick(true);
    let response = await handleDeleteMessage(id);
    if (!response || !response.success) {
      return toast.error(
        `${response?.message || "Unable to delete. Please try again"}`
      );
    }
    toast.success(response.message);
    setClick(false);

    fetchAllMessage();
  }

  return (
    <div className="adminMessage">
      <h3>From, {sender}</h3>
      <span>
        {new Date(createdAt).toLocaleTimeString()},&nbsp;
        {new Date(createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "2-digit",
          year: "2-digit",
        })}
      </span>
      <p>{content}</p>
      {
        <button
          onClick={() => {
            if (!isClick) deleteMessage(id);
          }}
        >
          {isClick ? <span className="loader"></span> : "Delete"}
        </button>
      }
    </div>
  );
}

export default AdminMessage;
