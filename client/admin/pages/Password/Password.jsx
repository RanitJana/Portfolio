import "./Password.css";
import { toastContext } from "../../../src/Index.jsx";
import { useContext, useRef, useState } from "react";
import { handleUpdatePassword } from "../../utils/Apis.js";

function Password() {
  const { toast } = useContext(toastContext);
  const [isLoading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const allRefs = useRef({
    current: null,
    new: null,
    confirm: null,
  });

  function verifyFields() {
    if (info.current == "") {
      allRefs.current.current.focus();
      toast.warning("Please enter your current password");
      return false;
    }
    if (info.new == "") {
      allRefs.current.new.focus();
      toast.warning("Please enter your New password");
      return false;
    }
    if (info.confirm == "") {
      allRefs.current.confirm.focus();
      toast.warning("Please confirm your password");
      return false;
    }
    if (info.new !== info.confirm) {
      allRefs.current.confirm.focus();
      toast.warning("New password did not match");
    }
    return true;
  }

  async function changePassword(e) {
    e.preventDefault();
    if (isLoading) return;
    if (!verifyFields()) return;
    try {
      setLoading(true);
      let { success, message } = await handleUpdatePassword({
        currentPassword: info.current,
        password: info.new,
        confirmPassword: info.confirm,
      });

      if (success) {
        setInfo({
          current: "",
          new: "",
          confirm: "",
        });
        toast.success(message);
      } else toast.warning(message);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="password">
      <h2>Manage Password</h2>
      <div className="changePassword">
        <form onSubmit={changePassword}>
          <label htmlFor="current">Current Password</label>
          <input
            ref={(el) => (allRefs.current.current = el)}
            value={info.current}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, current: e.target.value }))
            }
            type="password"
            name=""
            id="current"
          />

          <label htmlFor="new">New Password</label>
          <input
            ref={(el) => (allRefs.current.new = el)}
            value={info.new}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, new: e.target.value }))
            }
            type="password"
            name=""
            id="new"
          />

          <label htmlFor="confirm">Confirm Password</label>
          <input
            ref={(el) => (allRefs.current.confirm = el)}
            value={info.confirm}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, confirm: e.target.value }))
            }
            type="password"
            name=""
            id="confirm"
          />

          <button type={isLoading ? "button" : "submit"}>
            {isLoading ? <span className="loader"></span> : "Change"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Password;
