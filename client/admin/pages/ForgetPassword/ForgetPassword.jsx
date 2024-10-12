/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import "./ForgetPassword.css";
import { toastContext } from "../../../src/Index.jsx";
import { handleGetOtp } from "../../utils/Otp.js";
import EnterOtp from "../../components/EnterOtp/EnterOtp.jsx";
import NewPassword from "../../components/NewPassword/NewPassword.jsx";

function ForgetPassword() {
  const { toast } = useContext(toastContext);

  const [email, setEmail] = useState({
    email: "",
    loading: false,
    valid: false,
  });

  const [otp, setOtp] = useState({
    otp: null,
    loading: false,
    valid: false,
  });

  async function getOtp(e) {
    e.preventDefault();
    if (email.loading) return;
    if (email.email == "") return toast.warning("Please give your email");
    try {
      setEmail((prev) => ({ ...prev, loading: true }));
      let { success, message } = await handleGetOtp(email.email);
      if (success) setEmail((prev) => ({ ...prev, valid: true }));
    } catch (error) {
      toast.error(error.message || "Please try again");
    } finally {
      setEmail((prev) => ({ ...prev, loading: false }));
    }
  }

  return (
    <div className="forgetPass">
      <div>
        <h2>OTP Verification</h2>
        {!email.valid ? (
          <>
            <form onSubmit={getOtp}>
              <label htmlFor="email">Email</label>
              <input
                placeholder="Enter your registered email"
                type="email"
                name=""
                id="email"
                value={email.email}
                onChange={(e) =>
                  setEmail((prev) => ({ ...prev, email: e.target.value }))
                }
              />

              <button type={email.loading ? "button" : "submit"}>
                {email.loading ? <span className="loader"></span> : "verify"}
              </button>
            </form>
          </>
        ) : !otp.valid ? (
          <EnterOtp otp={otp} setOtp={setOtp} toast={toast} />
        ) : (
          <NewPassword toast={toast} />
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
