/* eslint-disable react-hooks/exhaustive-deps */
import "./Admin.css";
import { useEffect, useState, createContext } from "react";
import { handleVerify } from "./utils/Apis.js";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { handleUser } from "../src/utils/Apis.js";

import VerifyLoading from "./components/VerifyLoading/VerifyLoading.jsx";

const UserContext = createContext();
export { UserContext };

function Admin() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function checkVerify() {
      try {
        setLoading(true);

        let validity = await handleVerify(id);

        if (!validity.success) navigate("/login");
        let newUser = await handleUser(id);

        setUser(newUser);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    checkVerify();
  }, []);

  return (
    <div className="admin">
      {isLoading ? (
        <VerifyLoading />
      ) : (
        <UserContext.Provider value={{ user, id }}>
          <Outlet />
        </UserContext.Provider>
      )}
    </div>
  );
}

export default Admin;
