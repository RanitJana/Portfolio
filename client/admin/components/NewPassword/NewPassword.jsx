/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import "./NewPassword.css";
import { handleForgetPassword } from "../../utils/Apis.js";
import { useNavigate } from "react-router-dom";

function NewPassword({ toast }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const passRefs = useRef({
    pass: null,
    confirm: null,
  });

  const handlePassword = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmit) return;

      if (password == "") {
        toast.warning("Enter new password");
        return passRefs.current.pass.focus();
      }

      if (confirmPassword == "") {
        toast.warning("Confirm your password");
        return passRefs.current.confirm.focus();
      }

      try {
        setSubmit(true);
        let { success, message } = await handleForgetPassword({
          password,
          confirmPassword,
        });
        if (success) {
          navigate("/login");
          toast.success(message);
        } else toast.warning(message);
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        toast.error(error.message || "Please try again");
      } finally {
        setSubmit(false);
      }
    },
    [confirmPassword, password]
  );

  return (
    <div className="newPassword">
      <form onSubmit={handlePassword}>
        <label htmlFor="password">New Password</label>
        <input
          placeholder="New password"
          ref={(el) => (passRefs.current.pass = el)}
          type="password"
          name=""
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPass">Confirm</label>
        <input
          placeholder="Confirm password"
          ref={(el) => (passRefs.current.confirm = el)}
          type="password"
          name=""
          id="confirmPass"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type={isSubmit ? "button" : "submit"}>
          {isSubmit ? <span className="loader"></span> : "Update"}
        </button>
      </form>
    </div>
  );
}

export default NewPassword;
