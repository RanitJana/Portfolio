/* eslint-disable react-hooks/exhaustive-deps */
import "./Admin.css";
import { useEffect, useState, createContext } from "react";
import { handleVerify } from "./utils/Apis.js";
import { Outlet, useNavigate } from "react-router-dom";
import { handleUser } from "../src/utils/Apis.js";

import VerifyLoading from "./components/VerifyLoading/VerifyLoading.jsx";
import getCookieValue from "./utils/GetCookieId.js";

const UserContext = createContext();
export { UserContext };

function Admin() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  let id = null;

  useEffect(() => {
    async function checkVerify() {
      id = await getCookieValue("id");
      console.log(id);
      id = id ? await JSON.parse(id)?.id : null;
      try {
        setLoading(true);

        let validity = await handleVerify();

        if (!validity.success) navigate("/login");
        if (id) {
          let newUser = await handleUser(id);
          setUser(newUser);
        }
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
