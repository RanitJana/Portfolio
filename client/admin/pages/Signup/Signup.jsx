import { useRef, useState, useContext } from "react";
import "./Signup.css";
import { handleSignUp } from "../../utils/Apis.js";
import { useNavigate } from "react-router-dom";
import { toastContext } from "../../../src/Index.jsx";

function Login() {
  const { toast } = useContext(toastContext);

  const navigate = useNavigate();

  const [fieldValue, setFieldValue] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmit, setSubmit] = useState(false);

  const fieldRef = useRef({
    fullNameRef: null,
    emailRef: null,
    phoneNumberRef: null,
    passwordRef: null,
    confirmPasswordRef: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);

    if (fieldValue.fullName === "") {
      fieldRef.current.fullNameRef.style.borderColor = "red";
      setTimeout(() => {
        fieldRef.current.fullNameRef.style.borderColor = "gray";
      }, 1500);
      setSubmit(false);
      return toast.warning("Please enter your name");
    }

    if (fieldValue.email === "") {
      fieldRef.current.emailRef.style.borderColor = "red";
      setTimeout(() => {
        fieldRef.current.emailRef.style.borderColor = "gray";
      }, 1500);
      setSubmit(false);
      return toast.warning("Please enter your email");
    }
    if (fieldValue.phoneNumber === "") {
      fieldRef.current.phoneNumberRef.style.borderColor = "red";
      setTimeout(() => {
        fieldRef.current.phoneNumberRef.style.borderColor = "gray";
      }, 1500);
      setSubmit(false);
      return toast.warning("Please enter your phone number");
    }

    if (fieldValue.password === "") {
      fieldRef.current.passwordRef.style.borderColor = "red";
      setTimeout(() => {
        fieldRef.current.passwordRef.style.borderColor = "gray";
      }, 1500);
      setSubmit(false);
      return toast.warning("Please enter your password");
    }

    if (fieldValue.confirmPassword === "") {
      fieldRef.current.confirmPasswordRef.style.borderColor = "red";
      setTimeout(() => {
        fieldRef.current.confirmPasswordRef.style.borderColor = "gray";
      }, 1500);
      setSubmit(false);
      return toast.warning("Please confirm password");
    }

    if (fieldValue.password !== fieldValue.confirmPassword) {
      fieldRef.current.passwordRef.style.borderColor = "red";
      fieldRef.current.confirmPasswordRef.style.borderColor = "red";
      setTimeout(() => {
        fieldRef.current.passwordRef.style.borderColor = "gray";
        fieldRef.current.confirmPasswordRef.style.borderColor = "gray";
      }, 1500);

      setFieldValue((prev) => ({ ...prev, password: "", confirmPassword: "" }));

      setSubmit(false);
      return toast.warning("Password did not match");
    }

    let { success, message } = await handleSignUp(
      fieldValue.fullName,
      fieldValue.email,
      fieldValue.phoneNumber,
      fieldValue.password,
      fieldValue.confirmPassword
    );
    setSubmit(false);
    if (!success) return toast.error(message);

    setFieldValue(() => ({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    }));

    return toast.success(message);
  }

  return (
    <>
      <div className="signup">
        <div>
          <div className="img" onClick={() => window.history.back()}>
            <img src="/Images/icons8-back-48.png" alt="" />
          </div>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="name">
              <span>Name</span>
              <input
                ref={(el) => (fieldRef.current.fullNameRef = el)}
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                onChange={(e) =>
                  setFieldValue((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                value={fieldValue.fullName}
              />
            </div>
            <div className="phoneNumber">
              <span>Phone number</span>
              <input
                ref={(el) => (fieldRef.current.phoneNumberRef = el)}
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your phone number"
                onChange={(e) =>
                  setFieldValue((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                value={fieldValue.phoneNumber}
              />
            </div>
            <div className="email">
              <span>Email</span>
              <input
                ref={(el) => (fieldRef.current.emailRef = el)}
                type="text"
                name="email"
                id="email"
                placeholder="Enter email or phone"
                onChange={(e) =>
                  setFieldValue((prev) => ({ ...prev, email: e.target.value }))
                }
                value={fieldValue.email}
              />
            </div>
            <div className="password">
              <span>Password</span>
              <input
                ref={(el) => (fieldRef.current.passwordRef = el)}
                type="password"
                name="password"
                id="password"
                onChange={(e) =>
                  setFieldValue((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                value={fieldValue.password}
                placeholder="Enter password"
              />
            </div>
            <div className="confirmPassword">
              <span>Confirm-password</span>
              <input
                ref={(el) => (fieldRef.current.confirmPasswordRef = el)}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                onChange={(e) =>
                  setFieldValue((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                value={fieldValue.confirmPassword}
              />
            </div>
            <div className="buttons">
              <button type="button" onClick={() => navigate("/login")}>
                Login
              </button>
              <button
                type={isSubmit ? "button" : "submit"}
                style={{ position: "relative" }}
              >
                {isSubmit ? <span className="loader"></span> : "Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
