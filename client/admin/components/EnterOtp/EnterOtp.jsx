/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useRef } from "react";
import "./EnterOtp.css";
import { handleVerifyOtp } from "../../utils/Otp.js";

function EnterOtp({ otp, setOtp, toast }) {
  const inputs = useRef([]);

  const verifyOtp = useCallback(async (ansOtp) => {
    try {
      let { success, message } = await handleVerifyOtp(ansOtp);
      if (success) setOtp((prev) => ({ ...prev, valid: true }));
      else toast.warning(message);
    } catch (error) {
      toast.error(error.message || "Please try again");
    } finally {
      inputs.current.forEach((val) => (val.value = ""));
    }
  }, []);

  const handleChange = async (e, index) => {
    if (otp.loading) return;
    const { value } = e.target;
    if (value == "e") return (inputs.current[index].value = "");

    if (value.length === 1 && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }

    if (index == inputs.current.length - 1) {
      let ansOtp = Number(
        inputs.current.reduce((prev, curr) => prev + curr.value, "")
      );
      setOtp((prev) => ({ ...prev, loading: true, otp: ansOtp }));
      await verifyOtp(ansOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (otp.loading) return;
    if (e.key === "Backspace" && index > 0 && !inputs.current[index].value) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="enterOtp">
      <p>Check your email</p>
      <div>
        {Array(4)
          .fill("-")
          .map((_, index) => (
            <input
              placeholder="-"
              readOnly={otp.loading}
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
      </div>
    </div>
  );
}

export default EnterOtp;
