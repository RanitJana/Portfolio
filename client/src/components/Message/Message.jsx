import "./Message.css";
import { useState, useContext } from "react";
import { toastContext } from "../../Index.jsx";
import { handleSendMessage } from "../../utils/Apis.js";
import { useParams } from "react-router-dom";

function Message() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [sending, setSending] = useState(false);

  const { toast } = useContext(toastContext);
  const { id } = useParams();

  async function handleContactMe(e) {
    e.preventDefault();

    if (name == "") return toast.warning("Please enter your name!");
    if (content == "") return toast.warning("Please write a message!");

    setSending(true);

    let response = await handleSendMessage(name, content, id);

    setSending(false);

    if (response.success) {
      setName("");
      setContent("");
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className="message">
      <form onSubmit={handleContactMe}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="sender"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name.."
        />
        <label htmlFor="message">Message</label>
        <input
          type="text"
          name="content"
          id="message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Drop your message.."
        />
        <button type={!sending ? "submit" : ""}>
          {!sending && <span>Send message</span>}
          {sending && <div className="loader"></div>}
        </button>
      </form>
    </div>
  );
}

export default Message;
