import "./Phone.css";
import { globalContext } from "../../App.jsx";
import { useContext } from "react";
import { toastContext } from "../../Index.jsx";

export default function Mail() {
  const { user } = useContext(globalContext);

  const { toast } = useContext(toastContext);

  function handleCopyPhone() {
    try {
      navigator.clipboard.writeText(`${user?.phoneNumber}`);
      toast.success("Copied to clipboard successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy phone number");
    }
  }

  return (
    <div className="phone">
      <span>{user?.phoneNumber}</span>
      <div className="copy" onClick={handleCopyPhone}>
        <img src="/Images/icons8-copy-16.png" alt="" />
      </div>
    </div>
  );
}
