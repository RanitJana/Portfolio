/* eslint-disable react/prop-types */
import { useRef } from "react";
import "./AdminRole.css";
function AdminRole({ roles, edible, setInfo, toast }) {
  let roleRef = useRef(null);

  function handleAddNewRole() {
    if (!edible) return;
    setInfo((prev) => ({ ...prev, roles: [...prev.roles, ""] }));
    setTimeout(() => {
      let roles = roleRef.current?.querySelectorAll("input");
      if (roles?.length - 1 >= 0) {
        roles[roles?.length - 1].focus();
      }
    }, 0);
  }

  function handleDeleteRole(e, index) {
    if (roles.length == 1)
      return toast.warning("Atleast one role must be present");

    roles.splice(index, 1);
    setInfo((prev) => ({ ...prev, roles }));
  }

  return (
    <div className="adminRoles">
      <div className="roles" ref={roleRef}>
        {roles?.map((value, index) => {
          return (
            <div className="role" key={index}>
              <input
                readOnly={!edible}
                style={{ color: edible ? "black" : "gray" }}
                type="text"
                name=""
                id=""
                value={value}
                onChange={(e) =>
                  setInfo((prev) => {
                    let roles = prev.roles;
                    roles[index] = e.target.value;
                    return { ...prev, roles };
                  })
                }
              />
              {edible ? (
                <div
                  className="deleteRole"
                  onClick={(e) => handleDeleteRole(e, index)}
                >
                  <img src="/Images/icons8-add-100.png" alt="X" />
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
        <img
          onClick={handleAddNewRole}
          src="/Images/icons8-add-100.png"
          alt="add"
          title="Add new"
          style={{ filter: edible ? "invert(0%)" : "invert(50%)" }}
        />
      </div>
    </div>
  );
}

export default AdminRole;
