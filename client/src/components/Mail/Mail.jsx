import "./Mail.css";
import { globalContext } from "../../App.jsx";
import { useContext } from "react";
import { toastContext } from "../../Index.jsx";

export default function Mail() {
  const { user } = useContext(globalContext);
  const { toast } = useContext(toastContext);

  function handleCopyEmail() {
    console.log(toast);

    try {
      navigator.clipboard.writeText(`${user?.email}`);
      toast.success("Copied to clipboard successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy email");
    }
  }

  return (
    <div className="mail">
      <span>{user?.email}</span>
      <div className="copy" onClick={handleCopyEmail}>
        <img src="/Images/icons8-copy-16.png" alt="" />
      </div>
    </div>
  );
}
