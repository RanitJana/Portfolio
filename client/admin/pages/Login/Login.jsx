import { useRef, useState, useContext } from "react";
import "./Login.css";
import { handleLogin } from "../../utils/Apis.js";
import { Link, useNavigate } from "react-router-dom";
import { toastContext } from "../../../src/Index.jsx";

function Login() {
  const { toast } = useContext(toastContext);

  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState("");

  const [password, setPassword] = useState("");

  const [emailRef, passwordRef] = [useRef(null), useRef(null)];

  const [isSubmit, setSubmit] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmit(true);

    if (emailOrPhone === "") {
      emailRef.current.style.borderColor = "red";
      setTimeout(() => {
        emailRef.current.style.borderColor = "gray";
      }, 1500);
      setSubmit(false);
      return toast.warning("Please enter your email/phone");
    }
    if (password === "") {
      passwordRef.current.style.borderColor = "red";
      setTimeout(() => {
        passwordRef.current.style.borderColor = "gray";
      }, 1500);
      setSubmit(false);
      return toast.warning("Please enter your password");
    }

    let { success, message, id } = await handleLogin(emailOrPhone, password);

    setSubmit(false);

    if (!success) return toast.error(message);

    setEmailOrPhone("");
    setPassword("");

    if (success) navigate(`/admin/${id}`);
  }

  return (
    <>
      <div className="login">
        <div>
          <div className="img" onClick={() => window.history.back()}>
            <img src="/Images/icons8-back-48.png" alt="" />
          </div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="emailOrPhone">
              <span>Email / Phone</span>
              <input
                ref={emailRef}
                type="text"
                name="emailOrPhone"
                id="emailOrPhone"
                onChange={(e) => setEmailOrPhone(e.target.value)}
                value={emailOrPhone}
                placeholder="Enter email or phone"
              />
            </div>
            <div className="pasword">
              <span>Password</span>
              <Link
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  color: "white",
                }}
              >
                Forgot Password?
              </Link>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter password"
              />
            </div>
            <div className="buttons">
              <button type="button" onClick={() => navigate("/signup")}>
                Signup
              </button>
              <button
                type={isSubmit ? "button" : "submit"}
                style={{ position: "relative" }}
              >
                {isSubmit ? <span className="loader"></span> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
